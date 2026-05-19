---
title: "shadcn/ui: construyendo interfaces profesionales"
description: "Componentes UI accesibles, personalizables y que posees — no una librería, sino código que copias a tu proyecto."
belt: green-belt
tags: [shadcn, ui, componentes, accesibilidad, tailwind]
order: 5
published: true
lastRevision: "2026-05-19"
---

La mayoría de las librerías de componentes (Material UI, Bootstrap) te dan componentes que no puedes modificar fácilmente. **shadcn/ui** es diferente: no es una dependencia, es **código que copias a tu proyecto** y modificas como quieras.

En esta guía vas a instalar shadcn/ui, usar componentes esenciales y personalizarlos para tu proyecto.

---

## ¿Qué es shadcn/ui?

shadcn/ui es una colección de componentes construidos con **Radix UI** (accesibilidad) y **Tailwind CSS** (estilos). No se instala como paquete — se copian archivos a tu proyecto.

```bash
npx shadcn@latest init -t vite
```

Esto configura `components.json` y crea la carpeta `src/components/ui/`.

---

## Agregar componentes

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add form
```

Cada componente se copia en `src/components/ui/`. Es **tu código** — modifícalo como quieras.

---

## Ejemplo: formulario con validación

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
    nombre: z.string().min(1, "Requerido"),
    email: z.string().email("Email inválido"),
});

function MiFormulario() {
    const form = useForm({ resolver: zodResolver(schema), defaultValues: { nombre: "", email: "" } });

    const onSubmit = (data: z.infer<typeof schema>) => console.log(data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="nombre" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit">Enviar</Button>
            </form>
        </Form>
    );
}
```

---

## Personalizar temas

```css
/* src/index.css */
@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --radius: 0.5rem;
    }
}
```

---

## Por qué importa

shadcn/ui combina lo mejor de ambos mundos: componentes accesibles y listos para usar, pero con control total sobre el código.

---

## La IA y shadcn/ui

### Lo bueno
- **Generar componentes compuestos:** la IA combina múltiples componentes shadcn.
- **Personalizar estilos:** la IA modifica componentes existentes.

### Lo que no debes hacer
- **No copies componentes sin entender la accesibilidad.** Los roles ARIA y focus management importan.

---

## Desafío: dashboard con shadcn/ui

**Objetivo:** crear un dashboard con tabla, diálogos y formularios.

**Bonus:** agrega modo oscuro con toggle.

---

## Para seguir explorando

- **[shadcn/ui](https://ui.shadcn.com/)** — sitio oficial.

---

## Resumen

- **shadcn/ui** no es una librería — es código que copias a tu proyecto.
- Usa **Radix UI** para accesibilidad y **Tailwind CSS** para estilos.
- `pnpm dlx shadcn@latest add` agrega componentes a `src/components/ui/`.
- Puedes modificar cualquier componente porque es tu código.

En la próxima guía: **Integración Frontend–Backend con TanStack Query** — fetching, caching y sincronización de datos.
