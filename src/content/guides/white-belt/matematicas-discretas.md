---
title: "Matemáticas discretas para programadores"
description: "Conjuntos, lógica booleana, grafos y Big O: las matemáticas que realmente usas cuando programas."
belt: white-belt
tags: [fundamentos, matematicas, logica]
order: 3
published: true
lastRevision: "2026-05-19"
---

No necesitas ser matemático para programar, pero sí necesitas entender los fundamentos discretos que están detrás de casi todo en computación: conjuntos, lógica booleana, grafos, combinatoria básica y notación de complejidad. Esta guía cubre exactamente lo que necesitas, nada más.

Si alguna vez te preguntaste por qué los `if` funcionan como funcionan, cómo una base de datos encuentra tus datos en milisegundos, o por qué algunos programas son lentos con muchos datos y otros no — la respuesta está aquí.

---

## Conjuntos: la base de todo

Un **conjunto** es simplemente una colección de elementos distintos. Eso suena básico, pero es la base de casi todo lo que haces en programación.

Cuando filtras una lista de usuarios, cuando haces una búsqueda en una base de datos, cuando verificas si un elemento existe en un array — estás trabajando con conjuntos.

### Operaciones fundamentales

**Unión (A ∪ B):** todos los elementos que están en A o en B.

```
A = {1, 2, 3}
B = {3, 4, 5}
A ∪ B = {1, 2, 3, 4, 5}
```

En código: un `Set` en JavaScript o Python que combina dos colecciones.

**Intersección (A ∩ B):** solo los elementos que están en ambos.

```
A = {1, 2, 3}
B = {3, 4, 5}
A ∩ B = {3}
```

En código: encontrar usuarios que están en dos grupos diferentes.

**Diferencia (A - B):** elementos que están en A pero no en B.

```
A = {1, 2, 3}
B = {3, 4, 5}
A - B = {1, 2}
```

En código: permisos que tiene un usuario pero que otro no.

**Subconjunto:** si todos los elementos de A están en B, entonces A es subconjunto de B.

```
A = {1, 2}
B = {1, 2, 3, 4}
A ⊆ B  →  verdadero
```

### Conjuntos en la vida real

- **Bases de datos SQL:** cada `SELECT` devuelve un conjunto. `JOIN` es una intersección. `UNION` es una unión.
- **Filtros en una app:** "mostrar usuarios activos que hicieron una compra este mes" = intersección de dos conjuntos.
- **Permisos:** "qué puede hacer un admin que no puede hacer un viewer" = diferencia de conjuntos.

![Diagrama visual de operaciones con conjuntos mostrando unión, intersección y diferencia con círculos de Venn estilizados](/content/guides/matematicas-discretas/01-venn-diagram.png)

*Operaciones básicas con conjuntos: unión, intersección y diferencia representadas con diagramas de Venn.*

---

## Lógica booleana: el lenguaje de las decisiones

Toda decisión que toma una computadora se reduce a **verdadero o falso**. No hay punto medio. Eso es lógica booleana, y fue formalizada por **George Boole** en 1854 — más de 80 años antes de que existiera la primera computadora electrónica.

### Los operadores fundamentales

**AND (∧):** verdadero solo si ambos son verdaderos.

| A | B | A AND B |
|---|---|---------|
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | F |

**OR (∨):** verdadero si al menos uno es verdadero.

| A | B | A OR B |
|---|---|--------|
| V | V | V |
| V | F | V |
| F | V | V |
| F | F | F |

**NOT (¬):** invierte el valor.

| A | NOT A |
|---|-------|
| V | F |
| F | V |

**XOR (⊕):** verdadero solo si son diferentes.

| A | B | A XOR B |
|---|---|---------|
| V | V | F |
| V | F | V |
| F | V | V |
| F | F | F |

### De las tablas de verdad al código

Cada `if`, `while` y `for` en tu código evalúa una expresión booleana:

