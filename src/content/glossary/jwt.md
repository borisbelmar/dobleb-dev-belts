---
term: "JWT (JSON Web Token)"
definition: "Un estándar para crear tokens de autenticación que contienen información del usuario codificada y firmada criptográficamente."
relatedGuides:
  - yellow-belt/apis-rest
  - green-belt/autenticacion-y-sesiones
tags: [jwt, autenticacion, seguridad, api]
lastRevision: "2026-05-19"
---

Un **JWT** (JSON Web Token) es un token compacto y autocontenido que se usa para autenticar peticiones en APIs:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Estructura (tres partes separadas por puntos):
1. **Header:** algoritmo de firma (`{"alg": "HS256", "typ": "JWT"}`)
2. **Payload:** datos del usuario (`{"sub": "123", "name": "Ada", "role": "admin"}`)
3. **Signature:** firma criptográfica que verifica que el token no fue alterado

Se envía en el header `Authorization: Bearer <token>`. El servidor verifica la firma sin consultar la base de datos.

**Importante:** el payload está codificado en Base64, NO cifrado. Cualquiera puede leerlo. Nunca guardes datos sensibles en el payload.

## Ver también

- [APIs REST: qué son y cómo se diseñan](/guides/yellow-belt/apis-rest)
- [Autenticación y sesiones: JWT y cookies](/guides/green-belt/autenticacion-y-sesiones)
