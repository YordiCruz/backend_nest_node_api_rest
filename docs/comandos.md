# crear servicio, modulo, controladores 
- generando el modulo con recurso api

nest g res modules/admin/users

## validar los datos del usuario en los dtos
```
npm i --save class-validator class-transformer
```

## para cifrado de contraseñas vamos a instalar bcrypt

```
npm install bcrypt
```

## para usuario creamos los modulos de roles y permisos

```
nest g res modules/admin/roles
```
```
nest g res modules/admin/permissions
```