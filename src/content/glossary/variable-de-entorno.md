---
term: "Variable de entorno"
definition: "Un valor con nombre almacenado en el sistema operativo que configura el comportamiento de programas y sesiones de shell."
relatedGuides:
  - white-belt/la-terminal
  - yellow-belt/introduccion-a-nodejs
tags: [terminal, configuracion, sistema-operativo]
lastRevision: "2026-05-19"
---

Las **variables de entorno** son pares clave-valor que el sistema operativo y los programas usan para configurarse. Se acceden con `$NOMBRE` en bash/zsh:

```bash
echo $HOME      # /Users/tu-nombre
echo $PATH      # /usr/local/bin:/usr/bin:/bin
echo $USER      # tu-nombre
```

Las más importantes:
- **`$HOME`**: tu directorio personal
- **`$PATH`**: lista de directorios donde el sistema busca ejecutables
- **`$EDITOR`**: editor de texto por defecto
- **`$SHELL`**: qué shell estás usando

Se establecen con `export`:
```bash
export API_KEY="abc123"
export PATH="$HOME/.local/bin:$PATH"
```

Para que persistan entre sesiones, se agregan a `~/.zshrc` o `~/.bashrc`.

## Ver también

- [La terminal: tu nueva mejor amiga](/guides/white-belt/la-terminal)
- [Introducción a Node.js, npm y pnpm](/guides/yellow-belt/introduccion-a-nodejs)
