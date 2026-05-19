---
term: "TypeScript"
definition: "Un superset tipado de JavaScript que agrega anotaciones de tipo opcionales y verificación estática antes de la ejecución."
relatedGuides:
  - yellow-belt/typescript-desde-cero
  - green-belt/react-desde-cero
tags: [typescript, javascript, tipado, compilacion]
lastRevision: "2026-05-19"
---

**TypeScript** es un lenguaje desarrollado por Microsoft que extiende JavaScript con un sistema de tipos estático. Todo código JavaScript válido es TypeScript válido, pero TypeScript agrega:

- **Anotaciones de tipo:** `function sumar(a: number, b: number): number`
- **Interfaces y tipos:** `interface Usuario { nombre: string }`
- **Generics:** `function primero<T>(arr: T[]): T`
- **Enums:** `enum Rol { Admin, Viewer }`
- **Verificación en compilación:** errores de tipo antes de ejecutar

El compilador `tsc` transpila `.ts` a `.js` puro. Los tipos desaparecen en runtime.

## Ver también

- [TypeScript desde cero: tipado que salva vidas](/guides/yellow-belt/typescript-desde-cero)
- [React desde cero: componentes, props y estado](/guides/green-belt/react-desde-cero)
