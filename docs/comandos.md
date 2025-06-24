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

## Módulo inventario

```
nest g module modules/admin/inventario
nest g res modules/admin/inventario/producto
nest g res modules/admin/inventario/categoria
nest g res modules/admin/inventario/almacen
nest g res modules/admin/inventario/sucursal


```

### Swagger

```
 npm install --save @nestjs/swagger
```
