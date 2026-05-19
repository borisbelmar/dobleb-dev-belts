---
title: "Control de flujo, funciones y módulos en Python"
description: "Condicionales, ciclos, funciones y módulos: cómo organizar tu código para construir programas complejos sin perder el control."
belt: white-belt
tags: [python, control-de-flujo, funciones, modulos]
order: 6
published: true
lastRevision: "2026-05-19"
---

Hasta ahora has escrito programas que van línea por línea, de arriba hacia abajo. Eso funciona para cosas simples, pero ¿qué pasa cuando necesitas que tu programa **tome decisiones**, **repita acciones** o **reutilice lógica**?

Aquí es donde el código deja de ser una lista de instrucciones y se convierte en algo más poderoso: un programa que piensa, repite y se organiza.

Esta guía cubre las cuatro herramientas fundamentales que te permiten construir programas complejos sin perder el control: **condicionales**, **ciclos**, **funciones** y **módulos**.

![Bloques de código organizados representando condicionales, ciclos, funciones y módulos como piezas de construcción](/content/guides/control-de-flujo-funciones-y-modulos/01-building-blocks.png)

*Las cuatro herramientas fundamentales para organizar tu código: condicionales, ciclos, funciones y módulos.*

---

## Condicionales: tu programa toma decisiones

La vida está llena de decisiones: *"si llueve, llevo paraguas; si no, uso lentes de sol"*. Los programas funcionan igual. Los **condicionales** permiten que tu código ejecute diferentes bloques según se cumplan o no ciertas condiciones.

### if, elif, else

La estructura básica en Python es:

```python
temperatura = 28

if temperatura > 30:
    print("Hace calor, mejor agua fría")
elif temperatura > 20:
    print("Temperatura agradable")
else:
    print("Hace frío, ponte una chaqueta")
```

- **`if`**: se ejecuta si la condición es verdadera.
- **`elif`** (else if): se evalúa solo si el `if` anterior fue falso. Puedes tener tantos `elif` como necesites.
- **`else`**: se ejecuta si ninguna condición anterior fue verdadera. Es opcional.

### Operadores de comparación

Para construir condiciones necesitas comparar valores:

| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| `==` | Igual a | `5 == 5` | `True` |
| `!=` | Diferente de | `5 != 3` | `True` |
| `>` | Mayor que | `5 > 3` | `True` |
| `<` | Menor que | `5 < 3` | `False` |
| `>=` | Mayor o igual | `5 >= 5` | `True` |
| `<=` | Menor o igual | `5 <= 3` | `False` |

⚠️ **Cuidado:** `=` asigna un valor, `==` compara. Es un error clásico confundirlos.

### Operadores lógicos: and, or, not

Cuando necesitas combinar múltiples condiciones:

```python
edad = 20
tiene_entrada = True

# and: ambas condiciones deben ser verdaderas
if edad >= 18 and tiene_entrada:
    print("Puede entrar al concierto")

# or: al menos una condición debe ser verdadera
if edad < 12 or edad >= 65:
    print("Descuento aplicado")

# not: invierte el valor booleano
if not tiene_entrada:
    print("Necesitas comprar una entrada primero")
```

### Anidamiento

Puedes meter condicionales dentro de otros condicionales:

```python
nota = 85

if nota >= 60:
    if nota >= 90:
        print("Excelente")
    else:
        print("Aprobado")
else:
    print("Reprobado")
```

---

## Ciclos: repetir sin repetirte

Escribir la misma línea 100 veces no es programar, es sufrimiento innecesario. Los **ciclos** (o bucles) te permiten repetir acciones de forma controlada.

### for: cuando sabes cuántas veces repetir

El `for` en Python itera sobre una secuencia:

```python
# Iterar sobre una lista
frutas = ["manzana", "banana", "cereza"]
for fruta in frutas:
    print(f"Me gusta la {fruta}")

# Usar range() para contar
for i in range(5):  # 0, 1, 2, 3, 4
    print(f"Iteración {i}")

# range con inicio y fin
for i in range(1, 6):  # 1, 2, 3, 4, 5
    print(f"Número {i}")

# range con paso
for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(f"Par: {i}")
```

### while: cuando no sabes cuántas veces

El `while` repite mientras una condición sea verdadera:

```python
contador = 0
while contador < 5:
    print(f"Contador: {contador}")
    contador += 1  # ¡No olvides esto o tendrás un ciclo infinito!
```

### break y continue

Control fino dentro de los ciclos:

