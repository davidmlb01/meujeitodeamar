import os
import json
import re
import asyncio
import time
from openai import OpenAI
import base64
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, ContextTypes, filters
from dotenv import load_dotenv
import uuid
from pathlib import Path

load_dotenv()
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY não encontrada no .env")

client = OpenAI(api_key=OPENAI_API_KEY)
RUNS_DIR = Path("runs")
RUNS_DIR.mkdir(exist_ok=True)

PENDING_ALBUMS = {}      # chave: (user_id, media_group_id) -> {"paths": [...], "task": asyncio.Task}
LAST_BRIEF = {}          # chave: user_id -> último Product Brief (JSON)
# --- MODOS por usuário ---
USER_MODE = {}  # user_id -> "RAPIDO" | "PRO" | "HOOKS" | "SCALE" | "DEFAULT"

# --- Fluxo do /analise ---
ANALISE_CONTEXT = {}   # user_id -> {"analysis": "..."}
ANALISE_PENDING = set()  # user_id esperando receber o texto do criativo

MAX_TELEGRAM = 3900  # margem segura

async def reply_long(update: Update, text: str):
    for i in range(0, len(text), MAX_TELEGRAM):
        await update.message.reply_text(text[i:i+MAX_TELEGRAM])

async def responder(update: Update, context: ContextTypes.DEFAULT_TYPE):
    ...
    texto_usuario = update.message.text
    user_id = update.effective_user.id
texto = (texto_usuario or "").strip()

# --- (1) Se o usuário respondeu SIM após uma análise: gerar 3 versões inspiradas ---
if texto.upper() == "SIM" and user_id in ANALISE_CONTEXT:
    analysis = ANALISE_CONTEXT[user_id]["analysis"]

    prompt_var = f"""
Você é roteirista de performance TikTok (PT-BR).

Baseado na análise abaixo, crie 3 versões INSPIRADAS (não copie frases, não replique estrutura literal):
{analysis}

Regras:
- Hook MUITO forte e específico (conecta com dor real)
- Pattern interrupt
- Características do produto (se estiverem mencionadas na análise)
- Benefício concreto
- CTA FORTE direcionando para clicar no carrinho laranja aqui embaixo (canto esquerdo inferior)

Formato:
V1: ...
---
V2: ...
---
V3: ...
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt_var}],
        temperature=0.7,
    )
    out = resp.choices[0].message.content.strip()
    await reply_long(update, out)

    ANALISE_CONTEXT.pop(user_id, None)
    return

# --- (2) Se o usuário está no modo /analise: analisar o texto enviado ---
if user_id in ANALISE_PENDING:
    ANALISE_PENDING.discard(user_id)

    prompt_analise = f"""
Você é estrategista de performance para TikTok.

Analise o criativo abaixo:
\"\"\"{texto}\"\"\"

Entregue:
1) Ângulo central (1 linha)
2) Dor principal (bem específica)
3) Tipo de hook + por que prende
4) Provas/credenciais (o que dá confiança?)
5) Estrutura de retenção (por que a pessoa continua?)
6) O que está fraco/genérico (com exemplos)
7) Como melhorar (5 ações concretas)

Finalize com:
"Quer que eu gere 3 versões inspiradas nisso? Responda SIM ou NÃO."
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt_analise}],
        temperature=0.5,
    )
    analysis_out = resp.choices[0].message.content.strip()
    ANALISE_CONTEXT[user_id] = {"analysis": analysis_out}
    await reply_long(update, analysis_out)
    return

texto_usuario = (update.message.text or "").strip()

# Se o usuário mandou só link (ou quase só link), não dá pra inferir o produto com segurança
tem_url = bool(re.search(r"https?://\S+", texto_usuario))
texto_sem_url = re.sub(r"https?://\S+", "", texto_usuario).strip()

