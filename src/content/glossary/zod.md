---
term: "Zod"
definition: "Una biblioteca de validación y declaración de schemas para TypeScript que permite validar datos en runtime e inferir tipos automáticamente."
relatedGuides:
  - yellow-belt/json-y-manejo-de-datos
  - yellow-belt/typescript-desde-cero
tags: [zod, validacion, typescript, schemas]
lastRevision: "2026-05-19"
---

**Zod** es una biblioteca de validación de datos diseñada específicamente para TypeScript. Permite definir schemas que validan datos en runtime e infieren tipos de TypeScript automáticamente:

```typescript
import { z } from "zod";

const UsuarioSchema = z.object({
    nombre: z.string().min(1),
    email: z.string().email(),
    edad: z.number().min(0).max(120),
});

// Validar
const resultado = UsuarioSchema.safeParse(datos);
if (resultado.success) {
    // resultado.data tiene el tipo inferido
} else {
    // resultado.error.errors contiene los errores
}

// Inferir tipo
type Usuario = z.infer<typeof UsuarioSchema>;
```

Zod es preferido sobre alternativas como Joi o Yup porque la inferencia de tipos elimina la duplicación entre schemas de validación y tipos de TypeScript.

## Ver también

- [JSON y manejo de datos](/guides/yellow-belt/json-y-manejo-de-datos)
- [TypeScript desde cero: tipado que salva vidas](/guides/yellow-belt/typescript-desde-cero)
