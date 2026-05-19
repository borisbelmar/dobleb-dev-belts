---
title: "Manejo de errores y debugging básico"
description: "Aprende a leer errores de Python, usar el debugger y desarrollar el instinto para encontrar bugs antes de que te encuentren a ti."
belt: white-belt
tags: [python, debugging, errores, fundamentos]
order: 7
published: true
lastRevision: "2026-05-19"
---

Si hay una certeza absoluta en programación, es esta: **tu código va a fallar**. No es cuestión de si, sino de cuándo. Y la diferencia entre un programador junior que entra en pánico y uno que resuelve el problema en minutos no es cuánto sabe, sino **cómo reacciona ante el error**.

En esta guía vas a aprender a leer mensajes de error como un detective, usar herramientas de debugging y desarrollar la calma necesaria para resolver bugs sin perder la cabeza.

---

## Los errores son tu amigo (en serio)

Cuando Python muestra un error en rojo, no te está regañando. Te está dando **información precisa** sobre qué salió mal y dónde. El problema es que los mensajes de error parecen jeroglíficos al principio. Vamos a decodificarlos.

### Anatomía de un traceback

Un **traceback** es el rastro que deja Python cuando algo falla. Muestra la cadena de llamadas que llevó al error:

```python
# error_ejemplo.py
def saludar(nombre):
    return "Hola, " + nombre

def presentar(nombre):
    saludo = saludar(nombre)
    print(saludo.upper())
    print(saludo.len())  # Error: los strings no tienen método .len()

presentar("Ada")
```

Cuando ejecutas esto, Python muestra:

```
Traceback (most recent call last):
  File "error_ejemplo.py", line 10, in <module>
    presentar("Ada")
  File "error_ejemplo.py", line 7, in presentar
    print(saludo.len())
          ^^^^^^^^^^^
AttributeError: 'str' object has no attribute 'len'
```

Vamos línea por línea:

1. **`Traceback (most recent call last)`** — significa que Python te muestra las llamadas desde la más reciente hasta la más antigua.
2. **`File "error_ejemplo.py", line 10`** — el error empezó cuando se llamó a `presentar("Ada")` en la línea 10.
3. **`File "error_ejemplo.py", line 7`** — dentro de `presentar`, el problema está en la línea 7.
4. **`AttributeError: 'str' object has no attribute 'len'`** — esta es la clave: intentaste usar `.len()` en un string, pero ese método no existe.

**Regla de oro:** siempre lee la **última línea** del traceback primero. Ahí está el tipo de error y la descripción. Luego sube para ver dónde ocurrió.

---

## Tipos de errores en Python

Python tiene varios tipos de errores. Conocerlos te ayuda a saber qué buscar.

### SyntaxError: el código no es Python válido

Ocurre cuando escribes algo que Python no entiende gramaticalmente:

```python
# Faltan dos puntos después del if
if x > 10
    print("mayor")

# SyntaxError: expected ':'
```

```python
# Paréntesis sin cerrar
print("Hola"

# SyntaxError: unexpected EOF while parsing
```

**Cómo resolverlo:** Python te dice exactamente en qué línea está el problema. Revisa la sintaxis: dos puntos, paréntesis, comillas, indentación.

### NameError: nombre no definido

Usaste una variable o función que no existe o no fue creada todavía:

```python
print(mensaje)
# NameError: name 'mensaje' is not defined

# El error: nunca creaste la variable 'mensaje'
```

```python
def saludar():
    print("Hola")

saludar()
saluda()  # NameError: name 'saluda' is not defined
```

**Causas comunes:**
- Escribiste mal el nombre de la variable (`mensaje` vs `mesage`)
- Usaste una variable antes de asignarle un valor
- Confundiste mayúsculas y minúsculas (`Nombre` ≠ `nombre`)

### TypeError: tipo de dato incorrecto

Intentaste hacer una operación con un tipo de dato que no la soporta:

```python
edad = 25
print("Tengo " + edad + " años")
# TypeError: can only concatenate str (not "int") to str
```

```python
numeros = [1, 2, 3]
numeros.append([4, 5])  # Funciona, pero no hace lo que esperas
numeros + 10
# TypeError: can only concatenate list (not "int") to list
```

**Cómo resolverlo:** usa `type()` para verificar qué tipo de dato tienes, y convierte con `str()`, `int()`, `float()` cuando sea necesario.

### ValueError: valor inapropiado

El tipo es correcto, pero el valor no tiene sentido para la operación:

```python
numero = int("hola")
# ValueError: invalid literal for int() with base 10: 'hola'
```

```python
import math
math.sqrt(-4)
# ValueError: math domain error
```

