---
title: "Algoritmos y estructuras de datos básicas"
description: "Arrays, pilas, colas y diccionarios: cómo organizar datos para que tus programas sean eficientes desde el día uno."
belt: white-belt
tags: [fundamentos, algoritmos, estructuras-de-datos]
order: 4
published: true
lastRevision: "2026-05-19"
---

Elegir la estructura de datos correcta puede hacer que tu programa sea **1000 veces más rápido**. Elegir la incorrecta puede hacer que una tarea que debería tomar milisegundos tarde minutos. No es exageración: es la diferencia entre una app que funciona bien y una que nadie quiere usar.

Pero antes de hablar de estructuras, necesitamos entender qué es un **algoritmo**. Porque las estructuras de datos y los algoritmos van de la mano: una organiza la información, el otro la procesa.

---

## ¿Qué es un algoritmo?

Un algoritmo es simplemente una **receta**: una secuencia finita de pasos bien definidos para resolver un problema.

Piensa en cómo preparas un café:

1. Hervir agua
2. Poner café en el filtro
3. Verter el agua sobre el café
4. Esperar a que pase
5. Servir

Eso es un algoritmo. Tiene un inicio, pasos claros y un resultado. Si sigues los pasos en orden, siempre obtienes café. Si los cambias, obtienes algo diferente (o un desastre).

En programación, los algoritmos hacen lo mismo: toman datos de entrada, los procesan siguiendo reglas y producen un resultado. Ordenar una lista, buscar un contacto en tu teléfono, calcular la ruta más corta en un mapa — todo son algoritmos.

### Las propiedades de un buen algoritmo

- **Finito**: termina en algún momento (no es un bucle infinito)
- **Definido**: cada paso es claro y sin ambigüedad
- **Entrada**: recibe cero o más datos
- **Salida**: produce al menos un resultado
- **Efectivo**: cada paso se puede realizar en tiempo finito

---

## Estructuras de datos: cómo organizas la información

Si un algoritmo es la receta, la **estructura de datos** es cómo organizas los ingredientes. ¿Los guardas todos en un mismo cajón? ¿Los separas por tipo? ¿Los ordenas alfabéticamente? La forma en que organizas los datos determina qué tan rápido puedes encontrarlos, agregarlos o modificarlos.

Veamos las estructuras fundamentales.

### Arrays (arreglos)

Un array es una **lista ordenada** de elementos, donde cada uno tiene una posición (índice). Es como una fila de casilleros numerados: sabes exactamente dónde está cada cosa.

```python
# Un array de lenguajes de programación
lenguajes = ["Python", "JavaScript", "Rust", "Go"]

# Acceder por índice (empieza en 0)
print(lenguajes[0])   # "Python"
print(lenguajes[2])   # "Rust"

# Agregar al final
lenguajes.append("TypeScript")

# Longitud
print(len(lenguajes))  # 5
```

**Cuándo usar:** cuando necesitas acceso rápido por posición, cuando los elementos tienen un orden natural, o cuando iteras sobre todos ellos.

**Ventaja:** acceso instantáneo a cualquier elemento por su índice.

**Desventaja:** insertar o eliminar en el medio es lento (hay que mover todo lo demás).

![Ilustración de un array como fila de casilleros numerados con diferentes lenguajes de programación en cada casilla, estilo educativo limpio con colores suaves](/content/guides/algoritmos-y-estructuras-de-datos/01-array-lockers.png)

*Un array es como una fila de casilleros: cada elemento tiene una posición fija y conocida.*

### Listas enlazadas (linked lists)

Una lista enlazada resuelve el problema de inserción del array. En vez de casilleros fijos, cada elemento **apunta al siguiente**. Es como una cadena de eslabones: cada eslabón sabe quién viene después.

```python
# Representación conceptual de una lista enlazada
class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.siguiente = None

# Crear: A -> B -> C
primero = Nodo("A")
primero.siguiente = Nodo("B")
primero.siguiente.siguiente = Nodo("C")
```

**Cuándo usar:** cuando necesitas insertar o eliminar elementos frecuentemente en cualquier posición.

**Ventaja:** insertar y eliminar es rápido (solo cambias las referencias).

**Desventaja:** no puedes acceder directamente al elemento 50 — tienes que recorrer los 49 anteriores.

### Pilas (stack)

Una pila funciona con la regla **LIFO** (Last In, First Out): el último en entrar es el primero en salir. Como una pila de platos: tomas el de arriba, no el de abajo.

```python
# Una pila usando una lista de Python
pila = []

# Push: agregar al tope
pila.append("plato_1")
pila.append("plato_2")
pila.append("plato_3")

# Pop: sacar del tope
ultimo = pila.pop()  # "plato_3"

print(pila)  # ["plato_1", "plato_2"]
```

**Cuándo usar:** deshacer/rehacer (Ctrl+Z), navegación (botón "atrás" del navegador), evaluación de expresiones, llamadas a funciones.

