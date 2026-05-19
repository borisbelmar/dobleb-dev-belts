---
term: "Branch (Rama)"
definition: "Una línea de desarrollo independiente dentro de un repositorio Git que permite trabajar en funcionalidades sin afectar el código principal."
relatedGuides:
  - white-belt/git-y-control-de-versiones
  - black-belt/polyrepo-vs-monorepo
tags: [git, branching, colaboracion]
lastRevision: "2026-05-19"
---

Un **branch** (rama) es un puntero móvil a un commit. El branch principal se llama `main`. Crear un branch es crear un nuevo puntero que apunta al commit actual; a partir de ahí, los nuevos commits avanzan ese puntero independientemente.

```bash
git branch feature-x    # Crea el branch
git checkout feature-x  # Cambia a ese branch
git checkout -b feature-x  # Crea y cambia en un paso
```

Los branches son "baratos" en Git porque solo crean un puntero, no duplican archivos. La estrategia de branching define cómo un equipo organiza su trabajo (Git Flow, trunk-based development, etc.).

## Ver también

- [Git y control de versiones desde cero](/guides/white-belt/git-y-control-de-versiones)
- [Polyrepo vs Monorepo: trade-offs reales](/guides/black-belt/polyrepo-vs-monorepo)
