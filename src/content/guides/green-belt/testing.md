---
title: "Testing: unitario, integración y E2E"
description: "Asegura que tu código funciona con tests unitarios, de integración y end-to-end usando Vitest y Playwright."
belt: green-belt
tags: [testing, vitest, playwright, unitario, e2e]
order: 15
published: true
lastRevision: "2026-05-19"
---

Tu código funciona en tu máquina. Pero cuando agregas una funcionalidad nueva, algo se rompe en otra parte. Sin tests, no lo sabes hasta que un usuario se queja. Con tests, lo sabes antes de hacer commit.

En esta guía vas a escribir tests unitarios con Vitest, tests de integración para tu API y tests E2E con Playwright.

---

## Pirámide de testing

```
        /\
       /  \      E2E (pocos, lentos, confianza alta)
      /────\
     /      \    Integración (algunos, velocidad media)
    /────────\
   /          \  Unitarios (muchos, rápidos, confianza baja)
  /────────────\
```

- **Unitarios:** prueban una función aislada. Rápidos, muchos.
- **Integración:** prueban interacciones (API + BD). Velocidad media.
- **E2E:** prueban el flujo completo (navegador). Lentos, pocos.

---

## Tests unitarios con Vitest

```bash
pnpm add -D vitest
```

```typescript
// src/utils/calculos.ts
export function calcularDescuento(total: number, esPremium: boolean): number {
    if (total <= 0) throw new Error("Total debe ser positivo");
    return esPremium ? total * 0.1 : total * 0.05;
}

// src/utils/calculos.test.ts
import { describe, it, expect } from "vitest";
import { calcularDescuento } from "./calculos";

describe("calcularDescuento", () => {
    it("aplica 5% para usuarios normales", () => {
        expect(calcularDescuento(100, false)).toBe(5);
    });

    it("aplica 10% para usuarios premium", () => {
        expect(calcularDescuento(100, true)).toBe(10);
    });

    it("lanza error para total negativo", () => {
        expect(() => calcularDescuento(-1, false)).toThrow("Total debe ser positivo");
    });
});
```

```bash
pnpm vitest
# Ejecuta tests en watch mode
```

---

## Tests de integración con Vitest

```typescript
// src/routes/tareas.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Hono();
app.route("/api", tareasRouter);

describe("API Tareas", () => {
    beforeEach(async () => {
        await prisma.tarea.deleteMany();
    });

    it("POST /api/tareas crea una tarea", async () => {
        const res = await app.request("/api/tareas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo: "Test" }),
        });

        expect(res.status).toBe(201);
        const data = await res.json();
        expect(data.titulo).toBe("Test");
        expect(data.completada).toBe(false);
    });

    it("GET /api/tareas devuelve lista", async () => {
        await prisma.tarea.create({ data: { titulo: "Test" } });

        const res = await app.request("/api/tareas");
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.datos).toHaveLength(1);
    });
});
```

---

## Tests E2E con Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

```typescript
// tests/e2e/tareas.spec.ts
import { test, expect } from "@playwright/test";

test("puede crear y completar una tarea", async ({ page }) => {
    // Navegar a la app
    await page.goto("http://localhost:5173");

    // Crear tarea
    await page.fill('input[placeholder="Nueva tarea"]', "Aprender Playwright");
    await page.click("button", { hasText: "Agregar" });

    // Verificar que aparece
    await expect(page.getByText("Aprender Playwright")).toBeVisible();

    // Completar tarea
    await page.click("text=Aprender Playwright");
    await expect(page.getByText("Aprender Playwright")).toHaveClass(/completada/);

    // Eliminar tarea
    await page.click("button", { hasText: "Eliminar" });
    await expect(page.getByText("Aprender Playwright")).not.toBeVisible();
});
```

```bash
pnpm exec playwright test
```

---

## Por qué importa

Los tests son tu red de seguridad. Sin ellos, cada cambio es un salto al vacío.

---

## La IA y testing

### Lo bueno
- **Generar tests:** la IA crea tests unitarios desde una función.
- **Edge cases:** la IA sugiere casos de prueba que no consideraste.
- **Convertir manual a E2E:** describe el flujo y la IA genera el test de Playwright.

### Lo que no debes hacer
- **No confíes en tests generados sin ejecutarlos.** La IA puede generar tests que siempre pasan.
- **No testes implementación.** Testea comportamiento, no detalles internos.

---

## Desafío: testea tu app

**Objetivo:** agregar tests a tu aplicación.

**Tu tarea:**
1. Escribe tests unitarios para tus funciones de utilidad
2. Escribe tests de integración para tus endpoints de API
3. Escribe al menos un test E2E con Playwright
4. Configura CI para ejecutar tests en cada PR

**Bonus:** agrega coverage reporting con `vitest --coverage`.

---

## Para seguir explorar

- **[Vitest Docs](https://vitest.dev/)**
- **[Playwright Docs](https://playwright.dev/)**

---

## Resumen

- **Pirámide de testing:** muchos unitarios, algunos de integración, pocos E2E.
- **Vitest** es el test runner moderno para TypeScript.
- **Playwright** automatiza navegadores para tests E2E.
- Testea **comportamiento**, no implementación.
- **CI** ejecuta tests automáticamente en cada PR.

En la próxima guía: **Metodologías ágiles: Agile, Scrum y XP en la práctica** — cómo organizar trabajo en equipo.
