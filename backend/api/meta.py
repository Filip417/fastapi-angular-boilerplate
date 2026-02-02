from fastapi import APIRouter
from sqlalchemy import text

from db import engine

router = APIRouter()


@router.get("/")
def root():
    return {"status": "ok"}


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/health/db")
async def health_db():
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            value = result.scalar_one()
        return {"status": "ok", "db": "connected", "value": value}
    except Exception as exc:
        return {"status": "error", "db": "disconnected", "detail": str(exc)}
