from fastapi import APIRouter

router = APIRouter()


@router.get("/api/v1/hello")
def hello():
    return {"message": "Hello from FastAPI backend"}
