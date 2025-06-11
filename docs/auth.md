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

- el codigo secreto podria ser un hash unico o apikey, y se deberia poner uno en produccion y otro diferente en pruebas

- los token por sesion o digamos 3 inicios de sesion en diferentes dispositivos, eso se manejaria por gestion una base de datos que controle sesiones, si tal usuario ya genero un token se registra en la base de datos y si vuelven a generar otro  como un conteo en la base de datos o se puede limitar a uno, puede mandar un mensaje indicando que se va a cerrar su sesion y en el otro va a continuar

- deberiamos de gestionar en la base de datos la cantidad de tokens