---
title: "Git y control de versiones desde cero"
description: "Aprende a guardar el historial de tu código, volver atrás cuando algo se rompe y colaborar sin pisar el trabajo de nadie."
belt: white-belt
tags: [git, control-versiones, fundamentos, colaboracion]
order: 8
published: true
lastRevision: "2026-05-19"
---

Imagina que estás escribiendo un ensayo importante. Haces cambios, borras párrafos, agregas secciones. De repente, te das cuenta de que la versión de ayer era mejor. ¿La recuerdas de memoria? ¿Tienes copias llamadas `ensayo_final.doc`, `ensayo_final_v2.doc`, `ensayo_final_FINAL.doc`?

Con el código pasa lo mismo, pero peor. Un cambio pequeño en un archivo puede romper todo el programa. Y cuando trabajas con otras personas, dos pueden modificar el mismo archivo al mismo tiempo. **Git** es la herramienta que resuelve todo esto: guarda cada cambio, permite volver atrás y coordina el trabajo en equipo.

---

## ¿Qué es Git?

Git es un **sistema de control de versiones distribuido**. Suena técnico, pero la idea es simple:

- **Control de versiones:** guarda un historial de cada cambio que haces en tus archivos.
- **Distribuido:** cada persona tiene una copia completa del historial en su computadora.

Fue creado en **2005 por Linus Torvalds** (el mismo creador de Linux) porque necesitaba una herramienta para coordinar el desarrollo del kernel de Linux entre miles de programadores alrededor del mundo.

### Git no es GitHub

Esta confusión es tan común que merece su propia sección:

- **Git** es la herramienta que vive en tu computadora. Guarda versiones de tus archivos.
- **GitHub** (y GitLab, Bitbucket) es un servicio web donde subes tu repositorio de Git para compartirlo, colaborar y hacer backup.

Es como la diferencia entre un documento en tu disco duro y subirlo a Google Drive. Git es lo local, GitHub es la nube.

---

## Conceptos fundamentales

### Repositorio

Un **repositorio** (o "repo") es un proyecto bajo el control de Git. Es simplemente un directorio con un historial de cambios.

```bash
# Crear un nuevo repositorio en el directorio actual
git init
```

Esto crea una carpeta oculta `.git/` que contiene todo el historial. No la toques manualmente.

### El ciclo de vida de un archivo

En Git, cada archivo pasa por tres estados:

```
Working Directory → Staging Area → Repository (commit)
```

1. **Working Directory (directorio de trabajo):** los archivos como están en tu disco ahora mismo.
2. **Staging Area (área de preparación):** los cambios que quieres incluir en el próximo commit.
3. **Repository (repositorio):** los cambios ya guardados permanentemente en el historial.

```bash
# Ver el estado actual
git status

# Agregar un archivo al staging area
git add archivo.py

# Agregar todos los archivos modificados
git add .

# Guardar los cambios del staging area como un commit
git commit -m "Descripción clara de qué cambió"
```

![Diagrama del ciclo de vida de archivos en Git mostrando las tres áreas: Working Directory, Staging Area y Repository con flechas de git add, git commit y git checkout](/content/guides/git-y-control-de-versiones/01-git-lifecycle.png)

*El flujo de Git: de tu directorio de trabajo al staging area y finalmente al repositorio mediante commits.*

### Commit: una foto del código en un momento

Un **commit** es una instantánea de tu proyecto en un momento dado. Cada commit tiene:

- Un **hash único** (como `a3f2b9c`) que lo identifica
- Un **mensaje** que describe qué cambió
- Un **autor** y una **fecha**
- Una referencia al **commit anterior** (esto forma una cadena)

```bash
# Ver el historial de commits
git log

# Ver el historial resumido (una línea por commit)
git log --oneline

# Ver los últimos 5 commits
git log --oneline -5
```

### Branch: líneas de desarrollo paralelas

Un **branch** (rama) es una línea de desarrollo independiente. El branch principal se llama `main` (antes se llamaba `master`).

```bash
# Ver qué branches existen
git branch

# Crear un nuevo branch
git branch nueva-funcionalidad

# Cambiar al nuevo branch
git checkout nueva-funcionalidad

# O crear y cambiar en un solo comando
git checkout -b nueva-funcionalidad
```

![Diagrama de ramas de Git mostrando el branch main y dos feature branches divergiendo y convergiendo con merges](/content/guides/git-y-control-de-versiones/02-git-branches.png)

*Branches de Git: líneas de desarrollo paralelas que pueden divergir y luego converger mediante merge.*

La idea es: trabajas en un branch separado para no romper el `main`. Cuando tu funcionalidad está lista, la **mergeas** (fusionas) de vuelta.

---

## Tu primer repositorio

Vamos a crear un repositorio desde cero y hacer algunos commits:

