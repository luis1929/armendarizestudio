from fastapi import APIRouter, Depends
from typing import List
from api_backend.schemas.models import ServiceResponse

router = APIRouter(
    prefix="/api/v1/servicios",
    tags=["servicios"],
    responses={404: {"description": "No encontrado"}},
)


@router.get(
    "",
    response_model=List[ServiceResponse],
    summary="Listar todos los servicios",
    description="Obtiene una lista de servicios disponibles",
)
def listar_servicios():
    """Obtener todos los servicios"""
    return []