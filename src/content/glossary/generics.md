---
term: "Generics"
definition: "Un mecanismo de TypeScript que permite crear funciones y tipos reutilizables que trabajan con múltiples tipos sin perder la información de tipo."
relatedGuides:
  - yellow-belt/typescript-desde-cero
  - green-belt/orms-con-prisma
tags: [typescript, generics, tipos, reutilizacion]
lastRevision: "2026-05-19"
---

Los **generics** permiten parametrizar tipos de la misma forma que las funciones parametrizan valores:

```typescript
function primero<T>(arr: T[]): T {
    return arr[0];
}
// T se infiere automáticamente:
primero([1, 2, 3]);    // T = number, retorno: number
primero(["a", "b"]);   // T = string, retorno: string

// Con restricciones
function obtener<T extends { id: number }>(arr: T[], id: number): T | undefined {
    return arr.find(item => item.id === id);
}
```

Los generics son esenciales para crear utilidades reutilizables que mantienen la seguridad de tipos. Sin generics, tendrías que usar `any` y perder toda la protección.

## Ver también

- [TypeScript desde cero: tipado que salva vidas](/guides/yellow-belt/typescript-desde-cero)
- [ORMs con Prisma: tu base de datos en TypeScript](/guides/green-belt/orms-con-prisma)
