import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Building, Save, Edit } from 'lucide-react';
import { fetchProfile, updateProfile } from '../../../services/profileService';
import { useAuth } from '../../../contexts/AuthContext';
import { useSweetAlert } from '../../ui/sweet-alert';

export function CompanyProfileSettings() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    company_name: '',
    about: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useSweetAlert();

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const response = await fetchProfile();
        if (!isMounted) return;
        const profile = response.data.profile as any;
        const userInfo = response.data.user;
        
        setProfileData({
          name: userInfo.name || '',
          email: userInfo.email || '',
          company_name: profile.company_name || profile.headline || '',
          about: profile.about || profile.bio || '',
          location: profile.location || '',
        });
      } catch (error) {
        console.error('Error cargando perfil de empresa:', error);
      }
    };
    loadProfile();
    return () => { isMounted = false; };
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('company_name', profileData.company_name);
      formData.append('about', profileData.about);
      formData.append('location', profileData.location);
      
      await updateProfile(formData);
      
      showAlert({
        title: '¡Perfil Actualizado!',
        text: 'La información de tu empresa ha sido guardada',
        type: 'success',
        timer: 2000,
        theme: 'code'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error guardando perfil de empresa:', error);
      showAlert({
        title: 'Error',
        text: 'Ocurrió un error al guardar el perfil.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border hover:border-primary/20 transition-colors">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-foreground flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Perfil de la Empresa
          </CardTitle>
          <CardDescription>
            Configura la información pública de tu empresa.
          </CardDescription>
        </div>
        <Button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isEditing ? (
             isLoading ? 'Guardando...' : <><Save className="h-4 w-4 mr-2" /> Guardar</>
          ) : (
            <><Edit className="h-4 w-4 mr-2" /> Editar</>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-foreground">Nombre de Contacto</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditing}
              className="mt-2 bg-background border-border text-foreground disabled:opacity-70"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">Correo de la Cuenta</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              disabled={true} 
              className="mt-2 bg-background border-border text-foreground disabled:opacity-50"
              title="El correo de la cuenta no se puede cambiar aquí."
            />
          </div>
          <div>
            <Label htmlFor="company_name" className="text-foreground">Nombre de la Empresa</Label>
            <Input
              id="company_name"
              value={profileData.company_name}
              onChange={(e) => setProfileData({ ...profileData, company_name: e.target.value })}
              disabled={!isEditing}
              className="mt-2 bg-background border-border text-foreground disabled:opacity-70"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-foreground">Sede / Ubicación</Label>
            <Input
              id="location"
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              disabled={!isEditing}
              className="mt-2 bg-background border-border text-foreground disabled:opacity-70"
              placeholder="Ej: Madrid, España"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="about" className="text-foreground">Sobre la Empresa</Label>
          <Textarea
            id="about"
            value={profileData.about}
            onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
            disabled={!isEditing}
            className="mt-2 bg-background border-border text-foreground min-h-[100px] disabled:opacity-70"
            placeholder="Breve descripción de los objetivos o rubro de tu empresa..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
