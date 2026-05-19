---
term: "SQL (Structured Query Language)"
definition: "El lenguaje estándar para consultar, insertar, actualizar y eliminar datos en bases de datos relacionales."
relatedGuides:
  - yellow-belt/introduccion-a-sql-y-postgresql
  - yellow-belt/conectando-api-a-base-de-datos
tags: [sql, base-de-datos, queries, relacional]
lastRevision: "2026-05-19"
---

**SQL** es el lenguaje universal para interactuar con bases de datos relacionales. Operaciones fundamentales:

- **SELECT:** consultar datos (`SELECT * FROM usuarios WHERE edad > 18`)
- **INSERT:** insertar datos (`INSERT INTO usuarios (nombre) VALUES ('Ada')`)
- **UPDATE:** modificar datos (`UPDATE usuarios SET edad = 37 WHERE id = 1`)
- **DELETE:** eliminar datos (`DELETE FROM usuarios WHERE id = 3`)
- **JOIN:** conectar tablas (`SELECT * FROM usuarios JOIN articulos ON usuarios.id = articulos.autor_id`)

Creado en los 70s basado en el modelo relacional de Edgar Codd (1970). Es uno de los lenguajes más duraderos de la computación.

## Ver también

- [Introducción a SQL y PostgreSQL](/guides/yellow-belt/introduccion-a-sql-y-postgresql)
- [Conectando tu API a una base de datos](/guides/yellow-belt/conectando-api-a-base-de-datos)
