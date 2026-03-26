import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authService";

interface VerifyEmailPageProps {
  onNavigate: (page: string) => void;
}

export function VerifyEmailPage({ onNavigate }: VerifyEmailPageProps) {
  const { refreshUser } = useAuth();
  const processedRef = useRef(false);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      setMessage('No se proporcionó un token de verificación.');
      return;
    }

    const verifyToken = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setStatus('error');
          setMessage(data.message || 'No se pudo verificar el correo.');
          return;
        }

        // Auto-login con el token recibido
        if (data.token) {
          authService.handleExternalLogin(data.token, {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            lastname: '',
            user_type: data.user.user_type,
          });
          await refreshUser();
        }

        setStatus('success');
        setMessage('¡Tu correo ha sido verificado exitosamente!');

        // Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
          if (data.user?.user_type === 'programmer') {
            onNavigate('programmer-dashboard');
          } else if (data.user?.user_type === 'admin') {
            onNavigate('admin-dashboard');
          } else {
            onNavigate('company-dashboard');
          }
        }, 2000);
      } catch (err) {
        console.error('Error verificando email:', err);
        setStatus('error');
        setMessage('Ocurrió un error al intentar verificar tu correo.');
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-bold text-foreground mb-2">Verificando correo...</h2>
            <p className="text-muted-foreground">Por favor espera un momento.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-foreground mb-2">¡Correo verificado!</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            <p className="text-sm text-muted-foreground">Serás redirigido automáticamente...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Error de verificación</h2>
            <p className="text-muted-foreground mb-6">{message}</p>
            <button
              onClick={() => onNavigate('login')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Ir al Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
