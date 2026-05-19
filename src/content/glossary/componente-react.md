---
term: "Componente (React)"
definition: "Una función que recibe props y devuelve elementos JSX que React renderiza en el DOM."
relatedGuides:
  - green-belt/react-desde-cero
  - green-belt/hooks-esenciales
tags: [react, componentes, frontend, jsx]
lastRevision: "2026-05-19"
---

Un **componente** en React es una función que recibe datos (props) y devuelve una descripción de UI (JSX):

```tsx
function Saludo({ nombre }: { nombre: string }) {
    return <h1>Hola, {nombre}!</h1>;
}
```

Los componentes pueden tener estado local (`useState`), efectos secundarios (`useEffect`) y componerse unos dentro de otros. Son la unidad fundamental de construcción en React.

## Ver también

- [React desde cero: componentes, props y estado](/guides/green-belt/react-desde-cero)
- [Hooks esenciales y manejo del ciclo de vida](/guides/green-belt/hooks-esenciales)
