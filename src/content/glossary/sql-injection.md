---
term: "SQL injection"
definition: "Una vulnerabilidad de seguridad donde un atacante inserta código SQL malicioso en inputs del usuario, permitiendo leer, modificar o eliminar datos de la base de datos."
relatedGuides:
  - yellow-belt/conectando-api-a-base-de-datos
  - black-belt/seguridad-aplicada-owasp
tags: [seguridad, sql, vulnerabilidad, backend]
lastRevision: "2026-05-19"
---

**SQL injection** ocurre cuando valores del usuario se concatenan directamente en queries SQL:

```typescript
// ❌ VULNERABLE
const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
// Input malicioso: ' OR '1'='1' --
// Resultado: SELECT * FROM usuarios WHERE email = '' OR '1'='1' --'
// Devuelve TODOS los usuarios

// ✅ SEGURO: usar parámetros
const usuarios = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
// El valor se envía como parámetro separado, no como parte del SQL
```

Prevención:
- **Siempre** usar queries parametrizadas
- **Nunca** concatenar strings del usuario en SQL
- Usar ORMs o query builders que parametrizan automáticamente
- Validar y sanitizar inputs del usuario

Es una de las vulnerabilidades más críticas según OWASP Top 10.

## Ver también

- [Conectando tu API a una base de datos](/guides/yellow-belt/conectando-api-a-base-de-datos)
- [Seguridad aplicada: OWASP, secretos y buenas prácticas](/guides/black-belt/seguridad-aplicada-owasp)