```bash
# 1. Crea un directorio para tu proyecto
mkdir mi-proyecto
cd mi-proyecto

# 2. Inicializa Git
git init
# Initialized empty Git repository in /path/mi-proyecto/.git/

# 3. Crea un archivo
echo 'print("Hola, Git!")' > hola.py

# 4. Verifica el estado
git status
# On branch main
# Untracked files:
#   hola.py

# 5. Agrega el archivo al staging
git add hola.py

# 6. Haz tu primer commit
git commit -m "feat: agregar programa hola.py"
# [main (root-commit) a3f2b9c] feat: agregar programa hola.py
#  1 file changed, 1 insertion(+)
#  create mode 100644 hola.py

# 7. Verifica el historial
git log --oneline
# a3f2b9c (HEAD -> main) feat: agregar programa hola.py
```

### Modificar y hacer un segundo commit

```bash
# Editar el archivo (agregar una línea)
echo 'print("Bienvenido a Git")' >> hola.py

# Ver qué cambió
git diff
# --- a/hola.py
# +++ b/hola.py
# @@ -1 +1,2 @@
#  print("Hola, Git!")
# +print("Bienvenido a Git")

# Agregar y commitear
git add hola.py
git commit -m "feat: agregar mensaje de bienvenida"

# Ver el historial actualizado
git log --oneline
# b7c4d1e (HEAD -> main) feat: agregar mensaje de bienvenida
# a3f2b9c feat: agregar programa hola.py
```

---

## Comandos esenciales

### Navegación y estado

```bash
git status          # ¿Qué archivos cambiaron?
git diff            # ¿Qué cambió exactamente?
git diff --staged   # ¿Qué está en el staging area?
git log             # Historial de commits
git log --oneline   # Historial resumido
```

### Agregar y commitear

```bash
git add archivo.py      # Agregar un archivo
git add .               # Agregar todos los cambios
git add -p              # Agregar cambios interactivamente (por hunk)
git commit -m "mensaje" # Crear commit
git commit --amend      # Modificar el último commit
```

### Deshacer cosas

```bash
# Descartar cambios en un archivo (volver a la última versión del repo)
git checkout -- archivo.py

# Sacar un archivo del staging area (unstage)
git reset HEAD archivo.py

# Volver a un commit anterior (cuidado: esto reescribe historial)
git reset --hard a3f2b9c
```

### Branches y merges

```bash
git branch                  # Listar branches
git branch nombre           # Crear branch
git checkout nombre         # Cambiar de branch
git checkout -b nombre      # Crear y cambiar
git merge nombre            # Fusionar 'nombre' al branch actual
git branch -d nombre        # Eliminar branch (si ya fue mergeado)
```

---

## Git con GitHub

Una vez que tienes commits locales, puedes subirlos a GitHub para compartirlos.

### Conectar tu repo remoto

```bash
# 1. Crea un repositorio vacío en GitHub (desde la web)
# 2. Conecta tu repo local al remoto
git remote add origin https://github.com/tu-usuario/tu-repo.git

# 3. Sube tu código
git push -u origin main
```

### Clonar un repositorio existente

```bash
# Descargar un repo de GitHub a tu computadora
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### Flujo de trabajo típico

```bash
# 1. Traer cambios del remoto
git pull origin main

# 2. Crear un branch para tu trabajo
git checkout -b mi-funcionalidad

# 3. Trabajar, agregar, commitear
git add .
git commit -m "feat: implementar funcionalidad X"

# 4. Subir tu branch
git push origin mi-funcionalidad

# 5. Crear un Pull Request en GitHub (desde la web)
# 6. Después del merge, volver a main y actualizar
git checkout main
git pull origin main
```

---

## .gitignore: qué NO guardar en Git

No todo debe ir al repositorio. Archivos temporales, dependencias, contraseñas, archivos de configuración local — todo eso debe excluirse.

Crea un archivo `.gitignore` en la raíz de tu proyecto:

```
# .gitignore

# Archivos de Python
__pycache__/
*.pyc
*.pyo
venv/
.env

# Node.js
node_modules/
dist/
*.log

# Editor
.vscode/
.idea/
*.swp

# Sistema operativo
.DS_Store
Thumbs.db

# Archivos con secretos
config_secreta.py
*.key
```

Git ignorará automáticamente cualquier archivo que coincida con estos patrones.

---

## Conventional Commits: mensajes que importan

Un buen mensaje de commit explica **qué cambió y por qué**, no **cómo**. Hay una convención ampliamente adoptada:

```
tipo: descripción corta

