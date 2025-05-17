import { 
  users, courses, testimonials, enrollments, 
  type User, type InsertUser,
  type Course, type InsertCourse,
  type Testimonial, type InsertTestimonial,
  type Enrollment, type InsertEnrollment
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Usuarios
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cursos
  getCourse(id: number): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  getFreeCourses(): Promise<Course[]>;
  getPremiumCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Testimonios
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getVisibleTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Inscripciones
  getEnrollment(id: number): Promise<Enrollment | undefined>;
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
}

export class DatabaseStorage implements IStorage {
  // Usuarios
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Cursos
  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }
  
  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }
  
  async getFreeCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isPremium, false));
  }
  
  async getPremiumCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isPremium, true));
  }
  
  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }
  
  // Testimonios
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }
  
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async getVisibleTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.isVisible, true));
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }
  
  // Inscripciones
  async getEnrollment(id: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db.select().from(enrollments).where(eq(enrollments.id, id));
    return enrollment || undefined;
  }
  
  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }
  
  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db
      .insert(enrollments)
      .values(enrollment)
      .returning();
    return newEnrollment;
  }
}

export const storage = new DatabaseStorage();
