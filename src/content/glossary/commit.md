---
term: "Commit"
definition: "Una instantánea del estado del proyecto en un momento dado, con hash único, mensaje de descripción y referencia al commit anterior."
relatedGuides:
  - white-belt/git-y-control-de-versiones
tags: [git, historial, control-versiones]
lastRevision: "2026-05-19"
---

Un **commit** es la unidad fundamental del historial de Git. Cada commit contiene:

- Un **hash SHA-1** único (ej: `a3f2b9c`) que lo identifica
- Un **mensaje** que describe los cambios
- **Autor y fecha**
- Referencia al **commit padre** (formando una cadena)
- Un **snapshot** de todos los archivos en el staging area

Se crea con `git commit -m "mensaje"`. Los commits forman una cadena inmutable: modificar uno requiere reescribir todo el historial posterior.

## Ver también

- [Git y control de versiones desde cero](/guides/white-belt/git-y-control-de-versiones)
