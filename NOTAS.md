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

<!-- USE FACTORY:  -->
