import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Building2,
  Code2,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { SocialAuthButtons } from "./auth/SocialAuthButtons";
import { authService, type RegisterData } from "../services/authService";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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

const USER_TYPES = {
  PROGRAMMER: 'programmer',
  COMPANY: 'company'
} as const;

const DEMO_ACCOUNTS = [
  { label: 'Programador', value: 'demo@dev.com' },
  { label: 'Empresa', value: 'demo@company.com' },
  { label: 'Contraseña', value: 'demo123' }
];

interface RegisterPageProps {
  onNavigate?: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"programmer" | "company">(USER_TYPES.PROGRAMMER);
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    user_type: "programmer",
    company_name: "",
    position: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleUserTypeSelect = (type: "programmer" | "company") => {
    setUserType(type);
    setFormData((prev) => ({ ...prev, user_type: type }));
    setError(null);
  };

  const isPasswordStrong = (password: string) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasDigit = /[0-9]/;
    const hasSpecialChar = /[@$!%*?&._-]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasDigit.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const showValidationErrors = (errors: any) => {
    const errorMessages = typeof errors === 'string' ? [errors] : Object.values(errors).flat() as string[];
    const isPasswordError = errorMessages.some(msg =>
      msg.toLowerCase().includes('password') ||
      msg.toLowerCase().includes('contraseña')
    );

    let htmlContent = '';
    if (isPasswordError) {
      const currentPassword = formData.password;
      const requirements = [
        { regex: /.{8,}/, text: 'Mínimo 8 caracteres' },
        { regex: /[A-Z]/, text: 'Al menos una letra mayúscula (A-Z)' },
        { regex: /[a-z]/, text: 'Al menos una letra minúscula (a-z)' },
        { regex: /[0-9]/, text: 'Al menos un número (0-9)' },
        { regex: /[@$!%*?&._-]/, text: 'Al menos un carácter especial (@$!%*?&._-)' }
      ];

      const requirementsHtml = requirements.map(req => {
        const met = req.regex.test(currentPassword);
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding: 10px; background: ${met ? 'rgba(0, 255, 133, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border-radius: 6px; border-left: 3px solid ${met ? '#00FF85' : '#EF4444'};">
            <span style="font-size: 14px; color: #e2e8f0;">${req.text}</span>
            <span style="font-weight: bold; color: ${met ? '#00FF85' : '#EF4444'};">${met ? '✓' : '✗'}</span>
          </div>
        `;
      }).join('');

      htmlContent = `
        <div style="text-align: left; margin-bottom: 15px;">
          <h4 style="color: #ef4444; font-weight: bold; margin-bottom: 15px; font-size: 16px;">Requisitos de seguridad:</h4>
          ${requirementsHtml}
        </div>
      `;
    } else {
      htmlContent = `
        <div style="text-align: left; color: #ef4444;">
          <ul style="list-style-type: disc; padding-left: 20px;">
            ${errorMessages.map(msg => `<li style="margin-bottom: 5px;">${msg}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    MySwal.fire({
      title: isPasswordError ? 'Contraseña Débil' : 'Validación Fallida',
      html: htmlContent,
      icon: 'error',
      ...swalDarkTheme
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.password_confirmation) {
      showValidationErrors("Las contraseñas no coinciden");
      return;
    }

    if (!isPasswordStrong(formData.password)) {
        showValidationErrors("La contraseña no cumple con los requisitos de seguridad.");
        return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(formData);
      if (response.success) {
        MySwal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
          icon: 'success',
          ...swalDarkTheme
        });

        setTimeout(() => {
          if (onNavigate) onNavigate('login');
        }, 2000);
      } else {
        if (response.errors) {
          showValidationErrors(response.errors);
        } else {
          setError(response.message || "Error en el registro.");
          showValidationErrors(response.message || "Error en el registro.");
        }
      }
    } catch (err: any) {
      setError("Error de conexión. Inténtalo de nuevo más tarde.");
      showValidationErrors("Error de conexión. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    localStorage.setItem('intended_user_type', userType);
    if (provider === "Google") {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } else if (provider === "GitHub") {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00FF85]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
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
            Únete a
          </h2>
          <div className="mt-2 text-3xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] to-emerald-400 glow-text drop-shadow-[0_0_15px_rgba(0,255,133,0.3)] hover:drop-shadow-[0_0_25px_rgba(0,255,133,0.5)] transition-all duration-300">
              Programmers
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => onNavigate && onNavigate("login")}
              className="mt-2 inline-flex items-center text-[#00FF85] hover:text-emerald-400 transition-colors font-semibold group"
            >
              Inicia sesión aquí
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </p>
        </div>

        <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden hover:border-[#00FF85]/20 transition-all duration-500">
          <CardHeader className="border-b border-slate-800/50 pb-6">
            <CardTitle className="text-2xl font-bold text-white text-center">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-slate-400 text-center">
              Selecciona tu tipo de perfil y completa tus datos
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-8 text-center">
            
            {/* Social Auth Section */}
            <div className="px-4">
              <SocialAuthButtons onSocialAuth={handleSocialRegister} isRegister />
              
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#020617]/50 backdrop-blur-md px-4 py-1 rounded-full text-slate-500 font-semibold border border-slate-800/50">
                    O con email
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Type Switcher */}
            <div className="flex justify-center p-1 bg-slate-950/50 border border-slate-800 rounded-lg max-w-sm mx-auto">
              <button
                onClick={() => handleUserTypeSelect("programmer")}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${userType === "programmer" ? 'bg-[#00FF85] text-slate-950 font-bold shadow-[0_0_10px_rgba(0,255,133,0.3)]' : 'text-slate-400 hover:text-white'}`}
              >
                <Code2 className="h-4 w-4 mr-2" />
                Programador
              </button>
              <button
                onClick={() => handleUserTypeSelect("company")}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${userType === "company" ? 'bg-[#00FF85] text-slate-950 font-bold shadow-[0_0_10px_rgba(0,255,133,0.3)]' : 'text-slate-400 hover:text-white'}`}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Empresa
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start text-red-400 text-sm shadow-[inset_0_0_10px_rgba(239,68,68,0.05)] text-left">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {userType === "programmer" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-300 ml-1">Nombre</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                        </div>
                        <Input
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all"
                          placeholder="Juan"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-300 ml-1">Apellido</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                        </div>
                        <Input
                          name="lastname"
                          required
                          value={formData.lastname}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all"
                          placeholder="Pérez"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">Nombre de la Empresa</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                        </div>
                        <Input
                          name="company_name"
                          required
                          value={formData.company_name}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all"
                          placeholder="TechSolutions Inc."
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-300 ml-1">Tu Nombre</label>
                      <Input
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 bg-slate-900/50 border-slate-700 text-white focus:border-[#00FF85] transition-all"
                        placeholder="Ana"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-300 ml-1">Cargo</label>
                      <Input
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleChange}
                        className="h-12 bg-slate-900/50 border-slate-700 text-white focus:border-[#00FF85] transition-all"
                        placeholder="CTO"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/50 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-300 ml-1">Contraseña</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                    </div>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setShowPasswordReqs(true)}
                      onBlur={() => setShowPasswordReqs(false)}
                      className={`pl-10 pr-10 h-12 bg-slate-900/50 text-white transition-all ${
                        formData.password 
                          ? isPasswordStrong(formData.password)
                            ? 'border-[#00FF85] focus:ring-[#00FF85]/30'
                            : 'border-red-500/50 focus:ring-red-500/30 ring-1 ring-red-500/50'
                          : 'border-slate-700 focus:border-[#00FF85]'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-300 ml-1">Confirmar</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-[#00FF85] transition-colors" />
                    </div>
                    <Input
                      name="password_confirmation"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      className={`pl-10 pr-10 h-12 bg-slate-900/50 text-white transition-all ${
                        formData.password_confirmation
                          ? formData.password === formData.password_confirmation
                            ? 'border-[#00FF85] focus:ring-[#00FF85]/30'
                            : 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-slate-700 focus:border-[#00FF85]'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {showPasswordReqs && (
                <div className="mt-4 p-4 bg-slate-900/80 border border-slate-700 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-semibold text-white mb-2 uppercase tracking-wider">Seguridad:</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className={`flex items-center ${/.{8,}/.test(formData.password) ? 'text-[#00FF85]' : 'text-slate-500'}`}>
                      <span className="mr-2">{/.{8,}/.test(formData.password) ? '✓' : '○'}</span>
                      8+ caracteres
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-[#00FF85]' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                      Mayúscula
                    </li>
                    <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-[#00FF85]' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[a-z]/.test(formData.password) ? '✓' : '○'}</span>
                      Minúscula
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-[#00FF85]' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                      Número
                    </li>
                    <li className={`flex items-center ${/[@$!%*?&._-]/.test(formData.password) ? 'text-[#00FF85]' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[@$!%*?&._-]/.test(formData.password) ? '✓' : '○'}</span>
                      Especial
                    </li>
                  </ul>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#00FF85] hover:bg-[#00FF85]/90 text-slate-900 font-bold text-lg mt-6 shadow-[0_0_15px_rgba(0,255,133,0.3)] hover:shadow-[0_0_25px_rgba(0,255,133,0.5)] transition-all cursor-pointer group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Registrarse
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts Info */}
        <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 border-dashed">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3 text-center">Cuentas Demo</h3>
            <div className="space-y-2 text-sm">
              {DEMO_ACCOUNTS.map((account, index) => (
                <div key={index} className="flex justify-between items-center text-slate-400">
                  <span>{account.label}:</span>
                  <code className="text-[#00FF85] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    {account.value}
                  </code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