if tem_url and len(texto_sem_url) < 25:
    await update.message.reply_text(
        "Recebi o link ✅\n\n"
        "Mas eu não consigo abrir a página aqui — se eu tentar, vou acabar inventando.\n\n"
        "Me mande 2 prints para eu criar roteiros fortes e específicos:\n"
        "1) print do TÍTULO + preço + estrelas/vendidos\n"
        "2) print da DESCRIÇÃO/benefícios (bullets)\n\n"
        "Ou então cole aqui o título + 5 bullets + preço."
    )

    prompt = f"""
Você é um roteirista especialista em conversão para TikTok Shop Brasil.

Crie 10 roteiros estrategicamente diferentes entre si, divididos nos seguintes FORMATOS:

1) 3 UGC falado direto (depoimento natural, câmera frontal).
2) 2 POV (imersão em situação real).
3) 2 Lista rápida (ex: "3 motivos para...")
4) 1 Crítica honesta (começa com dúvida ou ceticismo real).
5) 1 Comparação direta (produto vs alternativa ruim).
6) 1 Confissão pessoal forte (história real com vulnerabilidade).

REGRAS OBRIGATÓRIAS:

- Cada roteiro deve usar um ÂNGULO diferente.
- Proibido repetir argumento central.
- Proibido hook genérico.
- Hook precisa criar tensão real e parar o scroll.
- Conectar com uma dor concreta.
- Usar características reais do produto (somente do texto fornecido).
- Traduzir características em benefícios práticos.
- Se houver preço, estrelas ou vendidos, usar como prova.
- NÃO inventar informações.
- Linguagem natural e brasileira.
- Ritmo dinâmico.

CTA OBRIGATÓRIO:
- Direcionar explicitamente para clicar no carrinho laranja.
- Pode mencionar “canto esquerdo inferior da tela”.
- Deve incentivar ação imediata.

DURAÇÃO:
- 5 roteiros ~15 segundos (40–60 palavras).
- 5 roteiros ~30 segundos (100–130 palavras).

FORMATO DE SAÍDA:

R1 – [Formato + Ângulo]
<roteiro>

---
R2 – [Formato + Ângulo]
<roteiro>

(... até R10)

Produto (única fonte de informação):
{texto_usuario}
"""

    resposta = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
    )

    roteiros = resposta.choices[0].message.content
    await reply_long(update, roteiros)

async def salvar_foto_em_run(update: Update, context: ContextTypes.DEFAULT_TYPE, run_dir: Path) -> Path:
    """Baixa a foto do Telegram e salva dentro do run_dir. Retorna o path."""
    photo = update.message.photo[-1]  # maior resolução
    file = await context.bot.get_file(photo.file_id)

    # nome único por timestamp
    filename = f"img_{int(time.time() * 1000)}.jpg"
    image_path = run_dir / filename
    await file.download_to_drive(custom_path=str(image_path))
    return image_path


def extrair_brief_de_imagens(image_paths: list[Path]) -> dict:
    """Usa OpenAI visão para extrair um Product Brief consolidado a partir de 1+ imagens."""

    content = [
        {
            "type": "text",
            "text": (
                "Você é um analista de produto para anúncios UGC.\n"
                "Com base nas imagens do produto, extraia APENAS o que for suportado visualmente "
                "ou pelo texto visível na embalagem/tela.\n\n"
                "Retorne SOMENTE JSON válido neste formato:\n"
                "{\n"
                '  "product_name": "",\n'
                '  "category": "",\n'
                '  "what_it_is": "",\n'
                '  "who_its_for": "",\n'
                '  "use_cases": [],\n'
                '  "features": [],\n'
                '  "benefits": [],\n'
                '  "proof_points": [],\n'
                '  "common_objections": [],\n'
                '  "unknowns": []\n'
                "}\n"
            ),
        }
    ]

    # ✅ IMPORTANTÍSSIMO: tudo abaixo está DENTRO do def e DENTRO do for com indentação correta
    for p in image_paths:
        b64 = base64.b64encode(p.read_bytes()).decode("utf-8")
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{b64}"},
            }
        )

    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": content}],
        temperature=0.2,
    )

    raw = resp.choices[0].message.content.strip()

    # Remove blocos ```json ... ```
    if raw.startswith("```"):
        raw = raw.split("```")[1]

    # Pega só do primeiro { até o último }
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1:
        raw = raw[start : end + 1]

    try:
        return json.loads(raw)
    except Exception:
        print("RAW DA OPENAI (brief):")
        print(raw)
        raise


