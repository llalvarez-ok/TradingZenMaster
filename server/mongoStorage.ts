import { 
  UserModel, CourseModel, EnrollmentModel, TestimonialModel,
  User, InsertUser, Course, InsertCourse, 
  Enrollment, InsertEnrollment, Testimonial, InsertTestimonial 
} from '../shared/mongoSchema';
import mongoose from 'mongoose';

export interface IStorage {
  // Usuarios
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByDiscordId(discordId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBroker(userId: string, brokerNombre: string, brokerCuenta: string): Promise<User | undefined>;
  
  // Cursos
  getCourse(id: string): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  getFreeCourses(): Promise<Course[]>;
  getPremiumCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Testimonios
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getVisibleTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Inscripciones
  getEnrollment(id: string): Promise<Enrollment | undefined>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
}

export class MongoDBStorage implements IStorage {
  // Usuarios
  async getUser(id: string): Promise<User | undefined> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
      const user = await UserModel.findById(id).lean();
      return user || undefined;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username }).lean();
      return user || undefined;
    } catch (error) {
      console.error("Error al obtener usuario por nombre de usuario:", error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ email }).lean();
      return user || undefined;
    } catch (error) {
      console.error("Error al obtener usuario por email:", error);
      return undefined;
    }
  }

  async getUserByDiscordId(discordId: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ discordId }).lean();
      return user || undefined;
    } catch (error) {
      console.error("Error al obtener usuario por Discord ID:", error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  async updateUserBroker(userId: string, brokerNombre: string, brokerCuenta: string): Promise<User | undefined> {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) return undefined;
      
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { brokerNombre, brokerCuenta },
        { new: true }
      ).lean();
      
      return updatedUser || undefined;
    } catch (error) {
      console.error("Error al actualizar datos del broker:", error);
      return undefined;
    }
  }

  // Cursos
  async getCourse(id: string): Promise<Course | undefined> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
      const course = await CourseModel.findById(id).lean();
      return course || undefined;
    } catch (error) {
      console.error("Error al obtener curso por ID:", error);
      return undefined;
    }
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      const courses = await CourseModel.find().lean();
      return courses;
    } catch (error) {
      console.error("Error al obtener todos los cursos:", error);
      return [];
    }
  }

  async getFreeCourses(): Promise<Course[]> {
    try {
      const courses = await CourseModel.find({ isPremium: false }).lean();
      return courses;
    } catch (error) {
      console.error("Error al obtener cursos gratuitos:", error);
      return [];
    }
  }

  async getPremiumCourses(): Promise<Course[]> {
    try {
      const courses = await CourseModel.find({ isPremium: true }).lean();
      return courses;
    } catch (error) {
      console.error("Error al obtener cursos premium:", error);
      return [];
    }
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    try {
      const newCourse = new CourseModel(course);
      const savedCourse = await newCourse.save();
      return savedCourse.toObject();
    } catch (error) {
      console.error("Error al crear curso:", error);
      throw error;
    }
  }

  // Testimonios
  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
      const testimonial = await TestimonialModel.findById(id).lean();
      return testimonial || undefined;
    } catch (error) {
      console.error("Error al obtener testimonio por ID:", error);
      return undefined;
    }
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const testimonials = await TestimonialModel.find().lean();
      return testimonials;
    } catch (error) {
      console.error("Error al obtener todos los testimonios:", error);
      return [];
    }
  }

  async getVisibleTestimonials(): Promise<Testimonial[]> {
    try {
      const testimonials = await TestimonialModel.find({ isVisible: true }).lean();
      return testimonials;
    } catch (error) {
      console.error("Error al obtener testimonios visibles:", error);
      return [];
    }
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    try {
      const newTestimonial = new TestimonialModel(testimonial);
      const savedTestimonial = await newTestimonial.save();
      return savedTestimonial.toObject();
    } catch (error) {
      console.error("Error al crear testimonio:", error);
      throw error;
    }
  }

  // Inscripciones
  async getEnrollment(id: string): Promise<Enrollment | undefined> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
      const enrollment = await EnrollmentModel.findById(id).lean();
      return enrollment || undefined;
    } catch (error) {
      console.error("Error al obtener inscripción por ID:", error);
      return undefined;
    }
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) return [];
      
      const enrollments = await EnrollmentModel.find({ userId })
        .populate('courseId')
        .lean();
      
      return enrollments;
    } catch (error) {
      console.error("Error al obtener inscripciones del usuario:", error);
      return [];
    }
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    try {
      // Convertimos los ID a ObjectId de MongoDB
      const enrollmentData = {
        ...enrollment,
        userId: new mongoose.Types.ObjectId(enrollment.userId),
        courseId: new mongoose.Types.ObjectId(enrollment.courseId)
      };

      const newEnrollment = new EnrollmentModel(enrollmentData);
      const savedEnrollment = await newEnrollment.save();
      return savedEnrollment.toObject();
    } catch (error) {
      console.error("Error al crear inscripción:", error);
      throw error;
    }
  }
}

// Instancia del servicio de almacenamiento
export const storage = new MongoDBStorage();