### IndexError y KeyError: acceso fuera de rango

```python
frutas = ["manzana", "banana", "naranja"]
print(frutas[5])
# IndexError: list index out of range
```

```python
persona = {"nombre": "Ada", "edad": 25}
print(persona["email"])
# KeyError: 'email'
```

### AttributeError: atributo o método inexistente

Intentaste usar un método que el objeto no tiene (como el ejemplo del traceback que vimos arriba).

---

## Try/Except: manejar errores con elegancia

Hasta ahora, cuando algo falla, Python se detiene. Pero puedes **capturar** errores y decidir qué hacer:

```python
# manejo_basico.py
try:
    numero = int(input("Ingresa un número: "))
    resultado = 100 / numero
    print(f"100 dividido por {numero} es {resultado}")
except ValueError:
    print("Eso no es un número válido.")
except ZeroDivisionError:
    print("No puedes dividir por cero.")
except Exception as e:
    print(f"Ocurrió un error inesperado: {e}")
```

### Cómo funciona

- **`try`** — el bloque de código que *podría* fallar.
- **`except`** — qué hacer si ocurre un error específico.
- **`except Exception as e`** — captura cualquier otro error no previsto. La variable `e` contiene la información del error.

### El bloque `else` y `finally`

```python
try:
    archivo = open("datos.txt", "r")
    contenido = archivo.read()
except FileNotFoundError:
    print("El archivo no existe.")
else:
    # Se ejecuta solo si NO hubo error
    print("Archivo leído correctamente:")
    print(contenido)
finally:
    # Se ejecuta SIEMPRE, haya error o no
    print("Proceso terminado.")
```

### No captures errores que no puedes manejar

Un anti-patrón común es capturar todo y no hacer nada:

```python
# MALO: silencia el error y no da información
try:
    hacer_algo_complejo()
except:
    pass
```

Esto hace que los bugs sean imposibles de encontrar. Si capturas un error, al menos loguéalo:

```python
# MEJOR: al menos sabes que algo falló
try:
    hacer_algo_complejo()
except Exception as e:
    print(f"Error en hacer_algo_complejo: {e}")
```

---

## Debugging: el arte de encontrar bugs

Cuando el error no es obvio, necesitas herramientas más sofisticadas que leer el traceback.

### Debugging con print(): la vieja confiable

No le tengas miedo a `print()`. Es la herramienta de debugging más usada en el mundo, sin exagerar:

```python
def calcular_promedio(numeros):
    print(f"[DEBUG] números recibidos: {numeros}")
    print(f"[DEBUG] tipo: {type(numeros)}")
    print(f"[DEBUG] cantidad: {len(numeros)}")

    total = 0
    for n in numeros:
        print(f"[DEBUG] sumando {n}, total parcial: {total + n}")
        total += n

    promedio = total / len(numeros)
    print(f"[DEBUG] promedio calculado: {promedio}")
    return promedio

calcular_promedio([8, 9, 7, 10])
```

El prefijo `[DEBUG]` te ayuda a identificar rápidamente qué es output de debugging y qué es output normal del programa.

**Cuándo usar print debugging:**
- Programas pequeños y simples
- Para verificar el valor de una variable en un punto específico
- Cuando necesitas entender el flujo de ejecución

**Cuándo NO usar print debugging:**
- Programas grandes con muchos archivos
- Bugs que solo ocurren en ciertas condiciones (necesitas breakpoints)
- Cuando necesitas inspeccionar el estado paso a paso

### El debugger de Python: pdb

Python viene con un debugger integrado llamado `pdb` (Python Debugger). Es más potente que `print()` porque te permite **pausar** la ejecución y explorar el estado del programa:

```python
# con_debugger.py
import pdb

def procesar_datos(datos):
    resultado = []
    for item in datos:
        pdb.set_trace()  # La ejecución se pausa aquí
        procesado = transformar(item)
        resultado.append(procesado)
    return resultado

def transformar(item):
    return item.upper()

procesar_datos(["hola", "mundo"])
```

Cuando la ejecución llega a `pdb.set_trace()`, se abre un prompt interactivo:

```
> /path/con_debugger.py(9)procesar_datos()
-> procesado = transformar(item)
(Pdb)
```

**Comandos esenciales de pdb:**

| Comando | Acción |
|---------|--------|
| `n` (next) | Ejecuta la siguiente línea |
| `s` (step) | Entra dentro de la función |
| `c` (continue) | Continúa hasta el próximo breakpoint o el final |
| `p variable` | Imprime el valor de una variable |
| `l` (list) | Muestra el código alrededor de la línea actual |
| `q` (quit) | Sale del debugger |
| `pp variable` | Imprime con formato bonito (pretty print) |

