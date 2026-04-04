import os
import logging
from pathlib import Path

import anthropic
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

_client = None
_system_prompt = None

MODEL = "claude-haiku-4-5-20251001"
MAX_TOKENS = 1024
CLASSIFY_MAX_TOKENS = 10


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))
    return _client


def _get_system_prompt() -> str:
    global _system_prompt
    if _system_prompt is None:
        prompt_path = Path(__file__).parent / "system-prompt.md"
        if prompt_path.exists():
            _system_prompt = prompt_path.read_text(encoding="utf-8")
            logger.info(f"System prompt carregado ({len(_system_prompt)} chars)")
        else:
            logger.warning("system-prompt.md não encontrado — usando prompt padrão")
            _system_prompt = (
                "Você é Leo, atendente comercial da EasySite. "
                "Seja simpático, direto e focado em vender sites profissionais por R$397."
            )
    return _system_prompt


def get_response(conversation_history: list[dict], journey_context: str = "") -> str:
    """
    Retorna resposta do Leo para o histórico de conversa fornecido.
    journey_context: contexto adicional da jornada (A, B ou C).
    """
    client = _get_client()
    system = _get_system_prompt()

    if journey_context:
        system = f"{system}\n\n---\n{journey_context}"

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            system=system,
            messages=conversation_history,
        )
        return response.content[0].text
    except anthropic.APIConnectionError:
        logger.error("Claude API: erro de conexão")
        return "Desculpe, estou com uma instabilidade técnica. Tente novamente em instantes."
    except anthropic.RateLimitError:
        logger.error("Claude API: rate limit atingido")
        return "Estou recebendo muitas mensagens agora. Pode repetir em alguns segundos?"
    except anthropic.APIStatusError as e:
        logger.error(f"Claude API: status {e.status_code} — {e.message}")
        return "Ocorreu um erro técnico. Nossa equipe já foi notificada."


def classify_pix(message: str) -> bool:
    """
    Usa Claude para confirmar se a mensagem é um comprovante/confirmação de PIX.
    Retorna True se for PIX, False caso contrário.
    """
    client = _get_client()
    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=CLASSIFY_MAX_TOKENS,
            system=(
                "Você classifica mensagens. Responda APENAS com SIM ou NAO. "
                "SIM se a mensagem indica pagamento PIX realizado ou envio de comprovante. "
                "NAO para qualquer outra coisa."
            ),
            messages=[{"role": "user", "content": message}],
        )
        answer = response.content[0].text.strip().upper()
        return answer.startswith("SIM")
    except Exception as e:
        logger.error(f"classify_pix error: {e}")
        return False