```python
# break: sale del ciclo completamente
for i in range(10):
    if i == 7:
        print("¡Encontré el 7!")
        break
    print(i)

# continue: salta a la siguiente iteración
for i in range(10):
    if i % 2 == 0:
        continue  # salta los pares
    print(f"Impar: {i}")
```

### ¿Cuándo usar cuál?

| Situación | Usa |
|---|---|
| Recorrer una lista o rango conocido | `for` |
| Repetir hasta que pase algo | `while` |
| Leer datos hasta encontrar un valor | `while` + `break` |
| Saltar elementos que no te interesan | `for` + `continue` |

---

## Funciones: bloques reutilizables

Las funciones son la herramienta más importante para organizar código. Una función es un **bloque de código con nombre** que puedes ejecutar cuando quieras, tantas veces como necesites.

### Definir una función

```python
def saludar(nombre):
    """Saluda a una persona por su nombre."""
    return f"¡Hola, {nombre}!"

# Usar la función
mensaje = saludar("Ana")
print(mensaje)  # ¡Hola, Ana!
```

- **`def`**: palabra clave para definir una función.
- **Parámetros**: las variables que la función recibe (`nombre`).
- **`return`**: el valor que la función devuelve. Sin `return`, devuelve `None`.
- **Docstring**: la cadena entre `"""` que describe qué hace la función.

### Múltiples parámetros y valores por defecto

```python
def presentar(nombre, edad, ciudad="Desconocida"):
    print(f"{nombre}, {edad} años, vive en {ciudad}")

presentar("Carlos", 25)                    # Carlos, 25 años, vive en Desconocida
presentar("María", 30, "Madrid")           # María, 30 años, vive en Madrid
presentar(ciudad="Lima", edad=22, nombre="Luis")  # Argumentos con nombre
```

### Scope: dónde viven las variables

Las variables creadas dentro de una función **solo existen dentro de esa función**:

```python
x = 10  # Variable global

def mi_funcion():
    y = 20  # Variable local
    print(x)  # ✅ Puede ver variables globales
    print(y)  # ✅ Puede ver variables locales

mi_funcion()
print(y)  # ❌ Error: y no existe fuera de la función
```

### ¿Por qué son tan importantes?

**DRY — Don't Repeat Yourself**: si escribes el mismo código más de una vez, probablemente debería ser una función.

```python
# ❌ Sin funciones (repetitivo)
precio1 = 100
descuento1 = precio1 * 0.1
total1 = precio1 - descuento1

precio2 = 200
descuento2 = precio2 * 0.1
total2 = precio2 - descuento2

# ✅ Con funciones (limpio)
def calcular_total(precio, descuento=0.1):
    return precio - (precio * descuento)

total1 = calcular_total(100)
total2 = calcular_total(200)
```

Las funciones hacen tu código más **legible**, **testeable** y **fácil de mantener**.

---

## Módulos: código organizado en archivos

Cuando tu programa crece, poner todo en un solo archivo se vuelve caótico. Los **módulos** te permiten separar el código en archivos diferentes y reutilizarlo.

### Importar módulos estándar

Python viene con una biblioteca estándar enorme:

```python
# math: operaciones matemáticas
import math

print(math.pi)        # 3.141592653589793
print(math.sqrt(16))  # 4.0
print(math.ceil(3.2)) # 4

# random: números aleatorios
import random

print(random.randint(1, 10))  # Número entre 1 y 10
print(random.choice(["rojo", "verde", "azul"]))  # Elemento aleatorio

# os: interactuar con el sistema operativo
import os

print(os.getcwd())  # Directorio actual
```

### Importar solo lo que necesitas

```python
from math import pi, sqrt

print(pi)       # No necesitas el prefijo math.
print(sqrt(25)) # 5.0
```

### Crear tu propio módulo

Crea un archivo `operaciones.py`:

```python
# operaciones.py
def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Error: división por cero"
    return a / b
```

Luego úsalo desde otro archivo:

```python
# main.py
from operaciones import sumar, restar

resultado = sumar(5, 3)
print(resultado)  # 8
```

---

## Contexto histórico: la revolución de la programación estructurada

Antes de los años 60, los programas eran un caos de saltos incondicionales llamados **`goto`**. El código podía saltar de una línea a cualquier otra, creando lo que se conocía como **"código espagueti"**: imposible de seguir, mantener o debuggear.

![Representación visual del concepto "goto considered harmful": código espagueti enredado vs código estructurado limpio](/content/guides/control-de-flujo-funciones-y-modulos/02-structured-programming.png)

