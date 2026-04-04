import logging
from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler

from db.queries import (
    get_pending_follow_ups,
    get_lead_by_id,
    mark_follow_up_sent,
    update_lead_status,
    insert_follow_up,
)
from whatsapp_client import send_message

logger = logging.getLogger(__name__)

_scheduler = BackgroundScheduler()

FOLLOW_UP_MESSAGES = {
    "1h": "Oi, {name}! Só passando aqui pra ver se ficou alguma dúvida. Estou por aqui se precisar.",
    "24h": (
        "Oi, {name}! Lembrei de você. Só pra reforçar: a gente entrega seu site profissional "
        "em 24 horas, com garantia total. Se quiser seguir, é só me avisar. Sem compromisso."
    ),
    "72h": (
        "Oi, {name}! Última mensagem pra não te incomodar. A gente tá com a agenda cheia essa semana, "
        "mas ainda consigo encaixar seu projeto se fechar até amanhã. Quer seguir?"
    ),
    "7d": (
        "Oi, {name}. Como não tive seu retorno, vou encerrar esse atendimento por aqui. "
        "Mas se no futuro precisar de um site pro seu negócio, pode me chamar. "
        "Vou estar por aqui. Boa sorte com tudo!"
    ),
}

FOLLOW_UP_INTERVALS = {
    "1h": timedelta(hours=1),
    "24h": timedelta(hours=24),
    "72h": timedelta(hours=72),
    "7d": timedelta(days=7),
}


def schedule_follow_ups(lead_id: int):
    """Agenda os 4 follow-ups para um lead a partir de agora."""
    now = datetime.now()
    for message_type, delta in FOLLOW_UP_INTERVALS.items():
        scheduled_at = (now + delta).strftime("%Y-%m-%d %H:%M:%S")
        insert_follow_up(lead_id, scheduled_at, message_type)
    logger.info(f"[FOLLOWUP] Lead {lead_id} — 4 follow-ups agendados")


def process_follow_ups():
    """Job que roda a cada 5 min e envia follow-ups vencidos."""
    now_iso = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    pending = get_pending_follow_ups(now_iso)

    for item in pending:
        lead = get_lead_by_id(item["lead_id"])
        if not lead:
            continue

        name = lead.get("name") or "você"
        message = FOLLOW_UP_MESSAGES[item["message_type"]].format(name=name)

        send_message(lead["phone"], message)
        mark_follow_up_sent(item["id"])
        logger.info(f"[FOLLOWUP] {lead['phone']} — {item['message_type']}")

        if item["message_type"] == "7d":
            update_lead_status(lead["id"], "closed_lost")
            logger.info(f"[FOLLOWUP] Lead {lead['id']} → closed_lost")


def start_scheduler():
    _scheduler.add_job(
        process_follow_ups,
        "interval",
        minutes=5,
        id="follow_up_job",
        replace_existing=True,
    )
    _scheduler.start()
    logger.info("Follow-up scheduler iniciado (intervalo: 5 min)")


def stop_scheduler():
    if _scheduler.running:
        _scheduler.shutdown(wait=False)
