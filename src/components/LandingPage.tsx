import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LiveConnectionFlow } from "./LiveConnectionFlow";
import { motion, type Variants } from "framer-motion";
import {
  Search,
  UserCheck,
  DollarSign,
  Code,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Briefcase
} from "lucide-react";

interface LandingPageProps {
  onNavigate?: (page: string) => void;
}

// Fade in up animation variant
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

export function LandingPage({ onNavigate }: LandingPageProps) {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
      
      {/* Ambient Global Glows - Strictly Green/Emerald */}
      <div className="fixed top-0 left-[-20%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-[-20%] w-[600px] h-[600px] bg-[#00FF85]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden z-10">
        <div className="absolute inset-0 code-pattern opacity-[0.03]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column Text */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="space-y-8 text-center lg:text-left"
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Conecta con el
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-400 glow-text drop-shadow-[0_0_15px_rgba(0,255,133,0.3)]"> Mejor Talento</span>
                <br />
                en Desarrollo
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                La plataforma que une a programadores excepcionales con empresas innovadoras.
                Más que un empleo, construye una red de código que transformará tu carrera.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button
                  size="lg"
                  onClick={() => handleNavClick('register')}
                  className="bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 px-8 py-6 text-lg font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,133,0.3)] rounded-xl"
                >
                  Empezar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleNavClick('for-companies')}
                  className="border-[#00FF85]/20 text-[#00FF85] hover:bg-[#00FF85]/10 hover:text-[#00FF85] px-8 py-6 text-lg rounded-xl transition-colors backdrop-blur-sm"
                >
                  Soy una Empresa
                  <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start items-center space-x-10 text-slate-400 mt-12 pt-8 border-t border-slate-800/50">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white">2,500+</div>
                  <div className="text-sm mt-1">Programadores</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white">850+</div>
                  <div className="text-sm mt-1">Empresas</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-white">5,200+</div>
                  <div className="text-sm mt-1">Proyectos</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column Component */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex justify-center lg:justify-end relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00FF85]/10 blur-[80px] rounded-full z-0"></div>
              <LiveConnectionFlow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">¿Cómo Funciona?</h2>
            <p className="text-xl text-slate-400">Tres simples pasos para conectar talento con oportunidades</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)]">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div className="bg-[#00FF85]/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <UserCheck className="h-10 w-10 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">1. Crea tu Perfil</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Registra tu perfil como programador o empresa. Destaca tus habilidades técnicas y proyectos realizados en un portfolio moderno.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)]">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div className="bg-[#00FF85]/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <Search className="h-10 w-10 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">2. Explora Oportunidades</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Nuestro algoritmo de matching te conecta instantáneamente con proyectos que encajan perfectamente con tu stack tecnológico.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 hover:-translate-y-2 h-full shadow-xl hover:shadow-[0_0_20px_rgba(0,255,133,0.15)]">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div className="bg-[#00FF85]/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                    <DollarSign className="h-10 w-10 text-[#00FF85]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">3. Conecta y Colabora</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Inicia conversaciones en tiempo real, negocia términos, entrega hitos de código y recibe pagos seguros garantizados.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative z-10 overflow-hidden">
        {/* Subtle separator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00FF85]/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* For Programmers */}
            <motion.div 
               initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center mb-10 border-b border-slate-800 pb-4">
                <div className="bg-[#00FF85]/10 p-3 rounded-xl mr-4 border border-[#00FF85]/20">
                  <Code className="h-8 w-8 text-[#00FF85]" />
                </div>
                <h2 className="text-3xl font-bold text-white">Para Programadores</h2>
              </motion.div>

              <div className="space-y-8">
                <motion.div variants={fadeInUp} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-slate-800 rounded-full p-1 group-hover:bg-[#00FF85]/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-[#00FF85]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Proyectos de Calidad</h3>
                    <p className="text-slate-400 leading-relaxed">Accede a proyectos desafiantes de empresas verificadas que valoran verdaderamente el buen código y las buenas prácticas.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-slate-800 rounded-full p-1 group-hover:bg-[#00FF85]/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-[#00FF85]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Pagos Seguros Automáticos</h3>
                    <p className="text-slate-400 leading-relaxed">Sistema de pagos protegido. Tu dinero se congela (escrow) al iniciar el desarrollo y se libera garantizado al entregar.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-slate-800 rounded-full p-1 group-hover:bg-[#00FF85]/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-[#00FF85]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Reputación Inmutable</h3>
                    <p className="text-slate-400 leading-relaxed">Construye un perfil sólido basado en reviews reales. Tu buen trabajo te abrirá puertas automáticamente.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* For Companies */}
            <motion.div 
               initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center mb-10 border-b border-slate-800 pb-4">
                <div className="bg-[#00FF85]/10 p-3 rounded-xl mr-4 border border-[#00FF85]/20">
                  <Users className="h-8 w-8 text-[#00FF85]" />
                </div>
                <h2 className="text-3xl font-bold text-white">Para Empresas</h2>
              </motion.div>

              <div className="space-y-8">
                <motion.div variants={fadeInUp} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-slate-800 rounded-full p-1 group-hover:bg-[#00FF85]/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-[#00FF85]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Talento 100% Verificado</h3>
                    <p className="text-slate-400 leading-relaxed">Se acabaron las entrevistas interminables. Accede a programadores con perfiles verificados y código validado por la comunidad.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-slate-800 rounded-full p-1 group-hover:bg-[#00FF85]/20 transition-colors">
                     <CheckCircle className="h-5 w-5 text-[#00FF85]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Contratación Ágil</h3>
                    <p className="text-slate-400 leading-relaxed">Publica un requerimiento y recibe matches en minutos. Cierra contratos e inicia el desarrollo en el mismo día.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-slate-800 rounded-full p-1 group-hover:bg-[#00FF85]/20 transition-colors">
                     <CheckCircle className="h-5 w-5 text-[#00FF85]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Escalabilidad Dinámica</h3>
                    <p className="text-slate-400 leading-relaxed">Consigue expertos para resolver bugs de 1 día, o forma un escuadrón técnico completo para proyectos de meses.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative z-10 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
             className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Lo que Dicen Nuestros Usuarios</h2>
            <p className="text-xl text-slate-400">Historias reales conectando visión con código</p>
          </motion.div>

          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 hover:border-[#00FF85]/50 hover:shadow-[0_0_15px_rgba(0,255,133,0.1)] transition-all h-full shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#00FF85] fill-[#00FF85]" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">
                    "Encontré proyectos increíbles que me han permitido crecer mi stack tecnológico. 
                    El sistema de pagos garantizados me da la paz mental para solo enfocarme en programar."
                  </p>
                  <div className="flex items-center pt-6 border-t border-slate-700/50">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                      alt="Ana García"
                      className="w-12 h-12 rounded-full mr-4 border-2 border-slate-700 hover:border-[#00FF85]"
                    />
                    <div>
                      <div className="text-white font-bold">Ana García</div>
                      <div className="text-[#00FF85] text-sm">Full Stack Developer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 hover:border-[#00FF85]/50 hover:shadow-[0_0_15px_rgba(0,255,133,0.1)] transition-all h-full shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#00FF85] fill-[#00FF85]" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">
                    "Como startup SaaS, necesitábamos movernos rápido. En esta plataforma encontramos 
                    desarrolladores senior especializados en React en menos de 48 horas."
                  </p>
                  <div className="flex items-center pt-6 border-t border-slate-700/50">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
                      alt="Carlos Ruiz"
                      className="w-12 h-12 rounded-full mr-4 border-2 border-slate-700 hover:border-[#00FF85]"
                    />
                    <div>
                      <div className="text-white font-bold">Carlos Ruiz</div>
                      <div className="text-[#00FF85] text-sm">CTO, InnovateTech</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 hover:border-[#00FF85]/50 hover:shadow-[0_0_15px_rgba(0,255,133,0.1)] transition-all h-full shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#00FF85] fill-[#00FF85]" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">
                    "La plataforma me ha conectado con clientes de Europa y USA. 
                    Ahora trabajo remoto en proyectos que realmente me apasionan, ganando en dólares."
                  </p>
                  <div className="flex items-center pt-6 border-t border-slate-700/50">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=faces"
                      alt="María López"
                      className="w-12 h-12 rounded-full mr-4 border-2 border-slate-700 hover:border-[#00FF85]"
                    />
                    <div>
                      <div className="text-white font-bold">María López</div>
                      <div className="text-[#00FF85] text-sm">Frontend Specialist</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        {/* Massive background glow for CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#00FF85]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 30 }}
             whileInView={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-[#00FF85]/20 shadow-[0_0_30px_rgba(0,255,133,0.1)] overflow-hidden"
          >
            {/* Subtle inner grid/pattern */}
            <div className="absolute inset-0 code-pattern opacity-5 mix-blend-overlay"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-300 glow-text">Transformar tu Carrera</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto relative z-10">
              Únete a miles de programadores y empresas que ya están construyendo
              el futuro del desarrollo de software hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
              <Button
                size="lg"
                onClick={() => handleNavClick('register')}
                className="bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 px-10 py-6 text-lg font-bold hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,133,0.3)] rounded-xl"
              >
                Crear Cuenta Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavClick('contact')}
                className="border-[#00FF85]/30 bg-slate-800/50 text-[#00FF85] hover:bg-[#00FF85]/10 hover:text-[#00FF85] px-10 py-6 text-lg rounded-xl transition-all"
              >
                Hablar con Ventas
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}