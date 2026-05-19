---
term: "MER (Modelo Entidad-Relación)"
definition: "Un diagrama que representa la estructura de una base de datos relacional mostrando entidades (tablas), atributos (columnas) y relaciones con sus cardinalidades."
relatedGuides:
  - yellow-belt/diagramas-basicos
  - yellow-belt/introduccion-a-sql-y-postgresql
tags: [mer, base-de-datos, diseño, modelado]
lastRevision: "2026-05-19"
---

El **MER** (Modelo Entidad-Relación) es la herramienta fundamental para diseñar bases de datos relacionales:

- **Entidad:** una tabla (Usuario, Artículo, Comentario)
- **Atributo:** una columna (id, nombre, email)
- **PK (Primary Key):** identificador único de la entidad
- **FK (Foreign Key):** referencia a otra entidad
- **Cardinalidad:** 1:1, 1:N, M:N

Las relaciones M:N requieren una **tabla intermedia** (join table) que contiene las FKs de ambas entidades.

El MER se crea **antes** de escribir SQL para validar el diseño y comunicar la estructura al equipo.

## Ver también

- [Diagramas básicos: flujo, casos de uso y MER](/guides/yellow-belt/diagramas-basicos)
- [Introducción a SQL y PostgreSQL](/guides/yellow-belt/introduccion-a-sql-y-postgresql)
