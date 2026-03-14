import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Globe
} from "lucide-react";

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactPage({ onNavigate: _onNavigate }: ContactPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío de formulario
    alert("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="fixed top-0 left-[-20%] w-[500px] h-[500px] bg-[#00FF85]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden z-10">
        <div className="absolute inset-0 code-pattern opacity-[0.03]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Hablemos de tu
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-400 glow-text drop-shadow-[0_0_15px_rgba(0,255,133,0.3)]"> Próximo Proyecto</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            ¿Tienes una idea innovadora? ¿Necesitas escalar tu equipo de desarrollo?
            Estamos aquí para ayudarte a hacer realidad tus proyectos tech.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-all duration-300 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <MessageSquare className="h-6 w-6 text-[#00FF85] mr-3" />
                    Envíanos un Mensaje
                  </CardTitle>
                  <p className="text-slate-400">
                    Completa el formulario y nuestro equipo se pondrá en contacto contigo
                    en menos de 24 horas.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium">Nombre Completo *</label>
                        <Input
                          type="text"
                          placeholder="Tu nombre"
                          required
                          className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium">Email *</label>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          required
                          className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium">Empresa</label>
                        <Input
                          type="text"
                          placeholder="Nombre de tu empresa"
                          className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2 font-medium">Teléfono</label>
                        <Input
                          type="tel"
                          placeholder="+34 600 123 456"
                          className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">Tipo de Proyecto</label>
                      <select className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] focus:outline-none transition-all appearance-none cursor-pointer">
                        <option value="" className="bg-slate-900">Selecciona el tipo de proyecto</option>
                        <option value="web-app" className="bg-slate-900">Aplicación Web</option>
                        <option value="mobile-app" className="bg-slate-900">Aplicación Móvil</option>
                        <option value="ecommerce" className="bg-slate-900">E-commerce</option>
                        <option value="saas" className="bg-slate-900">SaaS Platform</option>
                        <option value="api" className="bg-slate-900">API Development</option>
                        <option value="consulting" className="bg-slate-900">Consultoría Técnica</option>
                        <option value="team-augmentation" className="bg-slate-900">Aumento de Equipo</option>
                        <option value="other" className="bg-slate-900">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">Presupuesto Estimado</label>
                      <select className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] focus:outline-none transition-all appearance-none cursor-pointer">
                        <option value="" className="bg-slate-900">Selecciona tu rango de presupuesto</option>
                        <option value="5k-15k" className="bg-slate-900">$5,000 - $15,000</option>
                        <option value="15k-50k" className="bg-slate-900">$15,000 - $50,000</option>
                        <option value="50k-100k" className="bg-slate-900">$50,000 - $100,000</option>
                        <option value="100k+" className="bg-slate-900">$100,000+</option>
                        <option value="discuss" className="bg-slate-900">Prefiero discutirlo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2 font-medium">Mensaje *</label>
                      <Textarea
                        placeholder="Cuéntanos sobre tu proyecto, objetivos, tecnologías requeridas y cualquier detalle relevante..."
                        required
                        rows={6}
                        className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] resize-none transition-all"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#00FF85] text-slate-900 hover:bg-[#00FF85]/90 font-bold transition-all shadow-[0_0_15px_rgba(0,255,133,0.3)] hover:shadow-[0_0_25px_rgba(0,255,133,0.5)] cursor-pointer"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-[#00FF85]/10 border border-[#00FF85]/20 p-3 rounded-xl flex-shrink-0 group-hover:bg-[#00FF85]/20 transition-colors shadow-[0_0_10px_rgba(0,255,133,0.1)]">
                      <Mail className="h-5 w-5 text-[#00FF85]" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-slate-300">hola@programmers.dev</p>
                      <p className="text-slate-500 text-sm">Respuesta en 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-[#00FF85]/10 border border-[#00FF85]/20 p-3 rounded-xl flex-shrink-0 group-hover:bg-[#00FF85]/20 transition-colors shadow-[0_0_10px_rgba(0,255,133,0.1)]">
                      <Phone className="h-5 w-5 text-[#00FF85]" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-white font-semibold">Teléfono</h4>
                      <p className="text-slate-300">+34 900 123 456</p>
                      <p className="text-slate-500 text-sm">Lun-Vie 9:00-18:00 CET</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-[#00FF85]/10 border border-[#00FF85]/20 p-3 rounded-xl flex-shrink-0 group-hover:bg-[#00FF85]/20 transition-colors shadow-[0_0_10px_rgba(0,255,133,0.1)]">
                      <MapPin className="h-5 w-5 text-[#00FF85]" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-white font-semibold">Oficina Principal</h4>
                      <p className="text-slate-300">Calle de la Innovación 42</p>
                      <p className="text-slate-300">28001 Madrid, España</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-[#00FF85]/10 border border-[#00FF85]/20 p-3 rounded-xl flex-shrink-0 group-hover:bg-[#00FF85]/20 transition-colors shadow-[0_0_10px_rgba(0,255,133,0.1)]">
                      <Globe className="h-5 w-5 text-[#00FF85]" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-white font-semibold">Cobertura Global</h4>
                      <p className="text-slate-300">España, LATAM, Europa</p>
                      <p className="text-slate-500 text-sm">Equipos distribuidos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Clock className="h-5 w-5 text-[#00FF85] mr-2" />
                    Horarios de Atención
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-300">Lunes - Viernes</span>
                    <span className="text-white font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-slate-300">Sábados</span>
                    <span className="text-white font-medium">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-slate-300">Domingos</span>
                    <span className="text-slate-500">Cerrado</span>
                  </div>
                  <div className="mt-4 p-3 bg-[#00FF85]/5 border border-[#00FF85]/20 rounded-lg flex items-center shadow-[inset_0_0_10px_rgba(0,255,133,0.05)]">
                    <p className="text-[#00FF85] text-sm font-medium">
                      ⚡ Chat 24/7 disponible para clientes activos
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sales Contact */}
              <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Building2 className="h-5 w-5 text-[#00FF85] mr-2" />
                    Ventas Empresariales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    ¿Proyecto enterprise? ¿Necesitas un equipo completo?
                    Habla directamente con nuestro equipo de ventas corporativas.
                  </p>
                  <Button
                    className="w-full bg-slate-800 text-[#00FF85] border border-[#00FF85]/30 hover:bg-[#00FF85]/10 hover:border-[#00FF85] transition-all font-semibold"
                  >
                    Contactar Ventas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Illustrated) */}
      <section className="py-20 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nuestra Ubicación</h2>
            <p className="text-xl text-slate-400">Encuéntranos en el corazón de Madrid Tech</p>
          </div>

          <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              {/* Illustrated Map */}
              <div className="relative h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#020617] opacity-80 z-0"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-[#020617] to-[#020617] z-0"></div>
                
                {/* Tech Grid Pattern overlay */}
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#00FF85 1px, transparent 1px), linear-gradient(90deg, #00FF85 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                {/* Map Illustration Elements */}
                <div className="relative z-10 text-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#00FF85]/20 rounded-full blur-xl animate-pulse z-0"></div>
                    <div className="bg-[#00FF85] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-[0_0_30px_rgba(0,255,133,0.5)] border-4 border-slate-900 ring-2 ring-[#00FF85]/50">
                      <MapPin className="h-8 w-8 text-slate-900 fill-slate-900" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Programmers HQ</h3>
                  <p className="text-[#00FF85] mb-6 font-medium tracking-wide">Calle de la Innovación 42, Madrid</p>

                  <div className="inline-block bg-slate-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-slate-700 shadow-xl">
                    <p className="text-slate-300 text-sm">
                      <span className="text-[#00FF85] mr-2">•</span>
                      Metro: Sol (L1, L2, L3) | Parking Privado
                    </p>
                  </div>
                </div>

                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF85]/30 shadow-[0_0_15px_rgba(0,255,133,0.5)] z-20 animate-[scan_4s_ease-in-out_infinite]"></div>

                {/* Decorative pinging locations */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 z-10">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF85]"></span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 z-10" style={{ animationDelay: '1.5s' }}>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative z-10 bg-slate-900/20 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-slate-400">Respuestas a las dudas más comunes de nuestros clientes</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-colors duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">¿Cuánto tiempo toma encontrar desarrolladores?</h3>
                <p className="text-slate-400 leading-relaxed">
                  Típicamente recibes las primeras propuestas de perfiles compatibles en 24-48 horas. Para proyectos empresariales más específicos o quads completos, puede tomar entre 3 a 7 días estructurar el equipo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-colors duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">¿Cómo garantizan la calidad de los programadores?</h3>
                <p className="text-slate-400 leading-relaxed">
                  Todos los desarrolladores de la plataforma pasan por un proceso de verificación técnica, revisión de portafolio y validación de referencias mediante GitHub o anteriores clientes. Mantenemos el nivel permitiendo solo el top de aplicantes activos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-[#00FF85]/30 transition-colors duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">¿Qué pasa si el proyecto no sale como esperaba?</h3>
                <p className="text-slate-400 leading-relaxed">
                  Nuestro sistema integrado de pagos por hitos (Escrow) protege tu inversión reteniendo los fondos hasta la entrega. Además, ofrecemos soporte de mediación técnica gratuita para proyectos B2B.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Required for the scanning line animation to work correctly if not globally defined */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(384px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}