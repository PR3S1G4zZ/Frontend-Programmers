import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoadingIndicator } from "./PageTransition";

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
            // Store token locally
            // Note: We use the service's private method if possible, or just set it manually via public method if exposes one?
            // authService.setToken is private in the code view I saw earlier? 
            // Wait, let me check authService.ts content again.
            // Line 174: private setToken(token: string)
            // Ah, it is private. I cannot call it directly.
            // However, `login` calls it.

            // I should probably expose a public method `handleExternalLogin(token, user)` or similar in AuthService.
            // OR, since this is JavaScript/Typescript, I can just use localStorage directly and force a reload or use refreshUser.

            localStorage.setItem('auth_token', token);

            // Also set temp user data
            const tempData = {
                id: 0,
                name,
                email: "",
                lastname: "",
                user_type: userType as any
            };
            localStorage.setItem('user_data', JSON.stringify(tempData));

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
