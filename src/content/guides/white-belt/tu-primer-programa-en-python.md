---
title: "Tu primer programa en Python"
description: "Instala Python, escribe tu primer programa y pierde el miedo a la terminal. El punto de partida de todo programador."
belt: white-belt
tags: [python, fundamentos, primer-programa]
order: 5
published: true
lastRevision: "2026-05-19"
---

Llegó el momento. Hasta ahora aprendiste qué es una computadora, cómo piensa un programador y qué son los algoritmos. Pero hay una diferencia enorme entre **entender** estos conceptos y **ponerlos en práctica**.

En esta guía vas a escribir tu primer programa real. No un ejercicio de libro de texto, sino algo que puedas ejecutar, modificar y mostrarle a alguien con orgullo. Y lo vamos a hacer con Python, el lenguaje que más programadores ha creado en la historia.

---

## Instalación y setup

Antes de escribir código, necesitas las herramientas. No te preocupes, es más fácil de lo que parece.

### Instalar Python

Python viene preinstalado en muchas computadoras, pero vamos a asegurarnos de tener una versión reciente (3.10 o superior).

**En macOS:**
```bash
# Verifica si ya tienes Python
python3 --version

# Si no está, instálalo con Homebrew
brew install python3
```

**En Windows:**
Descarga el instalador desde [python.org](https://www.python.org/downloads/) y asegúrate de marcar la casilla **"Add Python to PATH"** durante la instalación.

**En Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

**Verifica la instalación:**
```bash
python3 --version
# Deberías ver algo como: Python 3.12.x
```

### Elegir un editor: VS Code

Necesitas un lugar donde escribir código. Podrías usar el bloc de notas, pero no querrías. Un buen editor te ayuda con colores, autocompletado y detección de errores.

[**Visual Studio Code**](https://code.visualstudio.com/) es gratuito, ligero y el editor más popular del mundo. Instálalo y agrega la extensión oficial de Python (Microsoft) para tener autocompletado y ejecución directa.

![Pantalla de VS Code con Python instalado mostrando autocompletado y syntax highlighting](/content/guides/tu-primer-programa-en-python/01-vscode-python-setup.png)

*VS Code con la extensión de Python: tu nuevo hogar para escribir código.*

---

## Tu primer programa

Abre VS Code, crea un archivo nuevo y guárdalo como `hola.py`. La extensión `.py` le dice al sistema que es un archivo de Python.

Escribe lo siguiente:

```python
# hola.py — Tu primer programa
print("¡Hola, mundo!")
```

Ejecútalo desde la terminal:

```bash
python3 hola.py
```

Deberías ver:
```
¡Hola, mundo!
```

¡Felicidades! Acabas de escribir y ejecutar tu primer programa.

### ¿Qué pasó exactamente?

Desglosemos esa única línea:

- **`print()`** es una **función** de Python. Una función es un bloque de código que hace algo específico. `print` toma lo que le das y lo muestra en la pantalla.
- **`"¡Hola, mundo!"`** es un **string** (cadena de texto). En Python, los strings van entre comillas (simples `'...'` o dobles `"..."`).
- Los **paréntesis** `()` le dicen a Python: "ejecuta esta función con este valor".
- El **`#`** inicia un comentario. Python ignora todo lo que sigue en esa línea. Los comentarios son notas para ti y otros humanos.

### Ejecutar Python de forma interactiva

Python también tiene un modo interactivo donde puedes escribir código y ver resultados al instante. Útil para experimentar:

```bash
python3
```

Verás un prompt `>>>`. Escribe expresiones y presiona Enter:

```python
>>> 2 + 2
4
>>> print("Probando desde la consola interactiva")
Probando desde la consola interactiva
>>> exit()  # Sale del modo interactivo
```

---

## Conceptos básicos de Python

Ahora que ya ejecutaste tu primer programa, vamos a conocer las herramientas fundamentales del lenguaje.

### Variables: guardar información

Una variable es como una caja con etiqueta donde guardas un valor:

```python
# Variables en Python
nombre = "Ada"
edad = 25
altura = 1.65
es_programador = True

print(nombre)       # Ada
print(edad)         # 25
```

En Python **no necesitas declarar el tipo** de la variable. El lenguaje lo infiere automáticamente. Y los nombres de variables pueden usar letras, números y guiones bajos, pero no pueden empezar con un número.

### Tipos de datos básicos

Python tiene varios tipos de datos fundamentales:

```python
# str (string) — texto
mensaje = "Hola, Python"

# int (entero) — números sin decimales
cantidad = 42

# float (decimal) — números con punto decimal
precio = 19.99

# bool (booleano) — verdadero o falso
activo = True
```

Puedes verificar el tipo de cualquier valor con `type()`:

```python
>>> type(42)
<class 'int'>
>>> type("hola")
<class 'str'>
>>> type(3.14)
<class 'float'>
```

### La función print()

Ya conoces `print()`, pero puede hacer más que mostrar texto simple:

```python
# Múltiples valores separados por espacio
print("Nombre:", "Ada", "Edad:", 25)

# Usar f-strings (la forma más limpia de combinar texto y variables)
nombre = "Ada"
edad = 25
print(f"Hola, me llamo {nombre} y tengo {edad} años")

# Operaciones dentro del print
print(f"El doble de {edad} es {edad * 2}")
```

Los **f-strings** (cadenas con `f` antes de las comillas) son tu mejor amigo. Permiten meter variables directamente dentro del texto usando `{}`.

### La función input(): interactuar con el usuario

`input()` lee lo que el usuario escribe en la terminal:

```python
nombre = input("¿Cómo te llamas? ")
print(f"¡Hola, {nombre}! Bienvenido a Python.")
```

**Importante:** `input()` siempre devuelve un **string**. Si necesitas un número, debes convertirlo:

```python
edad = input("¿Cuántos años tienes? ")
edad_numero = int(edad)  # Convierte string a entero
print(f"El próximo año tendrás {edad_numero + 1}")
```

### Operaciones básicas

```python
# Aritmética
suma = 10 + 5       # 15
resta = 10 - 5      # 5
multi = 10 * 5      # 50
div = 10 / 5        # 2.0 (siempre devuelve float)
div_entera = 10 // 3  # 3 (división sin decimales)
modulo = 10 % 3     # 1 (resto de la división)
potencia = 2 ** 10  # 1024

# Comparaciones (devuelven bool)
es_mayor = 10 > 5       # True
es_igual = 10 == 10     # True (ojo: == compara, = asigna)
es_distinto = 10 != 5   # True
```

---

## Tu primer mini-proyecto: Adivina el número

Vamos a juntar todo lo que aprendiste en un programa interactivo. El juego es simple: la computadora "piensa" un número y tú tienes que adivinarlo.

```python
# adivina_numero.py — Tu primer mini-proyecto
import random

print("🎯 ¡Adivina el número!")
print("Estoy pensando en un número del 1 al 20...")

# La computadora elige un número al azar
numero_secreto = random.randint(1, 20)
intentos = 0
adivinaste = False

while not adivinaste:
    # Pedir al jugador que ingrese un número
    intento = input("Tu número: ")
    intento = int(intento)  # Convertir a entero
    intentos = intentos + 1

    if intento == numero_secreto:
        adivinaste = True
        print(f"🎉 ¡Correcto! El número era {numero_secreto}")
        print(f"Lo adivinaste en {intentos} intento(s)")
    elif intento < numero_secreto:
        print("Más alto... ⬆️")
    else:
        print("Más bajo... ⬇️")

print("¡Gracias por jugar!")
```

### Cómo ejecutarlo

```bash
python3 adivina_numero.py
```

### Qué está pasando aquí

- **`import random`** — importa un módulo de Python que genera números aleatorios. Un **módulo** es un archivo con código que puedes reutilizar.
- **`random.randint(1, 20)`** — genera un número entero al azar entre 1 y 20.
- **`while not adivinaste:`** — un bucle que se repite mientras no adivines. Lo veremos en detalle en la próxima guía.
- **`if / elif / else`** — estructura condicional que decide qué mensaje mostrar según tu respuesta.

![Ilustración del juego 'Adivina el número' mostrando la interacción entre usuario y terminal con pistas de más alto/más bajo](/content/guides/tu-primer-programa-en-python/02-adivina-numero-game.png)

*El juego 'Adivina el número': tu primer programa interactivo combinando variables, input, condiciones y bucles.*

### Desafío: mejóralo

Una vez que funcione, intenta agregar estas mejoras:

1. **Validación**: ¿Qué pasa si el usuario escribe "abc" en vez de un número?
2. **Límite de intentos**: El jugador solo tiene 5 intentos.
3. **Nivel de dificultad**: Pedir al inicio si quiere jugar del 1-10 (fácil), 1-50 (medio) o 1-100 (difícil).

No te preocupes si no sabes cómo hacer todo esto todavía. La próxima guía cubre exactamente las herramientas que necesitas.

---

## Contexto histórico: ¿por qué Python?

Python fue creado por **Guido van Rossum**, un programador holandés, a finales de los 80 en el CWI (Centro de Matemáticas e Informática) de los Países Bajos. Guido quería un lenguaje que fuera **legible, simple y divertido** de usar.

### El nombre

Contra lo que muchos creen, Python **no se llama así por la serpiente**. El nombre viene de **Monty Python's Flying Circus**, el legendario grupo de comedia británico. Guido era fan del show y quería un nombre corto, memorable y un poco misterioso.

### La filosofía del lenguaje

Python tiene una filosofía explícita que puedes ver escribiendo `import this` en la consola:

```python
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
...
```

El "Zen de Python" refleja los valores del lenguaje: claridad sobre astucia, legibilidad sobre brevedad, y simplicidad sobre complejidad.

### De dónde viene su popularidad

Python no siempre fue el lenguaje más popular. Durante años estuvo detrás de Java, C y JavaScript. Pero varias cosas cambiaron:

- **La explosión de la ciencia de datos** (2010s): bibliotecas como NumPy, Pandas y Matplotlib hicieron de Python la herramienta estándar para analizar datos.
- **El machine learning y la IA**: TensorFlow, PyTorch y scikit-learn consolidaron a Python como el lenguaje de la inteligencia artificial.
- **La educación**: universidades de todo el mundo adoptaron Python como primer lenguaje de programación por su simplicidad.
- **La web**: frameworks como Django y Flask permitieron construir aplicaciones web completas.

Hoy Python es consistentemente el **lenguaje más popular del mundo** según el índice TIOBE y GitHub Octoverse.

---

## Por qué importa

Aprender Python es aprender a **pensar como programador**. Su sintaxis limpia y la indentación obligatoria te enseñan disciplina desde el primer día.

Ahora, **opinión personal con cariño**: Python es excelente para dar tus primeros pasos, pero no lo veo como el lenguaje más versátil del mundo. Hay otros con una comunidad de desarrollo mucho más madura y enfocada en construir software real: **TypeScript**, por ejemplo, te lleva del frontend al backend con tipado estricto, un ecosistema enorme y una comunidad de desarrolladores (no solo analistas de datos) que construyen aplicaciones todos los días.

Pero para empezar, para perder el miedo y entender los conceptos fundamentales, Python cumple perfecto. Ya tendrás tiempo de pelear con otros lenguajes después.

---

## La IA y tu primer programa

Python es uno de los lenguajes donde la IA es más útil... y más peligrosa para un principiante.

### Lo bueno

- **Explicar errores**: cuando Python te muestra un error que no entiendes, pégaselo a la IA y te lo explica en español simple.
- **Sugerir mejoras**: muéstrale tu código y pregúntale cómo lo haría más legible o más Pythonico.
- **Generar ejercicios**: pídele problemas prácticos para practicar lo que acabas de aprender.
- **Documentar**: la IA puede ayudarte a escribir docstrings y comentarios claros para tu código.

### Lo que no debes hacer

- **No le pidas a la IA que escriba tu programa completo.** Si tu primer programa lo escribe la IA, no aprendiste nada. El valor está en escribirlo tú, equivocarte, leer el error y corregirlo.
- **No copies código de la IA sin ejecutarlo línea por línea.** Si no sabes qué hace cada línea, no es tu código.
- **No uses la IA como atajo para entender los fundamentos.** Los tipos de datos, las variables, las funciones — todo eso tienes que entenderlo con tu cabeza, no delegarlo.

La IA es excelente como **tutor personal** que te explica cosas cuando te trabas. Es terrible como **reemplazo** de tu propio aprendizaje.

---

## Desafío: tu segundo programa

**Objetivo**: demostrar que puedes escribir un programa interactivo desde cero.

**Problema**: Crea un programa de **calculadora de propinas** que:

1. Le pregunte al usuario el total de la cuenta
2. Le pregunte qué porcentaje de propina quiere dejar (10%, 15%, 20%)
3. Le pregunte entre cuántas personas se divide la cuenta
4. Muestre:
   - El monto de la propina
   - El total con propina incluida
   - Cuánto le corresponde pagar a cada persona

**Requisitos**:
- Usa `input()` para leer los datos del usuario
- Convierte los strings a números con `float()` e `int()`
- Usa f-strings para mostrar los resultados con 2 decimales
- Maneja el caso donde el usuario ingresa algo que no es un número (puedes usar `try/except` o simplemente asumir que ingresa números válidos por ahora)

**Bonus**: agrega validación para que si el usuario ingresa un porcentaje inválido (menor a 0 o mayor a 50), le pida que intente de nuevo.

---

## Para seguir explorando

- **[Documentación oficial de Python](https://docs.python.org/es/3/)** — el tutorial oficial está en español y es excelente.
- **[Automate the Boring Stuff with Python](https://automatetheboringstuff.com/)** — libro gratuito online, perfecto para principiantes que quieren hacer cosas prácticas.
- **[Exercism — Python Track](https://exercism.org/tracks/python)** — ejercicios interactivos con mentoría gratuita.
- **[Python para todos](https://www.py4e.com/)** — curso gratuito del Dr. Charles Severance, disponible en español.

---

## Resumen

- Python se instala fácil y funciona en cualquier sistema operativo.
- `print()` muestra información en pantalla, `input()` lee lo que escribe el usuario.
- Los tipos básicos son: **str** (texto), **int** (enteros), **float** (decimales), **bool** (verdadero/falso).
- Las variables guardan valores y Python infiere su tipo automáticamente.
- Los **f-strings** (`f"texto {variable}"`) son la forma más limpia de combinar texto y variables.
- `import` permite usar código de otros módulos, como `random` para números aleatorios.
- Python fue creado por Guido van Rossum y se llama así por Monty Python, no por la serpiente.
- Es el lenguaje más popular del mundo y puerta de entrada a IA, datos, web y automatización.

En la próxima guía vamos a profundizar en **control de flujo, funciones y módulos en Python**: las herramientas que te permiten escribir programas más complejos, organizados y reutilizables. Ahí es donde la magia realmente empieza.
