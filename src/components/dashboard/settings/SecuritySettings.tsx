import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Shield, Save, Eye, EyeOff } from 'lucide-react';
import apiClient from '../../../services/apiClient';
import { useSweetAlert } from '../../ui/sweet-alert';

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useSweetAlert();

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert({
        title: 'Campos requeridos',
        text: 'Por favor, llena todos los campos pertinentes.',
        type: 'warning',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert({
        title: 'Error',
        text: 'La nueva contraseña y la confirmación no coinciden.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      showAlert({
        title: '¡Contraseña actualizada!',
        text: 'Tu contraseña se cambió exitosamente.',
        type: 'success',
        timer: 2000,
        theme: 'code'
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      let errorMsg = 'No se pudo cambiar la contraseña. Verifica tu contraseña actual.';
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      showAlert({
        title: 'Error',
        text: errorMsg,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border hover:border-primary/20 transition-colors">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Seguridad y Contraseña
        </CardTitle>
        <CardDescription>
          Mantén tu cuenta segura actualizando tu contraseña regularmente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="current_password" className="text-foreground">Contraseña Actual</Label>
          <div className="relative mt-2">
            <Input
              id="current_password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-background border-border text-foreground pr-10"
              placeholder="••••••••"
            />
            <button
               type="button"
               onClick={() => setShowCurrentPassword(!showCurrentPassword)}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="new_password" className="text-foreground">Nueva Contraseña</Label>
          <div className="relative mt-2">
            <Input
              id="new_password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-background border-border text-foreground pr-10"
              placeholder="••••••••"
            />
            <button
               type="button"
               onClick={() => setShowNewPassword(!showNewPassword)}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirm_password" className="text-foreground">Confirmar Nueva Contraseña</Label>
          <div className="relative mt-2">
            <Input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-background border-border text-foreground pr-10"
              placeholder="••••••••"
            />
            <button
               type="button"
               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button 
          onClick={handlePasswordChange} 
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full md:w-auto"
        >
          {isLoading ? (
            'Guardando...'
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Actualizar Contraseña
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
