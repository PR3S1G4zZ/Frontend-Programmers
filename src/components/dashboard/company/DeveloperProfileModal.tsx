import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { MapPin, Clock, Star, Briefcase, Code, Award, X, Calendar } from 'lucide-react';
import type { DeveloperProfile } from '../../../services/developerService';
import { Skeleton } from '../../ui/skeleton';

interface DeveloperProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    developer: DeveloperProfile | null;
    isLoading: boolean;
}

export function DeveloperProfileModal({ isOpen, onClose, developer, isLoading }: DeveloperProfileModalProps) {
    if (!isOpen) return null;

    const getImageUrl = (path?: string | null) => {
        if (!path) return "";
        if (path.startsWith('http') || path.startsWith('blob:')) return path;
        const baseUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/api\/?$/, '');
        return `${baseUrl}/storage/${path.replace(/^\//, '')}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl w-[95vw] md:w-full max-h-[90vh] h-[90vh] bg-card border-border p-0 overflow-hidden rounded-xl flex flex-col mx-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle>Perfil de Desarrollador: {developer?.name ?? 'Cargando...'}</DialogTitle>
                    <DialogDescription>
                        Detalles completos, experiencia y portafolio del desarrollador seleccionado.
                    </DialogDescription>
                </DialogHeader>
                {isLoading || !developer ? (
                    <div className="p-6 space-y-6">
                        <div className="flex items-start space-x-4">
                            <Skeleton className="h-24 w-24 rounded-full bg-[#333333]" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-6 w-1/3 bg-[#333333]" />
                                <Skeleton className="h-4 w-1/4 bg-[#333333]" />
                                <Skeleton className="h-4 w-full bg-[#333333]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-20 bg-[#333333]" />
                            <Skeleton className="h-20 bg-[#333333]" />
                            <Skeleton className="h-20 bg-[#333333]" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/4 bg-[#333333]" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-16 bg-[#333333]" />
                                <Skeleton className="h-8 w-16 bg-[#333333]" />
                                <Skeleton className="h-8 w-16 bg-[#333333]" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col max-h-[95vh] bg-background">
                        {/* Hero Section / Banner */}
                        <div className="relative h-32 sm:h-40 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] overflow-hidden">
                            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[length:20px_20px]" />
                            <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10">
                                <Code className="h-32 sm:h-64 w-32 sm:w-64 text-foreground transform rotate-12" />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 z-20 text-foreground/70 hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5 md:h-6 md:w-6" />
                            </Button>
                        </div>

                        <div className="px-4 sm:px-8 pb-4 sm:pb-8 flex-1 overflow-hidden flex flex-col">
                            {/* Profile Header (Overlapping Banner) */}
                            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 -mt-12 sm:-mt-16 relative z-10 mb-6 sm:mb-8">
                                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 border-4 border-background shadow-2xl ring-4 ring-primary/10 bg-card mx-auto md:mx-0">
                                    {developer.profilePicture ? (
                                        <AvatarImage
                                            src={getImageUrl(developer.profilePicture)}
                                            alt={developer.name}
                                            className="object-cover"
                                        />
                                    ) : null}
                                    <AvatarFallback className="bg-primary/20 text-xl sm:text-2xl md:text-3xl font-bold text-primary uppercase">
                                        {developer.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 pt-2 sm:pt-16 md:pt-20 space-y-2 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                                        <div>
                                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center md:justify-start gap-1 sm:gap-2">
                                                {developer.name}
                                                {developer.isVerified && (
                                                    <span className="bg-primary/10 text-primary border border-primary/20 p-1 rounded-full">
                                                        <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    </span>
                                                )}
                                            </h2>
                                            <p className="text-base sm:text-lg md:text-xl text-primary font-medium">{developer.title}</p>
                                        </div>
                                        <div className="text-center md:text-right hidden md:block">
                                            <p className="text-2xl sm:text-3xl font-bold text-foreground">${developer.hourlyRate || 0}<span className="text-sm text-muted-foreground font-normal">/h</span></p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 text-xs sm:text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {developer.location || 'Ubicación no especificada'}
                                        </span>
                                        <span className={`flex items-center gap-1.5 font-medium ${developer.availability === 'available' ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            {developer.availability === 'available' ? 'Disponible ahora' : 'Consultar disponibilidad'}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-yellow-500">
                                            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                                            <span className="text-foreground font-bold">{developer.rating?.toFixed(1) || '0.0'}</span>
                                            <span className="text-muted-foreground">({developer.reviewsCount || 0} reseñas)</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 pr-2 sm:pr-4 -mr-2 sm:-mr-4">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-8">
                                    {/* Left Content (Bio/Skills/Portfolio) - Takes 8 columns on lg */}
                                    <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                                        {/* Bio */}
                                        <section className="bg-background p-5 sm:p-6 rounded-2xl border border-border shadow-sm">
                                            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                                <div className="bg-primary/10 p-2 rounded-lg text-primary border border-primary/20">
                                                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </div>
                                                Sobre mí
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed text-sm">
                                                {developer.bio || 'Este desarrollador aún no ha escrito una biografía profesional.'}
                                            </p>
                                        </section>

                                        {/* Skills */}
                                        <section className="bg-background p-5 sm:p-6 rounded-2xl border border-border shadow-sm">
                                            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                                <div className="bg-primary/10 p-2 rounded-lg text-primary border border-primary/20">
                                                    <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </div>
                                                Tecnologías & Herramientas
                                            </h3>
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {(Array.isArray(developer.skills) && developer.skills.length > 0) ? developer.skills.map(skill => (
                                                    <Badge key={skill} variant="secondary" className="px-3 py-1 bg-muted/50 text-foreground border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors text-xs">
                                                        {skill}
                                                    </Badge>
                                                )) : (
                                                    <p className="text-sm text-muted-foreground italic">No hay habilidades listadas.</p>
                                                )}
                                            </div>
                                        </section>

                                        {/* Portfolio */}
                                        <section className="bg-background p-5 sm:p-6 rounded-2xl border border-border shadow-sm">
                                            <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                                <div className="bg-primary/10 p-2 rounded-lg text-primary border border-primary/20">
                                                    <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </div>
                                                Proyectos Completados en la Plataforma
                                            </h3>
                                            <div className="flex flex-col gap-4">
                                                {(Array.isArray(developer.completedProjectsList) && developer.completedProjectsList.length > 0) ? 
                                                    developer.completedProjectsList.map((project) => (
                                                    <div key={`proj-${project.id}`} className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                                                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border">
                                                            <Briefcase className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors">{project.title}</h4>
                                                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-2">Para: <span className="text-foreground font-medium">{project.company_name}</span></p>
                                                            <div className="flex items-center text-xs text-muted-foreground">
                                                                <Calendar className="h-3 w-3 mr-1" />
                                                                {new Date(project.completed_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                                            </div>
                                                        </div>
                                                        <div className="text-left sm:text-right mt-2 sm:mt-0 whitespace-nowrap">
                                                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-semibold px-2 sm:px-3">
                                                                ${project.budget_min} - ${project.budget_max}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="text-center p-8 border-2 border-dashed border-border rounded-xl">
                                                        <p className="text-sm text-muted-foreground">Este usuario recién se une y no tiene proyectos completados todavía.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Sidebar (Stats/Contact) - Takes 4 columns on lg */}
                                    <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                                        <div className="bg-card rounded-xl p-5 border border-border shadow-md lg:sticky lg:top-0">
                                            <div className="flex md:hidden justify-between items-center mb-6 border-b border-border pb-4">
                                                <span className="text-muted-foreground text-sm">Tarifa Estimada</span>
                                                <span className="text-foreground font-bold text-lg">${developer.hourlyRate || 0}/h</span>
                                            </div>

                                            <div className="space-y-3">
                                                <Button className="w-full text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
                                                    Invitar a un Proyecto
                                                </Button>
                                                <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground text-sm sm:text-base">
                                                    Contactar
                                                </Button>
                                            </div>

                                            <div className="pt-6 mt-6 border-t border-border space-y-4">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">Experiencia Mín.</span>
                                                    <span className="text-foreground font-medium">{developer.experience || 0} años</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">Completados</span>
                                                    <span className="text-foreground font-medium">{developer.completedProjects} proyectos</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">Desempeño</span>
                                                    <span className="text-primary font-semibold">{developer.rating >= 4.5 ? 'Excelente' : 'Bueno'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {Array.isArray(developer.languages) && developer.languages.length > 0 && (
                                            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                                                <h4 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Idiomas</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {developer.languages.map((lang, idx) => (
                                                        <Badge key={idx} variant="outline" className="bg-muted text-muted-foreground border-border">{lang}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
