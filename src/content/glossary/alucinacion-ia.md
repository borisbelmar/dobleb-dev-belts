---
term: "Alucinación (IA)"
definition: "Cuando un modelo de lenguaje genera información incorrecta o inventada presentándola con confianza como si fuera un hecho real."
relatedGuides:
  - white-belt/introduccion-a-la-ia
tags: [ia, llm, limitaciones]
lastRevision: "2026-05-19"
---

La **alucinación** es uno de los problemas fundamentales de los LLMs. Ocurre cuando el modelo genera texto que suena plausible pero es factualmente incorrecto: citas de papers inexistentes, APIs que no existen, datos históricos falsos, código que no compila.

Esto sucede porque los LLMs no "saben" cosas — predicen patrones de texto. Si un patrón parece coherente estadísticamente, lo generan aunque sea falso.

**Cómo mitigar:**
- Siempre verificar información con fuentes oficiales
- Pedir al modelo que cite fuentes (y verificar que existan)
- No confiar en datos numéricos o fechas sin confirmar
- Usar modelos con acceso a búsqueda en tiempo real cuando sea posible

## Ver también

- [Introducción a la IA: LLMs, asistentes y cómo usarlos bien](/guides/white-belt/introduccion-a-la-ia)
