from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional


# ===== PROJECTS =====

class ProjectBase(BaseModel):
    titulo: str = Field(..., title="Título del proyecto", description="Título del proyecto")
    descripcion: Optional[str] = Field(
        None, title="Descripción detallada", description="Descripción detallada"
    )
    categoria: Optional[str] = Field(
        None, title="Categoría del proyecto", description="Categoría del proyecto"
    )
    ubicacion: Optional[str] = Field(
        None, title="Ubicación geográfica", description="Ubicación geográfica"
    )
    imagenes: Optional[List[str]] = Field(
        None, title="Lista de URLs de imágenes", description="Lista de URLs de imágenes"
    )
    fecha_creacion: Optional[datetime] = Field(
        None, title="Fecha de creación del proyecto", description="Fecha de creación del proyecto"
    )


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: str = Field(..., title="Identificador único del proyecto", description="Identificador único del proyecto")
    fecha_creacion: datetime = Field(
        default_factory=datetime.utcnow, title="Fecha de creación", description="Fecha de creación"
    )

    class Config:
        from_attributes = True


# ===== SERVICES =====

class ServiceResponse(BaseModel):
    id: str = Field(..., title="Identificador único del servicio", description="Identificador único del servicio")
    nombre: str = Field(..., title="Nombre del servicio", description="Nombre del servicio")
    descripcion: str = Field(..., title="Descripción del servicio", description="Descripción del servicio")

    class Config:
        from_attributes = True


# ===== CONTACT / COTIZATION =====

class ContactRequest(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100, title="Nombre", description="Nombre del contacto")
    email: str = Field(..., min_length=5, max_length=255, title="Email", description="Dirección de email")
    telefono: Optional[str] = Field(
        None, max_length=20, title="Teléfono", description="Número de teléfono"
    )
    mensaje: str = Field(..., min_length=1, title="Mensaje", description="Mensaje o solicitud")
    tipo_servicio: Optional[str] = Field(
        None, max_length=100, title="Tipo de servicio", description="Tipo de servicio consultado"
    )


class ContactResponse(BaseModel):
    id: str = Field(..., title="ID de solicitud", description="ID de la solicitud de contacto")
    status: str = Field(
        default="pending", title="Estado", description="Estado de la solicitud"
    )
    timestamp: datetime = Field(
        default_factory=datetime.utcnow, title="Marca de tiempo", description="Marca de tiempo"
    )

    class Config:
        from_attributes = True


# ===== APPOINTMENTS / CITAS =====

class AppointmentCreate(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100, title="Nombre", description="Nombre del solicitante")
    email: str = Field(..., min_length=5, max_length=255, title="Email", description="Dirección de email")
    fecha_cita: datetime = Field(..., title="Fecha de la cita", description="Fecha y hora de la cita")
    notas: Optional[str] = Field(
        None, title="Notas", description="Notas adicionales sobre la cita"
    )


class AppointmentResponse(BaseModel):
    id: str = Field(..., title="ID de cita", description="ID único de la cita")
    nombre: str = Field(..., title="Nombre", description="Nombre del solicitante")
    email: str = Field(..., title="Email", description="Dirección de email")
    fecha_cita: datetime = Field(..., title="Fecha de la cita", description="Fecha de la cita")
    notas: Optional[str] = Field(None, title="Notas", description="Notas adicionales")
    status: str = Field(default="pending", title="Estado", description="Estado de la cita")
    creado_en: datetime = Field(
        default_factory=datetime.utcnow, title="Fecha de creación", description="Cuándo fue creado"
    )

    class Config:
        from_attributes = True