def gerar_por_modo(brief: dict, mode: str) -> dict:
    mode = (mode or "DEFAULT").upper()
    ...

def gerar_dores_e_roteiros_do_brief(brief: dict, qtd_roteiros: int = 6) -> dict:
    return gerar_por_modo(brief, "DEFAULT")

    if mode == "RAPIDO":
        qtd = 3
        instr = """
Crie 3 roteiros UGC falado (15–20s).
Cada um com ângulo diferente.
Hook forte e específico (anti-genérico).
CTA com carrinho laranja aqui embaixo.
"""
        return _gerar_json_scripts(brief, qtd_roteiros=qtd, instr=instr, mode_name="RAPIDO")

    if mode == "PRO":
        instr = """
Crie 10 roteiros híbridos, distribuídos:
- 3 UGC falado
- 2 POV
- 2 Lista rápida
- 1 Crítica honesta
- 1 Comparação direta
- 1 Confissão pessoal

Duração:
- 5 de ~15s (40–60 palavras)
- 5 de ~30s (100–130 palavras)

Regras:
- ângulos diferentes, sem repetir argumento central
- hooks anti-genéricos que conectam com dor real
- usar características reais do brief
- CTA forte: "clica no carrinho laranja aqui embaixo (canto esquerdo inferior)"
"""
        return _gerar_json_scripts(brief, qtd_roteiros=10, instr=instr, mode_name="PRO")

    if mode == "HOOKS":
        return _gerar_json_hooks(brief)

    if mode == "SCALE":
        return _gerar_json_scale(brief)

    # DEFAULT
# DEFAULT
instr = """
Crie 6 roteiros (mistura 15s e 30s).
Hooks anti-genéricos, específicos e conectados com dor real.
Usar características reais do brief (sem inventar).
CTA forte apontando para clicar no carrinho laranja (canto esquerdo inferior).
"""
return _gerar_json_scripts(brief, qtd_roteiros=6, instr=instr, mode_name="DEFAULT")    

def _safe_json_parse(raw: str) -> dict:
    raw = (raw or "").strip()
    if raw.startswith("```"):
        raw = raw.strip().strip("`")
        raw = raw.replace("json", "", 1).strip()
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1:
        raw = raw[start:end+1]
    return json.loads(raw)

def _gerar_json_scripts(brief: dict, qtd_roteiros: int, instr: str, mode_name: str) -> dict:
    prompt = f"""
Você é estrategista de performance e roteirista UGC TikTok (PT-BR).

Tom: natural, brasileiro, ritmo rápido.

Use SOMENTE as informações do Product Brief abaixo (não invente):
{json.dumps(brief, ensure_ascii=False)}

Tarefas:
1) Liste 12 dores reais (práticas + emocionais + sociais).
2) Escolha 4 top_pains.
3) {instr}

Formato obrigatório de cada roteiro:
- id: R1..Rn
- format: "UGC" | "POV" | "LISTA" | "CRITICA" | "COMPARACAO" | "CONFISSAO"
- duration: "15s" ou "30s"
- angle: nome curto do ângulo
- pain: dor usada
- scene: 1 linha simples em colchetes
- hook: 1–2 linhas
- text: texto falado
- cta: CTA forte com carrinho laranja

Retorne SOMENTE JSON válido:
{{
  "mode": "{mode_name}",
  "pains": [],
  "top_pains": [],
  "scripts": [
    {{"id":"R1","format":"UGC","duration":"15s","angle":"...","pain":"...","scene":"[...]","hook":"...","text":"...","cta":"..."}}
  ]
}}
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    raw = resp.choices[0].message.content
    data = _safe_json_parse(raw)
    return data

def _gerar_json_hooks(brief: dict) -> dict:
    prompt = f"""
