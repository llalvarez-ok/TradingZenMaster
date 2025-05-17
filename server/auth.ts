import passport from 'passport';
import { Strategy as DiscordStrategy, Profile as DiscordProfile } from 'passport-discord';
import { storage } from './storage';
import { InsertUser, User } from '@shared/schema';

// Asegurar que las variables de entorno estén disponibles
if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.DISCORD_CALLBACK_URL) {
  console.error('Error: Faltan variables de entorno necesarias para la autenticación con Discord');
}

// Definir los scopes que necesitamos de Discord
const scopes = ['identify', 'email'];

// Configurar la estrategia de Discord
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID || '',
  clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
  callbackURL: process.env.DISCORD_CALLBACK_URL || '',
  scope: scopes
}, async (accessToken: string, refreshToken: string, profile: DiscordProfile, done: (error: any, user?: any) => void) => {
  try {
    // Buscar si el usuario ya existe en la base de datos
    let user = await storage.getUserByDiscordId(profile.id);
    
    if (!user) {
      // Si no existe, crear un nuevo usuario con los datos de Discord
      const newUser: InsertUser = {
        username: profile.username,
        // Creamos una contraseña aleatoria para usuarios de Discord
        password: Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12),
        email: profile.email || `${profile.id}@discord.placeholder.com`,
        nombre: profile.username,
        authDiscord: true,
        discordId: profile.id,
        discordUsername: profile.username,
        // Estos campos serán completados después
        brokerNombre: null,
        brokerCuenta: null,
        telefono: null,
        experiencia: 'principiante'
      };
      
      // Guardar el nuevo usuario en la base de datos
      user = await storage.createUser(newUser);
    }
    
    // Devolver el usuario para la sesión
    return done(null, user);
  } catch (error) {
    console.error('Error en autenticación con Discord:', error);
    return done(error as Error);
  }
}));

// Serializar y deserializar usuario para la sesión
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;