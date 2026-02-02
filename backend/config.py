from __future__ import annotations

import os
from functools import lru_cache
from typing import List


def _coerce_async_database_url(database_url: str) -> str:
    if database_url.startswith("postgres://"):
        return database_url.replace("postgres://", "postgresql+asyncpg://", 1)
    if database_url.startswith("postgresql://") and "+asyncpg" not in database_url:
        return database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return database_url


class Settings:
    def __init__(self) -> None:
        cors_origins_env = os.getenv("CORS_ORIGINS", "")
        self.cors_origins: List[str] = [
            origin.strip() for origin in cors_origins_env.split(",") if origin.strip()
        ]
        raw_database_url = os.getenv(
            "DATABASE_URL",
            "postgresql+asyncpg://postgres:postgres@localhost:5432/app",
        )
        self.database_url: str = _coerce_async_database_url(raw_database_url)
        self.db_echo: bool = os.getenv("DB_ECHO", "false").lower() in (
            "1",
            "true",
            "yes",
            "on",
        )
        self.db_pool_size: int = int(os.getenv("DB_POOL_SIZE", "5"))
        self.db_max_overflow: int = int(os.getenv("DB_MAX_OVERFLOW", "10"))


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
