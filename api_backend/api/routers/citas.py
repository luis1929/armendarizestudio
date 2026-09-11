from typing import List
from fastapi import APIRouter, HTTPException
from api_backend.schemas.models import AppointmentCreate, AppointmentResponse

router = APIRouter(
    prefix="/api/v1/citas",
    tags=["citas"],
    responses={404: {"description": "Cita no encontrada"}, 400: {"description": "Datos inválidos"}},
)


@router.post(
    "",
    response_model=AppointmentResponse,
    summary="Programar una nueva cita",
    description="Reserva una cita con el estudio y retorna los detalles",
)
def crear_cita(datos: AppointmentCreate):
    """Programar nueva cita"""
    return AppointmentResponse(
        id="temp-id",
        nombre=datos.nombre,
        email=datos.email,
        fecha_cita=datos.fecha_cita,
        notas=datos.notas,
        status="agendada",
    )


@router.get(
    "",
    response_model=List[AppointmentResponse],
    summary="Listar todas las citas",
    description="Obtiene una lista de todas las citas programadas",
)
def listar_citas():
    """Listar todas las citas"""
    return []


@router.get(
    "/{cita_id}",
    response_model=AppointmentResponse,
    summary="Obtener cita por ID",
    description="Recupera los detalles de una cita existente",
)
def obtener_cita(cita_id: str):
    """Obtener cita por ID"""
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Cita no encontrada")