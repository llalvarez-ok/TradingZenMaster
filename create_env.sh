#!/bin/bash

# Crear archivo .env con las variables de entorno para MongoDB
echo "# Archivo .env generado automáticamente" > .env
echo "# Fecha de generación: $(date)" >> .env
echo "" >> .env

# Variables de MongoDB
echo "# Conexión a MongoDB" >> .env
echo "MONGODB_URI=mongodb://localhost:27017/trading_zen" >> .env
echo "MONGODB_DB_NAME=trading_zen" >> .env
echo "" >> .env

# Variables de Discord
echo "# Credenciales de Discord" >> .env
echo "DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID}" >> .env
echo "DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET}" >> .env
echo "DISCORD_CALLBACK_URL=${DISCORD_CALLBACK_URL}" >> .env
echo "" >> .env

# Otras configuraciones
echo "# Configuración de la aplicación" >> .env
echo "NODE_ENV=development" >> .env

echo "Archivo .env para MongoDB creado correctamente"
