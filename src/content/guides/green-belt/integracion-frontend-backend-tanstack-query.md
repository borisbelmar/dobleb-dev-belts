---
title: "Integración Frontend–Backend con TanStack Query"
description: "Fetching, caching, mutations y sincronización automática de datos entre tu frontend React y tu API backend."
belt: green-belt
tags: [tanstack-query, react-query, fetching, cache, data-sync]
order: 6
published: true
lastRevision: "2026-05-19"
---

Hacer fetch de datos en React parece simple hasta que necesitas: caching, re-fetch automático, optimistic updates, manejo de errores y loading states. **TanStack Query** (antes React Query) resuelve todo esto con una API elegante.

En esta guía vas a integrar tu frontend React con tu API backend usando TanStack Query v5.

---

## Setup

```bash
pnpm add @tanstack/react-query
```

```tsx
// src/main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,  // 5 minutos
            retry: 1,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
```

---

## Queries: leer datos

```tsx
import { useQuery } from "@tanstack/react-query";

function ListaTareas() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["tareas"],
        queryFn: async () => {
            const res = await fetch("/api/tareas");
            if (!res.ok) throw new Error("Error al cargar");
            return res.json();
        },
    });

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.datos.map((tarea: any) => (
                <li key={tarea.id}>{tarea.titulo}</li>
            ))}
        </ul>
    );
}
```

### Query con parámetros

```tsx
function TareaDetail({ id }: { id: number }) {
    const { data } = useQuery({
        queryKey: ["tareas", id],
        queryFn: () => fetch(`/api/tareas/${id}`).then(r => r.json()),
        enabled: !!id,  // Solo ejecutar si hay ID
    });

    if (!data) return null;
    return <h1>{data.titulo}</h1>;
}
```

---

## Mutations: crear, actualizar, eliminar

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CrearTarea() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (titulo: string) => {
            const res = await fetch("/api/tareas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo }),
            });
            return res.json();
        },
        onSuccess: () => {
            // Invalidar y re-fetch
            queryClient.invalidateQueries({ queryKey: ["tareas"] });
        },
    });

    return (
        <button onClick={() => mutation.mutate("Nueva tarea")}>
            {mutation.isPending ? "Creando..." : "Crear"}
        </button>
    );
}
```

---

## Optimistic updates

```tsx
const mutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/tareas/${id}`, { method: "DELETE" }),
    onMutate: async (id) => {
        // Cancelar queries en curso
        await queryClient.cancelQueries({ queryKey: ["tareas"] });

        // Guardar estado anterior
        const previous = queryClient.getQueryData(["tareas"]);

        // Optimistic update
        queryClient.setQueryData(["tareas"], (old: any) => ({
            ...old,
            datos: old.datos.filter((t: any) => t.id !== id),
        }));

        return { previous };
    },
    onError: (err, id, context) => {
        // Rollback en error
        queryClient.setQueryData(["tareas"], context?.previous);
    },
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["tareas"] });
    },
});
```

---

## Por qué importa

TanStack Query elimina el 90% del boilerplate de fetching: caching automático, re-fetch en focus, deduplicación de requests, y optimistic updates.

---

## La IA y TanStack Query

### Lo bueno
- **Generar mutations:** la IA crea mutations con invalidation y optimistic updates.
- **Configurar queryClient:** la IA sugiere staleTime, retry y cacheTime apropiados.

### Lo que no debes hacer
- **No invalides queries innecesariamente.** Cada invalidation triggera un re-fetch.

---

## Desafío: integra tu API

**Objetivo:** conectar tu frontend React a tu API de Hono con TanStack Query.

**Tu tarea:**
1. Configura QueryClientProvider en tu app
2. Crea queries para listar y obtener tareas individuales
3. Crea mutations para crear, actualizar y eliminar tareas
4. Agrega optimistic update para el toggle de completada

**Bonus:** implementa infinite scroll con `useInfiniteQuery`.

---

## Para seguir explorando

- **[TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)**

---

## Resumen

- **TanStack Query** maneja fetching, caching, y sincronización de datos en React.
- **`useQuery`** lee datos con queryKey y queryFn.
- **`useMutation`** crea/actualiza/elimina datos con `invalidateQueries` para re-fetch.
- **Optimistic updates** mejoran UX mostrando cambios antes de la confirmación del servidor.
- **`staleTime`** controla cuánto tiempo los datos se consideran frescos.

En la próxima guía: **Cómo guardar información sensible: hashing vs encriptación** — la diferencia que protege a tus usuarios.
