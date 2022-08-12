<!-- Install -->
npm i -g @nestjs/cli

<!-- Create and Run Project -->
nest new nestjs-modular
cd nestjs-modular
npm run start:dev

<!-- Crear archivo de configuración de VSC con editorconfig -->
<!-- Crear archivo .editorconfig y agregar el código: -->
# ./editorconfig
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false

<!-- Instalar INSMONIA para ir probando las diferentes acciones y allá
crear cada request -->

<!-- Para usar los validadores en los pipelines, vamos a instalar unas dependencias con el servidor detenido. Primero detener el servidor y luego volverlo a ejecutar -->
npm i class-validator class-transformer @nestjs/mapped-types

<!-- Para consumir APIs con axios -->
npm i --save @nestjs/axios

y para usarlo se importa en el módulo que se va a usar:

import { HttpModule } from '@nestjs/axios';

<!-- Para las variables de entorno (.env) vamos a instalar el siguiente paquete: -->
npm i @nestjs/config

Después de esto se crea el archivo .env para guardar las variables de entorno y se adicionan (*.env) al final del .gitignore

<!-- Agregamos lo siguiente para validaciones -->
npm install --save joi

<!-- Para documentar la API vamos a usar Swagger, lo instalamos y configuramos en main.ts -->
npm install --save @nestjs/swagger

Para que Swagger pueda reconocer los archivos dtos es necesario ir al archivo nest-cli.json y modificarlo

<!-- Procedimiento para corregir error de Puerto en uso 
si se llega a desconectar mal el servidor -->
EL SERVIDOR SE DETIENE CON CTRL+C de manera correcta

Check the PID i.e. id of process running on port 3000 with below command :

lsof -i tcp:3000
It would output something like following:

COMMAND  PID   USER   FD   TYPE  DEVICE  SIZE/OFF NODE NAME
node     5805  xyz    12u  IPv6  63135    0t0     TCP  *:3000 (LISTEN)
Now kill the process using :

kill -9 5805

<!-- Crear controladores con el cli en la terminal -->
nest generate controller controllers/products --flat
<!-- o en la forma compacta: -->
nest g co controllers/brands --flat

<!-- SERVICIOS -->
nest g s services/users --flat

<!-- Generar módulos -->
nest g mo users

<!-- Ahora dentro de cada módulo se crea la estructura que contenga:
  controllers, dtos, entities y services -->


<!-- USE VALUE: para inyectar valores que sirvan de manera global
Ver el ejemplo realizado en el app.module.ts para API_KEY y el app.service.ts
como en el ejemplo usamos variables de entorno para desarrollo, entonces
detenemos el servidor y cambiamos la forma de ejecutarlo, así: -->
NODE_ENV=prod npm run start:dev

<!-- Creamos 3 archivos para ambientes de trabajo: .env .stag.env .prod.env -->
y luego le decimos al app.module que dependiendo del ambiente elija las variables
correspondientes

Pero primero creamos un archivo en src llamado environments.ts

<!-- Para ejecutar cualquier ambiente creado se usa esto, cambiando el NODE_ENV: -->

NODE_ENV=prod npm run start:dev

<!-- Ahora vamos a crear un archivo de configuración config.ts en src para tipar -->

<!-- Para que Swagger trabaje bien con los dtos debemos ir manualmente a cada uno y cambiar la improtación de PartialType ya no de mapped-types sino de swagger -->
se detiene el servidor y se ejecuta la siguiente linea si no aparece la documentación

rm -rf dist

<!-- Habilitar CORS para que la Api sea accesible en main.ts -->
app.enableCors(); <!-- Así queda abierta para cualquiera, dentro del paréntesis puedo poner las IP permitidas y restringir el acceso -->

<!-- Deployment en Heroku -->
<!-- En el package.json al final antes de la llave de cierre -->
"engines": {
  "node": "14.x"
}

<!-- Crear el archivo Procfile en la raíz para indicarle a Heroku la tarea que va a realizar para arrancar -->

<!-- Instalar el paquete Heroku CLI y tener cuenta en Heroku -->
brew tap heroku/brew && brew install heroku

<!-- Después ejecutamos -->
heroku login

<!-- Luego creamos el proyecto -->
heroku create

y con el link que nos suministra ya tenemos un dominio con web inicial

<!-- A continuación en los 3 archivos .env vamos a crear un puerto -->
PORT = 3000

<!-- Luego en el main.ts se modifica la linea correspondiente al puerto, y luego, teniendo detenido el servidor local, probamos con heroku local web para probar que todo esté funcionando bien -->
heroku local web

<!-- Ahora vamos a hacer deployment, para eso debemos estar en la rama principal -->
git push heroku main

<!-- Para que funcione bien el link proporcionado en el deployment, debemos configurar las variables de entorno .env directamente en el dashboard de Heroku en settings, Reveal Config Vars-->

<!-- Y FINALMENTE, NUESTRA WEB -->
https://dry-chamber-02240.herokuapp.com/


