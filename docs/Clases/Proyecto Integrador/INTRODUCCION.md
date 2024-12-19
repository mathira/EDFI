---
sidebar_position: 1
---
# Introduccion

## Introducción


**¿Qué hace?**

**         ¿Cómo llegaste a la idea?**

**         ¿Quién lo ha hecho de antemano? (referencias si las hay)**

## Antes de empezar

Necesitamos instalar las siguientes herramientas.

- **GIT**: Es necesario descargar Git desde [aquí](https://git-scm.com/). Si no estás familiarizado con Git, puedes profundizar más con este [tutorial de Atlassian](https://www.atlassian.com/es/git/tutorials/what-is-git).
- **Cuenta de GitHub**: Debes crear una cuenta en [GitHub](https://github.com/), ya que será el lugar donde guardaremos nuestras versiones de Git así como configuraremos nuestro despliegue de aplicación (deploy) orquestado por GitHub Actions. Para leer más sobre GitHub, puedes consultar este [tutorial](https://docs.github.com/es/get-started/start-your-journey/creating-an-account-on-github).
- **Visual Studio Code**: Utilizaremos Visual Studio Code como editor de código. Para descargarlo debes ingresar [aquí](https://code.visualstudio.com/download). Puedes apoyarte en la [documentación oficial](https://code.visualstudio.com/docs/setup/setup-overview) para ver pasos de su instalación.
- **Node**: Para instalarlo puedes descargarlo desde su [sitio oficial](https://nodejs.org/en/download/current). Node.js es un entorno de ejecución de JavaScript.

## Herramientas instaladas

Una vez que contamos con las herramientas instaladas, vamos a hacer un fork de este proyecto. Un fork es una copia del proyecto que puedes modificar sin afectar el proyecto original. Para hacer nuestro fork debemos ingresar al siguiente link [EDFI GitHub](https://github.com/mathira/EDFI) y seguir los pasos ilustrados a continuación:

1. Haz clic aquí: ![Fork Project](../../../img/MT01/fork_project.png)
2. Te llevará a esta página: ![Fork Page](../../../img/MT01/fork_page.png)
3. Finalmente, haz clic en "Crear fork": ![Create Fork](../../../img/MT01/create_fork.png)

Como resultado, tendrás el siguiente proyecto en tu cuenta:

![Your Fork](../../../img/MT01/your_fork.png)

### Obtener el Proyecto Localmente

Para trabajar en tu proyecto desde tu máquina local, necesitas clonarlo desde GitHub. Aquí te explico cómo hacerlo dependiendo de tu sistema operativo.

1. **Abre la terminal**:

   - **Windows**: Utiliza la Terminal de Windows (CMD) o PowerShell.
   - **macOS**: Abre la Terminal (puedes encontrarla en Applications > Utilities).
   - **Linux**: Depende de la distribución que estés usando, pero generalmente se accede a través de aplicaciones como Terminal, Konsole, o Gnome Terminal.

_Nota: En mi caso, estaré trabajando sobre Windows._

![Abrir Terminal](../../../img/MT01/open_terminal.png)

2. **Clona el repositorio**:

   - Para clonar el repositorio, utiliza el método HTTPS, que es compatible con todos los sistemas operativos y no requiere configuración adicional de SSH. Ejecuta el siguiente comando en tu terminal:

   ```bash
   git clone https://github.com/tuusuario/tuproyecto.git

   ```

   ![Abrir Terminal](../../../img/MT01/clone_terminal.png)
3. Una vez hecho, abre tu proyecto con Visual Studio Code.

![Open Project](../../../img/MT01/open_project0.png)
![Open Project](../../../img/MT01/open_project.png)

### Correr nuestro proyecto local

1. Abre tu terminal en Visual Studio Code.

![Open Project](../../../img/MT01/open_project1.png)

2. Ejecuta el comando `npm install` o `npm i` y espera a que termine, esto instalará nuestras dependencias.

![Install Dependencies](../../../img/MT01/terminal1.png)

3. Levanta el proyecto localmente con `npm run start`.

![Run Project](../../../img/MT01/terminal2.png)

4. **Verifica el Resultado en tu Navegador**

   Una vez completado el despliegue, podrás ver la URL en la terminal, a la cual deberás acceder para visualizar tu sitio web. Esta URL es la dirección pública donde está alojado tu proyecto.

   - **URL del Proyecto**: Observa la terminal para encontrar la URL.

     ![URL del Proyecto](../../../img/MT01/terminal22.png)
   - **Vista en el Navegador**: Abre tu navegador y accede a la URL para ver tu sitio en acción.

     ![Vista en Navegador](../../../img/MT01/terminal3.png)

### Estructura del Proyecto

La estructura organizativa de tu proyecto se muestra a continuación:

![Estructura del Proyecto](../../../img/MT01/structure.png)

A continuación, se describen los directorios principales y sus usos:

- `blog`: Este directorio es donde puedes crear o modificar entradas para tu blog.
- `docs`: Utiliza este espacio para agregar o modificar documentos técnicos o informativos.
- `i18n`: Este directorio se utiliza para agregar o modificar traducciones del contenido. Dentro de esta carpeta encontrarás una estructura similar a la de los directorios `blog` y `docs`, pero adaptada para soportar contenido en inglés.

_Nota: Para mas informacion sobre [i18n](https://docusaurus.io/docs/i18n/tutorial)_

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

# Realizando tu Primer Commit & Push

Una vez que hayas completado tus cambios, puedes subirlos al repositorio con los siguientes comandos:

```bash
git add .
git commit -m "Mi primer commit"
git push -M main
```

_Nota: Tambien puedes utilizar la interface de [Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git) para hacer commit y push._

# GitHub Actions

Después de realizar cambios en tu repositorio, puedes verificar el proceso de ejecución de tus GitHub Actions. Sigue estos pasos para acceder a la información detallada:

1. **Accede a GitHub Actions**:

   - Visita la URL de las acciones de tu proyecto: `https://github.com/{tuusuario}/{tuproyecto}/actions`. Asegúrate de reemplazar `{tuusuario}` y `{tuproyecto}` con tu nombre de usuario y el nombre de tu proyecto, respectivamente.
2. **Visualiza una Ejecución Específica**:

   - Haz clic en la pestaña `Actions`.
   - Luego, selecciona el primer ítem en la lista bajo el título de la acción para ver el detalle del proceso de ejecución.

![Proceso de GitHub Actions](../../../img/MT01/github1.png)
![Proceso de GitHub Actions](../../../img/MT01/github2.png)

Como se muestra en la imagen, el proceso consta de dos pasos principales:

1. **Build**: Compilación del proyecto.
2. **Deploy**: Despliegue del proyecto.

_Estos pasos te permitirán observar cada etapa de la ejecución de la acción, desde la inicialización hasta la finalización, facilitando el seguimiento y diagnóstico de cualquier problema._

Al final, si no existieron errores, se te proporcionará la URL donde tu proyecto ha sido publicado.

![Proceso de GitHub Actions](../../../img/MT01/github3.png)

## Más Tutoriales

En la siguiente [web oficial](https://docusaurus.io/docs), puedes encontrar un tutorial super completo creado por Docusaurus.

¡Éxitos!
