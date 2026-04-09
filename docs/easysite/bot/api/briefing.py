import os
import logging
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

from whatsapp_client import send_message

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/briefing", tags=["briefing"])

DAVID_PHONE = os.getenv("DAVID_PHONE", "")


class BriefingSubmission(BaseModel):
    # Q01 — Empresa
    nome_empresa: str
    slogan: Optional[str] = None
    endereco: Optional[str] = None

    # Q02 — Nicho e descricao
    nicho_descricao: str

    # Q03 — Objetivo principal (select)
    objetivo: str

    # Q04 — Cliente ideal
    cliente_ideal: str

    # Q05 — Servicos/produtos
    servicos: str

    # Q06 — Diferenciais
    diferenciais: str

    # Q07 — Tom do site (radio)
    tom: str

    # Q08 — Cores e logo
    cores: Optional[str] = None
    tem_logo: Optional[str] = None

    # Q09 — Secoes (multi-select)
    secoes: Optional[List[str]] = None
    secoes_outras: Optional[str] = None

    # Q10 — CTA principal
    cta_acao: Optional[str] = None
    cta_contato: Optional[str] = None

    # Seus dados
    nome_completo: str
    email: str
    telefone: str


def _line(label: str, value: Optional[str]) -> Optional[str]:
    if value and value.strip():
        return f"{label}: {value.strip()}"
    return None


def _format_notification(p: BriefingSubmission) -> str:
    lines = ["*Novo projeto chegou!*", ""]

    # Contato
    lines.append(f"Cliente: {p.nome_completo}")
    lines.append(f"Telefone: {p.telefone}")
    lines.append(f"Email: {p.email}")
    lines.append("")

    # Empresa
    lines.append(f"Empresa: {p.nome_empresa}")
    if p.slogan:
        lines.append(f"Slogan: {p.slogan}")
    if p.endereco:
        lines.append(f"Endereco: {p.endereco}")
    lines.append("")

    # Briefing
    lines.append(f"Nicho: {p.nicho_descricao}")
    lines.append(f"Objetivo: {p.objetivo}")
    lines.append(f"Tom: {p.tom}")

    if p.cores or p.tem_logo:
        cores_logo = []
        if p.cores:
            cores_logo.append(f"Cores: {p.cores}")
        if p.tem_logo:
            cores_logo.append(f"Logo: {p.tem_logo}")
        lines.append(" | ".join(cores_logo))

    if p.secoes:
        lines.append(f"Secoes: {', '.join(p.secoes)}")
    if p.secoes_outras:
        lines.append(f"Secoes extras: {p.secoes_outras}")

    if p.cta_acao:
        cta = f"CTA: {p.cta_acao}"
        if p.cta_contato:
            cta += f" ({p.cta_contato})"
        lines.append(cta)

    lines.append("")
    lines.append(f"Cliente ideal: {p.cliente_ideal}")
    lines.append("")
    lines.append(f"Servicos: {p.servicos}")
    lines.append("")
    lines.append(f"Diferenciais: {p.diferenciais}")

    return "\n".join(lines)


@router.post("/webhook")
async def briefing_webhook(payload: BriefingSubmission):
    """
    Recebe submissao do formulario de briefing (Vercel/Next.js).
    Envia notificacao WhatsApp para David com todos os dados do cliente.
    """
    if not DAVID_PHONE:
        logger.warning("[BRIEFING] DAVID_PHONE nao configurado — notificacao nao enviada")
        return {"status": "no_david_phone"}

    msg = _format_notification(payload)
    send_message(DAVID_PHONE, msg)

    logger.info(f"[BRIEFING] Notificacao enviada — cliente: {payload.nome_completo} ({payload.telefone})")
    return {"status": "ok"}
