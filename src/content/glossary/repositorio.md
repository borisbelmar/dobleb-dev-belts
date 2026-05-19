---
term: "Repositorio (Git)"
definition: "Un proyecto bajo control de versiones de Git, que contiene todo el historial de cambios y metadatos."
relatedGuides:
  - white-belt/git-y-control-de-versiones
  - black-belt/polyrepo-vs-monorepo
tags: [git, fundamentos, control-versiones]
lastRevision: "2026-05-19"
---

Un **repositorio** (o "repo") es la unidad básica de Git. Es un directorio que contiene:

- Tus archivos de proyecto (working directory)
- Una carpeta oculta `.git/` con todo el historial de commits, branches y metadatos
- Referencias a repositorios remotos (como GitHub)

Se crea con `git init` (nuevo) o `git clone` (desde uno existente). Cada desarrollador tiene una copia completa del repositorio con todo su historial.

## Ver también

- [Git y control de versiones desde cero](/guides/white-belt/git-y-control-de-versiones)
- [Polyrepo vs Monorepo: trade-offs reales](/guides/black-belt/polyrepo-vs-monorepo)
