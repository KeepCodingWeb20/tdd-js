# KeepCoding Web Bootcamp XX - Testing con JS (TDD)

<div align="center">
    <img src="https://keepcoding.io/wp-content/uploads/2024/11/Logo-kc237.svg" alt="KeepCoding Web Bootcamp XX - Testing con JS (TDD)">
</div>

## Descripción del proyecto

Esta aplicación es el punto de partida del módulo de Testing con JavaScript (TDD).
Implementa un sistema de cuentas de usuario con registro y login sobre una base de datos en memoria.

El objetivo NO es la aplicación en sí, sino aprender a testearla. A lo largo del curso escribiremos tests unitarios, de integración y end-to-end sobre este código, partiendo desde cero y aplicando la metodología TDD (Test-Driven Development).

Los tests NO están incluidos en este repositorio. Se escriben en vivo durante las clases.

## Requisitos

- Node.js 24 o superior

Para comprobar tu versión:

```bash
node --version
```

## Instalación

```bash
npm install
```

## Arranque

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

Para usar un puerto diferente:

```bash
PORT=4000 npm run dev
```

## Scripts disponibles

| Script        | Descripción                                          |
|---------------|------------------------------------------------------|
| `npm run dev` | Inicia el servidor con recarga automática (--watch)  |
| `npm start`   | Inicia el servidor sin recarga                       |

> Las herramientas de testing (runner, scripts, configuración) NO vienen incluidas: se instalan y configuran en vivo durante el curso.

## Estructura del proyecto

```
BASE/
├── data/
│   └── users.json              # Seed de usuarios en memoria
├── src/
│   ├── domain/
│   │   ├── validateEmail.js    # Validación de formato de email
│   │   └── validatePassword.js # Validación y puntuación de contraseñas
│   ├── utils/
│   │   └── index.js            # Helpers puros: normalizeEmail, maskEmail, slugify, etc.
│   ├── infra/
│   │   ├── fakeDb.js           # Base de datos en memoria con API asíncrona
│   │   ├── userRepository.js   # Capa de acceso a datos
│   │   └── hashPassword.js     # Hash de contraseñas con bcryptjs
│   ├── services/
│   │   └── userService.js      # Lógica de negocio: register y login
│   ├── web/
│   │   ├── routes.js           # Rutas de Express
│   │   └── views/
│   │       ├── register.html   # Formulario de registro (EJS + extensión .html)
│   │       └── login.html      # Formulario de inicio de sesión
│   ├── app.js                  # Configuración de Express (sin listen)
│   └── server.js               # Punto de entrada: arranca el servidor
├── .env.example                # Variables de entorno necesarias
├── .gitignore
├── package.json
└── README.md
```
