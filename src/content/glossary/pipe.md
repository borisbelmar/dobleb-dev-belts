---
term: "Pipe (Tubería)"
definition: "Mecanismo de Unix que conecta la salida de un comando con la entrada de otro usando el símbolo |."
relatedGuides:
  - white-belt/la-terminal
tags: [terminal, unix, pipes, automatizacion]
lastRevision: "2026-05-19"
---

Un **pipe** (tubería), representado por `|`, es uno de los conceptos más poderosos de Unix. Toma la salida estándar (stdout) de un comando y la envía como entrada estándar (stdin) del siguiente:

```bash
cat log.txt | grep "error" | wc -l
```

Esto cuenta cuántas líneas con "error" hay en `log.txt`. Cada comando hace una cosa simple, pero combinados resuelven problemas complejos.

Los pipes fueron inventados por **Doug McIlroy** en 1973 y son la base de la filosofía Unix: "escribe programas que hagan una cosa bien y que puedan trabajar con otros programas".

## Ver también

- [La terminal: tu nueva mejor amiga](/guides/white-belt/la-terminal)