Você é copywriter de performance TikTok (PT-BR).

Use SOMENTE este brief (não invente):
{json.dumps(brief, ensure_ascii=False)}

Crie 20 hooks MUITO fortes, anti-genéricos.
Cada hook deve:
- conectar com uma dor específica
- ter pattern interrupt
- ter 1 detalhe concreto do produto (se houver no brief)

Retorne SOMENTE JSON válido:
{{
  "mode":"HOOKS",
  "hooks":[
    {{"id":"H1","angle":"...","hook":"..."}}
  ]
}}
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
    )
    return _safe_json_parse(resp.choices[0].message.content)

def _gerar_json_scale(brief: dict) -> dict:
    prompt = f"""
Você é estrategista de performance TikTok (PT-BR).

Use SOMENTE este brief:
{json.dumps(brief, ensure_ascii=False)}

Monte um pacote MODULAR para escala:
- 10 hooks (anti-genéricos)
- 5 corpos (cada um com benefício + característica)
- 5 CTAs fortes com direção pro carrinho laranja (canto esquerdo inferior)

Retorne SOMENTE JSON válido:
{{
  "mode":"SCALE",
  "hooks":[{{"id":"H1","hook":"...","angle":"..."}}],
  "bodies":[{{"id":"B1","text":"..."}}],
  "ctas":[{{"id":"C1","text":"..."}}]
}}
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
    )
    return _safe_json_parse(resp.choices[0].message.content)
    """A partir do brief, gera dores + roteiros diversos (tom dica pra amiga) em JSON."""
    prompt = f"""
Você é estrategista de performance e roteirista UGC TikTok (PT-BR).
Tom obrigatório: como se estivesse dando uma dica sincera para uma amiga.

Baseie-se SOMENTE neste Product Brief (não invente nada):
{json.dumps(brief, ensure_ascii=False)}

Tarefas:
1) Liste 10 dores (práticas + emocionais) que o produto resolve.
2) Escolha as 3 dores mais fortes (top_pains).
3) Gere {qtd_roteiros} roteiros curtos (15–30s), distribuindo pelos top_pains.
4) Cada roteiro deve explorar um ângulo estratégico diferente (NÃO repetir argumento central).

Formato de cada roteiro:
- scene: 1 linha simples entre colchetes (ex: "[Em casa, segurando o produto]")
- text: texto falado (depoimento), frases curtas, natural, sem linguagem publicitária
- hook: 1–2 linhas no começo
- cta: CTA natural

Retorne SOMENTE JSON válido:
{{
  "pains": [],
  "top_pains": [],
  "scripts": [
    {{"id":"R1","pain":"...","scene":"...","hook":"...","text":"...","cta":"..."}}
  ]
}}
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    raw = resp.choices[0].message.content.strip()

    # Se vier em bloco ```json ... ```
    if raw.startswith("```"):
        raw = raw.strip()
        raw = raw.strip("`")
        raw = raw.replace("json", "", 1).strip()

    # Pega somente o JSON (do primeiro { até o último })
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1:
        raw = raw[start:end+1]

    try:
        data = json.loads(raw)
    except Exception:
        print("RAW DA OPENAI (roteiros):")
        print(raw)
        raise

    if not isinstance(data, dict):
        raise ValueError("OpenAI não retornou um JSON em formato dict.")

    return data
# Remove texto antes do primeiro { e depois do último }


