# Skill: build.md — Implementación paso a paso

## Propósito
Ejecutar cada tarea del plan con implementación limpia, sin tocar contratos y sin introducir mocks volátiles. Código de producción real, verificable y consistente con el stack del proyecto.

## Reglas estrictas
1. **Contratos intocables**: No se modifican `contract.ts`, `prisma.config.ts`, `prisma/schema.prisma` ni `contracts/openapi.yaml`.
2. **Sin mocks volátiles**: No se crean datos hardcodeados temporales en código de producción. Si se necesita mock, va en archivos de test.
3. **Una tarea a la vez**: Se implementa una tarea, se verifica, y solo después se pasa a la siguiente.
4. **Convenciones existentes**: Se mimetiza el estilo del código circundante (imports, naming, patterns).
5. **Sin dependencias nuevas**: No se instalan paquetes sin justificación explícita y aprobación.

## Flujo de ejecución
1. Leer la tarea actual del plan.
2. Identificar archivos a modificar.
3. Leer el contexto de cada archivo antes de editar.
4. Implementar el cambio mínimo necesario.
5. Verificar que el código compila (`npx tsc --noEmit`).
6. Marcar tarea como `[COMPLETADA]`.

## Prohibiciones absolutas
- Modificar archivos en `src/prisma/` (excepto tipos derivados del contrato).
- Crear archivos `.env` o `.env.local` con credenciales reales.
- Hacer commits parciales sin verificar compilación.
- Añadir `console.log` de debug en código de producción.
- Usar `any` como escape de tipado — resolver el tipo correctamente.

## Stack del proyecto
- **Frontend**: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript
- **Backend**: FastAPI + Python
- **DB**: PostgreSQL 14 + Prisma v8 RC (contract-based)
- **Auth**: NextAuth.js
- **Testing**: Vitest + Playwright

## Criterio de salida
- Tarea implementada y compilando sin errores.
- Cero archivos de contrato modificados.
- Cero mocks volátiles en código de producción.
- Código consistente con el stack existente.
