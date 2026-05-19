---
name: dev-belts-guide-writer
description: >
  Write a new guide for the DevBelts platform (dev-belts.dobleb.cl).
  Use this skill whenever the user wants to create a guide, mentions a topic
  from the curriculum, says "escribir una guía", "crear guía", "nueva guía",
  or references any entry from a belt's _INDEX.md. Also use when the user
  wants to update or rewrite an existing guide. Even if the user just says
  "let's write about X" where X matches a planned guide topic, trigger this skill.
---

# DevBelts Guide Writer

Escribe guías educativas para DevBelts — un sitio de guías de programación
organizadas en 4 niveles tipo cinturones (White, Yellow, Green, Black).

## Flujo de trabajo

### 1. Identificar la guía

Lee el `_INDEX.md` del belt correspondiente en `src/content/guides/{belt}/_INDEX.md`
para confirmar el tema, slug y orden. Si la guía no existe en el índice,
pregunta al usuario antes de proceder.

### 2. Verificar el slug

El slug del archivo debe coincidir con el definido en el `_INDEX.md`.
Ejemplo: `que-es-el-software.md` para el slug `que-es-el-software`.

### 3. Generar imágenes (si aplica)

Crea el directorio `public/content/guides/{slug}/` y genera imágenes con
nanobanana que acompañen el contenido. Nómbralas con prefijo numérico:
`01-nombre.png`, `02-nombre.png`, etc.

Las imágenes deben ser:
- Diagramas técnicos claros para conceptos abstractos
- Ilustraciones históricas cuando se mencionen figuras relevantes
- Diagramas de flujo para procesos y secuencias

Referencia las imágenes en el markdown con rutas absolutas:
`/content/guides/{slug}/01-nombre.png`

### 4. Escribir la guía

Sigue la estructura y lineamientos de abajo.

### 5. Extraer términos para el glosario

Revisa la guía escrita e identifica conceptos clave que merecen una entrada
en el glosario. Un buen término de glosario es:
- Un concepto técnico que se menciona por primera vez o se explica en la guía
- Algo que el lector podría necesitar consultar rápidamente después
- Un término que aparece en múltiples guías o que será relevante en el futuro

Para cada término identificado, crea un archivo en `src/content/glossary/{term}.md`:

```yaml
---
term: "Nombre del Término"
definition: "Definición clara y concisa (1-2 oraciones)."
relatedGuides:
  - belt/slug-de-la-guia
tags: [tag1, tag2]
lastRevision: "YYYY-MM-DD"
---

Una breve explicación ampliada con un ejemplo si aplica.

## Ejemplo

```js
// código si aplica
```

## Ver también

- [Guía relacionada](/guides/belt/slug)
```

**No sobre-extractar.** 2-5 términos por guía es suficiente. Solo conceptos
que valgan la pena tener como referencia rápida. Evita términos que ya son
obvios o que solo tienen sentido dentro del contexto de esa única guía.

**NO incluyas un H1 en el markdown del glosario.** El término ya se renderiza
desde el frontmatter (`term`) en el template. El contenido empieza directamente
con el primer párrafo.

### 6. Actualizar el índice

Cambia el estado de la guía en `_INDEX.md` de `planned` a `published`.

### 7. Verificar el build

Ejecuta `pnpm astro check && pnpm build` para confirmar que no hay errores.

---

## Estructura de la guía

### Frontmatter

```yaml
---
title: "Título de la guía"
description: "Una línea corta que dice qué aprenderás e invita a leer."
belt: white-belt | yellow-belt | green-belt | black-belt
tags: [tag1, tag2]
order: 1
published: true
lastRevision: "YYYY-MM-DD"
---
```

**Reglas del frontmatter:**
- `title`: En español, descriptivo.
- `description`: **Corta y directa.** Dice qué se aprenderá, no es un resumen
  extenso. Máximo 1-2 oraciones. Ejemplo: "Qué es el hardware, qué es el
  software, cómo se comunican y por qué entender esto te hace mejor programador
  desde el día uno."
- `belt`: El cinturón correspondiente.
- `tags`: 2-4 tags relevantes en minúsculas.
- `order`: El número del `_INDEX.md`.
- `lastRevision`: Fecha actual en formato YYYY-MM-DD.

### Contenido

**NO incluyas un H1 (`# Título`) en el markdown.** El título ya se renderiza
desde el frontmatter en el template. El contenido empieza directamente con
el primer párrafo.

La estructura de headings debe ser:
- `##` para secciones principales (aparecen en el TOC)
- `###` para subsecciones (aparecen indentadas en el TOC)

El TOC se genera automáticamente desde los H2 y H3.

---

## Lineamientos de contenido

### Tono

