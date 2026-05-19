---
term: "useEffect"
definition: "Un hook de React que ejecuta código con efectos secundarios después del render: fetch, timers, manipulación del DOM, subscriptions."
relatedGuides:
  - green-belt/hooks-esenciales
  - green-belt/react-desde-cero
tags: [react, hooks, efectos-secundarios, ciclo-vida]
lastRevision: "2026-05-19"
---

**`useEffect`** ejecuta side effects después de que React renderiza un componente:

```tsx
useEffect(() => {
    // Side effect
    const data = fetchData();
    setData(data);

    // Cleanup (opcional)
    return () => cleanup();
}, [dependencias]);  // Array de dependencias
```

Comportamiento según dependencias:
- `[]` → se ejecuta solo al montar
- `[count]` → se ejecuta al montar y cuando `count` cambia
- Sin array → se ejecuta en cada render

La **cleanup function** se ejecuta antes del próximo effect o al desmontar.

## Ver también

- [Hooks esenciales y manejo del ciclo de vida](/guides/green-belt/hooks-esenciales)
- [React desde cero: componentes, props y estado](/guides/green-belt/react-desde-cero)
