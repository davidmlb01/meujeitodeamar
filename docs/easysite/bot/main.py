import os
import logging
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, Request, HTTPException
from dotenv import load_dotenv

load_dotenv()

from db.models import init_db
from db.queries import (
    get_or_create_lead,
    save_message,
    get_conversation_history,
    update_last_bot_message,
    cancel_pending_follow_ups,
)
from claude_client import get_response
from whatsapp_client import send_message

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

DAVID_PHONE = os.getenv("DAVID_PHONE", "")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")
STATUSES_NO_REPLY = {"pix_pending", "closed_lost", "pix_confirmed"}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def extract_phone(data: dict) -> str:
    try:
        remote_jid = data["data"]["key"]["remoteJid"]
        return remote_jid.replace("@s.whatsapp.net", "").replace("@g.us", "").replace("@lid", "")
    except (KeyError, TypeError):
        return ""


def extract_jid(data: dict) -> str:
    """Retorna o JID completo para envio de resposta."""
    try:
        return data["data"]["key"]["remoteJid"]
    except (KeyError, TypeError):
        return ""


def extract_message(data: dict) -> str:
    try:
        msg = data["data"]["message"]
        return (
            msg.get("conversation")
            or msg.get("extendedTextMessage", {}).get("text")
            or ""
        )
    except (KeyError, TypeError):
        return ""


def extract_name(data: dict) -> str:
    try:
        return data["data"].get("pushName", "") or ""
    except (KeyError, TypeError):
        return ""


def extract_message_id(data: dict) -> str:
    try:
        return data["data"]["key"].get("id", "") or ""
    except (KeyError, TypeError):
        return ""


def is_from_me(data: dict) -> bool:
    try:
        return data["data"]["key"].get("fromMe", False)
    except (KeyError, TypeError):
        return False


# ─── Admin handler (importado dinamicamente para evitar import circular) ──────

def handle_admin(phone: str, message: str):
    try:
        from admin.handler import handle_admin_message
        handle_admin_message(phone, message)
    except ImportError:
        logger.warning("admin.handler não disponível ainda")


# ─── PIX detection ────────────────────────────────────────────────────────────

PIX_KEYWORDS = [
    "comprovante", "pix", "transferência", "pagamento",
    "paguei", "transferi", "fiz o pix", "mandei o pix",
    "recibo", "pagamento realizado",
]


def has_pix_keywords(message: str) -> bool:
    msg_lower = message.lower()
    return any(kw in msg_lower for kw in PIX_KEYWORDS)


async def try_handle_pix(lead: dict, message: str) -> bool:
    """Retorna True se PIX foi detectado e tratado."""
    if not has_pix_keywords(message):
        return False

    from claude_client import classify_pix
    if not classify_pix(message):
        return False

    try:
        from admin.pix import handle_pix_received
        await handle_pix_received(lead, message)
        return True
    except ImportError:
        logger.warning("admin.pix não disponível ainda — PIX keywords detectadas mas não processadas")
        return False


# ─── Lifespan ─────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    logger.info("EasySite Bot iniciando — banco inicializado")

    # Scheduler (Story 1.4)
    try:
        from scheduler.follow_up import start_scheduler
        start_scheduler()
        logger.info("Follow-up scheduler iniciado")
    except ImportError:
        logger.info("Scheduler não disponível ainda (Story 1.4)")

    yield

    logger.info("EasySite Bot encerrando")


app = FastAPI(title="EasySite Bot", lifespan=lifespan)


# ─── API externa de leads (Story 1.3) ─────────────────────────────────────────

try:
    from api.leads import router as leads_router
    app.include_router(leads_router)
    logger.info("API de leads registrada")
except ImportError:
    pass

try:
    from api.briefing import router as briefing_router
    app.include_router(briefing_router)
    logger.info("API de briefing registrada")
except ImportError:
    pass


# ─── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.post("/webhook")
async def webhook(request: Request):
    if WEBHOOK_SECRET:
        token = request.headers.get("x-webhook-token", "") or request.query_params.get("token", "")
        if token != WEBHOOK_SECRET:
            raise HTTPException(status_code=403, detail="Forbidden")

    try:
        data = await request.json()
    except Exception:
        return {"status": "invalid_payload"}

    if data.get("event") != "messages.upsert":
        return {"status": "ignored_event"}

    if is_from_me(data):
        return {"status": "ignored_self"}

    jid = extract_jid(data)
    if jid.endswith("@g.us"):
        return {"status": "ignored_group"}

    phone = extract_phone(data)
    message = extract_message(data)
    name = extract_name(data)
    message_id = extract_message_id(data)

    if not phone or not message:
        return {"status": "empty_message"}

    logger.info(f"[MSG] {phone} ({name}): {message[:100]}")

    # Mensagens do David: tratar como comandos admin
    if phone == DAVID_PHONE:
        handle_admin(phone, message)
        return {"status": "admin_handled"}

    # Buscar ou criar lead
    lead = get_or_create_lead(phone, name)

    # Cancelar follow-ups pendentes (lead respondeu)
    cancel_pending_follow_ups(lead["id"])

    # Não responder leads em status bloqueado
    if lead["status"] in STATUSES_NO_REPLY:
        logger.info(f"[SKIP] {phone} — status {lead['status']}, não responder")
        return {"status": "lead_status_blocked"}

    # Verificar PIX antes de chamar Claude
    if await try_handle_pix(lead, message):
        return {"status": "pix_detected"}

    # Salvar mensagem do usuário
    save_message(lead["id"], "user", message)

    # Buscar histórico e contexto de jornada
    history = get_conversation_history(lead["id"])

    journey_context = ""
    try:
        from router import get_journey_context
        journey_context = get_journey_context(lead)
    except ImportError:
        pass

    # Obter resposta do Claude
    reply = get_response(history, journey_context)

    # Salvar resposta e atualizar timestamp
    save_message(lead["id"], "assistant", reply)
    update_last_bot_message(lead["id"])

    # Enviar via WhatsApp (usa JID completo para suportar @lid e @s.whatsapp.net)
    send_message(jid or phone, reply, push_name=name, message_id=message_id, lead_message=message)

    return {"status": "ok"}