```python
# AND en acción
if usuario.activo and usuario.tiene_permiso:
    acceder()

# OR en acción
if es_admin or es_moderador:
    editar_contenido()

# NOT en acción
if not archivo.existe():
    crear_archivo()

# Combinaciones
if (es_admin or es_moderador) and not usuario.baneado:
    moderar_comentario()
```

### Leyes de De Morgan

Dos reglas que te ahorran dolores de cabeza con condiciones complejas:

```
NOT (A AND B) = (NOT A) OR (NOT B)
NOT (A OR B)  = (NOT A) AND (NOT B)
```

En la práctica: `if not (activo and verificado)` es lo mismo que `if not activo or not verificado`. Saber esto te ayuda a simplificar condiciones difíciles de leer.

---

## Grafos: conectando las cosas

Un **grafo** es un conjunto de **nodos** (puntos) conectados por **aristas** (líneas). Suena abstracto hasta que te das cuenta de que los usas todos los días.

### El problema que empezó todo

En **1736**, **Leonhard Euler** resolvió un problema que llevaba años sin respuesta: ¿es posible cruzar los siete puentes de Königsberg (hoy Kaliningrado) pasando por cada puente exactamente una vez y volver al punto de partida?

Euler transformó el problema en un grafo: las tierras eran nodos y los puentes eran aristas. Demostró que era **imposible** porque todos los nodos tenían un número impar de conexiones. Así nació la **teoría de grafos**.

![Representación del problema de los puentes de Königsberg con nodos y aristas mostrando las conexiones imposibles](/content/guides/matematicas-discretas/02-konigsberg-graph.png)

*El problema de los siete puentes de Königsberg que dio origen a la teoría de grafos.*

### Tipos de grafos que importan

**Grafo no dirigido:** las conexiones van en ambos sentidos. Como una amistad en redes sociales.

**Grafo dirigido:** las conexiones tienen dirección. Como un follow en Twitter/X: yo puedo seguirte sin que tú me sigas.

**Grafo ponderado:** las aristas tienen un "peso" o costo. Como las distancias en un mapa o el tiempo de viaje.

**Árbol:** un grafo especial sin ciclos. Como el sistema de archivos de tu computadora o la estructura DOM de una página web.

### Grafos en tu vida como programador

- **Redes sociales:** quién sigue a quién es un grafo dirigido.
- **Google Maps:** encontrar la ruta más corta es un problema de grafos ponderados.
- **Sistema de archivos:** carpetas dentro de carpetas es un árbol.
- **Dependencias de un proyecto:** qué paquete necesita cuál es un grafo dirigido.
- **Internet:** las páginas web y sus links forman el grafo más grande que existe.

---

## Combinatoria básica: contando posibilidades

La combinatoria responde una pregunta simple: **¿cuántas formas hay de hacer algo?**

### Permutaciones: orden importa

¿De cuántas formas puedes ordenar 3 elementos?

```
[A, B, C] → ABC, ACB, BAC, BCA, CAB, CBA = 6 formas
```

La fórmula es **n!** (n factorial):

```
3! = 3 × 2 × 1 = 6
4! = 4 × 3 × 2 × 1 = 24
5! = 120
```

Esto importa cuando piensas en contraseñas, en generar combinaciones de tests, o en entender por qué ordenar datos tiene un costo.

### Combinaciones: orden no importa

¿Cuántos pares puedes formar con 4 personas?

```
{A, B}, {A, C}, {A, D}, {B, C}, {B, D}, {C, D} = 6 pares
```

La fórmula es **"n elige k"**:

```
C(n, k) = n! / (k! × (n-k)!)
C(4, 2) = 24 / (2 × 2) = 6
```

Esto aparece cuando calculas cuántos tests necesitas para cubrir combinaciones de inputs, o cuántos equipos puedes formar.

---

## Notación Big O: midiendo la eficiencia

Big O no es matemática pura — es una **herramienta práctica** para responder: *"¿qué pasa con mi código cuando los datos crecen?"*

### Los casos más comunes

**O(1) — Constante:** siempre tarda lo mismo, sin importar cuántos datos hay.

