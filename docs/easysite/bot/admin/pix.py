import os
import logging
import random
import string

from db.queries import (
    create_escalation,
    update_lead_status,
    cancel_pending_follow_ups,
)
from whatsapp_client import send_message

logger = logging.getLogger(__name__)

DAVID_PHONE = os.getenv("DAVID_PHONE", "")

PIX_KEYWORDS = [
    "comprovante", "pix", "transferência", "pagamento",
    "paguei", "transferi", "fiz o pix", "mandei o pix",
    "recibo", "pagamento realizado",
]


def has_pix_keywords(message: str) -> bool:
    msg_lower = message.lower()
    return any(kw in msg_lower for kw in PIX_KEYWORDS)


def generate_pix_code() -> str:
    return "".join(random.choices(string.digits, k=3))


async def handle_pix_received(lead: dict, message: str):
    """Trata detecção de comprovante PIX: salva, notifica David, responde cliente."""
    pix_code = generate_pix_code()

    create_escalation(lead["id"], "pix_received", pix_code)
    update_lead_status(lead["id"], "pix_pending")
    cancel_pending_follow_ups(lead["id"])

    name = lead.get("name") or ""
    phone = lead["phone"]

    # Responder ao cliente
    client_msg = (
        f"Recebi seu comprovante{', ' + name if name else ''}! "
        "Vou verificar o pagamento e te retorno em seguida.\n\n"
        "Nosso horário de verificação é de segunda a sexta, das 9h às 18h. "
        "Se o pagamento foi feito fora desse horário ou no fim de semana, "
        "a verificação acontece no próximo dia útil pela manhã.\n\n"
        "Assim que confirmar, já te envio o formulário de briefing pra gente começar o seu site."
    )
    send_message(phone, client_msg)

    # Notificar David
    if DAVID_PHONE:
        david_msg = (
            f"PIX recebido de {name or 'cliente'} ({phone}).\n"
            f"Responda *SIM-{pix_code}* para confirmar e enviar o formulário de briefing."
        )
        send_message(DAVID_PHONE, david_msg)
        logger.info(f"[PIX] Lead {lead['id']} ({phone}) — código {pix_code} — David notificado")
    else:
        logger.warning("[PIX] DAVID_PHONE não configurado — notificação não enviada")
