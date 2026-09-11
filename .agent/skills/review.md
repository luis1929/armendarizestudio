# Skill: review.md — Auditoría de diff para detectar atajos o código sobrante

## Propósito
Revisar cada diff antes de commit para detectar atajos, código sobrante, violaciones de contrato y deuda técnica que se escape al pipeline.

## Reglas estrictas
1. **Auditar cada archivo tocado**: No se hace commit sin revisar el diff completo.
2. **Detectar contrabando**: Si el diff toca un contrato o introduce un mock, se rechaza.
3. **Código sobrante**: Imports no usados, variables muertas, logs de debug — todo se elimina.
4. **Consistencia**: El código nuevo debe seguir las convenciones del archivo que lo contiene.

## Checklist de revisión
```markdown
### Por cada archivo del diff:
- [ ] ¿Toca algún archivo de contrato? → RECHAZAR
- [ ] ¿Contiene `console.log` de debug? → ELIMINAR
- [ ] ¿Tiene imports no usados? → ELIMINAR
- [ ] ¿Usa `any` como escape? → CORREGIR
- [ ] ¿Mimetiza el estilo del código circundante? → VERIFICAR
- [ ] ¿Tiene TODO/FIXME/HACK sin tracker? → CREAR ISSUE o RESOLVER
- [ ] ¿Depende de datos hardcodeados? → REFACTOR a config o DB
- [ ] ¿Rompe algún tipo existente? → CORREGIR
```

## Flujo de ejecución
1. Ejecutar `git diff --staged` para ver el diff completo.
2. Revisar cada archivo contra el checklist.
3. Si hay violaciones, corregir antes de commit.
4. Si el diff es limpio, aprobar para commit.
5. Documentar decisiones de revisión.

## Severidades
| Nivel | Descripción | Acción |
|-------|-------------|--------|
| CRÍTICO | Toca contrato / rompe tipos | Rechazar y corregir |
| ALTO | Código sobrante / dependencia volátil | Corregir antes de commit |
| MEDIO | Inconsistencia de estilo | Corregir si es trivial |
| BAJO | Oportunidad de refactor | Documentar para futuro |

## Prohibiciones
- No hacer commit con diff que contenga contrabando de contrato.
- No aprobar código que use `any` sin justificación documentada.
- No ignorar `console.log` de debug en código de producción.
- No omitir archivos del diff por ser "pequeños".

## Criterio de salida
- Diff revisado contra checklist completo.
- Cero violaciones CRÍTICO o ALTO.
- Código consistente con convenciones del proyecto.
- Commit listo para push.