**Ejemplo real:** cuando presionas Ctrl+Z, el programa saca la última acción de una pila y la deshace.

### Colas (queue)

Una cola funciona con la regla **FIFO** (First In, First Out): el primero en entrar es el primero en salir. Como una fila en el supermercado: el que llegó primero es el primero en ser atendido.

```python
from collections import deque

cola = deque()

# Encolar: agregar al final
cola.append("cliente_1")
cola.append("cliente_2")
cola.append("cliente_3")

# Desencolar: sacar del frente
primero = cola.popleft()  # "cliente_1"

print(list(cola))  # ["cliente_2", "cliente_3"]
```

**Cuándo usar:** tareas en espera, impresión de documentos, mensajes en un chat, procesamiento de solicitudes en un servidor.

### Diccionarios (hash maps)

Un diccionario almacena datos como **pares clave-valor**. En vez de buscar por posición, buscas por nombre. Es como un diccionario real: buscas la palabra y obtienes su definición.

```python
# Un diccionario de contactos
contactos = {
    "Ana": "ana@email.com",
    "Carlos": "carlos@email.com",
    "Diana": "diana@email.com"
}

# Acceso directo por clave
print(contactos["Ana"])  # "ana@email.com"

# Agregar nuevo contacto
contactos["Elena"] = "elena@email.com"

# Verificar si existe
if "Carlos" in contactos:
    print("Carlos está en la agenda")
```

**Cuándo usar:** cuando necesitas buscar datos por un identificador (nombre, ID, email), cuando quieres asociar valores con claves.

**Ventaja:** búsqueda casi instantánea, sin importar cuántos elementos haya.

**Desventaja:** no mantiene un orden predecible (en algunos lenguajes) y usa más memoria que un array.

![Comparación visual de las cuatro estructuras de datos principales: array como fila de cajas, pila como torre de discos, cola como fila de personas, y diccionario como libro de direcciones abierto](/content/guides/algoritmos-y-estructuras-de-datos/02-data-structures-comparison.png)

*Las cuatro estructuras fundamentales: cada una resuelve un tipo diferente de problema.*

---

## Un poco de historia: de dónde vienen estas ideas

### Al-Khwarizmi y el origen de la palabra "algoritmo"

La palabra **algoritmo** viene del nombre de **Muhammad ibn Musa al-Khwarizmi**, un matemático persa del siglo IX que trabajaba en la Casa de la Sabiduría en Bagdad. Su libro *"Sobre el cálculo con números hindúes"* introdujo el sistema numérico que hoy usamos (los llamados "números arábigos") y describió métodos sistemáticos para resolver ecuaciones.

Cuando sus obras se tradujeron al latín en la Europa medieval, su nombre se latinizó como *"Algoritmi"*. De ahí viene la palabra que usamos hoy.

### Ada Lovelace y el primer algoritmo

Casi mil años después, en **1843**, **Ada Lovelace** escribió lo que se considera el primer algoritmo diseñado para ser procesado por una máquina. Trabajando con la Máquina Analítica de Charles Babbage, Ada describió paso a paso cómo calcular los **números de Bernoulli** — una secuencia matemática compleja.

Lo revolucionario no fue el cálculo en sí, sino la idea: **una máquina podía seguir instrucciones para manipular símbolos**, no solo hacer aritmética. Esa visión es la base de toda la programación moderna.

### La evolución de las estructuras de datos

Las estructuras de datos que usamos hoy no aparecieron de golpe. Se fueron desarrollando a medida que los programadores se topaban con problemas que las estructuras existentes no resolvían bien:

- Los **arrays** son tan antiguos como la programación misma — las primeras computadoras necesitaban una forma de almacenar secuencias de datos.
- Las **listas enlazadas** fueron formalizadas en los años 50-60 con lenguajes como Lisp, que necesitaba estructuras flexibles.
- Las **tablas hash** (diccionarios) se inventaron en los años 50 y se volvieron esenciales cuando los programas empezaron a manejar grandes cantidades de datos que necesitaban búsqueda rápida.

Cada estructura nació de un problema real. No son abstracciones arbitrarias: son soluciones que la comunidad fue refinando durante décadas.

---

## ¿Cómo elegir la estructura correcta?

No existe una estructura "mejor" en general. Cada una tiene su fuerte y su débil. Aquí va una guía rápida:

| Necesitas... | Usa... |
|---|---|
| Acceso rápido por posición | Array |
| Insertar/eliminar en cualquier posición | Lista enlazada |
| "Deshacer" la última acción | Pila (stack) |
| Procesar en orden de llegada | Cola (queue) |
| Buscar por nombre o ID | Diccionario |

### Un ejemplo del mundo real

Imagina que estás construyendo un sistema para un restaurante:

- **La cola de pedidos:** los pedidos llegan y se atienden en orden → **cola**
- **El historial de cambios en un pedido:** si el cliente modifica algo, puede deshacer → **pila**
- **El menú del día:** una lista fija de platos → **array**
- **La base de datos de clientes:** buscar por nombre o email → **diccionario**

