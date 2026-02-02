from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.hello import router as hello_router
from api.meta import router as meta_router
from config import get_settings

app = FastAPI()

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meta_router)
app.include_router(hello_router)
