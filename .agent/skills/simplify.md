# Skill: simplify.md — Limpieza y refactorización sin romper pruebas ni contratos

## Propósito
Reducir complejidad, eliminar duplicación y optimizar código sin romper pruebas existentes ni tocar contratos. Cada cambio debe ser un beneficio neto verificable.

## Reglas estrictas
1. **No romper pruebas**: Cada refactor se valida con `npx tsc --noEmit` y `npx vitest run` antes y después.
2. **No tocar contratos**: La refactorización es exclusivamente de código de aplicación.
3. **Cambios pequeños**: Un refactor por commit. No combinar refactor con feature.
4. **Reversible**: Cada cambio debe ser fácil de revertir si algo falla.

## Oportunidades de simplificación
| Señal | Acción |
|-------|--------|
| Código duplicado (3+ veces) | Extraer función o constante |
| Función > 50 líneas | Dividir en funciones auxiliares |
| Archivo > 300 líneas | Evaluar si se puede dividir |
| Tipos repetidos | Consolidar en tipo compartido |
| Imports circulares | Reorganizar módulos |
| `any` explícito | Inferir o definir tipo correcto |
| `console.log` en prod | Eliminar o migrar a logger |
| Variables no usadas | Eliminar |

## Flujo de ejecución
1. Identificar la oportunidad de simplificación.
2. Ejecutar pruebas antes del cambio (baseline).
3. Hacer el cambio incremental.
4. Ejecutar pruebas después del cambio.
5. Si las pruebas pasan, commit. Si no, revertir.

## Métricas de éxito
- **Antes**: Líneas de código, complejidad ciclomática, duplicación.
- **Después**: Menos líneas, menor complejidad, cero duplicación.
- **Invariant**: Cero pruebas rotas, cero contratos tocados.

## Prohibiciones
- No refactorizar y añadir features en el mismo commit.
- No "simplificar" cambiando el comportamiento observable.
- No eliminar validaciones de seguridad "por limpieza".
- No refactorizar código de contratos bajo ninguna circunstancia.

## Criterio de salida
- Código más limpio y legible.
- Pruebas pasando (las mismas que antes del cambio).
- Contratos intactos.
- Commit separado del feature correspondiente.
