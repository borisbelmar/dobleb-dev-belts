---
title: "React desde cero: componentes, props y estado"
description: "La librería de UI más popular del mundo: crea interfaces dinámicas con componentes reutilizables, props y estado local."
belt: green-belt
tags: [react, frontend, componentes, javascript, ui]
order: 2
published: true
lastRevision: "2026-05-19"
---

React cambió la forma en que construimos interfaces web. En vez de manipular el DOM manualmente con `document.querySelector`, describes **qué** debe verse tu UI y React se encarga del **cómo**.

En esta guía vas a aprender React desde cero: componentes, props, estado y el modelo mental que hace a React tan poderoso.

---

## ¿Qué es React?

React es una **librería** (no framework) para construir interfaces de usuario. Fue creada por **Jordan Walke** en **Facebook** en **2011** y open sourceada en **2013**.

La idea central: en vez de manipular el DOM directamente, describes tu UI como **funciones que reciben datos y devuelven elementos visuales**.

---

## Setup con Vite

```bash
pnpm create vite mi-app --template react-ts
cd mi-app
pnpm install
pnpm dev
```

---

## Tu primer componente

```tsx
// src/App.tsx
function App() {
    return (
        <div>
            <h1>¡Hola, React!</h1>
            <p>Mi primera app con React.</p>
        </div>
    );
}

export default App;
```

Esto es **JSX**: JavaScript con XML embebido. Se compila a `React.createElement()`.

---

## Props: pasar datos a componentes

```tsx
// src/components/Saludo.tsx
interface SaludoProps {
    nombre: string;
    edad?: number;
}

function Saludo({ nombre, edad }: SaludoProps) {
    return (
        <div>
            <h2>Hola, {nombre}!</h2>
            {edad && <p>Tienes {edad} años</p>}
        </div>
    );
}

// Uso:
<Saludo nombre="Ada" edad={36} />
<Saludo nombre="Alan" />
```

**Las props son de solo lectura.** Un componente no puede modificar sus props.

---

## Estado: datos que cambian

```tsx
import { useState } from "react";

function Contador() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Contador: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <button onClick={() => setCount(count - 1)}>Decrementar</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
```

`useState` devuelve un array con: `[valorActual, funcionParaActualizar]`.

### Estado con objetos

```tsx
function Formulario() {
    const [form, setForm] = useState({ nombre: "", email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form>
            <input name="nombre" value={form.nombre} onChange={handleChange} />
            <input name="email" value={form.email} onChange={handleChange} />
        </form>
    );
}
```

---

## Listas y keys

```tsx
function ListaTareas({ tareas }: { tareas: string[] }) {
    return (
        <ul>
            {tareas.map((tarea, index) => (
                <li key={index}>{tarea}</li>
            ))}
        </ul>
    );
}
```

**`key`** debe ser un identificador único y estable. Usar `index` como key funciona solo si la lista no cambia de orden.

---

## Efectos: side effects

```tsx
import { useEffect, useState } from "react";

function Reloj() {
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setHora(new Date()), 1000);
        return () => clearInterval(interval);  // Cleanup
    }, []);  // [] = ejecutar solo al montar

    return <p>Son las {hora.toLocaleTimeString()}</p>;
}
```

`useEffect` ejecuta código después del render. El **cleanup function** se ejecuta al desmontar.

---

## Por qué importa

React es la librería de UI más usada en el mundo. Entenderla te permite construir cualquier interfaz web moderna.

---

## La IA y React

### Lo bueno
- **Generar componentes:** describe el UI y la IA genera el componente.
- **Convertir HTML a JSX:** la IA convierte markup HTML a componentes React.
- **Debuggear hooks:** la IA explica por qué un useEffect se ejecuta demasiadas veces.

### Lo que no debes hacer
- **No copies componentes sin entender el flujo de datos.** Props down, events up.
- **No ignores las reglas de hooks.** Hooks solo en el nivel superior de componentes funcionales.

---

## Desafío: app de tareas

**Objetivo:** crear una todo app completa con React.

**Tu tarea:**
1. Componente `TodoApp` con estado de tareas
2. Input para agregar nuevas tareas
3. Cada tarea tiene checkbox para completar y botón para eliminar
4. Contador de tareas pendientes
5. Filtro: Todas, Pendientes, Completadas

**Bonus:** persiste las tareas en `localStorage`.

---

## Para seguir explorando

- **[React Documentation](https://react.dev/)** — docs oficiales, excelentes.
- **[Epic React](https://epicreact.dev/)** — curso avanzado de Kent C. Dodds.

---

## Resumen

- **React** describe UI como funciones que reciben datos (props) y devuelven elementos.
- **Props** son datos de solo lectura pasados de padre a hijo.
- **Estado** (`useState`) son datos que cambian dentro de un componente.
- **JSX** es JavaScript con XML embebido.
- **`useEffect`** maneja side effects: timers, fetch, subscriptions.
- **Keys** identifican elementos en listas de forma única y estable.
- React fue creado por **Jordan Walke** en Facebook (2011).

En la próxima guía: **Hooks esenciales y manejo del ciclo de vida** — useEffect, useContext, useReducer y más.
