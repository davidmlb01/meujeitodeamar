import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

EVOLUTION_API_URL = os.getenv("EVOLUTION_API_URL", "http://localhost:8080")
EVOLUTION_API_KEY = os.getenv("EVOLUTION_API_KEY", "")
EVOLUTION_INSTANCE = os.getenv("EVOLUTION_INSTANCE", "easysite")


def send_message(phone: str, text: str) -> bool:
    """
    Envia mensagem de texto via Evolution API.
    Retorna True se enviado com sucesso, False caso contrário.
    """
    url = f"{EVOLUTION_API_URL}/message/sendText/{EVOLUTION_INSTANCE}"
    headers = {
        "apikey": EVOLUTION_API_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "number": phone,
        "text": text,
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        logger.info(f"[SEND] {phone}: mensagem enviada ({len(text)} chars)")
        return True
    except requests.exceptions.ConnectionError:
        logger.error(f"[SEND] {phone}: erro de conexão com Evolution API ({EVOLUTION_API_URL})")
        return False
    except requests.exceptions.Timeout:
        logger.error(f"[SEND] {phone}: timeout ao enviar mensagem")
        return False
    except requests.exceptions.HTTPError as e:
        logger.error(f"[SEND] {phone}: HTTP {e.response.status_code} — {e.response.text[:200]}")
        return False
    except Exception as e:
        logger.error(f"[SEND] {phone}: erro inesperado — {e}")
        return False