async def processar_album(user_id: int, media_group_id: str, run_dir: Path, update: Update):
    """Processa o álbum depois que ele 'termina': brief -> dores -> roteiros."""
    try:
        paths = PENDING_ALBUMS[(user_id, media_group_id)]["paths"]
        # remove duplicadas
        paths = list(dict.fromkeys(paths))

        # 1) brief
        brief = extrair_brief_de_imagens(paths)
        LAST_BRIEF[user_id] = brief
        (run_dir / "brief.json").write_text(json.dumps(brief, ensure_ascii=False, indent=2), encoding="utf-8")

        # 2) dores + roteiros
        mode = USER_MODE.get(user_id, "DEFAULT")
        result = gerar_por_modo(brief, mode)
        (run_dir / "result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

        # 3) responder no Telegram (resumo + roteiros)
        product = brief.get("product_name", "Produto")
        await reply_long(update, f"✅ Produto identificado: {product}\n📸 Imagens analisadas: {len(paths)}\n📁 Pasta: {run_dir}")

        top_pains = result.get("top_pains", [])
        if top_pains:
            msg = "🔥 Top dores:\n" + "\n".join([f"- {p}" for p in top_pains[:3]])
            await reply_long(update, msg)

        mode = (result.get("mode") or USER_MODE.get(user_id, "DEFAULT")).upper()

# --- Se for modo HOOKS, responde só hooks e PARA ---
if mode == "HOOKS":
    hooks = result.get("hooks", []) or []
    if not hooks:
        await reply_long(update, "⚠️ Não vieram hooks no resultado.")
        return

    msg = "🎣 HOOKS PRONTOS (20):\n\n"
    for h in hooks[:20]:
        msg += f'{h.get("id","H?")} — {h.get("hook","")}\n'
    await reply_long(update, msg)
    return

# --- Se for modo SCALE, responde pacote modular e PARA ---
if mode == "SCALE":
    hooks = result.get("hooks", []) or []
    bodies = result.get("bodies", []) or []
    ctas = result.get("ctas", []) or []

    if not hooks and not bodies and not ctas:
        await reply_long(update, "⚠️ Não veio pacote SCALE no resultado.")
        return

    msg = "📈 PACOTE SCALE (modular)\n\n"

    msg += "HOOKS:\n"
    for h in hooks[:10]:
        msg += f'{h.get("id","H?")} — {h.get("hook","")}\n'

    msg += "\nBODIES:\n"
    for b in bodies[:5]:
        msg += f'{b.get("id","B?")} — {b.get("text","")}\n'

    msg += "\nCTAs:\n"
    for c in ctas[:5]:
        msg += f'{c.get("id","C?")} — {c.get("text","")}\n'

    await reply_long(update, msg)
    return

scripts = result.get("scripts", [])
for s in scripts[:6]:
        txt = (
            f"🎬 {s.get('id','R?')} — {s.get('pain','')}\n"
            f"{s.get('scene','')}\n\n"
            f"HOOK: {s.get('hook','')}\n\n"
            f"{s.get('text','')}\n\n"
            f"CTA: {s.get('cta','')}"
        )
        await reply_long(update, txt)

    except Exception as e:
        await reply_long(update, f"❌ Erro ao processar álbum/foto:\n{str(e)[:3500]}")
    finally:
        # limpa pendência
        PENDING_ALBUMS.pop((user_id, media_group_id), None)
ALBUM_DELAY = 1.5  # tempo para o Telegram terminar de enviar o álbum

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    async def set_mode(update: Update, mode: str, msg: str):
    user_id = update.effective_user.id
    USER_MODE[user_id] = mode
    await update.message.reply_text(msg)

async def rapido_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await set_mode(
        update,
        "RAPIDO",
        "⚡ Modo RÁPIDO ativado.\n\nEnvie 1 foto (ou um álbum) do produto e eu gero 3 roteiros UGC (15–20s) em ângulos diferentes."
    )

async def pro_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await set_mode(
        update,
        "PRO",
        "🔥 Modo PRO ativado.\n\nEnvie 1 foto (ou um álbum) do produto e eu gero 10 roteiros híbridos (5 de ~15s e 5 de ~30s), com hooks fortes + CTA pro carrinho."
    )

async def hooks_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await set_mode(
        update,
        "HOOKS",
        "🎣 Modo HOOKS ativado.\n\nEnvie 1 foto (ou álbum) do produto e eu gero 20 hooks anti-genéricos, cada um com um ângulo diferente."
    )

async def scale_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await set_mode(
        update,
        "SCALE",
        "📈 Modo SCALE ativado.\n\nEnvie 1 foto (ou álbum) do produto e eu gero um pacote modular: 10 hooks + 5 corpos + 5 CTAs (para recombinar e escalar)."
    )

async def analise_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    ANALISE_PENDING.add(user_id)
    ANALISE_CONTEXT.pop(user_id, None)
    await update.message.reply_text(
        "🔎 Modo /analise ativado.\n\n"
        "Agora me envie o TEXTO do criativo (roteiro/legenda/gancho) que você quer que eu analise.\n"
        "Depois da análise eu vou te perguntar se você quer 3 versões inspiradas (SEM copiar)."
    )
    await update.message.reply_text(
        "👋 Envie fotos do produto (como álbum) que eu gero dores e roteiros."
    )

async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    media_group_id = update.message.media_group_id

    # Se for álbum (várias fotos enviadas juntas)
    if media_group_id:
        key = (user_id, media_group_id)

        if key not in PENDING_ALBUMS:
            run_id = str(uuid.uuid4())[:8]
            run_dir = RUNS_DIR / run_id
            run_dir.mkdir(parents=True, exist_ok=True)

            PENDING_ALBUMS[key] = {
                "paths": [],
                "task": None,
                "run_dir": run_dir
            }

            await update.message.reply_text("📸 Recebi um álbum. Salvando as fotos...")

        run_dir = PENDING_ALBUMS[key]["run_dir"]
        img_path = await salvar_foto_em_run(update, context, run_dir)
        PENDING_ALBUMS[key]["paths"].append(img_path)

        # reinicia o timer
        old_task = PENDING_ALBUMS[key]["task"]
        if old_task:
            old_task.cancel()

        async def delayed():
            await asyncio.sleep(ALBUM_DELAY)
            await update.message.reply_text("🧠 Agora vou analisar todas as fotos...")
            await processar_album(user_id, media_group_id, run_dir, update)

        PENDING_ALBUMS[key]["task"] = asyncio.create_task(delayed())
        return

    # Se for foto única
    run_id = str(uuid.uuid4())[:8]
    run_dir = RUNS_DIR / run_id
    run_dir.mkdir(parents=True, exist_ok=True)

    await update.message.reply_text("📸 Foto recebida. Salvando...")
    img_path = await salvar_foto_em_run(update, context, run_dir)

    await update.message.reply_text("🧠 Analisando o produto e gerando dores + roteiros...")

    try:
        brief = extrair_brief_de_imagens([img_path])
        LAST_BRIEF[user_id] = brief

        (run_dir / "brief.json").write_text(
            json.dumps(brief, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )

        mode = USER_MODE.get(user_id, "DEFAULT")
        result = gerar_por_modo(brief, mode)
        
        print("DEBUG brief type:", type(brief))
        print("DEBUG result type:", type(result))

        (run_dir / "result.json").write_text(
            json.dumps(result, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )

        product = brief.get("product_name", "Produto")
        await reply_long(update, f"✅ Produto identificado: {product}\n📁 Pasta: {run_dir}")

        top_pains = result.get("top_pains", [])
        if top_pains:
            await reply_long(update, "🔥 Top dores:\n" + "\n".join(f"- {p}" for p in top_pains[:3]))

        for s in result.get("scripts", [])[:6]:
            txt = (
                f"🎬 {s.get('id','R?')} — {s.get('pain','')}\n"
                f"{s.get('scene','')}\n\n"
                f"HOOK: {s.get('hook','')}\n\n"
                f"{s.get('text','')}\n\n"
                f"CTA: {s.get('cta','')}"
            )
            await reply_long(update, txt)

    except Exception as e:
        await reply_long(update, f"❌ Erro ao processar foto:\n{str(e)[:3500]}")
if __name__ == "__main__":
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("rapido", rapido_cmd))
    app.add_handler(CommandHandler("pro", pro_cmd))
    app.add_handler(CommandHandler("hooks", hooks_cmd))
    app.add_handler(CommandHandler("scale", scale_cmd))
    app.add_handler(CommandHandler("analise", analise_cmd))

    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, responder))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    

    print("🤖 Bot rodando...")
    app.run_polling()