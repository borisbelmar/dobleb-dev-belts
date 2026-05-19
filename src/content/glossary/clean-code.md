---
term: "Clean Code"
definition: "Un conjunto de prácticas para escribir código legible, mantenible y auto-documentado que otros programadores pueden entender y modificar fácilmente."
relatedGuides:
  - yellow-belt/solid-y-clean-code
  - yellow-belt/typescript-desde-cero
tags: [clean-code, legibilidad, buenas-practicas, mantenimiento]
lastRevision: "2026-05-19"
---

**Clean Code** se refiere a prácticas de escritura de código que priorizan la legibilidad humana:

- **Nombres significativos:** `calcularDistancia()` en vez de `d()`
- **Funciones pequeñas:** cada función hace una sola cosa
- **Early returns:** evitar nesting innecesario con guard clauses
- **Consistencia:** mismo estilo en todo el proyecto
- **Sin comentarios redundantes:** el código debe explicarse solo
- **Manejo explícito de errores:** no silenciar excepciones

Popularizado por el libro *"Clean Code"* de Robert C. Martin (2008).

## Ver también

- [SOLID y Clean Code: escribir código que se entiende](/guides/yellow-belt/solid-y-clean-code)
- [TypeScript desde cero: tipado que salva vidas](/guides/yellow-belt/typescript-desde-cero)
