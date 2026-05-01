import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

EVOLUTION_API_URL = os.getenv("EVOLUTION_API_URL", "http://localhost:8080")
EVOLUTION_API_KEY = os.getenv("EVOLUTION_API_KEY", "")
EVOLUTION_INSTANCE = os.getenv("EVOLUTION_INSTANCE", "easysite")
DAVID_PHONE = os.getenv("DAVID_PHONE")


def _send_raw(number: str, text: str) -> None:
    url = f"{EVOLUTION_API_URL}/message/sendText/{EVOLUTION_INSTANCE}"
    headers = {"apikey": EVOLUTION_API_KEY, "Content-Type": "application/json"}
    payload = {"number": number, "text": text}
    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()


def _send_quoted(jid: str, message_id: str, text: str) -> None:
    """Envia reply citando a mensagem original pelo ID — funciona com @lid."""
    url = f"{EVOLUTION_API_URL}/message/sendText/{EVOLUTION_INSTANCE}"
    headers = {"apikey": EVOLUTION_API_KEY, "Content-Type": "application/json"}
    payload = {
        "number": jid,
        "text": text,
        "quoted": {
            "key": {
                "remoteJid": jid,
                "fromMe": False,
                "id": message_id,
            }
        },
    }
    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()


def _resolve_lid(lid: str) -> str:
    """Tenta resolver @lid para @s.whatsapp.net via múltiplas queries."""
    lid_number = lid.replace("@lid", "")
    headers = {"apikey": EVOLUTION_API_KEY, "Content-Type": "application/json"}

    # Estratégia 1: findContacts com diferentes formatos de query
    find_url = f"{EVOLUTION_API_URL}/chat/findContacts/{EVOLUTION_INSTANCE}"
    queries = [
        {"where": {"remoteJid": lid}},
        {"where": {"id": lid}},
        {"where": {"remoteJid": lid_number}},
        {"where": {"lid": lid_number}},
    ]
    for q in queries:
        try:
            r = requests.post(find_url, json=q, headers=headers, timeout=5)
            if r.ok:
                contacts = r.json()
                if isinstance(contacts, list):
                    for c in contacts:
                        jid = c.get("id") or c.get("remoteJid") or ""
                        if "@s.whatsapp.net" in jid:
                            logger.info(f"[RESOLVE] {lid} -> {jid} (query={q})")
                            return jid
        except Exception as e:
            logger.debug(f"[RESOLVE] query {q} falhou: {e}")

    # Estratégia 2: buscar todos os contatos e filtrar pelo número do LID
    try:
        r = requests.get(
            f"{EVOLUTION_API_URL}/contacts/getAll/{EVOLUTION_INSTANCE}",
            headers=headers,
            timeout=10,
        )
        if r.ok:
            all_contacts = r.json()
            if isinstance(all_contacts, list):
                for c in all_contacts:
                    cid = str(c.get("id", "")) + str(c.get("remoteJid", ""))
                    if lid_number in cid and "@s.whatsapp.net" in cid:
                        jid = c.get("id") or c.get("remoteJid") or ""
                        logger.info(f"[RESOLVE] {lid} -> {jid} (via getAll)")
                        return jid
    except Exception as e:
        logger.debug(f"[RESOLVE] getAll falhou: {e}")

    return ""


def _notify_david(push_name: str, lid: str, reply_text: str = "", lead_message: str = "") -> None:
    nome = push_name or "desconhecido"
    msg = f"⚠️ LEAD SEM RESPOSTA AUTOMATICA\n"
    msg += f"Nome: {nome}\n"
    if lead_message:
        msg += f"Mensagem: {lead_message}\n"
    msg += f"\nRESPOSTA DO LEO — copie e envie:\n"
    msg += "─────────────────────\n"
    msg += (reply_text or "(Leo nao gerou resposta)") + "\n"
    msg += "─────────────────────"
    try:
        _send_raw(DAVID_PHONE, msg)
        logger.info(f"[NOTIFY] David notificado sobre lead {lid}")
    except Exception as e:
        logger.error(f"[NOTIFY] Falha ao notificar David: {e}")


def send_message(phone: str, text: str, push_name: str = "", message_id: str = "", lead_message: str = "") -> bool:
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

            # Tentativa 1: resolver LID para numero real
            resolved = _resolve_lid(phone)
            if resolved:
                try:
                    _send_raw(resolved, text)
                    logger.info(f"[SEND] {resolved} (via resolve): enviado")
                    return True
                except Exception as e2:
                    logger.error(f"[SEND] {resolved}: falha apos resolve: {e2}")

            # Tentativa 2: quoted reply usando messageId original
            if message_id:
                logger.warning(f"[SEND] {phone}: tentando quoted reply com messageId={message_id}")
                try:
                    _send_quoted(phone, message_id, text)
                    logger.info(f"[SEND] {phone}: quoted reply enviado com sucesso")
                    return True
                except Exception as e3:
                    logger.error(f"[SEND] {phone}: quoted reply falhou: {e3}")

            # Fallback final: notifica David com resposta do Leo pronta
            logger.error(f"[SEND] {phone}: todas estrategias falharam, notificando David")
            _notify_david(push_name, phone, reply_text=text, lead_message=lead_message)
            return False

        logger.error(f"[SEND] {phone}: HTTP {status} -- {e.response.text[:200]}")
        return False
    except Exception as e:
        logger.error(f"[SEND] {phone}: erro inesperado: {e}")
        return False
