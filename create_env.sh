#!/bin/bash

# Crear archivo .env con las variables de entorno actuales
echo "# Archivo .env generado automáticamente" > .env
echo "# Fecha de generación: $(date)" >> .env
echo "" >> .env

# Variables de base de datos
echo "# Conexión a la base de datos" >> .env
echo "DATABASE_URL=${DATABASE_URL}" >> .env
echo "PGUSER=${PGUSER}" >> .env
echo "PGPASSWORD=${PGPASSWORD}" >> .env
echo "PGHOST=${PGHOST}" >> .env
echo "PGPORT=${PGPORT}" >> .env
echo "PGDATABASE=${PGDATABASE}" >> .env
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

echo "Archivo .env creado correctamente"
