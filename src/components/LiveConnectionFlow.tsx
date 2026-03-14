import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Lock, Briefcase, User, CheckCircle2, Search, Settings, Code, Zap } from 'lucide-react';

export function LiveConnectionFlow() {
  const [step, setStep] = useState(0);

  // Sequence map:
  // 0: Initial state (empty)
  // 1: Publishing project toast
  // 2: Company Card enters
  // 3: Radar "Buscando candidatos..." enters
  // 4: Dev Card enters (Radar exits)
  // 5: Dev applies (Button changes to Applied)
  // 6: Chat Simulation enters (MSG 1)
  // 7: Chat Simulation (MSG 2)
  // 8: Contracted Badge
  // 9: Working progress bar
  // 10: Code Delivery Toast
  // 11: Milestone Funded enters
  // 12: Review Toast (5 stars)
  // 13: Exit all and repeat

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (step === 0) timeout = setTimeout(() => setStep(1), 500); 
    else if (step === 1) timeout = setTimeout(() => setStep(2), 2000);
    else if (step === 2) timeout = setTimeout(() => setStep(3), 1500);
    else if (step === 3) timeout = setTimeout(() => setStep(4), 2000);
    else if (step === 4) timeout = setTimeout(() => setStep(5), 1800);
    else if (step === 5) timeout = setTimeout(() => setStep(6), 1800);
    else if (step === 6) timeout = setTimeout(() => setStep(7), 2000);
    else if (step === 7) timeout = setTimeout(() => setStep(8), 2000);
    else if (step === 8) timeout = setTimeout(() => setStep(9), 2000);
    else if (step === 9) timeout = setTimeout(() => setStep(10), 3000);
    else if (step === 10) timeout = setTimeout(() => setStep(11), 2000);
    else if (step === 11) timeout = setTimeout(() => setStep(12), 2500);
    else if (step === 12) timeout = setTimeout(() => setStep(13), 3500);
    else if (step === 13) timeout = setTimeout(() => setStep(0), 1000);

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="relative w-full max-w-md mx-auto h-[650px] rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-[#00FF85]/20 p-6 overflow-hidden flex flex-col items-center justify-center shadow-2xl">
      {/* Decorative background blurs inside the container */}
      <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-[#00FF85]/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

      <div className="relative w-full h-full flex flex-col justify-center space-y-3 z-10 p-1">
        <AnimatePresence mode="popLayout">
          
          {step === 1 && (
            <motion.div
              layout
              key="publishing"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              className="mx-auto bg-slate-800/80 border border-[#00FF85]/30 text-emerald-300 text-xs px-4 py-2 rounded-full flex items-center shadow-[0_0_15px_rgba(0,255,133,0.1)] backdrop-blur-md"
            >
              <Zap className="w-3.5 h-3.5 mr-2 text-[#00FF85]" />
              <span>TechNova está publicando un proyecto...</span>
            </motion.div>
          )}

          {step >= 2 && step < 13 && (
            <motion.div
              layout
              key="company-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="w-full bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700 shadow-xl"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600">
                    <Briefcase className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">TechNova Inc.</h4>
                    <p className="text-slate-400 text-[10px] mt-0.5">Publicado recién</p>
                  </div>
                </div>
                <div className="bg-[#00FF85]/10 text-[#00FF85] text-[10px] font-semibold px-2 py-1 rounded-full border border-[#00FF85]/20">
                  $2,500
                </div>
              </div>
              
              <h3 className="text-white font-bold text-base leading-tight">Buscando Senior React Dev</h3>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1">
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md">React</span>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md">TypeScript</span>
                </div>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex -space-x-1.5"
                  >
                    {[1].map((i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                         <User className="w-3 h-3 text-[#00FF85]" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              layout
              key="radar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center space-x-2 text-[#00FF85] py-1"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Search className="w-4 h-4 text-[#00FF85]" />
              </motion.div>
              <span className="text-xs font-medium text-emerald-300">Buscando match ideal...</span>
            </motion.div>
          )}

          {step >= 4 && step < 13 && (
            <motion.div
              layout
              key="dev-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="w-full bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700 shadow-xl self-end ml-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#00FF85] p-0.5 shadow-[0_0_10px_rgba(0,255,133,0.3)]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                        <User className="w-5 h-5 text-[#00FF85]" />
                      </div>
                    </div>
                    {step >= 4 && (
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                        className="absolute bottom-0 right-0 w-3 h-3 bg-[#00FF85] border-2 border-slate-900 rounded-full z-10" 
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                       <h4 className="text-white font-bold text-sm">Esteban</h4>
                       {step === 4 && (
                         <motion.span 
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            className="bg-[#00FF85]/10 text-[#00FF85] text-[9px] px-1.5 py-0.5 rounded-full border border-[#00FF85]/30"
                         >
                            98% Match
                         </motion.span>
                       )}
                    </div>
                    <p className="text-emerald-400 text-[10px] font-medium mt-0.5">React Expert</p>
                    <div className="flex items-center mt-1 space-x-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-2.5 h-2.5 text-[#00FF85] fill-[#00FF85]" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  layout
                  className="rounded-xl overflow-hidden"
                >
                  <button 
                    className={`font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      step >= 5 
                        ? 'bg-slate-700/50 text-[#00FF85] border border-[#00FF85]/30 w-24' 
                        : 'bg-[#00FF85] text-slate-900 shadow-[0_0_10px_rgba(0,255,133,0.3)] w-20 hover:scale-105'
                    }`}
                  >
                    {step >= 5 ? (
                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Aplicado
                      </motion.div>
                    ) : 'Aplicar'}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step >= 6 && step < 11 && (
             <motion.div
               layout
               key="chat-sim"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
               transition={{ duration: 0.4 }}
               className="w-full flex flex-col space-y-2.5 mt-2"
             >
               {/* Company Message */}
               <motion.div 
                 initial={{ opacity: 0, x: -10, scale: 0.9 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 className="bg-slate-700 text-slate-200 text-[11px] px-3.5 py-2.5 rounded-2xl rounded-tl-sm w-[85%] shadow-md border border-slate-600/50"
               >
                 ¡Hola Esteban! Tu perfil es excelente. ¿Tienes disponibilidad para empezar esta semana?
               </motion.div>
               
               {/* Dev Message */}
               {step >= 7 && (
                 <motion.div 
                   initial={{ opacity: 0, x: 10, scale: 0.9 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   className="bg-[#00FF85] text-slate-900 font-medium text-[11px] px-3.5 py-2.5 rounded-2xl rounded-tr-sm w-[80%] self-end shadow-[0_4px_14px_rgba(0,255,133,0.2)]"
                 >
                   ¡Hola! Sí, puedo empezar mañana mismo.
                 </motion.div>
               )}

               {/* Hiring Badge */}
               <AnimatePresence>
                 {step >= 8 && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="mx-auto mt-4 bg-slate-800/90 backdrop-blur-sm border border-[#00FF85]/40 text-[#00FF85] text-[11px] px-4 py-2 rounded-full flex items-center shadow-[0_0_20px_rgba(0,255,133,0.2)]"
                   >
                     🚀 <span className="font-semibold tracking-wide ml-2 text-emerald-100">Esteban ha sido contratado</span>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Working Progress */}
               {step >= 9 && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex flex-col gap-2 relative mt-2"
                 >
                   <div className="flex justify-between items-center text-[10px] text-slate-400">
                     <span className="flex items-center"><Settings className="w-3 h-3 mr-1 animate-spin-slow" /> Desarrollando proyecto...</span>
                     <span className="text-[#00FF85]">{step >= 10 ? '100%' : '65%'}</span>
                   </div>
                   <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }} animate={{ width: step >= 10 ? '100%' : '65%' }} transition={{ duration: 1.5 }}
                       className="h-full bg-[#00FF85] shadow-[0_0_10px_rgba(0,255,133,0.5)]"
                     />
                   </div>
                 </motion.div>
               )}
             </motion.div>
           )}

          {step >= 10 && step < 13 && (
            <motion.div
              layout
              key="delivery"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10, filter: 'blur(5px)' }}
              className="mx-auto bg-slate-800/80 border border-[#00FF85]/30 text-emerald-300 text-xs px-4 py-2 rounded-full flex items-center shadow-[0_0_15px_rgba(0,255,133,0.1)] backdrop-blur-md"
            >
              <Code className="w-3.5 h-3.5 mr-2 text-[#00FF85]" />
              <span>Código entregado y aprobado</span>
            </motion.div>
          )}

          {step >= 11 && step < 13 && (
            <motion.div 
              layout
              key="payment"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mx-auto mt-2 bg-slate-800/90 backdrop-blur-sm border border-[#00FF85]/40 text-[#00FF85] text-xs px-4 py-3 rounded-full flex items-center shadow-[0_0_20px_rgba(0,255,133,0.2)]"
            >
              <Lock className="w-4 h-4 mr-2" />
              <span className="font-semibold tracking-wide border-r border-[#00FF85]/30 pr-3 mr-3 text-emerald-100">Pago Liberado</span>
              <span className="font-bold text-sm text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.5)]">$2,500</span>
              <CheckCircle2 className="w-4 h-4 ml-3" />
            </motion.div>
          )}

          {step === 12 && (
            <motion.div
              layout
              key="review"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10, filter: 'blur(5px)' }}
              className="mx-auto mt-2 bg-slate-800/80 border border-[#00FF85]/30 text-emerald-300 text-xs px-4 py-2 rounded-full flex items-center shadow-[0_0_15px_rgba(0,255,133,0.1)] backdrop-blur-md"
            >
              <span className="font-medium mr-2 text-white">Review de TechNova:</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((star) => (
                  <motion.div key={star} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: star * 0.1 }}>
                     <Star className="w-3.5 h-3.5 fill-[#00FF85] text-[#00FF85]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
