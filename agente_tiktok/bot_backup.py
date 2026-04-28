import os
import json
from openai import OpenAI
import base64
import json
import requests
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters
from dotenv import load_dotenv
import uuid
from pathlib import Path

load_dotenv()
client = OpenAI()
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")

RUNS_DIR = Path("runs")
RUNS_DIR.mkdir(exist_ok=True)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def analisar_foto_e_gerar_roteiros(image_path: Path) -> dict:
    # 1) transforma a imagem em base64
    b64 = base64.b64encode(image_path.read_bytes()).decode("utf-8")

    # 2) prompt: dores -> top dores -> roteiros
    prompt = """
Você é um estrategista de marketing para TikTok, especialista em UGC estilo depoimento.

Você vai receber uma IMAGEM do produto (foto/screenshot).
Tarefas:
1) Identifique exatamente o produto (nome simples e claro).
2) Defina o público-alvo provável (1 linha).
3) Liste 10 dores (misture práticas + emocionais) que esse produto resolve.
4) Escolha as 6 dores mais fortes para vender (top_pains).
5) Crie ATÉ 6 roteiros diferentes (15–30s) estilo TikTok depoimento:
   - pessoa olhando para a câmera
   - linguagem natural, brasileira
   - com gancho forte nos 2 primeiros segundos
   - sem enrolação
   - CTA leve no final (“se fizer sentido, pega o seu”, etc.)
Formato de saída: RETORNE SOMENTE JSON VÁLIDO, sem texto extra:

{
  "product_name": "",
  "audience": "",
  "pains": [],
  "top_pains": [],
  "scripts": [
    {"hook": "", "body": "", "cta": ""}
  ]
}
"""

    # 3) chama OpenAI (multimodal via chat/completions)
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}}
                ],
            }
        ],
        "temperature": 0.8
    }

    r = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload, timeout=90)
    r.raise_for_status()

    content = r.json()["choices"][0]["message"]["content"]

    # tenta JSON
    return json.loads(content)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    ...

MAX_TELEGRAM = 3900  # margem segura

async def reply_long(update: Update, text: str):
    for i in range(0, len(text), MAX_TELEGRAM):
        await update.message.reply_text(text[i:i+MAX_TELEGRAM])

async def responder(update: Update, context: ContextTypes.DEFAULT_TYPE):
    ...
    texto_usuario = update.message.text

    prompt = f"""
Você é um roteirista UGC de TikTok.

Crie 3 variações de roteiro (V1, V2, V3) para o produto abaixo.

Regras (obrigatório):
- Pessoa falando direto para a câmera (depoimento)
- Linguagem natural e espontânea (Brasil)
- Frases curtas, ritmo rápido
- Sem marcar cenas, sem descrições de filmagem
- No máximo 90 a 120 palavras por variação
- Não usar emojis em excesso (máx 2 por variação)
- CTA natural no final (sem “compre agora” agressivo)

Estilos:
V1: Hook polêmico/curioso + dor principal + solução
V2: “Eu testei e funcionou” + prova/demonstração + 3 benefícios
V3: mini-história (situação real) + alívio + recomendação

Formato de saída EXATO:
V1: <texto>
---
V2: <texto>
---
V3: <texto>

Produto: {texto_usuario}
"""

    resposta = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    roteiros = resposta.choices[0].message.content
    await reply_long(update, roteiros)


async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("📸 Recebi sua foto. Salvando...")

    photo = update.message.photo[-1]
    file = await context.bot.get_file(photo.file_id)

    run_id = str(uuid.uuid4())[:8]
    run_dir = RUNS_DIR / run_id
    run_dir.mkdir(parents=True, exist_ok=True)

    image_path = run_dir / "input.jpg"
    await file.download_to_drive(custom_path=str(image_path))

    await update.message.reply_text(f"✅ Foto salva com ID: {run_id}\n🧠 Agora vou analisar o produto e gerar dores + roteiros...")

    try:
        result = analisar_foto_e_gerar_roteiros(image_path)

        # salva o resultado
        (run_dir / "result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

        # manda um resumo
        product = result.get("product_name", "Produto")
        audience = result.get("audience", "")
        top_pains = result.get("top_pains", [])
        scripts = result.get("scripts", [])

        msg = f"✅ Análise pronta!\n\n🧾 Produto: {product}\n👥 Público: {audience}\n\n🔥 Top dores:\n"
        for p in top_pains[:6]:
            msg += f"- {p}\n"

        await update.message.reply_text(msg[:3500])

        # manda roteiros (um por mensagem, para não estourar limite)
        for i, s in enumerate(scripts[:6], 1):
            roteiro_msg = f"🎬 Roteiro {i}\n\nHOOK: {s.get('hook','')}\n\nBODY: {s.get('body','')}\n\nCTA: {s.get('cta','')}"
            await update.message.reply_text(roteiro_msg[:3500])

        await update.message.reply_text(f"📁 Tudo salvo em: runs/{run_id}/ (input.jpg + result.json)")

    except Exception as e:
        await update.message.reply_text(f"❌ Deu erro na análise da OpenAI.\n\n{str(e)[:3500]}")
if __name__ == "__main__":
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, responder))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    

    print("🤖 Bot rodando...")
    app.run_polling()