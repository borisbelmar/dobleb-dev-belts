---
title: "Patrones N-Layer y Repository"
description: "Organiza tu backend en capas claras: presentación, servicio y repositorio. Código mantenible, testeable y escalable."
belt: green-belt
tags: [patrones, n-layer, repository, arquitectura, backend]
order: 12
published: true
lastRevision: "2026-05-19"
---

Tu API crece. Los handlers de Hono tienen cada vez más lógica. Las queries de Prisma se repiten. Los tests son imposibles porque todo está acoplado. Es hora de organizar.

Los patrones **N-Layer** y **Repository** separan responsabilidades en capas claras: routes manejan HTTP, services manejan lógica de negocio, repositories manejan datos.

---

## El problema del handler gordo

```typescript
// ❌ Todo en el handler
app.post("/api/pedidos", async (c) => {
    const body = await c.req.json();
    // Validación
    if (!body.items?.length) return c.json({ error: "Pedido vacío" }, 400);
    // Verificar stock
    for (const item of body.items) {
        const producto = await prisma.producto.findUnique({ where: { id: item.id } });
        if (!producto || producto.stock < item.cantidad) return c.json({ error: "Sin stock" }, 400);
    }
    // Calcular total
    let total = 0;
    for (const item of body.items) {
        const producto = await prisma.producto.findUnique({ where: { id: item.id } });
        total += producto.precio * item.cantidad;
    }
    // Crear pedido
    const pedido = await prisma.pedido.create({
        data: { userId: body.userId, total, items: { create: body.items } },
    });
    // Actualizar stock
    for (const item of body.items) {
        await prisma.producto.update({ where: { id: item.id }, data: { stock: { decrement: item.cantidad } } });
    }
    // Enviar email
    await sendEmail(body.email, "Pedido confirmado", `Total: $${total}`);
    return c.json(pedido, 201);
});
```

Este handler hace 5 cosas diferentes. Es difícil de testear, reutilizar y mantener.

---

## Solución: N-Layer + Repository

```
src/
├── routes/           # Capa de presentación (HTTP)
│   └── pedidos.ts
├── services/         # Capa de lógica de negocio
│   └── pedido-service.ts
├── repositories/     # Capa de acceso a datos
│   └── pedido-repository.ts
└── types/            # Tipos compartidos
    └── pedido.ts
```

### Repository: acceso a datos

```typescript
// src/repositories/pedido-repository.ts
import { PrismaClient } from "@prisma/client";

export class PedidoRepository {
    constructor(private prisma: PrismaClient) {}

    async crear(data: CreatePedidoInput) {
        return this.prisma.pedido.create({
            data: {
                userId: data.userId,
                total: data.total,
                items: { create: data.items },
            },
            include: { items: true },
        });
    }

    async verificarStock(items: { id: number; cantidad: number }[]) {
        for (const item of items) {
            const producto = await this.prisma.producto.findUnique({ where: { id: item.id } });
            if (!producto || producto.stock < item.cantidad) {
                return { ok: false, producto: producto?.nombre };
            }
        }
        return { ok: true };
    }

    async actualizarStock(items: { id: number; cantidad: number }[]) {
        for (const item of items) {
            await this.prisma.producto.update({
                where: { id: item.id },
                data: { stock: { decrement: item.cantidad } },
            });
        }
    }
}
```

### Service: lógica de negocio

```typescript
// src/services/pedido-service.ts
export class PedidoService {
    constructor(
        private repo: PedidoRepository,
        private emailService: EmailService,
    ) {}

    async crearPedido(data: CreatePedidoInput) {
        // Verificar stock
        const stock = await this.repo.verificarStock(data.items);
        if (!stock.ok) throw new Error(`Sin stock: ${stock.producto}`);

        // Calcular total
        const total = await this.calcularTotal(data.items);

        // Crear pedido
        const pedido = await this.repo.crear({ ...data, total });

        // Actualizar stock
        await this.repo.actualizarStock(data.items);

        // Notificar
        await this.emailService.enviarConfirmacion(data.email, pedido);

        return pedido;
    }

    private async calcularTotal(items: { id: number; cantidad: number }[]) {
        let total = 0;
        for (const item of items) {
            const producto = await this.repo.obtenerProducto(item.id);
            total += producto.precio * item.cantidad;
        }
        return total;
    }
}
```

### Route: solo HTTP

```typescript
// src/routes/pedidos.ts
import { Hono } from "hono";

const router = new Hono();

router.post("/pedidos", async (c) => {
    const body = await c.req.json();

    try {
        const pedido = await pedidoService.crearPedido(body);
        return c.json(pedido, 201);
    } catch (error: any) {
        if (error.message.includes("Sin stock")) {
            return c.json({ error: error.message }, 400);
        }
        return c.json({ error: "Error interno" }, 500);
    }
});

export default router;
```

---

## Por qué importa

- **Testeable:** puedes testear el service sin HTTP ni BD usando mocks.
- **Reutilizable:** el repository se usa desde múltiples services.
- **Legible:** cada capa tiene una responsabilidad clara.
- **Escalable:** agregar nuevas funcionalidades es agregar nuevas capas, no modificar existentes.

---

## La IA y patrones

### Lo bueno
- **Generar capas:** la IA crea repository, service y route desde una descripción.
- **Refactorizar:** la IA separa un handler gordo en capas.

### Lo que no debes hacer
- **No sobre-abstractas.** No necesitas una capa para cada cosa simple.
- **No ignores la inyección de dependencias.** Los services deben recibir repositories, no crearlos.

---

## Desafío: refactoriza tu API

**Objetivo:** aplicar N-Layer y Repository a tu API de tareas.

**Tu tarea:**
1. Crea un `TareaRepository` con Prisma
2. Crea un `TareaService` con la lógica de negocio
3. Simplifica las routes para solo manejar HTTP
4. Escribe tests unitarios para el service con un mock repository

**Bonus:** agrega un `UsuarioService` y `CategoriaService` siguiendo el mismo patrón.

---

## Para seguir explorando

- **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)** — Uncle Bob.

---

## Resumen

- **N-Layer** separa: presentación (HTTP), servicio (lógica), repositorio (datos).
- **Repository** abstrae el acceso a datos: el service no sabe si es Prisma, SQL directo o una API.
- **Handlers delgados:** solo parsean request, llaman al service, devuelven response.
- **Inyección de dependencias:** los services reciben repositories, no los crean.
- **Testeable:** mockear repositories permite testear services sin BD.

En la próxima guía: **Astro: sitios rápidos con JavaScript mínimo** — el framework para contenido, no para apps.