Cada parte del sistema usa la estructura que mejor se adapta a su necesidad.

---

## Por qué importa: el factor 1000x

Elegir la estructura correcta no es una optimización prematura — es una **decisión de diseño fundamental**.

Imagina que tienes una lista de 1 millón de usuarios y necesitas encontrar a "María García":

- **Buscando en un array:** revisas uno por uno hasta encontrarla. En el peor caso, 1 millón de operaciones.
- **Buscando en un diccionario:** vas directo a la clave "María García". Una operación.

Esa diferencia se multiplica con cada búsqueda. En una app con miles de usuarios haciendo búsquedas simultáneas, la diferencia entre usar la estructura correcta y la incorrecta es la diferencia entre una app que responde en milisegundos y una que tarda segundos.

No necesitas memorizar algoritmos complejos para empezar. Pero sí necesitas entender que **la forma en que organizas los datos importa**, y que cada estructura tiene un propósito.

---

## La IA y las estructuras de datos

La IA puede escribir código que usa estructuras de datos, pero elegir la correcta sigue siendo tu responsabilidad.

### Lo bueno

- **Comparar estructuras**: pídele a la IA que compare cuándo usar un array vs un diccionario para tu caso específico.
- **Visualizar**: la IA puede generar código que muestre cómo se comporta una pila o una cola paso a paso.
- **Analizar complejidad**: muéstrale tu código y pregúntale cuál es la complejidad temporal de cada operación.

### Lo que no debes hacer

- **No dejes que la IA elija la estructura de datos por ti.** Si no entiendes por qué una estructura es mejor que otra para tu caso, vas a terminar con código ineficiente sin saberlo.
- **No copies implementaciones de hash maps o listas enlazadas sin entenderlas.** En la práctica usarás las que vienen con el lenguaje, pero entender cómo funcionan por dentro te hace mejor programador.
- **No ignores Big O porque "la IA optimiza después".** La optimización tardía es una receta para problemas de rendimiento difíciles de arreglar.

---

## Desafío: elegir la estructura correcta

**Objetivo**: demostrar que puedes elegir la estructura de datos adecuada para cada situación.

**Problema**: Estás diseñando el backend de una red social pequeña. Necesitas manejar:

1. Una lista de publicaciones que se muestran en orden cronológico (la más reciente primero)
2. Un sistema de "me gusta" donde puedes verificar rápidamente si un usuario ya dio like a una publicación
3. Un historial de publicaciones eliminadas que permita restaurar la última que borraste
4. Una cola de notificaciones pendientes que se envían en orden de llegada

**Tu tarea**:

1. Para cada caso, identifica qué estructura de datos usarías y **explica por qué**.
2. Estima la complejidad temporal (Big O) de las operaciones principales en cada caso.
3. ¿Qué pasaría si usaras la estructura incorrecta? Describe el impacto en rendimiento.

**Bonus**: implementa uno de los cuatro casos en Python y verifica que tu elección de estructura funciona como esperabas.

---

## Para seguir explorando

- **Visualización interactiva**: [VisuAlgo](https://visualgo.net/en) — visualiza cómo funcionan las estructuras de datos y los algoritmos paso a paso.
- **Libro**: *"Grokking Algorithms"* de Aditya Bhargava — una introducción visual y amigable a algoritmos y estructuras de datos.
- **Video**: [Data Structures Easy to Advanced](https://www.youtube.com/watch?v=RBSGKlAvoiM) — un recorrido completo desde lo básico hasta lo avanzado.
- **Práctica**: [LeetCode](https://leetcode.com/) — problemas de algoritmos organizados por dificultad (empieza por los "Easy").
- **Artículo**: [Big O Cheat Sheet](https://www.bigocheatsheet.com/) — referencia rápida de complejidad temporal y espacial de cada estructura.

---

## Resumen

- Un **algoritmo** es una secuencia de pasos para resolver un problema, como una receta de cocina.
- Un **array** es una lista ordenada con acceso rápido por posición, pero lenta para insertar en el medio.
- Una **lista enlazada** permite inserciones y eliminaciones rápidas, pero el acceso secuencial es lento.
- Una **pila (stack)** sigue LIFO: el último en entrar es el primero en salir. Ideal para deshacer/rehacer.
- Una **cola (queue)** sigue FIFO: el primero en entrar es el primero en salir. Ideal para procesamiento en orden.
- Un **diccionario (hash map)** almacena pares clave-valor con búsqueda casi instantánea.
- Elegir la estructura correcta puede hacer tu programa **órdenes de magnitud más rápido**.
- Cada estructura nació de un problema real — no son abstracciones arbitrarias.

En la próxima guía vamos a poner todo esto en práctica con **tu primer programa en Python**: vas a escribir código real, ejecutarlo y ver cómo estos conceptos cobran vida.
