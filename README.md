# SuperHero Team

Es una aplicacion creada en base al "CHALLENGE FRONTEND - Angular" de Alkemy.

Con un llamado a la API de https://superheroapi.com/, la aplicación permite realizar busquedas de los superheroes favoritos e ir formando un Superhero Team.

Se muestran diferentes atributos a nivel individual de cada miembro y del equipo consolidado.

Ingresando los siguientes datos en el formulario de login (Email: challenge@alkemy.org / Password: angular), se logra el acceso a la aplicación.

Al ingresar los datos válidos, se le otorga un token al usuario, que se almacena en localStorage.

Tecnologías utilizadas: Angular (HTML, CSS, JavaScript, TypeScript) y librerías Bootstrap, Toastr.

Pueden verla funcionando en el siguiente link: PENDIENTE

## Instrucciones para correrlo localmente

Instalar node: https://nodejs.org/en/

Clonar el repositorio de GitHub: git clone https://github.com/ManuelGonzalez007/superheroTeam.git

Instalar dependencias: *npm install*

## Configuracion del Servicio


Dentro de la carpeta servicio, se encuentra el archivo servicio.service.ts

Es necesario cambiar el valor de API_KEY.

Reemplazar el string existente por el valor del access token proporcionado por https://superheroapi.com/

## Levantar app

Levantar el servidor de Angular CLI: npm start

App disponible en: localhost: 4200
