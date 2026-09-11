from fastapi import FastAPI
from fastapi.responses import FileResponse
from pathlib import Path

# Routers de negocio
from api_backend.api.routers.proyectos import router as proyectos_router
from api_backend.api.routers.servicios import router as servicios_router
from api_backend.api.routers.contacto import router as contacto_router
from api_backend.api.routers.citas import router as citas_router


app = FastAPI(title="Armendáriz Estudio API", version="1.0.0")

# Health check
@app.get("/health", tags=["Health"], operation_id="get_health_status")
async def health_check():
    """Returns the health status of the service"""
    return {"status": "ok"}


# Montar routers de negocio
app.include_router(proyectos_router)
app.include_router(servicios_router)
app.include_router(contacto_router)
app.include_router(citas_router)

SPEC_PATH = Path(__file__).parent / "contracts" / "openapi.yaml"


@app.get("/openapi.json", include_in_schema=False)
async def openapi_spec():
    """Serve the OpenAPI specification as JSON"""
    import yaml
    with open(SPEC_PATH, "r") as f:
        spec = yaml.safe_load(f)
    return spec


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)