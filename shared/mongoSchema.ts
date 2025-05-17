import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Interfaces para los documentos de MongoDB
export interface IUser extends Document {
  username: string;
  password: string;
  nombre?: string;
  email: string;
  telefono?: string;
  experiencia?: string;
  brokerNombre?: string;
  brokerCuenta?: string;
  discordId?: string;
  discordUsername?: string;
  authDiscord?: boolean;
  createdAt?: Date;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  videoUrl: string;
  isPremium?: boolean;
  price?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
}

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrollmentDate?: Date;
}

export interface ITestimonial extends Document {
  name: string;
  position: string;
  avatar: string;
  rating: number;
  comment: string;
  achievement?: string;
  isVisible?: boolean;
  createdAt?: Date;
}

// Esquemas de MongoDB
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  experiencia: { type: String, default: 'principiante' },
  brokerNombre: { type: String },
  brokerCuenta: { type: String },
  discordId: { type: String },
  discordUsername: { type: String },
  authDiscord: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  image: { type: String, required: true },
  videoUrl: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  price: { type: String },
  rating: { type: Number },
  reviewCount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const EnrollmentSchema = new Schema<IEnrollment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now }
});

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  achievement: { type: String },
  isVisible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Índices para mejorar el rendimiento
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ discordId: 1 });
CourseSchema.index({ isPremium: 1 });
EnrollmentSchema.index({ userId: 1 });
EnrollmentSchema.index({ courseId: 1 });
TestimonialSchema.index({ isVisible: 1 });

// Modelos
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const CourseModel = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
export const EnrollmentModel = mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
export const TestimonialModel = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

// Esquemas de validación de Zod
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  nombre: z.string().optional(),
  email: z.string().email(),
  telefono: z.string().optional(),
  experiencia: z.string().optional(),
  brokerNombre: z.string().optional(),
  brokerCuenta: z.string().optional(),
  discordId: z.string().optional(),
  discordUsername: z.string().optional(),
  authDiscord: z.boolean().optional()
});

export const insertCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  level: z.string(),
  image: z.string(),
  videoUrl: z.string(),
  isPremium: z.boolean().optional(),
  price: z.string().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional()
});

export const insertEnrollmentSchema = z.object({
  userId: z.string(),
  courseId: z.string()
});

export const insertTestimonialSchema = z.object({
  name: z.string(),
  position: z.string(),
  avatar: z.string(),
  rating: z.number(),
  comment: z.string(),
  achievement: z.string().optional(),
  isVisible: z.boolean().optional()
});

// Tipos exportados
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = IUser;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = ICourse;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = IEnrollment;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = ITestimonial;