*De izquierda a derecha: el caos del código espagueti con goto vs la claridad de la programación estructurada.*

En **1968**, **Edsger W. Dijkstra** publicó una carta famosa titulada *"Go To Statement Considered Harmful"* en la revista *Communications of the ACM*. Su argumento era simple pero revolucionario: **los programas deben construirse con tres estructuras básicas**:

1. **Secuencia**: ejecutar instrucciones en orden.
2. **Selección**: condicionales (if/else).
3. **Iteración**: ciclos (for/while).

Con solo estas tres estructuras, puedes construir cualquier programa. Y lo más importante: el código queda **legible** y **razonable**.

Esta idea fundó lo que hoy llamamos **programación estructurada** y es la base de casi todos los lenguajes modernos. Python, JavaScript, Java, C++ — todos siguen estos principios.

Dijkstra también acuñó una frase que todo programador debería recordar:

> *"La programación no es solo saber escribir código. Es saber pensar con claridad."*

---

## Ejemplo integrador: juego de adivinanza

Veamos todo junto en un programa completo: un juego donde el usuario debe adivinar un número secreto.

```python
# juego_adivinanza.py
import random

def generar_numero_secreto(minimo=1, maximo=50):
    """Genera un número aleatorio dentro del rango."""
    return random.randint(minimo, maximo)

def pedir_intento(numero_intento):
    """Pide un número al usuario y lo valida."""
    while True:
        try:
            valor = int(input(f"\nIntento {numero_intento}: Ingresa un número (1-50): "))
            if 1 <= valor <= 50:
                return valor
            print("⚠️  El número debe estar entre 1 y 50.")
        except ValueError:
            print("⚠️  Eso no es un número válido. Intenta de nuevo.")

def dar_pista(intento, secreto):
    """Da una pista según qué tan cerca estuvo el jugador."""
    diferencia = abs(intento - secreto)
    if intento < secreto:
        if diferencia <= 5:
            print("🔥 ¡Muy cerca! Está más arriba.")
        else:
            print("⬆️  El número secreto es más alto.")
    else:
        if diferencia <= 5:
            print("🔥 ¡Muy cerca! Está más abajo.")
        else:
            print("⬇️  El número secreto es más bajo.")

def jugar():
    """Función principal del juego."""
    print("=" * 40)
    print("🎯  JUEGO DE ADIVINANZA")
    print("=" * 40)
    print("Estoy pensando en un número del 1 al 50...")
    print("Tienes 7 intentos para adivinarlo.")

    secreto = generar_numero_secreto()
    max_intentos = 7

    for intento_num in range(1, max_intentos + 1):
        intento = pedir_intento(intento_num)

        if intento == secreto:
            print(f"\n🎉 ¡Correcto! El número era {secreto}.")
            print(f"   Lo adivinaste en {intento_num} intento(s).")
            return True

        dar_pista(intento, secreto)
        restantes = max_intentos - intento_num
        if restantes > 0:
            print(f"   Te quedan {restantes} intento(s).")

    print(f"\n💔 ¡Se acabaron los intentos! El número era {secreto}.")
    return False

def preguntar_repetir():
    """Pregunta si el jugador quiere jugar de nuevo."""
    while True:
        respuesta = input("\n¿Quieres jugar de nuevo? (s/n): ").lower()
        if respuesta in ("s", "n"):
            return respuesta == "s"
        print("Por favor, ingresa 's' para sí o 'n' para no.")

# Punto de entrada del programa
if __name__ == "__main__":
    while True:
        jugar()
        if not preguntar_repetir():
            print("\n¡Gracias por jugar! 👋")
            break
```

Este ejemplo usa:
- **Módulos**: `import random`
- **Funciones**: 5 funciones con responsabilidades claras
- **Condicionales**: `if/elif/else` para pistas y validación
- **Ciclos**: `for` para los intentos, `while` para validación
- **Scope**: cada función maneja sus propias variables

---

## Por qué importa

Dominar condicionales, ciclos, funciones y módulos no es solo "sintaxis más". Es un cambio en **cómo piensas** sobre el código:

- **Organización**: en vez de un bloque gigante de 200 líneas, tienes funciones de 10-20 líneas con un propósito claro.
- **Legibilidad**: otro programador (o tú en dos semanas) puede entender qué hace cada parte sin leer todo el archivo.
- **Reutilización**: escribes una función una vez y la usas donde la necesites.
- **Testing**: es mucho más fácil probar una función pequeña que un programa entero.
- **Mantenimiento**: si algo falla, sabes exactamente dónde buscar.

