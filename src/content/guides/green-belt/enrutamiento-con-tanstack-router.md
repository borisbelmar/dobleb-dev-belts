---
title: "Enrutamiento con TanStack Router"
description: "Navegación SPA con enrutamiento type-safe: rutas dinámicas, layouts, guards de autenticación y carga de datos."
belt: green-belt
tags: [routing, tanstack, react, spa, typescript]
order: 4
published: true
lastRevision: "2026-05-19"
---

Una Single Page Application (SPA) necesita enrutamiento: cambiar de "página" sin recargar el navegador. **TanStack Router** es el router más moderno para React: type-safe, con carga de datos integrada y excelente DX.

En esta guía vas a configurar TanStack Router, crear rutas dinámicas, proteger rutas con auth guards y cargar datos antes de renderizar.

---

## Setup

```bash
pnpm create vite mi-app --template react-ts
cd mi-app
pnpm add @tanstack/react-router
pnpm add -D @tanstack/router-plugin
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [
        // IMPORTANTE: tanstackRouter debe ir ANTES de react()
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
    ],
});
```

---

## Rutas file-based

```
src/routes/
├── __root.tsx          # Layout raíz
├── index.tsx           # /
├── about.tsx           # /about
└── users/
    ├── index.tsx       # /users
    └── $userId.tsx     # /users/123
```

```tsx
// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            <Outlet />
        </div>
    ),
});
```

```tsx
// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    return <h1>Bienvenido</h1>;
}
```

```tsx
// src/routes/users/$userId.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
    component: UserDetail,
    loader: async ({ params }) => {
        const res = await fetch(`/api/users/${params.userId}`);
        return res.json();
    },
});

function UserDetail() {
    const user = Route.useLoaderData();
    return <h1>{user.name}</h1>;
}
```

---

## Navegación

```tsx
import { Link, useNavigate } from "@tanstack/react-router";

// Link (declarativo)
<Link to="/users/123">Ver usuario</Link>

// Programático
function Component() {
    const navigate = useNavigate();
    return <button onClick={() => navigate({ to: "/users" })}>Ir a Users</button>;
}
```

---

## Rutas protegidas

```tsx
// src/routes/dashboard.tsx
export const Route = createFileRoute("/dashboard")({
    beforeLoad: async () => {
        const user = await fetchUser();
        if (!user) throw new Error("No autenticado");
        return { user };
    },
    component: Dashboard,
});
```

---

## Por qué importa

El enrutamiento es la columna vertebral de cualquier SPA. TanStack Router ofrece type-safety completo: si cambias una ruta, TypeScript te avisa donde se rompe.

---

## La IA y routing

### Lo bueno
- **Generar estructura de rutas:** describe tu app y la IA genera el árbol de rutas.
- **Crear guards de auth:** la IA genera beforeLoad con verificación de sesión.

### Lo que no debes hacer
- **No expongas rutas protegidas solo en el frontend.** Siempre valida en el backend también.

---

## Desafío: app multi-página

**Objetivo:** crear una app con al menos 4 rutas, una ruta dinámica y protección de auth.

**Bonus:** agrega carga de datos con loaders y skeleton screens.

---

## Para seguir explorando

- **[TanStack Router Docs](https://tanstack.com/router/latest/docs/framework/react/overview)**

---

## Resumen

- **TanStack Router** es un router type-safe para React con file-based routing.
- **`createFileRoute`** define rutas basadas en la estructura de archivos.
- **`loader`** carga datos antes de renderizar la ruta.
- **`beforeLoad`** protege rutas con lógica de autenticación.
- **`Link`** para navegación declarativa, **`useNavigate`** para programática.

En la próxima guía: **shadcn/ui: construyendo interfaces profesionales** — componentes accesibles y personalizables.
