---
title: "Hooks esenciales y manejo del ciclo de vida"
description: "Domina useEffect, useContext, useReducer, useMemo y useCallback para manejar efectos secundarios, estado global y performance en React."
belt: green-belt
tags: [react, hooks, ciclo-vida, performance, estado]
order: 3
published: true
lastRevision: "2026-05-19"
---

`useState` es solo el comienzo. Los **hooks** de React te permiten manejar efectos secundarios, compartir estado entre componentes, optimizar renders y mucho más.

En esta guía vas a dominar los hooks esenciales que usarás en cada proyecto React real.

---

## useEffect: side effects

```tsx
import { useEffect, useState } from "react";

// Ejecutar al montar (una vez)
useEffect(() => {
    console.log("Componente montado");
}, []);

// Ejecutar al montar y cuando cambie `count`
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);

// Cleanup al desmontar
useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
}, []);

// Fetch de datos
useEffect(() => {
    let cancelled = false;
    fetch("/api/data")
        .then(r => r.json())
        .then(data => { if (!cancelled) setData(data); });
    return () => { cancelled = true; };
}, []);
```

**Reglas de dependencias:** si usas una variable del componente dentro del effect, ponla en el array de dependencias.

---

## useContext: estado global sin prop drilling

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        // lógica de login
        setUser({ email });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
}

// Uso:
function App() {
    return (
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
    );
}

function Dashboard() {
    const { user, logout } = useAuth();
    return <button onClick={logout}>Salir, {user?.email}</button>;
}
```

---

## useReducer: estado complejo

```tsx
import { useReducer } from "react";

type State = { count: number; step: number };
type Action =
    | { type: "increment" }
    | { type: "decrement" }
    | { type: "setStep"; step: number };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + state.step };
        case "decrement":
            return { ...state, count: state.count - state.step };
        case "setStep":
            return { ...state, step: action.step };
        default:
            return state;
    }
}

function ContadorAvanzado() {
    const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "setStep", step: 5 })}>Step: 5</button>
        </div>
    );
}
```

---

## useMemo y useCallback: optimización

```tsx
import { useMemo, useCallback } from "react";

function Lista({ items, filtro }: { items: string[]; filtro: string }) {
    // useMemo: memoiza un valor calculado
    const filtrados = useMemo(
        () => items.filter(i => i.includes(filtro)),
        [items, filtro]  // Se recalcula solo si cambian estos
    );

    // useCallback: memoiza una función
    const handleClick = useCallback(
        (item: string) => console.log("Click:", item),
        []  // La función no cambia
    );

    return filtrados.map(item => (
        <div key={item} onClick={() => handleClick(item)}>{item}</div>
    ));
}
```

**No optimices prematuramente.** Usa useMemo/useCallback solo cuando haya un problema de performance real.

---

## Reglas de hooks

1. **Solo en el nivel superior** — no dentro de loops, condiciones o funciones anidadas
2. **Solo en componentes funcionales** — no en componentes de clase ni funciones normales
3. **El linter de React te avisa** — usa `eslint-plugin-react-hooks`

---

## Por qué importa

Los hooks son la base de React moderno. Sin entenderlos, no puedes manejar datos, estado global ni optimizar renders.

---

## La IA y hooks

### Lo bueno
- **Generar reducers:** describe el estado y acciones, la IA genera el reducer.
- **Debuggear dependencias:** la IA explica por qué un useEffect se ejecuta demasiado.
- **Sugerir optimizaciones:** la IA identifica renders innecesarios.

### Lo que no debes hacer
- **No optimices sin medir.** useMemo tiene costo; úsalo solo cuando vale la pena.
- **No ignores las reglas de hooks.** Hooks fuera del nivel superior causan bugs difíciles de debuggear.

---

## Desafío: app con contexto y reducer

**Objetivo:** refactorizar tu todo app para usar useReducer y useContext.

**Tu tarea:**
1. Reemplaza useState por useReducer para las tareas
2. Crea un contexto para compartir el estado de tareas entre componentes
3. Agrega un componente de estadísticas que use el contexto
4. Memoiza los cálculos de estadísticas con useMemo

**Bonus:** agrega undo/redo con un historial de estados en el reducer.

---

## Para seguir explorando

- **[React Hooks Reference](https://react.dev/reference/react)** — docs oficiales de cada hook.
- **[Use Hooks!](https://usehooks.com/)** — recetas de hooks comunes.

---

## Resumen

- **useEffect** maneja side effects: fetch, timers, DOM manipulation, subscriptions.
- **useContext** comparte estado global sin prop drilling.
- **useReducer** maneja estado complejo con acciones y un reducer.
- **useMemo** memoiza valores calculados; **useCallback** memoiza funciones.
- Las **reglas de hooks**: solo en nivel superior, solo en componentes funcionales.

En la próxima guía: **Enrutamiento con TanStack Router** — navegación SPA sin recargar la página.
