---
term: "Middleware"
definition: "Una función que se ejecuta entre la recepción de una petición HTTP y la ejecución del handler, usada para logging, autenticación, CORS y validación."
relatedGuides:
  - yellow-belt/tu-primera-api-con-hono
  - green-belt/arquitectura-cliente-servidor
tags: [backend, middleware, api, hono, express]
lastRevision: "2026-05-19"
---

Un **middleware** es una función que intercepta las peticiones HTTP antes (o después) de que lleguen al handler principal. Se usa para lógica compartida entre múltiples rutas:

```typescript
// Middleware de logging
app.use("*", async (c, next) => {
    const inicio = Date.now();
    await next();  // Ejecuta el siguiente middleware o handler
    console.log(`${c.req.method} ${c.req.path} → ${c.status} (${Date.now() - inicio}ms)`);
});

// Middleware de autenticación
app.use("/api/*", async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) return c.json({ error: "No autenticado" }, 401);
    await next();
});
```

Los middleware se ejecutan en orden. `await next()` pasa al siguiente. Si un middleware no llama a `next()`, la cadena se detiene ahí (útil para rechazar peticiones).

## Ver también

- [Tu primera API con Hono y TypeScript](/guides/yellow-belt/tu-primera-api-con-hono)
- [Arquitectura cliente–servidor en la práctica](/guides/green-belt/arquitectura-cliente-servidor)
