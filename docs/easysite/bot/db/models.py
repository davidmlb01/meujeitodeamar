import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "easysite.db")


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    conn = get_connection()
    try:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phone TEXT UNIQUE NOT NULL,
                name TEXT,
                company TEXT,
                ramo TEXT,
                cidade TEXT,
                source TEXT DEFAULT 'direct_ad',
                status TEXT DEFAULT 'new',
                last_bot_message_at TEXT,
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lead_id INTEGER NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                timestamp TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (lead_id) REFERENCES leads(id)
            );

            CREATE TABLE IF NOT EXISTS follow_up_queue (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lead_id INTEGER NOT NULL,
                scheduled_at TEXT NOT NULL,
                message_type TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                sent_at TEXT,
                FOREIGN KEY (lead_id) REFERENCES leads(id)
            );

            CREATE TABLE IF NOT EXISTS escalations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lead_id INTEGER NOT NULL,
                reason TEXT NOT NULL,
                pix_code TEXT,
                notified_at TEXT DEFAULT (datetime('now')),
                resolved_at TEXT,
                FOREIGN KEY (lead_id) REFERENCES leads(id)
            );
        """)
        conn.commit()
    finally:
        conn.close()
