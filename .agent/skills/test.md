# Skill: test.md — Verificación activa contra PostgreSQL y endpoints reales

## Propósito
Ejecutar pruebas contra la base de datos real y endpoints reales. No se aceptan mocks de base de datos para validar funcionalidad de integración.

## Reglas estrictas
1. **PostgreSQL real**: Las pruebas de DB corren contra la instancia local (`armendarizestudio`). No se usa SQLite para tests de integración.
2. **Endpoints reales**: Las pruebas E2E corren contra la app real levantada en el puerto correspondiente.
3. **Contratos como oracle**: El contrato OpenAPI define los schemas de respuesta. Cualquier desviación es un fallo.
4. **Sin suposiciones**: Cada prueba setup/teardown deja la DB en un estado conocido.

## Comandos de referencia
```bash
# Verificación de tipos
npx tsc --noEmit

# Pruebas unitarias
npx vitest run

# Pruebas E2E (Playwright)
npx playwright test

# Contrato API (Prism mock)
npx prism mock contracts/openapi.yaml -p 4011

# DB: verificar conexión
psql "postgresql://postgres:postgres@localhost:5432/armendarizestudio" -c "\dt"
```

## Categorías de pruebas
| Tipo | Herramienta | Target | Criterio |
|------|------------|--------|----------|
| Tipos | `tsc --noEmit` | TypeScript compiler | 0 errores |
| Unitarias | Vitest | Funciones puras | 100% branches |
| Integración | Vitest + DB | PostgreSQL real | Queries correctas |
| E2E | Playwright | App completa | Flujos críticos pasan |
| Contrato | Prism | OpenAPI spec | Schemas match |

## Flujo de ejecución
1. Verificar que PostgreSQL está corriendo.
2. Ejecutar `npx tsc --noEmit` — debe ser 0 errores.
3. Ejecutar pruebas unitarias.
4. Ejecutar pruebas de integración contra DB real.
5. Ejecutar E2E si hay cambios en UI o rutas.
6. Reportar resultados con cobertura.

## Prohibiciones
- No usar SQLite como sustituto de PostgreSQL en tests de integración.
- No saltar pruebas de DB "para que sea más rápido".
- No hardcodear IDs de test — usar datos dinámicos.
- No asumir que datos de un test persisten en otro.

## Criterio de salida
- Todos los tipos resueltos.
- Pruebas unitarias pasando.
- Pruebas de integración pasando contra PostgreSQL real.
- E2E pasando para flujos críticos.
- Reporte de cobertura generado.