cuerpo opcional (más detalles)
```

**Tipos comunes:**

| Tipo | Cuándo usarlo |
|------|---------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `style` | Formato, sin cambio de lógica |
| `refactor` | Reestructurar código sin cambiar comportamiento |
| `test` | Agregar o modificar tests |
| `chore` | Tareas de mantenimiento |

**Ejemplos buenos:**
```
feat: agregar autenticación con JWT
fix: corregir cálculo de descuento en carrito
docs: actualizar README con instrucciones de instalación
refactor: extraer lógica de validación a función separada
```

**Ejemplos malos:**
```
cambios
arreglado
update
asdf
```

Si tu mensaje de commit no le dice nada a tu yo del futuro, no sirve.

---

## Un poco de historia: de CVS a Git

Antes de Git, existían otros sistemas de control de versiones. **CVS** (1990) y **SVN** (2000) fueron populares, pero tenían un problema: eran **centralizados**. Todo el historial vivía en un servidor central. Si el servidor se caía, nadie podía trabajar. Si perdías tu conexión, no podías commitear.

Linus Torvalds necesitaba algo mejor para el kernel de Linux. El sistema anterior, **BitKeeper**, dejó de ser gratuito para la comunidad. Así que Linus decidió crear su propia herramienta con estos principios:

1. **Velocidad:** cada operación debe ser instantánea.
2. **Distribuido:** todos tienen el historial completo.
3. **Integridad:** es imposible corromper datos sin que Git lo detecte.
4. **Ramas baratas:** crear un branch debe ser tan fácil como crear un archivo.

Git cumplió todos estos objetivos y se convirtió en el estándar de la industria. Hoy, más del 90% de los desarrolladores usan Git.

---

## Por qué importa

Git no es opcional en el desarrollo de software moderno. Es la herramienta que:

- **Guarda tu trabajo:** si algo se rompe, puedes volver atrás.
- **Permite experimentar:** crea un branch, prueba cosas, y si no funciona, bórralo sin consecuencias.
- **Coordina equipos:** múltiples personas trabajando en el mismo proyecto sin pisarse.
- **Documenta el historial:** cada commit cuenta la historia de por qué el código es como es.

Incluso si trabajas solo, Git es invaluable. "¿Cuándo dejó de funcionar esto?" → `git log`. "¿Qué cambió en esta línea?" → `git blame`. "¿Necesito la versión de hace dos semanas?" → `git checkout`.

---

## La IA y Git

### Lo bueno

- **Generar mensajes de commit:** muéstrale tus cambios (`git diff`) y pídele un mensaje siguiendo Conventional Commits.
- **Explicar conflictos de merge:** cuando dos branches modifican las mismas líneas, la IA puede ayudarte a entender el conflicto y proponer una resolución.
- **Recomendar estrategias de branching:** describe tu proyecto y la IA sugiere un flujo de trabajo (Git Flow, trunk-based, etc.).
- **Recrear comandos complejos:** "¿cómo hago un cherry-pick de los últimos 3 commits?" — la IA te da el comando exacto.

### Lo que no debes hacer

- **No commitear código generado por IA sin revisarlo.** La IA puede introducir bugs o dependencias inexistentes. Revisa cada línea.
- **No uses la IA para reescribir historial sin entender las consecuencias.** Comandos como `git rebase` y `git push --force` pueden destruir trabajo de otros.
- **No compartas diffs con código sensible.** Un `git diff` puede contener API keys, contraseñas o datos de usuarios.

---

## Desafío: tu primer flujo de trabajo con Git

**Objetivo:** crear un repositorio, hacer commits significativos, crear branches y resolver un merge.

**Problema:** vas a simular el desarrollo de una pequeña aplicación.

**Tu tarea:**

1. Crea un directorio `mi-app` e inicializa Git
2. Crea un archivo `main.py` con un programa simple y haz tu primer commit
3. Crea un branch llamado `feature/calculadora`
4. En ese branch, agrega funciones de suma, resta y multiplicación. Haz commits separados para cada una
5. Vuelve a `main` y agrega una función de división
6. Mergea `feature/calculadora` a `main`
7. Crea un archivo `.gitignore` que excluya `__pycache__/` y `*.pyc`
8. Sube todo a un repositorio de GitHub

**Bonus:** crea un conflicto de merge intencional (modifica la misma línea en dos branches diferentes) y resuélvelo manualmente.

---

## Para seguir explorando

- **[Pro Git](https://git-scm.com/book/es/v2)** — libro gratuito y completo, disponible en español. Es la biblia de Git.
- **[Learn Git Branching](https://learngitbranching.js.org/?locale=es_ES)** — tutorial interactivo visual para entender branches.
- **[Oh Shit, Git!?!](https://ohshitgit.com/)** — cómo salir de los desastres más comunes con Git.
- **[Conventional Commits](https://www.conventionalcommits.org/)** — la especificación oficial.

---

## Resumen

- **Git** guarda el historial de cambios de tu código; **GitHub** es donde lo compartes en la nube.
- El ciclo de vida: **Working Directory → Staging Area → Repository** (con `git add` y `git commit`).
- Un **commit** es una instantánea con hash único, mensaje, autor y referencia al commit anterior.
- Los **branches** permiten trabajar en funcionalidades separadas sin romper el código principal.
- **`.gitignore`** excluye archivos que no deben ir al repositorio (dependencias, secretos, temporales).
- **Conventional Commits** (`feat:`, `fix:`, `docs:`) hacen que el historial sea legible y útil.
- Git fue creado por Linus Torvalds en 2005 porque necesitaba un sistema distribuido, rápido y con ramas baratas.
- Los comandos esenciales: `status`, `add`, `commit`, `log`, `diff`, `branch`, `checkout`, `merge`, `push`, `pull`.

En la próxima guía vamos a explorar **la terminal: tu nueva mejor amiga** — cómo navegar tu computadora, ejecutar programas y automatizar tareas desde la línea de comandos.
