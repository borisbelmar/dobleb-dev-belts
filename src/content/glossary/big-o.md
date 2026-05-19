---
term: "Notación Big O"
definition: "Notación matemática que describe cómo crece el tiempo de ejecución o uso de memoria de un algoritmo a medida que aumentan los datos de entrada."
relatedGuides:
  - white-belt/matematicas-discretas
tags: [algoritmos, complejidad, rendimiento]
lastRevision: "2026-05-19"
---

Big O no mide tiempo absoluto, sino **tasa de crecimiento**. O(1) es constante (ideal), O(log n) crece muy lento, O(n) crece linealmente, y O(n²) crece cuadráticamente (peligroso con muchos datos).

## Complejidades comunes

- **O(1):** acceso por índice, lookup en hash map.
- **O(log n):** búsqueda binaria.
- **O(n):** buscar en una lista no ordenada.
- **O(n log n):** ordenamiento eficiente (merge sort, quick sort).
- **O(n²):** loops anidados sobre los mismos datos.

## Ver también

- [Matemáticas discretas para programadores](/guides/white-belt/matematicas-discretas)
