import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

EVOLUTION_API_URL = os.getenv("EVOLUTION_API_URL", "http://localhost:8080")
EVOLUTION_API_KEY = os.getenv("EVOLUTION_API_KEY", "")
EVOLUTION_INSTANCE = os.getenv("EVOLUTION_INSTANCE", "easysite")
DAVID_PHONE = os.getenv("DAVID_PHONE", "5511989188188")


def _send_raw(number: str, text: str) -> None:
    url = f"{EVOLUTION_API_URL}/message/sendText/{EVOLUTION_INSTANCE}"
    headers = {"apikey": EVOLUTION_API_KEY, "Content-Type": "application/json"}
    payload = {"number": number, "text": text}
    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()


def _resolve_lid(lid: str) -> str:
    url = f"{EVOLUTION_API_URL}/chat/findContacts/{EVOLUTION_INSTANCE}"
    headers = {"apikey": EVOLUTION_API_KEY, "Content-Type": "application/json"}
    try:
        response = requests.post(
            url,
            json={"where": {"remoteJid": lid}},
            headers=headers,
            timeout=5,
        )
        if response.ok:
            contacts = response.json()
            if isinstance(contacts, list):
                for c in contacts:
                    jid = c.get("id") or c.get("remoteJid") or ""
                    if "@s.whatsapp.net" in jid:
                        logger.info(f"[RESOLVE] {lid} -> {jid}")
                        return jid
    except Exception as e:
        logger.warning(f"[RESOLVE] Erro: {e}")
    return ""


def _notify_david(push_name: str, lid: str) -> None:
    msg = "LEAD SEM RESPOSTA AUTOMATICA\n"
    msg += "Nome: " + (push_name or "desconhecido") + "\n"
    msg += "JID: " + lid + "\n"
    msg += "Motivo: formato @lid nao suportado\n"
    msg += "Acao: responda manualmente no WhatsApp"
    try:
        _send_raw(DAVID_PHONE, msg)
        logger.info(f"[NOTIFY] David notificado sobre lead {lid}")
    except Exception as e:
        logger.error(f"[NOTIFY] Falha ao notificar David: {e}")


def send_message(phone: str, text: str, push_name: str = "") -> bool:
    try:
        _send_raw(phone, text)
        logger.info(f"[SEND] {phone}: mensagem enviada ({len(text)} chars)")
        return True
    except requests.exceptions.ConnectionError:
        logger.error(f"[SEND] {phone}: erro de conexao ({EVOLUTION_API_URL})")
        return False
    except requests.exceptions.Timeout:
        logger.error(f"[SEND] {phone}: timeout")
        return False
    except requests.exceptions.HTTPError as e:
        status = e.response.status_code
        if status == 400 and "@lid" in phone:
            logger.warning(f"[SEND] {phone}: @lid rejeitado, tentando resolver...")
            resolved = _resolve_lid(phone)
            if resolved:
                try:
                    _send_raw(resolved, text)
                    logger.info(f"[SEND] {resolved} (via resolve): enviado")
                    return True
                except Exception as e2:
                    logger.error(f"[SEND] {resolved}: falha apos resolve: {e2}")
            logger.error(f"[SEND] {phone}: @lid nao resolvivel, notificando David")
            _notify_david(push_name, phone)
            return False
        logger.error(f"[SEND] {phone}: HTTP {status} -- {e.response.text[:200]}")
        return False
    except Exception as e:
        logger.error(f"[SEND] {phone}: erro inesperado: {e}")
        return False
