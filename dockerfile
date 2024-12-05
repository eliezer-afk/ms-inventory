# Usar una imagen base oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Exponer el puerto en el que tu aplicación se ejecuta
EXPOSE 3000

# Definir el comando para iniciar tu aplicación
CMD ["node", "server.ts"]