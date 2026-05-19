---
term: "Programación estructurada"
definition: "Paradigma de programación que usa solo tres estructuras básicas — secuencia, selección e iteración — para construir programas legibles y mantenibles, eliminando el uso de goto."
relatedGuides:
  - white-belt/control-de-flujo-funciones-y-modulos
tags: [historia, paradigmas, fundamentos]
lastRevision: "2026-05-19"
---

La programación estructurada fue formalizada por **Edsger W. Dijkstra** en su carta de 1968 *"Go To Statement Considered Harmful"*. Propuso que cualquier programa puede construirse usando solo tres estructuras:

## Las tres estructuras

1. **Secuencia**: ejecutar instrucciones en orden, una tras otra.
2. **Selección**: elegir entre caminos con condicionales (`if/else`).
3. **Iteración**: repetir acciones con ciclos (`for/while`).

## Antes: código espagueti

Con `goto`, el código podía saltar de cualquier línea a cualquier otra, creando un flujo imposible de seguir:

```
10 LET X = 1
20 GOTO 50
30 PRINT X
40 GOTO 70
50 IF X > 5 THEN GOTO 80
60 GOTO 30
```

## Después: código estructurado

```python
x = 1
while x <= 5:
    print(x)
    x += 1
print("Terminado")
```

## Impacto

Este paradigma es la base de casi todos los lenguajes modernos: Python, JavaScript, Java, C++, y más.

## Ver también

- [Control de flujo, funciones y módulos en Python](/guides/white-belt/control-de-flujo-funciones-y-modulos)
