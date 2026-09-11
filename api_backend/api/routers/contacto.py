from fastapi import APIRouter, HTTPException
from api_backend.schemas.models import ContactRequest, ContactResponse

router = APIRouter(
    prefix="/api/v1/contacto",
    tags=["contacto"],
    responses={400: {"description": "Solicitud inválida"}, 422: {"description": "Error de validación"}},
)


@router.post(
    "",
    response_model=ContactResponse,
    summary="Enviar solicitud de contacto/cotización",
    description="Recibe una solicitud de contacto y retorna un ID para seguimiento",
)
def crear_solicitud_contacto(datos: ContactRequest):
    """Procesar solicitud de contacto"""
    return ContactResponse(
        id="temp-id",
        status="recibido",
        timestamp="2024-01-01T00:00:00",
    )