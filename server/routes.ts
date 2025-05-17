import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertTestimonialSchema, insertEnrollmentSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API de usuarios
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

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
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        return res.status(400).json({ error: "ID de curso inválido" });
      }

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
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

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
