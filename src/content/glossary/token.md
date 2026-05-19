---
term: "Token"
definition: "La unidad básica de texto que procesan los modelos de lenguaje (LLMs). Equivale aproximadamente a ¾ de una palabra en inglés o ~1.5 caracteres en español."
relatedGuides:
  - white-belt/introduccion-a-la-ia
tags: [ia, llm, pricing, fundamentos]
lastRevision: "2026-05-19"
---

Un token es la forma en que los LLMs "ven" el texto. Los modelos no procesan palabras completas, sino fragmentos de texto que pueden ser palabras, sílabas o incluso caracteres individuales.

Por ejemplo, la frase "El gato está sobre la mesa" se tokeniza aproximadamente así:

```
["El", " gato", " está", " sobre", " la", " mesa"] → 6 tokens
```

## Por qué importa

Los LLMs cobran por token, no por palabra. Entender esta diferencia te ayuda a:

- **Estimar costos:** 1000 tokens ≈ 75 palabras en inglés ≈ 1-2 páginas de texto.
- **Optimizar prompts:** cada token extra en tu input cuesta dinero.
- **Entender límites:** los modelos tienen un contexto máximo medido en tokens (ej: 256K tokens).

## Input vs Output

Las APIs distinguen entre dos tipos de tokens:

- **Input tokens:** los que envías en tu prompt (generalmente más baratos).
- **Output tokens:** los que el modelo genera como respuesta (generalmente más caros porque requieren más cómputo).

## Ejemplo de cálculo

Si un modelo cobra $0.28 por 1M de tokens de input y $1.66 por 1M de output:

```
Prompt: 500 tokens → (500 / 1_000_000) × $0.28 = $0.00014
Respuesta: 1200 tokens → (1200 / 1_000_000) × $1.66 = $0.00199
────────────────────────────────────────────────────────
Total: $0.00213 (aproximadamente 0.2 centavos de dólar)
```

## Ver también

- [Introducción a la IA](/guides/white-belt/introduccion-a-la-ia)
