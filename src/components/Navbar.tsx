import { useState } from "react";
import { Button } from "./ui/button";
import { Code, Menu, User, Building2, X } from "lucide-react";

interface NavbarProps {
  userType?: "guest" | "programmer" | "company" | "admin";
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function Navbar({
  userType = "guest",
  currentPage = "home",
  onNavigate,
  onLogout,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate?.(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
      setIsMobileMenuOpen(false);
      return;
    }
    handleNavClick("home");
  };

  return (
    <nav className="bg-[#020617]/95 backdrop-blur-md border-b border-[#00FF85]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform group"
            onClick={() => handleNavClick("home")}
          >
            <span className="bg-[#00FF85] p-2 rounded-lg shadow-[0_0_15px_rgba(0,255,133,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,133,0.5)] transition-shadow">
              <Code className="h-6 w-6 text-slate-900" />
            </span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-green-300 drop-shadow-[0_0_10px_rgba(0,255,133,0.5)]">
              Programmers
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {userType === "guest" && (
              <>
                <button
                  onClick={() => handleNavClick("home")}
                  className={`text-sm font-semibold transition-all duration-300 ${currentPage === "home" ? "text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.5)]" : "text-slate-300 hover:text-[#00FF85]"}`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleNavClick("for-programmers")}
                  className={`text-sm font-semibold transition-all duration-300 ${currentPage === "for-programmers" ? "text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.5)]" : "text-slate-300 hover:text-[#00FF85]"}`}
                >
                  Para Programadores
                </button>
                <button
                  onClick={() => handleNavClick("for-companies")}
                  className={`text-sm font-semibold transition-all duration-300 ${currentPage === "for-companies" ? "text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.5)]" : "text-slate-300 hover:text-[#00FF85]"}`}
                >
                  Para Empresas
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className={`text-sm font-semibold transition-all duration-300 ${currentPage === "contact" ? "text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.5)]" : "text-slate-300 hover:text-[#00FF85]"}`}
                >
                  Contacto
                </button>
              </>
            )}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-4">
            {userType === "guest" ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick("login")}
                  className="text-slate-300 hover:text-[#00FF85] hover:bg-[#00FF85]/10 font-bold tracking-wide"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  onClick={() => handleNavClick("register")}
                  className="bg-[#00FF85] text-slate-900 hover:bg-[#00CC6A] font-bold shadow-[0_0_15px_rgba(0,255,133,0.3)] hover:shadow-[0_0_20px_rgba(0,255,133,0.5)] transition-all"
                >
                  Registrarse
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-200 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
                  {userType === "programmer" ? (
                    <>
                      <div className="bg-[#00FF85]/20 p-1 rounded-full"><User className="h-4 w-4 text-[#00FF85]" /></div>
                      <span className="text-sm font-medium pr-1">Carlos Mendoza</span>
                    </>
                  ) : (
                    <>
                      <div className="bg-[#00FF85]/20 p-1 rounded-full"><Building2 className="h-4 w-4 text-[#00FF85]" /></div>
                      <span className="text-sm font-medium pr-1">TechCorp SA</span>
                    </>
                  )}
                </div>

                <Button
                  variant="ghost"
                  onClick={handleLogoutClick}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-sm"
                >
                  Cerrar Sesión
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="rounded-md border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 hover:text-[#00FF85] transition-colors"
                aria-label="Abrir menú"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } border-t border-[#00FF85]/20 bg-[#020617] backdrop-blur-xl absolute w-full shadow-2xl`}
      >
        <div className="px-4 py-6 space-y-4">
          {userType === "guest" ? (
            <>
              <button
                onClick={() => handleNavClick("home")}
                className={`w-full text-left font-semibold text-lg py-2 ${currentPage === "home" ? "text-[#00FF85]" : "text-slate-300"}`}
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavClick("for-programmers")}
                className={`w-full text-left font-semibold text-lg py-2 ${currentPage === "for-programmers" ? "text-[#00FF85]" : "text-slate-300"}`}
              >
                Para Programadores
              </button>
              <button
                onClick={() => handleNavClick("for-companies")}
                className={`w-full text-left font-semibold text-lg py-2 ${currentPage === "for-companies" ? "text-[#00FF85]" : "text-slate-300"}`}
              >
                Para Empresas
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className={`w-full text-left font-semibold text-lg py-2 ${currentPage === "contact" ? "text-[#00FF85]" : "text-slate-300"}`}
              >
                Contacto
              </button>

              <div className="pt-4 mt-2 border-t border-slate-800 space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick("login")}
                  className="w-full justify-start text-slate-300 hover:text-[#00FF85] hover:bg-[#00FF85]/10 font-bold"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  onClick={() => handleNavClick("register")}
                  className="w-full bg-[#00FF85] text-slate-900 hover:bg-[#00CC6A] font-bold"
                >
                  Registrarse
                </Button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick("home")}
                className="w-full text-left font-semibold text-lg py-2 text-slate-300"
              >
                Inicio
              </button>

              <Button
                variant="ghost"
                onClick={handleLogoutClick}
                className="w-full justify-start text-red-400 hover:bg-red-500/10 mt-4 font-bold border border-red-500/20"
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