<!-- A PARTIR DE AQUÍ EMPIEZO CON TYPEORM -->

<!-- Instalar Docker -->
https://docs.docker.com/desktop/install/mac-install/

<!-- Instalar en VSC la extensión YAML -->

<!-- Luego se crea en la raíz el archivo docker-compose.yml -->

<!-- Luego de escribir lo necesario en el docker-compose.yml vamos a correr la siguiente linea en la terminal para subir el contenedor -->
docker-compose up -d postgres <!-- postgres aquí hace referencia a cómo llamamos el servicio dentro del archivo, en este caso postgres -->

<!-- Para verificar que si esté corriendo docker en segundo plano: -->
docker-compose ps 

<!-- y se va ver algo así: -->
          Name                         Command              State           Ports         
------------------------------------------------------------------------------------------
nestjs-typeorm_postgres_1   docker-entrypoint.sh postgres   Up      0.0.0.0:5432->5432/tcp

<!-- Para bajar el contenedor: -->
docker-compose down

<!-- Agrego al gitignore la siguiente carpeta de los volumes -->
/postgres_data

<!-- Lo siguiente es ingresar remotamente, desde la terminal, al servidor para poder ejecutar instrucciones SQL -->
docker-compose exec postgres bash

<!-- Ahora debemos conectarnos a la base de datos -->
psql -h localhost -d my_db -U root

<!-- Para consultar las tablas que tenemos creadas -->
\d+

<!-- Para salir de la base de datos -->
\q

<!-- Para salir del servidor -->
exit

<!-- Para hacer lo mismo que lo anterior, que fue en terminal, lo podemos hacer también desde una interfaz pgadmin, la configuramos en el archivo docker-compose.yml y subimos el servicio a docker. Una vez hecho esto, abrimos el navegador localhost:5050 para abrir esa interfaz e ingresamos con las credenciales configuradas en el servicio -->

<!-- Una vez dentro del pgAdmin, tenemos que crear la conexión al servidor -->
Click en Servers del menú izquierdo, luego en el menú superior:
Object > Register > Sever...
En el formulario emergente, en la pestaña General:
Name: my_db
Luego en la pestaña Conections debemos ingresar la ip, para lo cual debemos ir a la terminal y ver la ip que le asignó docker a postgres:
docker ps
<!-- Tomamos el id y luego -->
docker inspect b24e40bb5662<!-- aquí va el id, el id que está aquí es el que me arrojó la consulta -->
<!-- y tomamos la ip donde dice IPAddress -->
Host name/address: 172.19.0.2
Luego en password ponemos el mismo de la conexión que tenemos en el docker-compose.yml, en este caso:
Password: 123456
Guardamos el password y click en el botón de abajo Save

<!-- Una vez creada nuestra base de datos, damos click en el icono de bd para abrir el Query Editr y empezar a crear tablas, Ej. -->
CREATE TABLE tasks (
	id serial PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	completed BOOLEAN DEFAULT FALSE
);

<!-- Ahora vamos a conectar la bd a Nestjs -->
npm install pg

<!-- Como estamos trabajando con TypeScript es necesario instalar lo siguiente: -->
npm i @types/pg -D

<!-- Y ahora sí, la conexión en el database.module.ts y en los servicios las consultas a través de un método, y se crea el endpoint en el controlador, y dejamos las variables de conexión en variables de entorno. En el config.ts debemos configurar las variables de entorno -->

<!-- Ahora pasamos al TypeORM, para instalarlo: -->
npm install --save @nestjs/typeorm typeorm
<!-- IMPORTANTE 👇 -->
<!-- Hola, como en este momento ya hay nuevas versiones de las dependencias, al intentar seguir la clase me salieron errores, por eso me tocó actualizar primero las dependencias antes de instalar typeorm, de la siguiente forma: -->
npm install -g npm-check-updates

<!-- Esto pone a todas las dependencias en su última versión, ahora hay que modificarlas en el package.json así: -->
ncu -u

<!-- Y finalmente las instalamos: -->
npm install

<!-- Ahora sí se puede instalar typeorm: -->
npm install --save @nestjs/typeorm typeorm

<!-- Ahora vamos a modificar las entidades para que se conviertan en algo usable por ORM -->

<!-- Luego, dentro de cada módulo se importa TypeORM y se importan el módulo las entidades -->


<!-- Ahora vamos a usar el patrón Repositories para administrar los servicios -->

<!-- MIGRACIONES

Hasta ahora tenemos activo synchronyze = true en nuestro databse.module.ts pero esta es una buena práctica únicamente para ambientes productivos o de testing. Para producción son mejor las migraciones -->

<!-- Creo las variables de entorno en .env -->

<!-- En los scripts del package.json adiciono la siguiente linea de comandos -->
"typeorm": "typeorm-ts-node-commonjs tsconfig-paths/register",
"migrations:generate": "npm run typeorm migration:generate -- -n" <!-- después de esta linea al ejecutar irá el nombre de la migración -->

