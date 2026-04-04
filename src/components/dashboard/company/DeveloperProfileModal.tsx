import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import {
    MapPin, Clock, Star, Briefcase, Code, Award, X, Calendar,
    Globe, Github, ExternalLink, FolderOpen, Layers
} from 'lucide-react';
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
        try {
            const baseUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/api\/?$/, '');
            if (path.startsWith('http')) {
                if ((path.includes('localhost') || path.includes('127.0.0.1')) && !baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
                    const urlPath = new URL(path).pathname;
                    return `${baseUrl}${urlPath}`;
                }
                return path;
            }
            if (path.startsWith('blob:')) return path;
            return `${baseUrl}/storage/${path.replace(/^\//, '').replace(/^storage\//, '')}`;
        } catch {
            return path;
        }
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
                            <Skeleton className="h-24 w-24 rounded-full bg-muted" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-6 w-1/3 bg-muted" />
                                <Skeleton className="h-4 w-1/4 bg-muted" />
                                <Skeleton className="h-4 w-full bg-muted" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-20 bg-muted" />
                            <Skeleton className="h-20 bg-muted" />
                            <Skeleton className="h-20 bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/4 bg-muted" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-16 bg-muted" />
                                <Skeleton className="h-8 w-16 bg-muted" />
                                <Skeleton className="h-8 w-16 bg-muted" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full bg-background overflow-hidden relative">
                        {/* Hero Banner */}
                        <div className="relative h-20 sm:h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-background overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
                            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-[0.07]">
                                <Code className="h-24 sm:h-40 w-24 sm:w-40 text-foreground transform rotate-12" />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 z-20 text-foreground/60 hover:text-foreground hover:bg-background/50 rounded-full backdrop-blur-sm"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Main Content Area */}
                        <div className="px-4 sm:px-6 lg:px-8 pb-4 flex-1 overflow-hidden flex flex-col relative z-10">
                            {/* Profile Header */}
                            <div className="flex flex-col md:flex-row gap-4 -mt-10 sm:-mt-14 relative z-10 mb-5 shrink-0">
                                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background shadow-xl ring-2 ring-primary/20 bg-card mx-auto md:mx-0 shrink-0">
                                    {developer.profilePicture ? (
                                        <AvatarImage
                                            src={getImageUrl(developer.profilePicture)}
                                            alt={developer.name}
                                            className="object-cover"
                                        />
                                    ) : null}
                                    <AvatarFallback className="bg-primary/20 text-xl sm:text-2xl font-bold text-primary uppercase">
                                        {developer.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 pt-1 sm:pt-10 md:pt-12 space-y-1.5 text-center md:text-left min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                        <div className="min-w-0">
                                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
                                                <span className="truncate">{developer.name}</span>
                                                {developer.isVerified && (
                                                    <span className="bg-primary/10 text-primary border border-primary/20 p-0.5 rounded-full shrink-0">
                                                        <Award className="h-3.5 w-3.5" />
                                                    </span>
                                                )}
                                            </h2>
                                            <p className="text-sm sm:text-base text-primary font-medium truncate">{developer.title}</p>
                                        </div>
                                        <div className="text-center md:text-right shrink-0 hidden md:block">
                                            <p className="text-xl sm:text-2xl font-bold text-foreground">
                                                ${developer.hourlyRate || 0}
                                                <span className="text-xs text-muted-foreground font-normal">/h</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                                            <MapPin className="h-3 w-3 shrink-0" /> {developer.location || 'Sin ubicación'}
                                        </span>
                                        <span className={`flex items-center gap-1 font-medium ${developer.availability === 'available' ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            <Clock className="h-3 w-3 shrink-0" />
                                            {developer.availability === 'available' ? 'Disponible' : developer.availability === 'busy' ? 'Ocupado' : 'No disponible'}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-500">
                                            <Star className="h-3 w-3 fill-current shrink-0" />
                                            <span className="text-foreground font-bold">{developer.rating?.toFixed(1) || '0.0'}</span>
                                            <span className="text-muted-foreground">({developer.reviewsCount || 0})</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <ScrollArea className="flex-1 -mr-2 sm:-mr-3 pr-2 sm:pr-3">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 pb-6">
                                    {/* Left Column: Main Content */}
                                    <div className="lg:col-span-8 space-y-5">
                                        {/* Bio */}
                                        <section className="bg-card p-4 sm:p-5 rounded-xl border border-border">
                                            <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                                                    <Briefcase className="h-4 w-4" />
                                                </div>
                                                Sobre mí
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                                                {developer.bio || 'Este desarrollador aún no ha escrito una biografía profesional.'}
                                            </p>
                                        </section>

                                        {/* Skills */}
                                        <section className="bg-card p-4 sm:p-5 rounded-xl border border-border">
                                            <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                                                    <Code className="h-4 w-4" />
                                                </div>
                                                Tecnologías & Herramientas
                                            </h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                {(Array.isArray(developer.skills) && developer.skills.length > 0) ? developer.skills.map(skill => (
                                                    <Badge key={skill} variant="secondary" className="px-2.5 py-0.5 bg-muted/50 text-foreground border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors text-xs">
                                                        {skill}
                                                    </Badge>
                                                )) : (
                                                    <p className="text-xs text-muted-foreground italic">No hay habilidades listadas.</p>
                                                )}
                                            </div>
                                        </section>

                                        {/* Portfolio Projects (Personal) */}
                                        {Array.isArray(developer.portfolioProjectsList) && developer.portfolioProjectsList.length > 0 && (
                                            <section className="bg-card p-4 sm:p-5 rounded-xl border border-border">
                                                <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                                    <div className="bg-purple-500/10 p-1.5 rounded-lg text-purple-500">
                                                        <FolderOpen className="h-4 w-4" />
                                                    </div>
                                                    Portafolio Personal
                                                    <Badge variant="secondary" className="ml-auto text-[10px] bg-purple-500/10 text-purple-500 border-purple-500/20">
                                                        {developer.portfolioProjectsList.length} proyecto{developer.portfolioProjectsList.length !== 1 ? 's' : ''}
                                                    </Badge>
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {developer.portfolioProjectsList.map((project) => (
                                                        <div key={`portfolio-${project.id}`} className="group bg-background rounded-lg overflow-hidden border border-border hover:border-purple-500/40 transition-all hover:shadow-md">
                                                            {/* Project Image */}
                                                            {project.image_url && (
                                                                <div className="h-28 sm:h-32 bg-muted overflow-hidden">
                                                                    <img
                                                                        src={getImageUrl(project.image_url)}
                                                                        alt={project.title}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="p-3">
                                                                <h4 className="font-semibold text-foreground text-sm group-hover:text-purple-500 transition-colors truncate">
                                                                    {project.title}
                                                                </h4>
                                                                {project.description && (
                                                                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                                                        {project.description}
                                                                    </p>
                                                                )}
                                                                {/* Technologies */}
                                                                {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                                                            <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0 bg-muted/30 text-muted-foreground border-border">
                                                                                {tech}
                                                                            </Badge>
                                                                        ))}
                                                                        {project.technologies.length > 3 && (
                                                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-muted/30 text-muted-foreground border-border">
                                                                                +{project.technologies.length - 3}
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {/* Links */}
                                                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                                                                    {project.project_url && (
                                                                        <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                                                                            className="text-muted-foreground hover:text-primary transition-colors">
                                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                                        </a>
                                                                    )}
                                                                    {project.github_url && (
                                                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                                                            className="text-muted-foreground hover:text-foreground transition-colors">
                                                                            <Github className="h-3.5 w-3.5" />
                                                                        </a>
                                                                    )}
                                                                    {project.client && (
                                                                        <span className="text-[10px] text-muted-foreground ml-auto truncate">
                                                                            {project.client}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Platform Completed Projects */}
                                        <section className="bg-card p-4 sm:p-5 rounded-xl border border-border">
                                            <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                                Proyectos en la Plataforma
                                                {Array.isArray(developer.completedProjectsList) && developer.completedProjectsList.length > 0 && (
                                                    <Badge variant="secondary" className="ml-auto text-[10px] bg-primary/10 text-primary border-primary/20">
                                                        {developer.completedProjectsList.length}
                                                    </Badge>
                                                )}
                                            </h3>
                                            <div className="flex flex-col gap-3">
                                                {(Array.isArray(developer.completedProjectsList) && developer.completedProjectsList.length > 0) ?
                                                    developer.completedProjectsList.map((project) => (
                                                        <div key={`proj-${project.id}`} className="group bg-background rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-all p-3 sm:p-4 flex items-start gap-3">
                                                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                                                                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary/60 group-hover:text-primary transition-colors" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">{project.title}</h4>
                                                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                                                    Para: <span className="text-foreground/80 font-medium">{project.company_name}</span>
                                                                </p>
                                                                <div className="flex items-center gap-3 mt-1.5">
                                                                    <span className="flex items-center text-[11px] text-muted-foreground">
                                                                        <Calendar className="h-3 w-3 mr-1 shrink-0" />
                                                                        {new Date(project.completed_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                                                    </span>
                                                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/15 text-[10px] px-1.5 py-0">
                                                                        ${project.budget_min} - ${project.budget_max}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        <div className="text-center p-6 border border-dashed border-border rounded-lg">
                                                            <Layers className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                                                            <p className="text-xs text-muted-foreground">Sin proyectos completados en la plataforma todavía.</p>
                                                        </div>
                                                    )}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Sidebar */}
                                    <div className="lg:col-span-4 space-y-4">
                                        {/* CTA Card */}
                                        <div className="bg-card rounded-xl p-4 sm:p-5 border border-border shadow-sm lg:sticky lg:top-0">
                                            {/* Mobile-only rate */}
                                            <div className="flex md:hidden justify-between items-center mb-4 border-b border-border pb-3">
                                                <span className="text-muted-foreground text-xs">Tarifa Estimada</span>
                                                <span className="text-foreground font-bold text-base">${developer.hourlyRate || 0}/h</span>
                                            </div>

                                            <div className="space-y-2.5">
                                                <Button className="w-full text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm">
                                                    Invitar a un Proyecto
                                                </Button>
                                                <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground text-sm">
                                                    Contactar
                                                </Button>
                                            </div>

                                            {/* Stats */}
                                            <div className="pt-4 mt-4 border-t border-border space-y-3">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-muted-foreground">Experiencia</span>
                                                    <span className="text-foreground font-medium">{developer.experience || 0} años</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-muted-foreground">Completados</span>
                                                    <span className="text-foreground font-medium">{developer.completedProjects} proyectos</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-muted-foreground">Desempeño</span>
                                                    <span className="text-primary font-semibold">
                                                        {developer.rating >= 4.5 ? 'Excelente' : developer.rating >= 3.5 ? 'Bueno' : 'En crecimiento'}
                                                    </span>
                                                </div>
                                                {developer.joinedAt && (
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="text-muted-foreground">Se unió</span>
                                                        <span className="text-foreground font-medium">{developer.joinedAt}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Links */}
                                            {developer.links && Object.keys(developer.links).length > 0 && (
                                                <div className="pt-4 mt-4 border-t border-border">
                                                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Enlaces</h4>
                                                    <div className="space-y-1.5">
                                                        {developer.links.website && (
                                                            <a href={developer.links.website} target="_blank" rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group">
                                                                <Globe className="h-3.5 w-3.5 shrink-0" />
                                                                <span className="truncate group-hover:underline">Website</span>
                                                            </a>
                                                        )}
                                                        {developer.links.github && (
                                                            <a href={developer.links.github} target="_blank" rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                                                <Github className="h-3.5 w-3.5 shrink-0" />
                                                                <span className="truncate group-hover:underline">GitHub</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Languages */}
                                        {Array.isArray(developer.languages) && developer.languages.length > 0 && (
                                            <div className="bg-card rounded-xl p-4 border border-border">
                                                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Idiomas</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {developer.languages.map((lang, idx) => (
                                                        <Badge key={idx} variant="outline" className="bg-muted/50 text-muted-foreground border-border text-xs">
                                                            {lang}
                                                        </Badge>
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
