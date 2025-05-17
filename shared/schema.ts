import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Tabla de usuarios
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  nombre: text("nombre"),
  email: text("email").notNull().unique(),
  telefono: text("telefono"),
  experiencia: text("experiencia").default("principiante"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tabla de cursos
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  image: text("image").notNull(),
  videoUrl: text("video_url").notNull(),
  isPremium: boolean("is_premium").default(false),
  price: text("price"),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tabla de inscripciones
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
});

// Tabla de testimonios
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  avatar: text("avatar").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  achievement: text("achievement"),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

// Esquemas de inserción
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  nombre: true,
  email: true,
  telefono: true,
  experiencia: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  duration: true,
  level: true,
  image: true,
  videoUrl: true,
  isPremium: true,
  price: true,
  rating: true,
  reviewCount: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  userId: true,
  courseId: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  position: true,
  avatar: true,
  rating: true,
  comment: true,
  achievement: true,
  isVisible: true,
});

// Tipos exportados
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