Pensar en bloques reutilizables es la diferencia entre escribir código que funciona y escribir código que **dura**.

---

## La IA y la organización del código

La IA es particularmente buena escribiendo funciones y módulos bien organizados, lo que la hace tentadora... y peligrosa.

### Lo bueno

- **Refactorizar**: muéstrale una función larga y pregúntale cómo dividirla en funciones más pequeñas con responsabilidades claras.
- **Nombrar funciones**: si no sabes cómo llamar a una función, la IA te sugiere nombres descriptivos.
- **Detectar código duplicado**: la IA puede identificar patrones repetidos en tu código y sugerir abstracciones.
- **Explicar scope**: si no entiendes por qué una variable no está disponible en cierto lugar, la IA te lo explica con ejemplos.

### Lo que no debes hacer

- **No dejes que la IA organice tu código por ti.** Decidir qué va en cada función, qué parámetros recibe y qué retorna es una habilidad de diseño que solo se desarrolla haciéndolo.
- **No aceptes refactorizaciones sin entenderlas.** Si la IA reorganizó tu código en 5 funciones, lee cada una y entiende por qué esa división tiene sentido.
- **No copies módulos completos sin saber qué importan y por qué.** Entender las dependencias de tu programa es fundamental.

---

## Desafío: organizar un programa completo

**Objetivo**: demostrar que puedes usar condicionales, ciclos, funciones y módulos juntos en un programa bien organizado.

**Problema**: Crea un **juego de trivia** (preguntas y respuestas) en Python que:

1. Tenga al menos 5 preguntas con 4 opciones cada una y una respuesta correcta
2. Le haga las preguntas al usuario una por una
3. Lleve un puntaje (1 punto por respuesta correcta)
4. Al final muestre el puntaje total y un mensaje según el resultado:
   - 5/5: "¡Perfecto!"
   - 3-4: "¡Muy bien!"
   - 1-2: "Puedes mejorar"
   - 0: "Inténtalo de nuevo"

**Requisitos de organización**:
- Las preguntas deben estar en una estructura de datos (lista de diccionarios)
- Debe tener al menos 3 funciones: una para mostrar preguntas, una para verificar respuestas y una para mostrar resultados
- El código principal debe ser mínimo (solo llamar a las funciones)
- Usa `random` para mezclar el orden de las preguntas

**Bonus**: permite que el usuario elija la categoría de preguntas y guarda el puntaje más alto en un archivo de texto.

---

## Para seguir explorando

- **Documentación oficial**: [Python Tutorial — Control Flow](https://docs.python.org/3/tutorial/controlflow.html) — la guía oficial de Python sobre condicionales, ciclos y funciones.
- **Artículo**: [Go To Statement Considered Harmful](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf) — la carta original de Dijkstra que cambió la programación para siempre.
- **Práctica**: [Exercism — Python Track](https://exercism.org/tracks/python) — ejercicios gratuitos con mentoría para practicar funciones y control de flujo.
- **Libro**: *"Automate the Boring Stuff with Python"* de Al Sweigart — capítulo 3 sobre funciones, disponible gratis en línea.
- **Video**: [Python Functions — Programming with Mosh](https://www.youtube.com/watch?v=9Os0o3wzS_I) — tutorial visual sobre funciones en Python.

---

## Resumen

- Los **condicionales** (`if`, `elif`, `else`) permiten que tu programa tome decisiones basadas en condiciones.
- Los **operadores lógicos** (`and`, `or`, `not`) combinan múltiples condiciones en una sola expresión.
- Los **ciclos** (`for`, `while`) repiten acciones: `for` cuando sabes cuántas veces, `while` cuando depende de una condición.
- **`break`** sale del ciclo, **`continue`** salta a la siguiente iteración.
- Las **funciones** (`def`) encapsulan lógica reutilizable con parámetros y valores de retorno.
- El **scope** determina dónde existe una variable: las variables locales solo viven dentro de su función.
- Los **módulos** organizan código en archivos separados; Python incluye una biblioteca estándar enorme (`math`, `random`, `os`).
- La **programación estructurada** de Dijkstra eliminó el caos del `goto` y estableció las bases de todo el código moderno.

En la próxima guía vamos a ver **manejo de errores y debugging básico**: porque los errores van a pasar, y saber cómo encontrarlos y arreglarlos es una de las habilidades más valiosas que puedes tener como programador.
