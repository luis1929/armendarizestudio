from fastapi import APIRouter, Depends
from typing import List
from api_backend.schemas.models import ProjectBase, ProjectCreate, ProjectResponse

router = APIRouter(
    prefix="/api/v1/proyectos",
    tags=["proyectos"],
    responses={404: {"description": "No encontrado"}},
)


@router.get(
    "",
    response_model=List[ProjectResponse],
    summary="Listar todos los proyectos",
    description="Obtiene una lista de proyectos",
)
@router.get(
    "/",
    response_model=List[ProjectResponse],
    summary="Listar todos los proyectos (con barra)",
    description="Obtiene una lista de proyectos con barra final",
)
def listar_proyectos():
    """Obtener todos los proyectos"""
    return []


@router.get(
    "/{proyecto_id}",
    response_model=ProjectResponse,
    summary="Obtener proyecto por ID",
    description="Obtiene los detalles de un proyecto específico",
)
def obtener_proyecto(proyecto_id: str):
    """Obtener un proyecto por su ID"""
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Proyecto no encontrado")