```python
# Acceder a un elemento por índice
valor = lista[5]  # O(1), sin importar si la lista tiene 10 o 10 millones
```

**O(n) — Lineal:** el tiempo crece proporcionalmente con los datos.

```python
# Buscar un elemento en una lista
for item in lista:
    if item == buscado:
        return item  # O(n), revisas cada elemento
```

**O(log n) — Logarítmico:** crece muy lento. Cada paso reduce el problema a la mitad.

```python
# Búsqueda binaria (en lista ordenada)
# 1000 elementos → ~10 pasos
# 1,000,000 elementos → ~20 pasos
```

**O(n²) — Cuadrático:** crece rápido. Típico de loops anidados.

```python
# Comparar cada par de elementos
for a in lista:
    for b in lista:
        comparar(a, b)  # O(n²), peligroso con muchos datos
```

### Comparación visual

| Elementos | O(1) | O(log n) | O(n) | O(n²) |
|-----------|------|----------|------|-------|
| 10 | 1 | ~3 | 10 | 100 |
| 1,000 | 1 | ~10 | 1,000 | 1,000,000 |
| 1,000,000 | 1 | ~20 | 1,000,000 | 1,000,000,000,000 |

Con un millón de datos, O(n²) hace **un billón** de operaciones. O(log n) hace solo **20**. La diferencia entre un programa que tarda un segundo y uno que tarda tres semanas.

![Gráfico comparativo de complejidades algorítmicas mostrando O(1), O(log n), O(n) y O(n²) con curvas de crecimiento](/content/guides/matematicas-discretas/03-big-o-chart.png)

*Comparación de cómo crece el tiempo de ejecución según la cantidad de datos. La diferencia entre O(n) y O(n²) es brutal.*

### Reglas prácticas

- Busca en una lista → **O(n)**. Usa un `Set` o `dict` → **O(1)**.
- Ordenar con loops anidados → **O(n²)**. Usa `sort()` del lenguaje → **O(n log n)**.
- Si tienes un loop dentro de otro loop sobre los mismos datos, probablemente sea **O(n²)**.
- Big O describe el **peor caso**, no el promedio.

---

## Un poco de historia: los gigantes sobre los que paramos

Las matemáticas discretas no nacieron con la computación — la computación nació de ellas.

**George Boole (1815-1864)** publicó *"Las Leyes del Pensamiento"* en 1854, donde formalizó la lógica como un sistema algebraico con valores verdadero y falso. Casi un siglo después, **Claude Shannon** demostró que el álgebra de Boole podía describir circuitos eléctricos. Ese artículo de 1937 es considerado la tesis de maestría más importante del siglo XX: conectó la lógica abstracta con la computación física.

**Leonhard Euler (1707-1783)** resolvió el problema de los puentes de Königsberg en 1736 y creó la teoría de grafos sin saberlo. Hoy, cada vez que Google Maps te encuentra una ruta o una red social te sugiere amigos, están usando grafos.

**Alan Turing (1912-1954)** formalizó qué significa "computar" con su Máquina de Turing, demostrando que una máquina simple con una cinta y reglas básicas podía simular cualquier proceso de cálculo. Tu computadora es, en esencia, una Máquina de Turing muy rápida.

---

## Por qué importa todo esto

No vas a usar tablas de verdad todos los días. Pero entender estos conceptos te da algo más valioso: **intuición**.

- **Bases de datos:** cada `JOIN`, `WHERE` y `IN` es una operación de conjuntos. Entender conjuntos te ayuda a escribir queries más eficientes.
- **Algoritmos:** Big O te dice si tu solución va a escalar o colapsar cuando los datos crezcan.
- **Búsqueda y navegación:** grafos están detrás de cada motor de búsqueda, cada sistema de recomendación, cada mapa.
- **Testing:** combinatoria te ayuda a pensar en cuántos casos de prueba necesitas y cuáles son los más importantes.
- **Lógica de negocio:** cada condición compleja se puede simplificar con las leyes de De Morgan y tablas de verdad.

