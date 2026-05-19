---
term: "Función pura"
definition: "Una función que siempre devuelve el mismo output para el mismo input y no tiene efectos secundarios (no modifica estado externo)."
relatedGuides:
  - green-belt/programacion-funcional-vs-orientada-a-objetos
  - green-belt/react-desde-cero
tags: [funcional, pureza, inmutabilidad, paradigmas]
lastRevision: "2026-05-19"
---

Una **función pura** cumple dos condiciones:

1. **Determinista:** mismo input → mismo output siempre
2. **Sin efectos secundarios:** no modifica variables externas, no hace I/O, no muta argumentos

```typescript
// ✅ Pura
function sumar(a: number, b: number): number { return a + b; }

// ❌ Impura: depende de estado externo
let total = 0;
function addToTotal(n: number) { total += n; return total; }

// ❌ Impura: efecto secundario (I/O)
function logAndReturn(value: any) { console.log(value); return value; }
```

Las funciones puras son fáciles de testear, memoizar y ejecutar en paralelo.

## Ver también

- [Paradigmas: programación funcional vs orientada a objetos](/guides/green-belt/programacion-funcional-vs-orientada-a-objetos)
- [React desde cero: componentes, props y estado](/guides/green-belt/react-desde-cero)
