---
term: "API REST"
definition: "Un estilo arquitectónico para diseñar APIs web basado en recursos identificados por URLs, métodos HTTP semánticos y comunicación sin estado."
relatedGuides:
  - yellow-belt/apis-rest
  - yellow-belt/tu-primera-api-con-hono
tags: [api, rest, http, backend, arquitectura]
lastRevision: "2026-05-19"
---

Una **API REST** (Representational State Transfer) sigue estos principios:

1. **Recursos:** cada entidad se identifica con una URL (`/usuarios/42`)
2. **Métodos HTTP:** la acción la define el verbo (GET, POST, PUT, PATCH, DELETE)
3. **Stateless:** cada petición contiene toda la información necesaria
4. **Representaciones:** los recursos se envían en formatos como JSON o XML
5. **Interfaz uniforme:** consistencia en nombres, respuestas y errores

Definido por **Roy Fielding** en 2000, REST se convirtió en el estándar porque usa lo que ya existe en HTTP en vez de agregar complejidad.

## Ver también

- [APIs REST: qué son y cómo se diseñan](/guides/yellow-belt/apis-rest)
- [Tu primera API con Hono y TypeScript](/guides/yellow-belt/tu-primera-api-con-hono)
