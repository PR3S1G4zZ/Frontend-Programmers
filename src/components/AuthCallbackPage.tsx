import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoadingIndicator } from "./PageTransition";
import { authService, type User } from "../services/authService";

interface AuthCallbackPageProps {
    onNavigate: (page: string) => void;
}

export function AuthCallbackPage({ onNavigate }: AuthCallbackPageProps) {
    const { refreshUser } = useAuth();
    const processedRef = useRef(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        if (processedRef.current) return;
        processedRef.current = true;

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const userType = params.get("user_type");
        const name = params.get("name");
        const status = params.get("status");

        if (status === "verification_sent") {
            setStatusMessage("Hemos enviado un correo de verificación. Por favor revisa tu bandeja de entrada para vincular tu cuenta. Puedes cerrar esta ventana.");
            return;
        }

        if (token && userType && name) {
            const tempUser: User = {
                id: 0,
                name,
                email: "",
                lastname: "",
                user_type: userType as 'programmer' | 'company' | 'admin'
            };
            authService.handleExternalLogin(token, tempUser);

            // Refresh via context to pick up the new token
            refreshUser().then(() => {
                // Navigate based on role
                if (userType === 'programmer') {
                    onNavigate('programmer-dashboard');
                } else if (userType === 'admin') {
                    onNavigate('admin-dashboard');
                } else {
                    onNavigate('company-dashboard');
                }
            }).catch(err => {
                console.error("Error refreshing user:", err);
                onNavigate('login');
            });

        } else {
            console.error("Missing tokens in callback URL");
            onNavigate("login");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md p-6 bg-card rounded-lg shadow-lg border border-border">
                {statusMessage ? (
                    <>
                        <div className="text-4xl mb-4">📧</div>
                        <h2 className="text-xl font-bold text-foreground mb-2">Verificación Necesaria</h2>
                        <p className="text-muted-foreground mb-6">{statusMessage}</p>
                        <button 
                            onClick={() => onNavigate('login')}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Volver al Login
                        </button>
                    </>
                ) : (
                    <>
                        <LoadingIndicator />
                        <p className="mt-4 text-muted-foreground">Autenticando con la red social...</p>
                    </>
                )}
            </div>
        </div>
    );
}
