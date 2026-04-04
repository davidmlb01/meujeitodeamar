import logging
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

from db.queries import create_lead_external, save_message, update_last_bot_message
from claude_client import get_response
from router import get_journey_context
from whatsapp_client import send_message

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/lead", tags=["leads"])


class LandingPageLead(BaseModel):
    name: str
    phone: str
    ramo: str


class ProspectingLead(BaseModel):
    company: str
    phone: str
    ramo: str
    cidade: str


def _trigger_initial_message(lead: dict):
    """Gera e envia a mensagem inicial para leads externos (Jornadas B e C)."""
    journey_context = get_journey_context(lead)
    reply = get_response([], journey_context)
    save_message(lead["id"], "assistant", reply)
    update_last_bot_message(lead["id"])
    send_message(lead["phone"], reply)
    logger.info(f"[OUTBOUND] {lead['phone']} — mensagem inicial enviada (source={lead['source']})")


@router.post("/landing")
async def create_landing_lead(payload: LandingPageLead):
    lead = create_lead_external(
        phone=payload.phone,
        name=payload.name,
        source="landing_page",
        ramo=payload.ramo,
    )
    _trigger_initial_message(lead)
    return {"status": "ok", "lead_id": lead["id"]}


@router.post("/prospecting")
async def create_prospecting_lead(payload: ProspectingLead):
    lead = create_lead_external(
        phone=payload.phone,
        name="",
        source="prospecting",
        company=payload.company,
        ramo=payload.ramo,
        cidade=payload.cidade,
    )
    _trigger_initial_message(lead)
    return {"status": "ok", "lead_id": lead["id"]}


@router.post("/prospecting/batch")
async def create_prospecting_batch(payload: list[ProspectingLead]):
    results = []
    for item in payload:
        lead = create_lead_external(
            phone=item.phone,
            name="",
            source="prospecting",
            company=item.company,
            ramo=item.ramo,
            cidade=item.cidade,
        )
        _trigger_initial_message(lead)
        results.append({"lead_id": lead["id"], "phone": item.phone})
    return {"status": "ok", "created": len(results), "leads": results}
