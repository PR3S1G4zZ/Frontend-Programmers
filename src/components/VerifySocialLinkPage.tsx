import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoadingIndicator } from "./PageTransition";

interface VerifySocialLinkPageProps {
    onNavigate: (page: string) => void;
}

export function VerifySocialLinkPage({ onNavigate }: VerifySocialLinkPageProps) {
    const { refreshUser } = useAuth();
    const processedRef = useRef(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (processedRef.current) return;
        processedRef.current = true;

        const verifyToken = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");

                if (!token) {
                    setError("No se proporcionó ningún token de verificación.");
                    return;
                }

                // Call backend API
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const response = await fetch(`${apiUrl}/auth/verify-social-link?token=${token}`);
                const data = await response.json();

                if (!response.ok || !data.success) {
                    setError(data.message || "No se pudo verificar el token. Es posible que haya expirado.");
                    return;
                }

                // If successful, log the user in
                localStorage.setItem('auth_token', data.token);

                const tempData = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    lastname: "",
                    user_type: data.user.user_type
                };
                localStorage.setItem('user_data', JSON.stringify(tempData));

                await refreshUser();

                if (data.user.user_type === 'programmer') {
                    onNavigate('programmer-dashboard');
                } else if (data.user.user_type === 'admin') {
                    onNavigate('admin-dashboard');
                } else {
                    onNavigate('company-dashboard');
                }

            } catch (err: any) {
                console.error("Error al verificar token:", err);
                setError("Ocurrió un error al intentar verificar la cuenta.");
            }
        };

        verifyToken();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md p-6 bg-card rounded-lg shadow-lg border border-border">
                {error ? (
                    <>
                        <div className="text-4xl text-red-500 mb-4">❌</div>
                        <h2 className="text-xl font-bold text-foreground mb-2">Error de Verificación</h2>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <button 
                            onClick={() => onNavigate('login')}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Ir al Login
                        </button>
                    </>
                ) : (
                    <>
                        <LoadingIndicator />
                        <h2 className="text-xl font-bold text-foreground mt-4 mb-2">Vinculando Cuenta</h2>
                        <p className="text-muted-foreground">Por favor espera mientras verificamos tu cuenta...</p>
                    </>
                )}
            </div>
        </div>
    );
}
