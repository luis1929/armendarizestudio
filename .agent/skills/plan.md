# Skill: plan.md — Desglose atómico de tareas técnicas

## Propósito
Descomponer requisitos aprobados en tareas atómicas, ordenadas y sin desvíos de alcance. Cada tarea es una unidad de trabajo acotada que se puede implementar y verificar de forma independiente.

## Reglas estrictas
1. **Atomicidad**: Cada tarea produce un archivo o cambio verificable. Si una tarea toca más de 3 archivos, se divide.
2. **Sin desvíos**: Cada tarea se audita contra el contrato. Si el plan introduce algo no solicitado, se elimina.
3. **Dependencias explícitas**: Cada tarea declara sus prerequisitos. No hay dependencias implícitas.
4. **Estimación realista**: Cada tarea tiene un peso relativo (S/M/L). Tareas XL se dividen obligatoriamente.

## Formato de tarea
```markdown
### T-[NOMBRE] — Descripción corta
- **Contrato**: Referencia al artefacto (ej: `contract.ts:4-15`)
- **Depende de**: `[T-ANTERIOR]` o `ninguna`
- **Archivos a tocar**: lista explícita
- **Verificación**: comando o criterio de aceptación
- **Peso**: S | M | L
```

## Flujo de ejecución
1. Tomar los requisitos aprobados de `spec.md`.
2. Descomponer en tareas atómicas.
3. Ordenar por dependencias (topological sort).
4. Verificar que cada tarea cumple contrato.
5. Generar checklist final.

## Prohibiciones
- No crear tareas que modifiquen contratos.
- No crear tareas que añadan dependencias nuevas sin justificación.
- No saltar verificaciones entre tareas.
- No agrupar implementación y testing en la misma tarea.

## Criterio de salida
- Cada requisito cubierto por al menos una tarea.
- Cada tarea tiene verificación definida.
- Grafo de dependencias sin ciclos.
- Checklist completo y ordenado.