```
(Pdb) p item
'hola'
(Pdb) p datos
['hola', 'mundo']
(Pdb) p resultado
[]
(Pdb) n
> /path/con_debugger.py(10)procesar_datos()
-> resultado.append(procesado)
(Pdb) p procesado
'HOLA'
```

### Debugging en VS Code

VS Code tiene un debugger visual integrado que es mucho más cómodo que `pdb`:

1. Abre tu archivo `.py`
2. Haz clic al lado del número de línea donde quieres pausar (aparece un punto rojo)
3. Presiona `F5` o ve al menú Run → Start Debugging
4. El programa se pausa en el breakpoint y puedes ver variables, hacer step over, step into, etc.

![VS Code debugger con breakpoint activo mostrando variables locales y controles de step over/step into](/content/guides/manejo-de-errores-y-debugging/01-vscode-debugger.png)

*El debugger visual de VS Code: breakpoints, variables inspeccionables y controles de navegación paso a paso.*

---

## Estrategias de debugging

Más allá de las herramientas, lo que importa es **cómo piensas** el problema.

### 1. Reproduce el bug consistentemente

Si no puedes reproducirlo, no puedes arreglarlo. Identifica exactamente qué input o secuencia de acciones causa el error.

### 2. Divide y conquista

Si tienes 200 líneas de código y no sabes dónde está el bug, comenta la mitad. ¿Sigue fallando? El bug está en la otra mitad. Repite hasta acotar.

### 3. Verifica tus suposiciones

La mayoría de los bugs ocurren porque **asumiste algo que no era cierto**:

```python
# Asumes que datos siempre es una lista
def procesar(datos):
    return len(datos)

# Pero alguien te pasó None
procesar(None)  # TypeError: object of type 'NoneType' has no len()
```

Usa `print(type(variable))` o el debugger para verificar que lo que crees que es, realmente es.

### 4. Rubber duck debugging

Explica tu código línea por línea en voz alta (a un pato de goma, a la pared, a quien sea). El simple acto de verbalizar lo que hace cada línea frecuentemente revela el bug.

### 5. Lee el mensaje de error completo

El 80% de las veces, el mensaje de error te dice exactamente qué está mal. No lo ignores, no lo escrolees sin leer. **Léelo.**

---

## Assert: validar suposiciones en tu código

`assert` te permite verificar que una condición sea verdadera durante la ejecución:

```python
def dividir(a, b):
    assert b != 0, "El divisor no puede ser cero"
    return a / b

dividir(10, 2)  # OK: 5.0
dividir(10, 0)  # AssertionError: El divisor no puede ser cero
```

`assert` es útil para **validar suposiciones internas** de tu código. No es para manejar errores del usuario (para eso usa `try/except`), sino para detectar bugs en tu propia lógica.

**Nota:** `assert` se puede desactivar con `python -O`. No lo uses para validación crítica en producción.

---

## Un poco de historia: Grace Hopper y el primer bug

![Ilustración estilo vintage de Grace Hopper trabajando con el Harvard Mark II y la famosa polilla encontrada en el relé](/content/guides/manejo-de-errores-y-debugging/02-grace-hopper-bug.png)

*Grace Hopper y el Harvard Mark II: donde se documentó el primer "bug" real — una polilla atrapada en un relé.*

El término **"bug"** para describir un error de software viene de **Grace Hopper**, pionera de la computación y contraalmirante de la Marina de los Estados Unidos. En 1947, mientras trabajaba en el Harvard Mark II, el equipo encontró una polilla real atrapada en un relé que causaba fallos. Hopper pegó la polilla en el logbook con la nota *"First actual case of bug being found."*

El cuaderno original está en el Smithsonian National Museum of American History. Grace Hopper también fue fundamental en el desarrollo de **COBOL**, uno de los primeros lenguajes de programación de alto nivel, y popularizó la idea de que los programas deberían estar escritos en lenguaje humano, no en código máquina.

Curiosamente, el término "bug" ya lo había usado Thomas Edison en 1878 para describir defectos en sus inventos, pero fue Hopper quien lo popularizó en el contexto de la computación.

---

## Por qué importa

Saber debugging es la habilidad que más separa a programadores junior de seniors. Un senior no es alguien que no comete errores — es alguien que **encuentra y resuelve errores rápido**.

Las herramientas cambian (pdb, VS Code, Chrome DevTools, logs en producción), pero la mentalidad es la misma:

1. **No entres en pánico.** Los errores son información, no fracasos.
2. **Sé metódico.** Aísla el problema, verifica suposiciones, reproduce consistentemente.
3. **Aprende de cada bug.** Cada error que resuelves te hace mejor programador.

