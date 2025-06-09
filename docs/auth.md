## autenticacion (Login)


### generacion de modulos, controladores y servicios, despues debemos proteger o seguir la recomendacion de la documentacion nest/authenticacion que indica que debemos manejar con dto
```
nest g module modules/auth
nest g controller modules/auth
nest g service modules/auth
```

## ahora se manejara el JWT 
```
npm install --save @nestjs/jwt
```