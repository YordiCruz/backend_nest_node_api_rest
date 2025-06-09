# agregar la parte de la configuracion
## configurar variables de entorno
- instalamos la dependencia requerida
```
npm i --save @nestjs/config
```

### nestjs/config utiliza y ya lo tiene por defecto dotenv: ayuda a declarar variables de entorno, para proteger cierta informacion contraseñas, credenciales, apiskey 

## como lo habilitamos el dotenv, en el archivo app.module.ts

- las variables de entorno definidas externamente son visibles dentro de Node.js a traves de 'process.env' ej: 'process.env.PORT'