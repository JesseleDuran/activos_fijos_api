# API del Módulo de Activos

API para el Módulo de Activos Fijos de Maderas del Orinoco

### Prerequisitos

-   node >= v10.9.0
-   npm >= v6.2.0

## Setup

Crear un archivo `.env` del proporcionado `.env.example` y actualízalo con los datos correctos:

    $ cp .env.example .env

### En máquina local

Primero clonar el repositorio:

    $ git clone https://github.com/JesseleDuran/activos_fijos_api.git

Luego para instalar las dependencias correr:

    $ npm i

Finalmente para correr el servidor, ejecutar:

    $ npm start

Si todo está bien, deberías ver en la consola:

    > activos_fijos_api@1.0.0 start ./activos_fijos_API
    > node app.js
    App is running on  http://localhost:3000

## Documentación:

Una vez que el servidor ya esté corriendo, si vas a la ruta:

    http://localhost:3000/swagger

Verás todos los endpoints disponibles que podrás testear y los modelos utilizados.  

## Construido con el uso de:

-   [nodeJs](https://nodejs.org) - Como base del servidor
-   [ExpressJs](https://expressjs.com) - Como framework web
