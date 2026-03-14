import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion,type Variants } from "framer-motion";
import { 
  Users, 
  Zap, 
  ShieldCheck, 
  Target,
  CheckCircle,
  ArrowRight,
  Search,
  MessageSquare,
  FileCode2,
  Trophy
} from "lucide-react";

interface ForCompaniesPageProps {
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

export function ForCompaniesPage({ onNavigate }: ForCompaniesPageProps) {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#00FF85]" />,
      title: "Publica tu Requermiento",
      description: "Describe lo que necesitas. Nuestro algoritmo te matchea con los programadores más compatibles en minutos."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#00FF85]" />,
      title: "Entrevista y Selecciona",
      description: "Chat directo con candidatos pre-evaluados. Revisa su portafolio real, código y referencias de otros clientes."
    },
    {
      icon: <FileCode2 className="w-8 h-8 text-[#00FF85]" />,
      title: "Inicia el Desarrollo",
      description: "Gestiona el proyecto desde nuestro dashboard. Pagos en escrow garantizan que solo pagas por hitos completados."
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#00FF85]" />,
      title: "Recibe tu Producto",
      description: "Código de alta calidad entregado a tiempo. Revisa, aprueba y califica al talento para fortalecer la comunidad."
    }
  ];

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-[-20%] w-[500px] h-[500px] bg-[#00FF85]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-[-20%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden z-10">
        <div className="absolute inset-0 code-pattern opacity-[0.03]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-[#00FF85]/10 border border-[#00FF85]/30 rounded-full px-4 py-2 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#00FF85] animate-pulse"></span>
                <span className="text-sm font-medium text-[#00FF85]">B2B Tech Solutions</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Escala tu Equipo con
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-400 glow-text drop-shadow-[0_0_15px_rgba(0,255,133,0.3)]">Talento Técnico Top</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                Deja de perder meses reclutando. Conecta en 48 horas con desarrolladores 
                senior, verificados y listos para integrarse a tu proyecto.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  onClick={() => handleNavClick('register')}
                  className="bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 px-8 py-6 text-lg font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,133,0.3)] rounded-xl"
                >
                  Contratar Talento
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#00FF85]/30 text-[#00FF85] hover:bg-[#00FF85]/10 hover:text-[#00FF85] px-8 py-6 text-lg rounded-xl transition-all backdrop-blur-sm"
                >
                  Ver Casos de Éxito
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF85]/10 to-transparent rounded-[2rem] transform rotate-3 scale-105 z-0 blur-lg"></div>
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Equipo de desarrollo trabajando"
                className="rounded-[2rem] border border-slate-700/50 shadow-2xl relative z-10 hover:border-[#00FF85]/40 transition-colors duration-500"
              />
              
              {/* Floating Stats Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-xl z-20"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#00FF85]/10 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">48h</div>
                    <div className="text-sm text-slate-400">Tiempo de Match</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-xl z-20"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#00FF85]/10 p-3 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-[#00FF85]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">99%</div>
                    <div className="text-sm text-slate-400">Éxito en Proyectos</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Logos (Simulated) */}
      <section className="py-10 border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">Empresas innovadoras que confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text as placeholder for logos */}
            <h3 className="text-2xl font-bold font-sans text-slate-300 hover:text-[#00FF85] transition-colors">STARTUP.IO</h3>
            <h3 className="text-2xl font-extrabold italic text-slate-300 hover:text-[#00FF85] transition-colors">TechCorp</h3>
            <h3 className="text-2xl font-light tracking-widest text-slate-300 hover:text-[#00FF85] transition-colors">NEXUS</h3>
            <h3 className="text-2xl font-bold font-serif text-slate-300 hover:text-[#00FF85] transition-colors">GlobalFin</h3>
            <h3 className="text-2xl font-black text-slate-300 hover:text-[#00FF85] transition-colors">VELOCITY</h3>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Reclutamiento Tech, Evolucionado</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Eliminamos la fricción del proceso de contratación para que puedas enfocarte 
              en construir tu producto.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 h-full p-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#00FF85]/10 p-4 rounded-2xl border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                      <Users className="h-8 w-8 text-[#00FF85]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Vetting Riguroso</h3>
                      <p className="text-slate-400 leading-relaxed">
                        Solo el 5% de los aplicantes superan nuestro proceso de selección. Evaluamos skills técnicos, soft skills y experiencia real demostrable.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 h-full p-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#00FF85]/10 p-4 rounded-2xl border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                      <Target className="h-8 w-8 text-[#00FF85]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Matching Inteligente</h3>
                      <p className="text-slate-400 leading-relaxed">
                        No busques perfiles a ciegas. Nuestro algoritmo analiza las necesidades exactas de tu stack y te presenta a los candidatos perfectos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 h-full p-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#00FF85]/10 p-4 rounded-2xl border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                      <ShieldCheck className="h-8 w-8 text-[#00FF85]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Seguridad Contractual</h3>
                      <p className="text-slate-400 leading-relaxed">
                        NDAs integrados, retención de IP automática y sistema de pagos escrow. Tu código y tu dinero están siempre protegidos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 h-full p-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#00FF85]/10 p-4 rounded-2xl border border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]">
                      <Zap className="h-8 w-8 text-[#00FF85]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Escalabilidad Flexible</h3>
                      <p className="text-slate-400 leading-relaxed">
                        ¿Necesitas un dev part-time o un squad completo? Escala tu equipo técnica arriba o abajo según las necesidades de tu roadmap.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="py-24 relative z-10 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Proceso Transparente y Rápido</h2>
            <p className="text-xl text-slate-400">Del requerimiento al código entregado en un entorno seguro.</p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-800 hidden lg:block z-0">
              <div className="w-1/2 h-full bg-gradient-to-r from-[#00FF85]/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="bg-slate-900 border-2 border-slate-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative group shadow-lg hover:border-[#00FF85]/50 transition-colors">
                    <div className="absolute -inset-2 bg-[#00FF85]/10 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity"></div>
                    {step.icon}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#00FF85] rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-[0_0_10px_rgba(0,255,133,0.5)]">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Carousel Section */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-12">Expertos en Todas las Tecnologías Modernas</h2>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'Go', 'PostgreSQL', 'Vue.js', 'Kubernetes', 'GraphQL', 'MongoDB'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge variant="outline" className="text-lg py-3 px-6 bg-slate-800/50 border-slate-700 text-slate-300 hover:border-[#00FF85] hover:text-[#00FF85] transition-colors cursor-default backdrop-blur-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#00FF85]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-[#00FF85]/20 shadow-[0_0_30px_rgba(0,255,133,0.1)] relative overflow-hidden"
          >
            <div className="absolute inset-0 code-pattern opacity-5 mix-blend-overlay"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Transforma tu Idea en Código
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-300 glow-text">Hoy Mismo</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto relative z-10">
              Crea tu perfil de empresa gratis y publica tu primer requerimiento en menos de 5 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
              <Button 
                size="lg"
                onClick={() => handleNavClick('register')}
                className="bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 px-10 py-6 text-lg font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,133,0.3)] rounded-xl"
              >
                Comenzar a Contratar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#00FF85]/30 bg-slate-800/50 text-[#00FF85] hover:bg-[#00FF85]/10 hover:text-[#00FF85] px-10 py-6 text-lg rounded-xl transition-all"
              >
                Agendar Demo
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-slate-500 font-medium relative z-10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2 text-[#00FF85]" />
              Garantía de calidad: Solo pagas si estás satisfecho con el trabajo.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}