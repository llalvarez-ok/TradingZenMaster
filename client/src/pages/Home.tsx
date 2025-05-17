import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Carousel } from "@/components/ui/carousel";

import { 
  ChartLine, 
  Clock, 
  Lock, 
  GraduationCap, 
  Infinity, 
  ArrowRight,
  Star,
  ChevronRight
} from "lucide-react";

// Import custom icons
import VideoIcon from "@/assets/icons/VideoIcon";
import HeadsetIcon from "@/assets/icons/HeadsetIcon";
import UsersIcon from "@/assets/icons/UsersIcon";
import ClipboardCheckIcon from "@/assets/icons/ClipboardCheckIcon";

// Import mock data
import { benefitItems, testimonials, freeCourses } from "@/data/mockData";

const Home = () => {
  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    experiencia: "principiante"
  });
  
  const { toast } = useToast();

  // Handle form change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      experiencia: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation example
    if (!formData.nombre || !formData.email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }
    
    // Show success message
    toast({
      title: "¡Registro exitoso!",
      description: "Pronto recibirás información en tu correo.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      experiencia: "principiante"
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-24 bg-gradient-to-r from-primary to-blue-700 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2" style={{ animation: 'fadeIn 0.6s ease-out forwards', animationDelay: '0.2s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Domina el Arte del <span className="text-accent">Trading</span> con Mentalidad Zen
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                Aprende estrategias avanzadas de trading, gestión emocional y análisis técnico para convertirte en un trader consistente y rentable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" id="registro">
                <Button
                  asChild
                  className="bg-accent hover:bg-amber-600 text-white py-3 px-8 rounded-full transition duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <a href="#registro-form">Inscríbete Ahora</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 py-3 px-8 rounded-full transition duration-300 font-semibold text-center"
                >
                  <a href="#ventajas">Descubre Más</a>
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-2 text-blue-100">
                <div className="flex -space-x-2">
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-blue-700" 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Student avatar" 
                  />
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-blue-700" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Student avatar" 
                  />
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-blue-700" 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                    alt="Student avatar" 
                  />
                </div>
                <p>+1,500 estudiantes ya confían en nosotros</p>
              </div>
            </div>
            <div className="lg:w-1/2" style={{ animation: 'fadeIn 0.6s ease-out forwards', animationDelay: '0.5s' }}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-[#f59e0b] rounded-2xl blur opacity-20"></div>
                <div className="relative bg-dark/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                    alt="Professional trader analyzing stock market charts" 
                    className="w-full h-auto rounded-xl" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Benefits Section */}
      <section id="ventajas" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold">VENTAJAS DEL CURSO</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">¿Por qué elegir Trading Zen?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro programa está diseñado para transformarte en un trader profesional con una metodología probada y un enfoque mental equilibrado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitItems.map((item, index) => (
              <Card
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center mb-6`}>
                    {item.icon === 'video' && <VideoIcon className={`text-2xl ${item.iconColor}`} />}
                    {item.icon === 'headset' && <HeadsetIcon className={`text-2xl ${item.iconColor}`} />}
                    {item.icon === 'users' && <UsersIcon className={`text-2xl ${item.iconColor}`} />}
                    {item.icon === 'clipboard-check' && <ClipboardCheckIcon className={`text-2xl ${item.iconColor}`} />}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Promo Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold">DESCUBRE NUESTRO MÉTODO</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Aprende con nuestra metodología única</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Mira este video para entender cómo nuestro enfoque revolucionario combina análisis técnico con equilibrio emocional.
              </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-[#10b981] rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden">
                <div className="relative pt-[56.25%]">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="Trading Zen - Presentación del curso"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold">TESTIMONIOS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Lo que dicen nuestros alumnos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Historias reales de traders que han transformado sus resultados con nuestro método.
            </p>
          </div>
          
          {/* Testimonial Carousel */}
          <Carousel>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 max-w-lg flex flex-col">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} testimonial`} 
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary" 
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-accent mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="fill-current" size={16} />
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <Star className="fill-current" size={16} />
                    )}
                  </div>
                  <p className="text-gray-700">
                    "{testimonial.comment}"
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <ChartLine className="inline text-green-500 mr-2" size={16} />
                    {testimonial.achievement}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA Section with Registration Form */}
      <section id="registro-form" className="py-24 bg-gradient-to-br from-primary/95 to-blue-800/95 relative overflow-hidden">
        {/* Background trading chart pattern */}
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza tu camino hacia el trading profesional</h2>
              <p className="text-blue-100 text-lg mb-8">
                Regístrate hoy y obtén acceso a tu primera clase gratuita, además de un eBook exclusivo sobre gestión emocional en el trading.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4">
                    <Lock className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Garantía de Devolución</h4>
                    <p className="text-blue-100">30 días de garantía si el curso no cumple tus expectativas.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4">
                    <GraduationCap className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Certificado Incluido</h4>
                    <p className="text-blue-100">Recibe un certificado oficial al completar el programa.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4">
                    <Infinity className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Acceso de por Vida</h4>
                    <p className="text-blue-100">Incluye actualizaciones y nuevo contenido sin costo adicional.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="rounded-xl p-8 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6 text-center">Regístrate Ahora</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                      </Label>
                      <Input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                        placeholder="Tu nombre" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </Label>
                      <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                        placeholder="tu@email.com" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono (opcional)
                      </Label>
                      <Input 
                        type="tel" 
                        id="telefono" 
                        name="telefono" 
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                        placeholder="+34 600 00 00 00" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="experiencia" className="block text-sm font-medium text-gray-700 mb-1">
                        Nivel de experiencia
                      </Label>
                      <Select 
                        value={formData.experiencia} 
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                          <SelectValue placeholder="Selecciona tu nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="principiante">Principiante</SelectItem>
                            <SelectItem value="intermedio">Intermedio</SelectItem>
                            <SelectItem value="avanzado">Avanzado</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-accent hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Obtener Acceso Gratuito
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      Al registrarte, aceptas nuestros <Link href="/terms" className="text-primary hover:underline">Términos y Condiciones</Link> y nuestra <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section id="courses-section" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold">NUESTROS CURSOS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Prueba nuestras clases gratuitas</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra metodología con estas tres clases de muestra antes de registrarte al programa completo.
            </p>
          </div>
          
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
                    <Link href={course.link} className="text-primary font-semibold hover:text-primary-dark flex items-center">
                      Ver clase gratuita
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Link href="/courses">
                Ver el programa completo
                <ChevronRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
