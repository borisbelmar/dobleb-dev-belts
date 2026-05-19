---
term: "Context Caching"
definition: "Técnica de optimización que almacena en caché los tokens de contexto reutilizados (como system prompts o archivos de código), reduciendo el costo hasta un 90%."
relatedGuides:
  - white-belt/introduccion-a-la-ia
  - yellow-belt/context-engineering
tags: [ia, llm, pricing, optimizacion, performance]
lastRevision: "2026-05-19"
---

El context caching es una funcionalidad que ofrecen providers como Qwen (DashScope), DeepSeek y otros para reducir costos cuando envías el mismo contexto repetidamente.

## Cómo funciona

Cuando haces una request a un LLM, el modelo necesita "procesar" todo tu input antes de generar una respuesta. Si envías el mismo contexto en múltiples requests (por ejemplo, un system prompt largo o un archivo de código), el provider puede **almacenar el resultado de ese procesamiento** y reutilizarlo en lugar de recomputarlo cada vez.

```
Request 1: [System prompt largo + código base] → Pregunta 1
           ↑ Todo se procesa desde cero → precio normal

Request 2: [System prompt largo + código base] → Pregunta 2
           ↑ El contexto está en caché → tokens cacheados cuestan ~90% menos
```

## Cuándo usarlo

El context caching es especialmente útil cuando trabajas con:

- **System prompts largos:** instrucciones detalladas que no cambian entre conversaciones.
- **Códigobases estables:** archivos de código que envías como contexto pero que no modificas frecuentemente.
- **Documentos de referencia:** especificaciones, documentación o contratos que usas constantemente.

## Cuándo NO usarlo

No tiene sentido si:

- Tu contexto cambia en cada request.
- Haces una sola request (no hay reutilización).
- El contexto es muy corto (el ahorro no justifica la complejidad).

## Ejemplo de ahorro

Sin caching:
```
5000 tokens de contexto × $0.28/M = $0.0014 por request
100 requests = $0.14
```

Con caching (90% de descuento en tokens cacheados):
```
5000 tokens × $0.028/M = $0.00014 por request
100 requests = $0.014
```

**Ahorro: ~$0.126 (90% menos).**

## Ver también

- [Introducción a la IA](/guides/white-belt/introduccion-a-la-ia)
- [Context Engineering](/guides/yellow-belt/context-engineering)