---

## La IA y el debugging

La IA es probablemente la herramienta de debugging más poderosa que existe hoy, pero hay que usarla bien.

### Lo bueno

- **Explicar errores oscuros:** pega el traceback completo y la IA te explica qué significa en español simple, con ejemplos de cómo resolverlo.
- **Sugerir dónde poner breakpoints:** describe tu bug y la IA puede sugerirte los puntos estratégicos para inspeccionar.
- **Revisar tu lógica:** muéstrale una función que no funciona como esperas y pregúntale "¿qué ves de raro aquí?".
- **Generar casos de prueba:** pídele inputs edge case que podrían romper tu función.

### Lo que no debes hacer

- **No le pegues código con datos sensibles.** Tracebacks de producción pueden contener paths, nombres de usuario, tokens. Revisa antes de pegar.
- **No aceptes la primera solución sin entenderla.** La IA puede sugerir fixes que funcionan pero que no entiendes. Si no entiendes por qué funciona, no lo merges.
- **No delegues el razonamiento.** La IA te ayuda a debuggear, pero el proceso de pensar "¿qué asumí mal?" es tuyo y es el que te hace mejor.

---

## Desafío: el bug hunt

**Objetivo:** encontrar y corregir todos los bugs en el siguiente código.

**Problema:** este programa debería leer una lista de nombres y notas de estudiantes, calcular el promedio de cada uno y decir quiénes aprobaron (nota >= 4.0):

```python
# buggy.py — Encuentra todos los bugs
def calcular_promedios(estudiantes):
    resultados = []
    for nombre, notas in estudiantes:
        promedio = sum(notas) / len(notas)
        resultados.append({
            "nombre": nombre,
            "promedio": promedio,
            "aprobado": promedio >= 4.0
        })
    return resultados

def mostrar_resultados(resultados):
    for r in resultados:
        estado = "Aprobado" if r["aprobado"] else "Reprobado"
        print(f"{r['nombre']}: {r['promedio']} - {estado}")

def main():
    estudiantes = [
        ("Ada", [6.5, 7.0, 5.5]),
        ("Alan", [3.0, 2.5, 4.0]),
        ("Grace", [5.0, 6.0, 5.5]),
        ("Tim", [1.0, 0.5, None]),
    ]

    resultados = calcular_promedios(estudiantes)
    mostrar_resultados(resultados)

main()
```

**Pistas:**
1. Hay al menos 3 bugs diferentes
2. Uno causa un crash inmediato
3. Otro produce un resultado incorrecto
4. El tercero es un error de lógica

**Tu tarea:**
- Identifica cada bug
- Explica por qué ocurre
- Corrígelo
- Agrega manejo de errores para que el programa no crashee con datos inválidos

**Bonus:** agrega validación para que las notas estén entre 1.0 y 7.0, y un reporte final con estadísticas (mejor promedio, peor promedio, porcentaje de aprobación).

---

## Para seguir explorando

- **[Python pdb documentation](https://docs.python.org/3/library/pdb.html)** — la documentación oficial del debugger.
- **[VS Code Python Debugging](https://code.visualstudio.com/docs/python/debugging)** — guía completa del debugger visual.
- **[The Art of Debugging](https://www.greenteapress.com/thinkpython/html/book012.html)** — capítulo sobre debugging de "Think Python".
- **[Rubber Duck Debugging](https://rubberduckdebugging.com/)** — la explicación oficial (y divertida) de esta técnica.

---

## Resumen

- Los **tracebacks** son tu mejor aliado: lee la última línea primero para ver el tipo de error.
- Los errores comunes en Python son: **SyntaxError**, **NameError**, **TypeError**, **ValueError**, **IndexError**, **KeyError**, **AttributeError**.
- **`try/except`** te permite capturar errores y decidir cómo responder en vez de crashear.
- **`print()` debugging** es válido y útil para programas pequeños; **pdb** y el debugger de VS Code son mejores para problemas complejos.
- Los comandos clave de pdb: `n` (next), `s` (step), `c` (continue), `p` (print variable), `q` (quit).
- **`assert`** valida suposiciones internas de tu código durante desarrollo.
- El primer "bug" documentado fue una polilla real encontrada por Grace Hopper en 1947.
- La IA es un excelente tutor de debugging, pero no reemplaza tu propio razonamiento.

En la próxima guía vamos a explorar **Git y control de versiones desde cero**: cómo guardar el historial de tu código, volver a versiones anteriores y colaborar con otros programadores sin pisar el trabajo de nadie.
