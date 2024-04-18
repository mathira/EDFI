---
sidebar_position: 1
---

# Bienvenido

## Introducción

Este es el template que estoy usando para mi documentación en EDFI. En este tutorial, compartiré los pasos para que puedan obtener una copia y posteriormente modificarla y adaptarla a su gusto.

## Antes de empezar

- **GIT**: Es necesario descargar Git desde [aquí](https://git-scm.com/). Si no estás familiarizado con Git, puedes profundizar más con este [tutorial de Atlassian](https://www.atlassian.com/es/git/tutorials/what-is-git).
- **Cuenta de GitHub**: Debes crear una cuenta en [GitHub](https://github.com/), ya que será el lugar donde guardaremos nuestras versiones de Git así como configuraremos nuestro despliegue de aplicación (deploy) orquestado por GitHub Actions. Para leer más sobre GitHub, puedes consultar este [tutorial](https://docs.github.com/es/get-started/start-your-journey/creating-an-account-on-github).
- **Visual Studio Code**: Utilizaremos Visual Studio Code como editor de código, pero puedes usar el que prefieras. Para descargarlo debes ingresar [aquí](https://code.visualstudio.com/download). Puedes apoyarte en la [documentación oficial](https://code.visualstudio.com/docs/setup/setup-overview) para ver pasos de su instalación.
- **NodeJs**: Para instalarlo puedes descargarlo desde su [sitio oficial](https://nodejs.org/en/download/current). Node.js es un entorno de ejecución de JavaScript.

## Herramientas instaladas

Una vez que contamos con las herramientas instaladas, vamos a hacer un fork de este proyecto. Un fork es una copia del proyecto que puedes modificar sin afectar el proyecto original. Para hacer nuestro fork debemos ingresar al siguiente link [EDFI GitHub](https://github.com/mathira/EDFI) y seguir los pasos ilustrados a continuación:

1. Haz clic aquí: ![Fork Project](imagen1-url)
2. Te llevará a esta página: ![Fork Page](imagen2-url)
3. Finalmente, haz clic en "Crear fork": ![Create Fork](imagen3-url)

Como resultado, tendrás el siguiente proyecto en tu cuenta:

![Your Fork](imagen4-url)

### Obtener el proyecto de manera local

1. Abre Visual Studio Code o tu editor de preferencia.
2. Abre la terminal integrada de Visual Studio Code.
3. Clona el repositorio de manera local. Puede hacerse por SSH o HTTPS, en este caso usaremos HTTPS.

![Cloning Repository](imagen-url)

4. Una vez hecho, abre tu proyecto con Visual Studio Code.

![Open Project](imagen-url)

### Correr nuestro proyecto local

1. Ejecuta el comando `npm install` o `npm i` y espera a que termine, esto instalará nuestras dependencias.

![Install Dependencies](imagen-url)

2. Levanta el proyecto localmente con `npm run start`.

![Run Project](imagen-url)

3. Observa el resultado en tu navegador.

![View in Browser](imagen-url)

La estructura del proyecto es la siguiente:

![Project Structure](imagen-url)

- `blog`: puedes crear o modificar tus blogs.
- `docs`: puedes agregar o modificar tus documentos.

Este proyecto cuenta con traducción al español. Para actualizarla, puedes ir a la carpeta `i18n` que mantiene la misma estructura.

## Publicar el proyecto en GitHub Pages

Dentro de nuestra carpeta `.github` tenemos creado nuestro GitHub Action. En nuestro archivo `gh-pages.yml` tenemos los comandos necesarios para crear nuestro deploy. Aquí te explicaré qué hace cada línea:

# Proceso de Compilación y Despliegue de Docusaurus en GitHub Pages

Este archivo YAML define un flujo de trabajo de GitHub Actions para construir y desplegar un sitio web Docusaurus en GitHub Pages.

```yaml
name: Build and Deploy Docusaurus to GitHub Pages # Nombre del flujo de trabajo

on: # Define los eventos que activan el flujo de trabajo
  push: # Activa el flujo con 'push'
    branches: ["main"] # Específicamente en la rama 'main'
  workflow_dispatch: # Permite la activación manual del flujo de trabajo

jobs: # Define los trabajos a realizar
  build: # Primer trabajo, encargado de construir el proyecto
    name: Build Docusaurus # Nombre descriptivo del trabajo
    runs-on: ubuntu-latest # Sistema operativo donde se ejecuta el trabajo, usando la última versión de Ubuntu
    steps: # Pasos para realizar dentro del trabajo
      - uses: actions/checkout@v4 # Utiliza la acción para clonar el repositorio
        with:
          fetch-depth: 0 # Clona todo el historial para usos específicos como los plugins que necesitan historial completo
      - uses: actions/setup-node@v4 # Prepara el entorno Node.js
        with:
          node-version: 18 # Versión específica de Node.js
          cache: "npm" # Caché para dependencias de npm

      - name: Install dependencies # Paso para instalar dependencias
        run: npm install --legacy-peer-deps # Ejecuta npm install evitando problemas de dependencias
      - name: Build website # Paso para construir el sitio web
        run: npm run build # Ejecuta el comando de construcción de Docusaurus

      - name: Upload Build Artifact # Sube el resultado de la compilación como un artefacto
        uses: actions/upload-pages-artifact@v3 # Utiliza una acción predeterminada para subir artefactos
        with:
          path: build # Ruta del directorio de compilación a subir

  deploy: # Segundo trabajo, encargado de desplegar el proyecto
    name: Deploy to GitHub Pages # Nombre descriptivo del trabajo
    needs: build # Indica que este trabajo necesita que se complete el trabajo de construcción
    permissions: # Define los permisos necesarios para el trabajo
      pages: write # Permiso para escribir en GitHub Pages
      id-token: write # Permiso para escribir tokens de identificación

    environment: # Define el entorno de despliegue
      name: github-pages # Nombre del entorno
      url: ${{ steps.deployment.outputs.page_url }} # URL resultante del despliegue

    runs-on: ubuntu-latest # Sistema operativo donde se ejecuta el trabajo
    steps:
      - name: Deploy to GitHub Pages # Paso para desplegar en GitHub Pages
        id: deployment # Identificador del paso para referencia
        uses: actions/deploy-pages@v4 # Utiliza la acción para desplegar en GitHub Pages
```

## Preparación para el deploy

Antes de realizar el deploy, necesitas actualizar tus documentos o dejarlos como están y modificar tu archivo `docusaurus.config.ts`.

```js
//Actualiza las siguientes variables:

const organizationName = "mathira"; // Tu usuario de GitHub
const projectName = "EDFI"; // El nombre de tu proyecto
```

# Realizando tu Primer Commit && Push

Una vez que hayas completado tus cambios, puedes subirlos al repositorio con los siguientes comandos:

```bash
git add .
git commit -m "Mi primer commit"
git push -M main
```

# GitHub Actions

Una vez que hayas realizado tus cambios, puedes verificar el proceso de tu GitHub Action en la siguiente URL:

`https://github.com/{tuusuario}/{tuproyecto}/actions`

![Proceso de GitHub Actions](#) <!-- Reemplaza '#' con la URL de la imagen del proceso -->

Como se muestra en la imagen, el proceso consta de dos pasos principales:

1. **Build**: Compilación del proyecto.
2. **Deploy**: Despliegue del proyecto.

Al final, se te proporcionará la URL donde tu proyecto ha sido publicado.

![Resultado del Deploy](#) <!-- Reemplaza '#' con la URL de la imagen del resultado -->

## Más Tutoriales

En la siguiente sección, te dejo un tutorial creado por Docusaurus que he traducido al español.

¡Éxitos!
