# Skill: spec.md — Auditor de requerimientos y lectura de contratos

## Propósito
Interpretar especificaciones, contratos y requisitos como fuente de verdad inmutable. Ninguna decisión de código se toma sin referenciar el contrato vigente.

## Reglas estrictas
1. **Contratos inmutables**: `contracts/openapi.yaml`, `prisma/schema.prisma`, `src/prisma/contract.ts`, `prisma.config.ts` y `prisma.config.ts` no se modifican bajo ninguna circunstancia.
2. **Fuente única**: Todo requisito se extrae del contrato. Si el contrato no lo define, se flagge como `[SIN ESPEC]` y se escala.
3. **Sin interpretaciones libres**: No se agregan funcionalidades que no estén en el contrato. Si se detecta ambigüedad, se pregunta antes de avanzar.
4. **Trazabilidad**: Cada tarea enlaza a su artefacto de contrato correspondiente (ej: `User → contract.ts:4-15`).

## Flujo de ejecución
1. Leer el contrato relevante (OpenAPI, Prisma schema, contract.ts).
2. Extraer los modelos, endpoints y restricciones de tipo.
3. Listar dependencias entre modelos.
4. Validar que el plan propuesto cumple el contrato al 100%.
5. Marcar con `[VERIFICADO]` cada requisito cubierto.

## Artefactos de entrada
- `contracts/openapi.yaml`
- `prisma/schema.prisma`
- `src/prisma/contract.ts`
- `prisma.config.ts`

## Criterio de salida
- Todos los requisitos mapeados a artefactos de contrato.
- Cero requisitos `[SIN ESPEC]` sin escalar.
- Plan aprobado sin desvíos de alcance.
