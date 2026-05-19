---
term: "Mixture of Experts (MoE)"
definition: "Arquitectura de modelo de lenguaje donde solo una fracción de los parámetros se activa por cada request, permitiendo modelos enormes con costos de inference eficientes."
relatedGuides:
  - white-belt/introduccion-a-la-ia
tags: [ia, llm, arquitectura, modelos]
lastRevision: "2026-05-19"
---

Mixture of Experts (MoE) es una arquitectura de red neuronal donde el modelo está dividido en múltiples "expertos" especializados, y un **router** decide qué expertos activar para cada input específico.

## La analogía

Imagina un hospital con 100 especialistas. En un modelo tradicional (denso), todos los doctores evalúan a cada paciente. En un modelo MoE, un triage decide qué 5-10 especialistas son relevantes para cada caso. El resultado es el mismo (o mejor), pero mucho más eficiente.

## Cómo funciona

```
Input → Router → Experto A (activo)
               → Experto C (activo)
               → Experto F (activo)
               → Experto B (inactivo)
               → Experto D (inactivo)
               → ...
```

Solo los expertos seleccionados procesan el input. Los demás permanecen inactivos, ahorrando cómputo.

## Ejemplos reales

| Modelo | Parámetros totales | Parámetros activos | Arquitectura |
|--------|-------------------|-------------------|--------------|
| GLM-5.1 | 744B | ~32B | MoE |
| Qwen3-235B-A22B | 235B | 22B | MoE |
| Kimi K2.5 | 1T (1000B) | ~2.8B | MoE |
| GPT-4 | ~1.8T (estimado) | ~280B (estimado) | MoE |

## Ventajas

- **Modelos más grandes:** puedes tener billones de parámetros sin que el costo de inference se dispare.
- **Eficiencia:** solo se activa una fracción del modelo por request.
- **Especialización:** diferentes expertos pueden especializarse en diferentes tareas (código, matemáticas, lenguaje).

## Desventajas

- **Más complejo de entrenar:** el balance entre expertos es delicado.
- **Más memoria:** necesitas cargar todo el modelo en memoria, aunque solo uses una parte.
- **Deployment más pesado:** requiere más VRAM que un modelo denso del mismo tamaño activo.

## Ver también

- [Introducción a la IA](/guides/white-belt/introduccion-a-la-ia)
