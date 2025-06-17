### construir la imagen
FROM node:22-alpine3.22

## directorio de trabajo
WORKDIR /usr/src/app

## el ./ es el directorio de trabajo definido en WORKDIR
COPY package*.json ./

RUN npm install

## primer punto copia todo el codigo y el otro punto indica donde se va a copiar
COPY . .

RUN npm run build

# Run npm run migration:run para generar las migraciones de las tablas en la base de datos

# archivo de arranque de la aplicacion
CMD [ "node", "dist/src/main.js" ]