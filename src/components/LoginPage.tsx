import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Github, Code2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

// Reusable dark theme configuration for SweetAlert2
const swalDarkTheme = {
  background: '#0f172a', // slate-900
  color: '#f8fafc', // slate-50
  confirmButtonColor: '#00FF85',
  confirmButtonText: '<span style="color: #020617; font-weight: bold;">Entendido</span>',
  customClass: {
    popup: 'border border-slate-700/50 shadow-[0_0_30px_rgba(0,255,133,0.15)] rounded-xl backdrop-blur-xl',
    title: 'text-2xl font-bold text-white',
    htmlContainer: 'text-slate-300',
  }
};

interface LoginPageProps {
  onNavigate?: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const showAlert = (title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info') => {
    MySwal.fire({
      title,
      text,
      icon,
      ...swalDarkTheme
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      showAlert("Campos requeridos", "Por favor, completa todos los campos", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success) {
        showAlert("¡Bienvenido!", `Hola ${response.user?.name}, has iniciado sesión exitosamente`, "success");

        if (onNavigate) {
          if (response.user?.user_type === "programmer") {
            onNavigate("programmer-dashboard");
          } else if (response.user?.user_type === "admin") {
            onNavigate("admin-dashboard");
          } else {
            onNavigate("company-dashboard");
          }
        }
      } else {
        setError(response.message || "Credenciales inválidas.");
        showAlert("Error de autenticación", response.message || "Credenciales inválidas.", "error");
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
      showAlert("Error", err.message || "Ocurrió un error inesperado", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00FF85]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#00FF85]/20 rounded-full blur-xl animate-pulse"></div>
              <div className="bg-slate-900 border border-[#00FF85]/30 p-4 rounded-xl relative z-10 shadow-[0_0_15px_rgba(0,255,133,0.2)]">
                <Code2 className="h-10 w-10 text-[#00FF85]" />
              </div>
            </div>
          </div>
          <h2 className="mt-2 text-3xl font-bold text-white tracking-tight">
            Bienvenido de nuevo a
          </h2>
          <div className="mt-2 text-2xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-400 glow-text drop-shadow-[0_0_15px_rgba(0,255,133,0.3)] hover:drop-shadow-[0_0_25px_rgba(0,255,133,0.5)] transition-all duration-300">
              Programmers
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={() => onNavigate && onNavigate('register')}
              className="mt-2 inline-flex items-center text-[#00FF85] hover:text-emerald-400 transition-colors font-semibold group"
            >
              Regístrate aquí
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </p>
        </div>

        <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden hover:border-[#00FF85]/30 transition-colors duration-500">
          <CardHeader className="pb-6 border-b border-slate-800/50">
            <CardTitle className="text-xl text-white">Inicio de Sesión</CardTitle>
            <CardDescription className="text-slate-400">
              Ingresa tus credenciales para acceder a tu panel
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start text-red-400 text-sm shadow-[inset_0_0_10px_rgba(239,68,68,0.05)]">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300 ml-1 text-left block">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                  </div>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all h-12"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between ml-1 mb-1">
                  <label className="text-sm font-medium text-slate-300">
                    Contraseña
                  </label>
                  <button type="button" className="text-xs font-medium text-[#00FF85] hover:text-emerald-400 hover:underline transition-colors">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                  </div>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all h-12"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#00FF85] hover:bg-[#00FF85]/90 text-slate-900 font-bold transition-all shadow-[0_0_15px_rgba(0,255,133,0.3)] hover:shadow-[0_0_25px_rgba(0,255,133,0.5)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Ingresar
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-6 pb-8 bg-slate-900/30 border-t border-slate-800/50">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-500 font-medium rounded-full">O continúa con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                variant="outline"
                type="button"
                onClick={handleGithubLogin}
                className="w-full h-11 bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white transition-all text-slate-300 font-medium group"
              >
                <Github className="h-5 w-5 mr-2 group-hover:text-white transition-colors" />
                GitHub
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-11 bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white transition-all text-slate-300 font-medium group"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 border-dashed">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3 text-center">
              Cuentas Demo
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Programador:</span>
                <code className="text-[#00FF85] bg-slate-900 border border-slate-700 px-2 py-1 rounded">
                  demo@dev.com
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Empresa:</span>
                <code className="text-[#00FF85] bg-slate-900 border border-slate-700 px-2 py-1 rounded">
                  demo@company.com
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Contraseña:</span>
                <code className="text-[#00FF85] bg-slate-900 border border-slate-700 px-2 py-1 rounded">
                  demo123
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}