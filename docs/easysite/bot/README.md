# EasySite Bot — Guia de Deploy na VPS

Bot de WhatsApp do EasySite, construído com Python + FastAPI + Evolution API + Claude API.

---

## Pré-requisitos

- VPS com Ubuntu 22.04+ (Hostinger KVM2 recomendado)
- Python 3.11+
- Node.js 18+ (para PM2)
- Evolution API instalada e rodando na VPS
- Número WhatsApp dedicado configurado no Evolution API

---

## 1. Transferir arquivos para a VPS

```bash
# Opção A: clonar o repositório na VPS
git clone https://github.com/seu-usuario/seu-repo.git /root/projeto
cp -r /root/projeto/docs/easysite/bot /root/easysite-bot

# Opção B: transferir via scp do seu computador
scp -r ./docs/easysite/bot root@SEU_IP_VPS:/root/easysite-bot
```

---

## 2. Instalar dependências Python

```bash
cd /root/easysite-bot
pip install -r requirements.txt
```

---

## 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
nano .env
```

Preencha todos os valores no `.env`:
- `EVOLUTION_API_URL`: URL da sua Evolution API (ex: `http://localhost:8080`)
- `EVOLUTION_API_KEY`: chave de autenticação da Evolution API
- `EVOLUTION_INSTANCE`: nome da instância criada na Evolution API
- `CLAUDE_API_KEY`: sua chave da API Anthropic
- `BOT_PHONE`: número do WhatsApp do bot (só dígitos, ex: `5511999999999`)
- `DAVID_PHONE`: seu número pessoal para receber notificações admin
- `BRIEFING_FORM_URL`: link do Google Forms de briefing

---

## 4. Testar localmente na VPS

```bash
cd /root/easysite-bot
uvicorn main:app --host 0.0.0.0 --port 5000
```

Em outro terminal, teste o webhook:

```bash
curl -X POST http://localhost:5000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "messages.upsert",
    "instance": "easysite",
    "data": {
      "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": false,
        "id": "TEST001"
      },
      "message": {"conversation": "Quanto custa o site?"},
      "pushName": "Teste"
    }
  }'
```

Esperado: `{"status":"ok"}` e log no console com o número e mensagem.

Pressione `Ctrl+C` para parar.

---

## 5. Instalar PM2

```bash
npm install -g pm2
```

---

## 6. Iniciar o bot com PM2

```bash
cd /root/easysite-bot
pm2 start ecosystem.config.js
pm2 status
```

---

## 7. Configurar PM2 para iniciar no boot

```bash
pm2 startup
# Execute o comando que o PM2 sugerir (começa com "sudo env PATH=...")
pm2 save
```

---

## 8. Abrir porta 5000 no firewall

```bash
ufw allow 5000
ufw status
```

---

## 9. Configurar webhook na Evolution API

No painel da Evolution API, configure o webhook para:

```
URL: http://SEU_IP_VPS:5000/webhook
Eventos: messages.upsert
```

Desmarque mensagens de grupo e status para evitar loops.

---

## 10. Verificar funcionamento

```bash
pm2 logs easysite-bot
```

Envie uma mensagem para o número do bot e verifique o log.

---

## Comandos úteis

```bash
pm2 status              # status do bot
pm2 logs easysite-bot   # ver logs em tempo real
pm2 restart easysite-bot  # reiniciar
pm2 stop easysite-bot   # parar
pm2 delete easysite-bot # remover do PM2
```

---

## Atualizar o bot

```bash
# Transferir novos arquivos para a VPS
# Depois:
pm2 restart easysite-bot
```