Las matemáticas discretas son el **lenguaje oculto** de la computación. No las ves directamente, pero están en cada línea de código que escribes.

---

## La IA y las matemáticas discretas

La IA puede ser un tutor excelente para matemáticas discretas, pero con límites claros.

### Lo bueno

- **Explicar conceptos paso a paso**: si no entiendes algo como las leyes de De Morgan, la IA puede darte múltiples explicaciones con ejemplos distintos hasta que haga click.
- **Generar ejercicios de práctica**: pídele problemas de conjuntos, tablas de verdad o grafos con soluciones para verificar.
- **Visualizar**: la IA puede generar código Python que dibuje grafos o diagramas de Venn para que veas los conceptos en acción.

### Lo que no debes hacer

- **No uses la IA para resolver ejercicios sin intentarlo primero.** El valor está en el intento, no en la respuesta. Si te rindes rápido y le pides la solución, no estás aprendiendo.
- **No confíes ciegamente en los cálculos de la IA.** Los LLMs pueden cometer errores aritméticos. Siempre verifica.
- **No dejes que la IA simplifique expresiones lógicas por ti sin entender el proceso.** El objetivo es que tú puedas hacerlo mentalmente.

---

## Desafío: modelar un problema real con matemáticas discretas

**Objetivo**: aplicar conjuntos, lógica booleana y grafos a una situación real.

**Problema**: Diseña el sistema de permisos de una aplicación con tres roles: administrador, editor y lector.

- Los **administradores** pueden hacer todo: crear, editar, eliminar y leer contenido, además de gestionar usuarios.
- Los **editores** pueden crear, editar y leer contenido, pero no eliminar ni gestionar usuarios.
- Los **lectores** solo pueden leer contenido.

**Tu tarea**:

1. **Conjuntos**: define los conjuntos de permisos para cada rol. ¿Cuál es la unión de permisos de editores y lectores? ¿La intersección?
2. **Lógica booleana**: escribe las condiciones booleanas para verificar si un usuario puede realizar cada acción. Por ejemplo: `puede_eliminar = es_administrador`.
3. **Grafos**: dibuja un grafo donde los nodos sean los roles y las aristas representen qué permisos se heredan o comparten.
4. **Big O**: si tuvieras 10,000 usuarios y necesitaras verificar permisos para cada uno, ¿qué estructura de datos usarías para que la verificación sea O(1)?

---

## Para seguir explorando

- **Libro**: *"Discrete Mathematics and Its Applications"* de Kenneth Rosen — el libro de referencia, completo pero accesible.
- **Curso**: [Discrete Mathematics en Brilliant.org](https://brilliant.org/courses/discrete-math/) — interactivo y práctico.
- **Juego**: [Baba Is You](https://store.steampowered.com/app/736260/Baba_Is_You/) — un puzzle game que te entrena en lógica booleana sin que te des cuenta.
- **Artículo**: [Big O Cheatsheet](https://www.bigocheatsheet.com/) — referencia rápida de complejidades algorítmicas.

---

## Resumen

- Los **conjuntos** y sus operaciones (unión, intersección, diferencia) están detrás de cada consulta a base de datos y cada filtro en una app.
- La **lógica booleana** (AND, OR, NOT, XOR) es la base de cada decisión que toma tu código.
- Las **leyes de De Morgan** te ayudan a simplificar condiciones complejas.
- Los **grafos** modelan conexiones: redes sociales, mapas, sistemas de archivos, dependencias.
- La **combinatoria** te ayuda a contar posibilidades y planificar tests.
- La **notación Big O** te dice cómo escala tu código con más datos: O(1) es ideal, O(n²) es peligroso.
- Las matemáticas discretas son la **base invisible** de toda la computación moderna.

En la próxima guía vamos a explorar **algoritmos y estructuras de datos básicas**: cómo organizar y procesar información de forma eficiente. Ahí es donde todo lo que aprendiste aquí se pone en acción.
