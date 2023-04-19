<p align="center">
  <h1>Prueba técnica Inlaze</h1>
</p>

<p>Social wires es una red social en la cual las personas publican mensajes, y las demás personas podrán reaccionar a estos, así como también podrán comentar a estas publicaciones.</p>

## Instalación y ejecución
<p>Una vez clonado el repositorio se deben ejecutar los siguientes comandos</p>

```bash
# Instalar dependencias
$ npm install
# Crear imagen con base de datos postgres
$ docker-compose up
```

<p>Una vez listas las imágenes de docker ya se puede ejecutar la aplicación</p>

```bash
$ npm run start
```

<p>La apliación se ejecutará en <a href="http://localhost:3000/wires/" target="_blank">http://localhost:3000/wires/ </a></p>
<p>También se realizó una documentación utilizando swagger, para acceder a esta se debe ir a la ruta <a href="http://localhost:3000/wires/api" target="_blank">http://localhost:3000/wires/api</a></p>

## Librerías
<p>Para el desarrollo del aplicativo se usaron las siguientes librerías</p>

<ul>
  <li><b>typeorm pg</b>: Estas librerías se usaron para el manejo de la base de la información en la base de datos</li>
  <li><b>@nestjs/config</b>: Se utilizó para acceder a las variables de entorno desde diferentes partes de la aplicación</li>
  <li><b>passport passport-local passport-jwt</b>: Ayudaron al manejo de la autenticación en la aplicación, creación de token y validación</li>
  <li><b>bcrypt</b>: Se usó para encriptar la contraseña de los usuarios</li>
  <li><b>class-validator class-transformer</b>: Se utilizó para validar el body enviado en cada petición</li>
  <li><b>@nestjs/swagger</b>: Se utilizó para crear la documentación de la aplicación</li>
</ul>


