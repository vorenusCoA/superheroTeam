# SuperHero Team (proyecto en progreso)

Es una aplicacion creada en base al "CHALLENGE FRONTEND - Angular" de Alkemy.

Con un llamado a la API de https://superheroapi.com/, la aplicación permite realizar busquedas de los superheroes favoritos e ir formando un Superhero Team

Pueden verla funcionando en el siguiente link: PENDIENTE

## Instrucciones para correrlo localmente

Instalar node: https://nodejs.org/en/

Clonar el repositorio de GitHub: git clone https://github.com/ManuelGonzalez007/superheroTeam.git

Instalar dependencias: *npm install*

## Configuracion del Servicio


Dentro de la carpeta servicio, se encuentra el archivo servicio.service.ts

Es necesario cambiar el valor de API_KEY.

Reemplazar el string existente por el valor del access token proporcionado por https://superheroapi.com/

## Archivo proxy.conf.json

Para evitar el error de CORS policy, es necesario crear el archivo proxy.conf.json en la raíz del proyecto.
Debe tener el siguiente codigo:

{
    "/api/*": {
      "target": "https://superheroapi.com",
      "secure": false,
      "changeOrigin": true 
    }
  }


Por último, en el package.json, en la parte de "scripts", en "start", poner: "ng serve --proxy-config proxy.conf.json" 

## Levantar app

Levantar el servidor de Angular CLI: npm start

App disponible en: localhost: 4200
