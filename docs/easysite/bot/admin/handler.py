import os
import logging

from db.queries import (
    get_escalation_by_code,
    get_lead_by_id,
    update_lead_status,
    mark_escalation_resolved,
)
from whatsapp_client import send_message

logger = logging.getLogger(__name__)

DAVID_PHONE = os.getenv("DAVID_PHONE", "")
BRIEFING_FORM_URL = os.getenv("BRIEFING_FORM_URL", "{{LINK_FORMULARIO}}")


def handle_admin_message(phone: str, message: str):
    """Processa comandos recebidos do número do David."""
    if phone != DAVID_PHONE:
        return

    msg = message.strip().upper()

    if msg.startswith("SIM-"):
        pix_code = msg.replace("SIM-", "").strip()
        _confirm_pix(pix_code)
        return

    logger.info(f"[ADMIN] Mensagem do David não reconhecida como comando: {message[:50]}")


def _confirm_pix(pix_code: str):
    """Confirma PIX pelo código e envia formulário de briefing ao cliente."""
    escalation = get_escalation_by_code(pix_code)

    if not escalation:
        send_message(DAVID_PHONE, f"Codigo {pix_code} nao encontrado.")
        logger.warning(f"[PIX] Código {pix_code} não encontrado nas escalations")
        return

    if escalation.get("resolved_at"):
        send_message(DAVID_PHONE, f"Codigo {pix_code} ja foi processado anteriormente.")
        return

    lead = get_lead_by_id(escalation["lead_id"])
    if not lead:
        send_message(DAVID_PHONE, f"Lead nao encontrado para o codigo {pix_code}.")
        return

    update_lead_status(lead["id"], "pix_confirmed")
    mark_escalation_resolved(escalation["id"])

    name = lead.get("name") or ""

    # Mensagem para o cliente
    briefing_msg = (
        f"Pagamento confirmado{', ' + name if name else ''}! "
        "Agora e so preencher esse formulario rapidinho (leva uns 5 minutos):\n\n"
        f"{BRIEFING_FORM_URL}\n\n"
        "Assim que receber suas respostas, a gente ja comeca a criar o seu site. "
        "Entrega em ate 24 horas."
    )
    send_message(lead["phone"], briefing_msg)

    # Confirmação para David
    send_message(
        DAVID_PHONE,
        f"PIX-{pix_code} confirmado. Formulario enviado para {lead['phone']}."
    )

    logger.info(f"[PIX] Código {pix_code} confirmado — formulário enviado para {lead['phone']}")
