import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  Clock, 
  GraduationCap, 
  ArrowRight, 
  ChevronRight,
  Star
} from "lucide-react";

// Import course data
import { freeCourses, fullCourses } from "@/data/mockData";

const Courses = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<'free' | 'premium'>('free');

  return (
    <main className="pt-20">
      {/* Courses Header */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nuestros Cursos</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Descubre nuestro catálogo completo de cursos diseñados para convertirte en un trader profesional.
            </p>
            <Link href="/">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
                <ChevronLeft className="mr-2" size={16} />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setActiveTab('free')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'free'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cursos Gratuitos
              </button>
              <button
                onClick={() => setActiveTab('premium')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'premium'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Cursos Premium
              </button>
            </div>
          </div>

          {/* Free Courses */}
          {activeTab === 'free' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeCourses.map((course, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                      GRATIS
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock className="mr-2" size={16} />
                      <span>{course.duration}</span>
                      <span className="mx-2">•</span>
                      <GraduationCap className="mr-2" size={16} />
                      <span>{course.level}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {course.description}
                    </p>
                    
                    <div className="mt-auto pt-4">
                      <a 
                        href={course.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:text-primary-dark flex items-center"
                      >
                        Ver clase gratuita
                        <ArrowRight className="ml-2" size={16} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Premium Courses */}
          {activeTab === 'premium' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fullCourses.map((course, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      PREMIUM
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock className="mr-2" size={16} />
                      <span>{course.duration}</span>
                      <span className="mx-2">•</span>
                      <GraduationCap className="mr-2" size={16} />
                      <span>{course.level}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <span className="text-lg font-bold text-primary">{course.price}</span>
                    </div>
                    
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={i < course.rating ? "text-accent fill-current" : "text-gray-300"} 
                          size={16} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">({course.reviewCount} reseñas)</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {course.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                      <Button 
                        asChild
                        className="bg-accent hover:bg-amber-600 text-white"
                      >
                        <Link href="/#registro-form">
                          Inscribirse
                        </Link>
                      </Button>
                      <Button 
                        asChild
                        variant="outline"
                        className="text-primary border-primary hover:bg-primary/5"
                      >
                        <a 
                          href={course.previewUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Vista previa
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar tu camino como trader?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Regístrate hoy y comienza tu viaje hacia la libertad financiera con Trading Zen.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/#registro-form">
                Inscríbete ahora
                <ChevronRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;
