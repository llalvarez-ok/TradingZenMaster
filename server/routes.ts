import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import passport from "./auth";
import { storage } from "./mongoStorage";
import { insertUserSchema, insertCourseSchema, insertTestimonialSchema, insertEnrollmentSchema } from "../shared/mongoSchema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rutas de autenticación con Discord
  app.get("/auth/discord", passport.authenticate("discord"));

  app.get("/auth/discord/callback", 
    passport.authenticate("discord", { 
      failureRedirect: "/?auth_error=true"
    }),
    (req, res) => {
      // Redirigir al formulario de broker si es un nuevo usuario
      if ((req.user as any)?.brokerNombre === null || (req.user as any)?.brokerCuenta === null) {
        res.redirect("/complete-profile");
      } else {
        res.redirect("/");
      }
    }
  );

  app.get("/api/auth/status", (req, res) => {
    if (req.isAuthenticated()) {
      // No devolver la contraseña
      const { password, ...user } = req.user as any;
      res.json({ authenticated: true, user });
    } else {
      res.json({ authenticated: false });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      res.json({ success: true });
    });
  });

  // Ruta para completar perfil de broker
  app.post("/api/users/complete-profile", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "No autenticado" });
      }

      // Para MongoDB, usamos _id en lugar de id
      const userId = (req.user as any)._id || (req.user as any).id;
      const { brokerNombre, brokerCuenta } = req.body;

      if (!brokerNombre || !brokerCuenta) {
        return res.status(400).json({ error: "Información del broker requerida" });
      }

      // Actualizar perfil del usuario con información del broker
      const updatedUser = await storage.updateUserBroker(userId, brokerNombre, brokerCuenta);
      
      if (!updatedUser) {
        return res.status(500).json({ error: "Error al actualizar el perfil" });
      }

      // No devolver la contraseña
      const { password, ...userWithoutPassword } = updatedUser;
      return res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error al completar el perfil:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  // API de usuarios
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // No devolver la contraseña
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.post("/api/users/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Verificar si el usuario ya existe
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
      }

      if (userData.email) {
        const existingUserByEmail = await storage.getUserByEmail(userData.email);
        if (existingUserByEmail) {
          return res.status(400).json({ error: "El correo electrónico ya está registrado" });
        }
      }

      const newUser = await storage.createUser(userData);
      
      // No devolver la contraseña en la respuesta
      const { password, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Datos de usuario inválidos", details: error.errors });
      }
      console.error("Error al registrar usuario:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  // API de cursos
  app.get("/api/courses", async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getAllCourses();
      return res.json(courses);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.get("/api/courses/free", async (_req: Request, res: Response) => {
    try {
      const freeCourses = await storage.getFreeCourses();
      return res.json(freeCourses);
    } catch (error) {
      console.error("Error al obtener cursos gratuitos:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.get("/api/courses/premium", async (_req: Request, res: Response) => {
    try {
      const premiumCourses = await storage.getPremiumCourses();
      return res.json(premiumCourses);
    } catch (error) {
      console.error("Error al obtener cursos premium:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.get("/api/courses/:id", async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      return res.json(course);
    } catch (error) {
      console.error("Error al obtener curso:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.post("/api/courses", async (req: Request, res: Response) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const newCourse = await storage.createCourse(courseData);
      return res.status(201).json(newCourse);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Datos de curso inválidos", details: error.errors });
      }
      console.error("Error al crear curso:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  // API de testimonios
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getVisibleTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonialData);
      return res.status(201).json(newTestimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Datos de testimonio inválidos", details: error.errors });
      }
      console.error("Error al crear testimonio:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  // API de inscripciones
  app.get("/api/enrollments/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      
      const enrollments = await storage.getUserEnrollments(userId);
      return res.json(enrollments);
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  app.post("/api/enrollments", async (req: Request, res: Response) => {
    try {
      const enrollmentData = insertEnrollmentSchema.parse(req.body);
      
      // Verificar que el usuario existe
      const user = await storage.getUser(enrollmentData.userId);
      if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
      
      // Verificar que el curso existe
      const course = await storage.getCourse(enrollmentData.courseId);
      if (!course) {
        return res.status(400).json({ error: "Curso no encontrado" });
      }
      
      const newEnrollment = await storage.createEnrollment(enrollmentData);
      return res.status(201).json(newEnrollment);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Datos de inscripción inválidos", details: error.errors });
      }
      console.error("Error al crear inscripción:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
