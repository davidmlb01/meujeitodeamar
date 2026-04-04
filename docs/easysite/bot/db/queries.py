import sqlite3
from datetime import datetime
from typing import Optional
from .models import get_connection


# ─── Leads ────────────────────────────────────────────────────────────────────

def get_or_create_lead(phone: str, name: str = "", source: str = "direct_ad", **kwargs) -> dict:
    conn = get_connection()
    try:
        row = conn.execute("SELECT * FROM leads WHERE phone = ?", (phone,)).fetchone()
        if row:
            if name and not row["name"]:
                conn.execute(
                    "UPDATE leads SET name = ?, updated_at = datetime('now') WHERE phone = ?",
                    (name, phone),
                )
                conn.commit()
            return dict(row)

        conn.execute(
            """INSERT INTO leads (phone, name, source, company, ramo, cidade)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (
                phone,
                name,
                source,
                kwargs.get("company"),
                kwargs.get("ramo"),
                kwargs.get("cidade"),
            ),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM leads WHERE phone = ?", (phone,)).fetchone()
        return dict(row)
    finally:
        conn.close()


def create_lead_external(phone: str, name: str, source: str, **kwargs) -> dict:
    conn = get_connection()
    try:
        existing = conn.execute("SELECT * FROM leads WHERE phone = ?", (phone,)).fetchone()
        if existing:
            return dict(existing)

        conn.execute(
            """INSERT INTO leads (phone, name, source, company, ramo, cidade)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (
                phone,
                name,
                source,
                kwargs.get("company"),
                kwargs.get("ramo"),
                kwargs.get("cidade"),
            ),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM leads WHERE phone = ?", (phone,)).fetchone()
        return dict(row)
    finally:
        conn.close()


def get_lead_by_id(lead_id: int) -> Optional[dict]:
    conn = get_connection()
    try:
        row = conn.execute("SELECT * FROM leads WHERE id = ?", (lead_id,)).fetchone()
        return dict(row) if row else None
    finally:
        conn.close()


def update_lead_status(lead_id: int, status: str):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE leads SET status = ?, updated_at = datetime('now') WHERE id = ?",
            (status, lead_id),
        )
        conn.commit()
    finally:
        conn.close()


def update_last_bot_message(lead_id: int):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE leads SET last_bot_message_at = datetime('now'), updated_at = datetime('now') WHERE id = ?",
            (lead_id,),
        )
        conn.commit()
    finally:
        conn.close()


# ─── Conversations ─────────────────────────────────────────────────────────────

def save_message(lead_id: int, role: str, content: str):
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO conversations (lead_id, role, content) VALUES (?, ?, ?)",
            (lead_id, role, content),
        )
        conn.commit()
    finally:
        conn.close()


def get_conversation_history(lead_id: int, limit: int = 20) -> list[dict]:
    conn = get_connection()
    try:
        rows = conn.execute(
            """SELECT role, content FROM conversations
               WHERE lead_id = ?
               ORDER BY id DESC LIMIT ?""",
            (lead_id, limit),
        ).fetchall()
        return [{"role": r["role"], "content": r["content"]} for r in reversed(rows)]
    finally:
        conn.close()


# ─── Follow-up Queue ──────────────────────────────────────────────────────────

def insert_follow_up(lead_id: int, scheduled_at: str, message_type: str):
    conn = get_connection()
    try:
        conn.execute(
            """INSERT INTO follow_up_queue (lead_id, scheduled_at, message_type)
               VALUES (?, ?, ?)""",
            (lead_id, scheduled_at, message_type),
        )
        conn.commit()
    finally:
        conn.close()


def get_pending_follow_ups(now_iso: str) -> list[dict]:
    conn = get_connection()
    try:
        rows = conn.execute(
            """SELECT * FROM follow_up_queue
               WHERE scheduled_at <= ? AND status = 'pending'
               ORDER BY scheduled_at ASC""",
            (now_iso,),
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def mark_follow_up_sent(follow_up_id: int):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE follow_up_queue SET status = 'sent', sent_at = datetime('now') WHERE id = ?",
            (follow_up_id,),
        )
        conn.commit()
    finally:
        conn.close()


def cancel_pending_follow_ups(lead_id: int):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE follow_up_queue SET status = 'cancelled' WHERE lead_id = ? AND status = 'pending'",
            (lead_id,),
        )
        conn.commit()
    finally:
        conn.close()


# ─── Escalations ──────────────────────────────────────────────────────────────

def create_escalation(lead_id: int, reason: str, pix_code: str = None) -> dict:
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO escalations (lead_id, reason, pix_code) VALUES (?, ?, ?)",
            (lead_id, reason, pix_code),
        )
        conn.commit()
        row = conn.execute(
            "SELECT * FROM escalations WHERE lead_id = ? ORDER BY id DESC LIMIT 1",
            (lead_id,),
        ).fetchone()
        return dict(row)
    finally:
        conn.close()


def get_escalation_by_code(pix_code: str) -> Optional[dict]:
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT * FROM escalations WHERE pix_code = ? ORDER BY id DESC LIMIT 1",
            (pix_code,),
        ).fetchone()
        return dict(row) if row else None
    finally:
        conn.close()


def mark_escalation_resolved(escalation_id: int):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE escalations SET resolved_at = datetime('now') WHERE id = ?",
            (escalation_id,),
        )
        conn.commit()
    finally:
        conn.close()
