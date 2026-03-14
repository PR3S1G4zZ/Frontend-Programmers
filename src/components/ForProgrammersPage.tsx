import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, type Variants } from "framer-motion";
import { 
  Code, 
  Star, 
  DollarSign, 
  Clock, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface ForProgrammersPageProps {
  onNavigate?: (page: string) => void;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function ForProgrammersPage({ onNavigate }: ForProgrammersPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProfiles = [
    {
      id: 1,
      name: "Elena Rodríguez",
      specialty: "Full Stack Developer",
      rating: 4.9,
      projects: 127,
      hourlyRate: "$85/hr",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces",
      description: "Especialista en aplicaciones web escalables con 8 años de experiencia."
    },
    {
      id: 2,
      name: "Diego Martínez",
      specialty: "Mobile Developer",
      rating: 4.8,
      projects: 89,
      hourlyRate: "$75/hr",
      technologies: ["React Native", "Flutter", "iOS", "Android"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      description: "Creador de apps móviles con más de 2M de descargas en App Store."
    },
    {
      id: 3,
      name: "Sofia Chen",
      specialty: "DevOps Engineer",
      rating: 5.0,
      projects: 156,
      hourlyRate: "$95/hr",
      technologies: ["Docker", "Kubernetes", "AWS", "Terraform"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      description: "Experta en automatización e infraestructura cloud para startups y enterprise."
    },
    {
      id: 4,
      name: "Miguel Torres",
      specialty: "Data Scientist",
      rating: 4.9,
      projects: 73,
      hourlyRate: "$90/hr",
      technologies: ["Python", "TensorFlow", "Azure", "R"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      description: "Científico de datos con PhD enfocado en machine learning y AI."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProfiles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProfiles.length) % featuredProfiles.length);
  };

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-[-20%] w-[500px] h-[500px] bg-[#00FF85]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-[-20%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden z-10">
        <div className="absolute inset-0 code-pattern opacity-[0.03]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Tu Carrera de
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-400 glow-text drop-shadow-[0_0_15px_rgba(0,255,133,0.3)]"> Programador</span>
                <br />
                Sin Límites
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 mb-8 leading-relaxed">
                Accede a proyectos premium, construye tu reputación y conecta con las mejores 
                empresas tech del mundo. Tu código merece las mejores oportunidades.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => handleNavClick('register')}
                  className="bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 px-8 py-6 text-lg font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,133,0.3)] rounded-xl"
                >
                  Crear Perfil Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#00FF85]/30 text-[#00FF85] hover:bg-[#00FF85]/10 hover:text-[#00FF85] px-8 py-6 text-lg rounded-xl transition-all backdrop-blur-sm"
                >
                  Ver Proyectos
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)] hover:-translate-y-1 transition-all">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 text-[#00FF85] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">$85K</div>
                    <div className="text-slate-400">Promedio anual</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)] hover:-translate-y-1 transition-all">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 text-[#00FF85] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">Remote</div>
                    <div className="text-slate-400">100% flexibilidad</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-4 mt-8">
                <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)] hover:-translate-y-1 transition-all">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 text-[#00FF85] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">+40%</div>
                    <div className="text-slate-400">Crecimiento salarial</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)] hover:-translate-y-1 transition-all">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 text-[#00FF85] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-slate-400">Pagos seguros</div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">¿Por qué Elegir Programmers?</h2>
            <p className="text-xl text-slate-400">Ventajas exclusivas para programadores ambiciosos</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-8">
                  <div className="bg-[#00FF85]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <Star className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Proyectos Premium</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Accede a proyectos de alta calidad de empresas verificadas. Solo trabajas con 
                    clientes serios que valoran tu talento.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-8">
                  <div className="bg-[#00FF85]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <DollarSign className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Tarifas Competitivas</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Establece tus propias tarifas y recibe el 95% de lo que cobras. Sin comisiones 
                    ocultas ni sorpresas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-8">
                  <div className="bg-[#00FF85]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <Shield className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Pagos Garantizados</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Sistema de escrow que protege tus pagos. Recibe tu dinero automáticamente 
                    al completar los hitos del proyecto.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-8">
                  <div className="bg-[#00FF85]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <TrendingUp className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Crecimiento Profesional</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Construye tu reputación con nuestro sistema de ratings y reviews. 
                    Mejores proyectos = mejores tarifas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-8">
                  <div className="bg-[#00FF85]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <Code className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Tecnologías Modernas</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Proyectos con las últimas tecnologías. Mantente actualizado y expande 
                    tu stack técnico constantemente.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-8">
                  <div className="bg-[#00FF85]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <Clock className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Flexibilidad Total</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Trabaja cuando quieras, desde donde quieras. Full-time, part-time o por 
                    proyectos específicos.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Profiles Carousel */}
      <section className="py-24 relative z-10 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Programadores Destacados</h2>
            <p className="text-xl text-slate-400">Conoce a algunos de nuestros top performers</p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProfiles.map((profile) => (
                  <div key={profile.id} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl max-w-2xl mx-auto">
                      <CardContent className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                          <ImageWithFallback 
                            src={profile.image}
                            alt={profile.name}
                            className="w-28 h-28 rounded-full border-2 border-[#00FF85] shadow-[0_0_15px_rgba(0,255,133,0.3)]"
                          />
                          
                          <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{profile.name}</h3>
                            <p className="text-[#00FF85] font-semibold mb-3">{profile.specialty}</p>
                            <p className="text-slate-300 mb-6 leading-relaxed">{profile.description}</p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                              {profile.technologies.map((tech) => (
                                <Badge 
                                  key={tech} 
                                  variant="secondary"
                                  className="bg-[#00FF85]/10 text-[#00FF85] border border-[#00FF85]/20"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start text-sm text-slate-300">
                              <div className="flex items-center bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                <Star className="h-4 w-4 text-[#00FF85] fill-[#00FF85] mr-2" />
                                <span className="font-semibold">{profile.rating}</span>
                              </div>
                              <div className="flex items-center bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                <CheckCircle className="h-4 w-4 text-[#00FF85] mr-2" />
                                <span>{profile.projects} proyectos</span>
                              </div>
                              <div className="flex items-center bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                <DollarSign className="h-4 w-4 text-[#00FF85] mr-1" />
                                <span>{profile.hourlyRate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-800 border border-slate-700 rounded-full p-4 text-white hover:bg-[#00FF85] hover:text-slate-900 transition-colors shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-800 border border-slate-700 rounded-full p-4 text-white hover:bg-[#00FF85] hover:text-slate-900 transition-colors shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {featuredProfiles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`border transition-all ${
                    index === currentSlide ? 'w-8 h-2.5 rounded-full bg-[#00FF85] border-[#00FF85] shadow-[0_0_10px_rgba(0,255,133,0.5)]' : 'w-2.5 h-2.5 rounded-full bg-slate-700 border-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-[#00FF85]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-[#00FF85]/20 shadow-[0_0_30px_rgba(0,255,133,0.1)] relative overflow-hidden"
          >
            <div className="absolute inset-0 code-pattern opacity-5 mix-blend-overlay"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              ¿Listo para Llevar tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-300 glow-text">Carrera al Siguiente Nivel</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto relative z-10">
              Únete a más de 2,500 programadores que ya están construyendo su futuro en Programmers.
              Tu próximo gran proyecto te está esperando.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
              <Button 
                size="lg"
                onClick={() => handleNavClick('register')}
                className="bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 px-10 py-6 text-lg font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,133,0.3)] rounded-xl"
              >
                Crear Perfil Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#00FF85]/30 bg-slate-800/50 text-[#00FF85] hover:bg-[#00FF85]/10 hover:text-[#00FF85] px-10 py-6 text-lg rounded-xl transition-all"
              >
                Explorar Proyectos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}