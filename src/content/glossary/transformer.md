---
term: "Transformer (arquitectura)"
definition: "La arquitectura de red neuronal introducida en 2017 que usa mecanismos de atención para procesar texto de forma paralela, base de todos los LLMs modernos."
relatedGuides:
  - white-belt/introduccion-a-la-ia
tags: [ia, machine-learning, arquitectura, deep-learning]
lastRevision: "2026-05-19"
---

El **Transformer** es una arquitectura de red neuronal presentada en el paper *"Attention Is All You Need"* (Vaswani et al., Google, 2017). Reemplazó las redes recurrentes (RNNs) que procesaban texto secuencialmente por un mecanismo de **auto-atención** (self-attention) que procesa todas las palabras en paralelo.

La clave es el mecanismo de atención: permite al modelo relacionar cualquier palabra con cualquier otra palabra en el texto, sin importar la distancia. Por ejemplo, en "El gato que estaba en el tejado que era rojo...", el modelo puede conectar "rojo" con "tejado" directamente.

Componentes principales:
- **Encoder:** procesa el texto de entrada
- **Decoder:** genera el texto de salida
- **Self-Attention:** calcula relaciones entre todas las palabras
- **Feed-Forward:** transforma las representaciones

GPT, BERT, Claude, Gemini y todos los LLMs modernos son variantes del Transformer.

## Ver también

- [Introducción a la IA: LLMs, asistentes y cómo usarlos bien](/guides/white-belt/introduccion-a-la-ia)
