import mongoose from 'mongoose';

// Verificar que las variables de entorno están disponibles
if (!process.env.MONGODB_URI) {
  throw new Error('La variable de entorno MONGODB_URI no está definida');
}

// Conectar a MongoDB
export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

// Cerrar la conexión
export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB correctamente');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error);
  }
}

export default mongoose;