---
term: "HTTP (HyperText Transfer Protocol)"
definition: "El protocolo de petición-respuesta que usan los navegadores y servidores para comunicarse en la web."
relatedGuides:
  - yellow-belt/como-funciona-la-web
  - yellow-belt/apis-rest
tags: [http, web, protocolos, redes]
lastRevision: "2026-05-19"
---

**HTTP** es el protocolo fundamental de la web. Es un protocolo **sin estado** donde el cliente envía una petición y el servidor responde con datos y un código de estado.

Métodos principales:
- **GET**: obtener datos (sin body, idempotente)
- **POST**: crear recursos (con body, no idempotente)
- **PUT**: actualizar recurso completo (idempotente)
- **PATCH**: actualización parcial
- **DELETE**: eliminar recursos (idempotente)

Códigos de estado por rango:
- **1xx**: informativo
- **2xx**: éxito (200 OK, 201 Created)
- **3xx**: redirección (301, 302, 304)
- **4xx**: error del cliente (400, 401, 403, 404)
- **5xx**: error del servidor (500, 502, 503)

HTTP/1.1 es secuencial, HTTP/2 es multiplexado, HTTP/3 usa UDP en vez de TCP.

## Ver también

- [Cómo funciona la web: HTTP, DNS y navegadores](/guides/yellow-belt/como-funciona-la-web)
- [APIs REST: qué son y cómo se diseñan](/guides/yellow-belt/apis-rest)