- **Amigable y cercano.** Habla de tú a tú, como un colega que sabe más.
- **Español neutro siempre.** Evita el voceo (formas como "podés", "tenés", "hacé").
  Usa "puedes", "tienes", "haz". Ocasionalmente se permite una palabra o expresión
  chilena ("bacán", "al tiro", "fome"), pero sin exagerar.
- **Educativo pero no académico.** Explica con claridad, sin tecnicismos
  innecesarios. Cuando uses un término técnico, explícalo.
- **Con criterio.** No solo digas "cómo", explica "por qué importa".

### Estructura recomendada

1. **Gancho inicial.** Un párrafo que enganche — una pregunta, una analogía,
   o una afirmación que haga querer seguir leyendo.

2. **Conceptos fundamentales.** Explica las bases antes de avanzar.
   Usa analogías del mundo real cuando ayuden.

3. **Contexto histórico.** Incluye figuras y momentos clave de la historia
   de la computación. Ada Lovelace, Alan Turing, los mainframes, la web —
   estos personajes dan profundidad y hacen la guía más interesante.
   No es necesario ser exhaustivo; la idea es invitar a investigar más.

4. **Ejemplos prácticos.** Código, diagramas, comparaciones. Los bloques
   de código deben ser cortos y claros.

5. **Por qué importa.** Una sección que conecte el tema con la práctica
   real del desarrollo de software.

6. **La IA y [tema de la guía].** Una sección que explique cómo usar
   asistentes de IA de forma productiva con el tema de la guía.
   - **Lo bueno:** 3-4 puntos concretos de cómo la IA puede ayudar
     (explicar conceptos, generar ejercicios, revisar código, etc.)
   - **Lo que no debes hacer:** 2-3 advertencias claras sobre no delegar
     el pensamiento crítico a la IA. La IA es tutor, no reemplazo.
     Ejemplos: no pedir que resuelva problemas por ti, no copiar sin
     entender, no dejar que tome decisiones de diseño.
   - **Nota:** Si el tema no tiene relación directa con la IA (ej. hardware
     básico), omite esta sección.

7. **Desafío.** Un ejercicio práctico que demuestre lo aprendido.
   Debe ser concreto, con un problema real y requisitos claros.
   Incluye un "bonus" opcional para quienes quieran ir más allá.
   El desafío debe poder resolverse con lo enseñado en la guía.

8. **Para seguir explorando.** Recursos externos: libros, videos, juegos,
   artículos. Siempre con enlaces y una breve descripción de cada uno.

9. **Resumen.** Lista concisa de los puntos clave (bullet points).

10. **Teaser de la próxima guía.** Un párrafo que anticipe lo que viene
    y genere expectativa.

### Longitud

Las guías pueden ser extensas. No hay límite superior. Lo importante es que
cada sección aporte valor y no relleno. Si algo se puede decir en menos
palabras, dílo en menos palabras.

### Imágenes

- Genera imágenes con nanobanana cuando el concepto lo requiera.
- No generes imágenes decorativas — cada imagen debe enseñar algo.
- Incluye siempre un pie de foto en cursiva debajo de cada imagen.
- Usa `alt` descriptivo en las imágenes.

---

## Ejemplo de estructura

```markdown
---
title: "¿Qué es el software y cómo funciona una computadora?"
description: "Qué es el hardware, qué es el software, cómo se comunican y por qué entender esto te hace mejor programador desde el día uno."
belt: white-belt
tags: [fundamentos, hardware, software, historia]
order: 1
published: true
lastRevision: "2025-01-15"
---

Antes de escribir tu primera línea de código, hay una pregunta fundamental...

---

## ¿Qué es una computadora?

...

### Las partes fundamentales

...

## Un poco de historia: de dónde viene todo esto

...

### Ada Lovelace: la primera programadora

...

---

## Para seguir explorando

- **Libro**: *"Code"* de Charles Petzold — ...

---

## La IA y [tema]

### Lo bueno
- ...

### Lo que no debes hacer
- ...

---

## Desafío: [título]

**Objetivo**: ...

**Problema**: ...

**Tu tarea**: ...

---

## Resumen

- Una computadora procesa información...
- El hardware son las partes físicas...

En la próxima guía vamos a explorar...
```

---

## Checklist final

Antes de dar la guía por terminada:

- [ ] Frontmatter completo y correcto
- [ ] Sin H1 duplicado en el markdown
- [ ] Descripción corta e invitadora
- [ ] Imágenes generadas y referenciadas correctamente
- [ ] Sección "La IA y [tema]" con lo bueno y lo que no hacer (si aplica al tema)
- [ ] Sección "Desafío" con ejercicio práctico y bonus opcional
- [ ] Sección "Para seguir explorando" con recursos externos
- [ ] Sección "Resumen" con puntos clave
- [ ] Teaser de la próxima guía
- [ ] `_INDEX.md` actualizado a `published`
- [ ] Términos de glosario extraídos y creados (2-5 por guía)
- [ ] `pnpm astro check && pnpm build` pasa sin errores
