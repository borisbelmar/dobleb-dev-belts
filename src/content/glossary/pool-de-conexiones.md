---
term: "Pool de conexiones"
definition: "Un grupo de conexiones de base de datos pre-creadas y reutilizables que evita el overhead de crear una nueva conexión por cada consulta."
relatedGuides:
  - yellow-belt/conectando-api-a-base-de-datos
  - green-belt/arquitectura-cliente-servidor
tags: [database, performance, conexiones, backend]
lastRevision: "2026-05-19"
---

Un **pool de conexiones** mantiene un número limitado de conexiones a la base de datos abiertas y listas para usar. Cuando tu aplicación necesita ejecutar una query, toma una conexión del pool, la usa, y la devuelve.

```typescript
const sql = postgres(DATABASE_URL, {
    max: 10,           // Máximo 10 conexiones simultáneas
    idle_timeout: 20,  // Cerrar inactivas tras 20 segundos
});
```

Crear una conexión nueva es caro (handshake TCP, autenticación). El pool reutiliza conexiones existentes, mejorando significativamente el rendimiento. El tamaño del pool depende del uso: APIs con muchas consultas concurrentes necesitan más conexiones.

## Ver también

- [Conectando tu API a una base de datos](/guides/yellow-belt/conectando-api-a-base-de-datos)
- [Arquitectura cliente–servidor en la práctica](/guides/green-belt/arquitectura-cliente-servidor)
