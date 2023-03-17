# Sistema Web Integral para la gestión de Actividades Extraescolares de los estudiantes del Instituto Tecnológico de Oaxaca.

## Contenido
*Proximamente...*
## Estructura de carpetas
*Proximamente...*

## Iniciar un proyecto en Next.js
>Crear un nuevo proyecto en Next.js
`$ npx create-next-app@latest`

**What is your project named?** el-vagon
**Would you like to use TypeScript with this project?** No
**Would you like to use ESLint with this project?** Yes
**Would you like to use `src/` directory with this project?** Yes
**Would you like to use experimental `app/` directory with this project?**  No
**What import alias would you like configured?** @/*

## Tailwind: Instalación & configuración
>Instalar tailwindcss y cree su archivo tailwind.config.js.
    npm install -D tailwindcss postcss autoprefixer

>Agregar las rutas a todos sus archivos de plantilla en su archivo tailwind.config.js.
    npx tailwindcss init -p

### global.css
Agregue las directivas @tailwind para cada una de las capas de Tailwind a su archivo CSS principal.

    @tailwind base;
    @tailwind components;
    @tailwind utilities;


### tailwind.config
Agregue las rutas a todos sus archivos de plantilla en su archivo *tailwind.config.js*.

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }

## Linter standar: Instalación & configuración
*standard* es un linter de JavaScript que puede ayudar a asegurarse de que el código siga ciertas convenciones de codificación y evite errores comunes.
>Instalar standar
    npm install standard -D

### .eslintrc.json
    {
      "extends": ["./node_modules/standard/eslintrc.json","next/core-web-vitals"]
    }

## PostgreSQL & Sequelize: Instalación
Este proyecto utiliza Postgres como base de datos relacional y Sequelize como ORM (Object-Relational Mapping) para interactuar con la base de datos desde Node.js.
>Instalar Sequelize
    npm install --save sequelize

>Instalar postgres
    npm install --save pg pg-hstore