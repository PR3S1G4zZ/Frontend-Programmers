import { useState, useEffect } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Plus,
  ExternalLink,
  Github,
  Calendar,
  Eye,
  Heart,
  Edit,
  Trash2,
  Upload,
  X,
  Loader2
} from "lucide-react";
import { portfolioService } from "../../../services/portfolioService";
import type { PortfolioProject } from "../../../services/portfolioService";
import { toast } from "sonner";
import { useSweetAlert } from "../../ui/sweet-alert";

export function PortfolioSection() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_url: '',
    github_url: '',
    client: '',
    completion_date: '',
    technologies: '',
    featured: false
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { showAlert, Alert } = useSweetAlert();

  const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder-project.jpg";
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/api\/?$/, '');
    return `${baseUrl}/storage/${path.replace(/^\//, '')}`;
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Error al cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image preview with cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Revoke previous URL to prevent memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (formData.project_url) data.append('project_url', formData.project_url);
      if (formData.github_url) data.append('github_url', formData.github_url);
      if (formData.client) data.append('client', formData.client);
      if (formData.completion_date) data.append('completion_date', formData.completion_date);

      // Convert technologies string to array if needed by backend, 
      // but backend validation says 'nullable|array'. 
      // If we send comma separated string, Laravel might not automatically cast to array.
      // Better to send as array from here.
      const techs = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      techs.forEach((t, i) => data.append(`technologies[${i}]`, t));

      data.append('featured', formData.featured ? '1' : '0');

      if (selectedImage) {
        data.append('image', selectedImage);
      }

      if (editingProject) {
        await portfolioService.update(editingProject.id, data);
        showAlert({
          title: "¡Éxito!",
          text: "Proyecto actualizado correctamente",
          type: "success",
          theme: "cyber",
          timer: 3000
        });
      } else {
        await portfolioService.create(data);
        showAlert({
          title: "¡Éxito!",
          text: "Proyecto agregado correctamente",
          type: "success",
          theme: "cyber",
          timer: 3000
        });
      }
      setIsModalOpen(false);
      resetForm();
      loadProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      showAlert({
        title: "Error al guardar",
        text: error instanceof Error ? error.message : "Comprueba los campos e inténtalo de nuevo.",
        type: "error",
        theme: "cyber"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    showAlert({
      title: "¿Eliminar proyecto?",
      text: "Esta acción no se puede deshacer.",
      type: "warning",
      theme: "cyber",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      onConfirm: async () => {
        try {
          await portfolioService.delete(id);
          toast.success("Proyecto eliminado");
          loadProjects();
        } catch (error) {
          console.error("Error deleting project:", error);
          showAlert({
            title: "Error",
            text: "No se pudo eliminar el proyecto.",
            type: "error",
            theme: "cyber"
          });
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      project_url: '',
      github_url: '',
      client: '',
      completion_date: '',
      technologies: '',
      featured: false
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingProject(null);
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      project_url: project.project_url || '',
      github_url: project.github_url || '',
      client: project.client || '',
      completion_date: project.completion_date || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies || '',
      featured: project.featured
    });
    setImagePreview(project.image_url ? getImageUrl(project.image_url) : null);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const featuredProjects = projects.filter(project => project.featured);

  // Helper to safely get technologies array
  const getTechArray = (techs: string[] | string | undefined): string[] => {
    if (Array.isArray(techs)) return techs;
    if (typeof techs === 'string') {
      try {
        return JSON.parse(techs);
      } catch {
        // If JSON.parse fails, try comma-separated
        return techs.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    return [];
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mi Portafolio</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {projects.length} proyecto{projects.length !== 1 ? 's' : ''} publicado{projects.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                setEditingProject(null);
                resetForm();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-[#111111] border-[#333333] shadow-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader className="border-b border-[#222222] pb-4 mb-4">
              <DialogTitle className="text-xl font-semibold text-white">
                {editingProject ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sección Principal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title" className="text-gray-300 text-sm">Título del Proyecto <span className="text-red-500">*</span></Label>
                    <Input
                      id="title" name="title"
                      value={formData.title} onChange={handleInputChange}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] focus:ring-1 focus:ring-[#00C46A] transition-all text-white placeholder-gray-500 rounded-lg p-2.5 h-auto"
                      placeholder="Ej: E-Commerce React"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="client" className="text-gray-300 text-sm">Cliente o Empresa</Label>
                    <Input
                      id="client" name="client"
                      value={formData.client} onChange={handleInputChange}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] focus:ring-1 focus:ring-[#00C46A] transition-all text-white placeholder-gray-500 rounded-lg p-2.5 h-auto"
                      placeholder="Ej: Cliente Independiente"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 h-full flex flex-col">
                  <Label htmlFor="description" className="text-gray-300 text-sm">Descripción del Proyecto <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description" name="description"
                    value={formData.description} onChange={handleInputChange}
                    className="flex-1 min-h-[120px] bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] focus:ring-1 focus:ring-[#00C46A] transition-all text-white placeholder-gray-500 rounded-lg p-3 resize-none"
                    placeholder="Describe los desafíos, soluciones y tu rol..."
                    required
                  />
                </div>
              </div>

              {/* Sección de Enlaces y Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-xl bg-[#0D0D0D] border border-[#222222]">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="project_url" className="text-gray-300 text-sm flex items-center">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" /> URL Demo
                    </Label>
                    <Input
                      id="project_url" name="project_url"
                      value={formData.project_url} onChange={handleInputChange}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] text-white"
                      placeholder="https://midemo.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="github_url" className="text-gray-300 text-sm flex items-center">
                      <Github className="w-3.5 h-3.5 mr-1" /> URL GitHub
                    </Label>
                    <Input
                      id="github_url" name="github_url"
                      value={formData.github_url} onChange={handleInputChange}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="completion_date" className="text-gray-300 text-sm flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" /> Fecha Completado
                    </Label>
                    <Input
                      id="completion_date" name="completion_date"
                      value={formData.completion_date} onChange={handleInputChange}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] text-white"
                      placeholder="Ej: Julio 2024"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="technologies" className="text-gray-300 text-sm">Tecnologías (separadas por coma)</Label>
                    <Input
                      id="technologies" name="technologies"
                      value={formData.technologies} onChange={handleInputChange}
                      className="bg-[#1A1A1A] border-[#333333] focus:border-[#00C46A] text-white"
                      placeholder="React, Next, Tailwind..."
                    />
                  </div>
                </div>
              </div>

              {/* Área Imagen */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Portada del Proyecto</Label>
                <div className="group border-2 border-dashed border-[#333333] bg-[#1A1A1A] rounded-xl p-6 flex items-center justify-center relative overflow-hidden flex-col gap-3 min-h-[160px] hover:border-[#00C46A] hover:bg-[#111] transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                      <div className="relative z-10 flex flex-col items-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="mb-2 shadow-lg hover:scale-105 transition-transform bg-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                        >
                          <X className="h-4 w-4 mr-1.5" /> Quitar
                        </Button>
                        <p className="text-sm font-medium text-white drop-shadow-md">Click para cambiar imagen</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center py-4 text-gray-500 group-hover:text-[#00C46A] transition-colors relative z-10 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-[#222222] group-hover:bg-[#00C46A]/20 flex items-center justify-center mb-3 transition-colors">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="font-semibold text-gray-300 group-hover:text-white">Subir Imagen</p>
                      <p className="text-xs mt-1">Arrastra y suelta tu archivo aquí (hasta 2MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-primary/5 border border-primary/20 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-[#00C46A] text-[#00C46A] h-5 w-5 bg-black cursor-pointer focus:ring-[#00C46A]"
                />
                <Label htmlFor="featured" className="text-gray-200 cursor-pointer font-medium select-none">
                  Marcar como Proyecto Destacado ⭐
                </Label>
              </div>

              <DialogFooter className="pt-4 border-t border-[#222222]">
                <Button type="button" variant="outline" className="border-[#333] bg-[#111] hover:bg-[#222] text-white" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#00C46A] text-black hover:bg-[#00A358] hover:scale-[1.02] transition-all px-8">
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  {editingProject ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-foreground">{projects.length}</div>
            <div className="text-muted-foreground text-xs mt-0.5">Proyectos</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-foreground">{featuredProjects.length}</div>
            <div className="text-muted-foreground text-xs mt-0.5">Destacados</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-foreground">
              {projects.reduce((sum, project) => sum + project.views, 0)}
            </div>
            <div className="text-muted-foreground text-xs mt-0.5">Visualizaciones</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-foreground">
              {projects.reduce((sum, project) => sum + project.likes, 0)}
            </div>
            <div className="text-muted-foreground text-xs mt-0.5">Likes</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Proyectos Destacados</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {featuredProjects.slice(0, 2).map((project) => (
              <Card key={project.id} className="bg-card border-border hover-neon overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={getImageUrl(project.image_url)}
                    alt={project.title}
                    fallbackSrc="/placeholder-project.jpg"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">Destacado</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-foreground">{project.title}</h3>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground h-7 w-7 p-0" onClick={() => handleEdit(project)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-red-400 h-7 w-7 p-0" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {getTechArray(project.technologies).slice(0, 4).map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-[#0D0D0D] text-[#00C46A] text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.completion_date}
                    </span>
                    <span>Cliente: {project.client}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {project.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {project.likes}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      {project.github_url && (
                        <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-accent" onClick={() => window.open(project.github_url, '_blank')}>
                          <Github className="h-4 w-4 mr-1" />
                          Código
                        </Button>
                      )}
                      {project.project_url && (
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => window.open(project.project_url, '_blank')}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Ver Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Todos los Proyectos</h2>
        {projects.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground text-sm">No hay proyectos aún. ¡Agrega el primero!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-card border-border hover-neon overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={getImageUrl(project.image_url)}
                    alt={project.title}
                    fallbackSrc="/placeholder-project.jpg"
                    className="w-full h-40 object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground text-xs">★</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold text-foreground">{project.title}</h3>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground p-1 h-6 w-6" onClick={() => handleEdit(project)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-red-400 p-1 h-6 w-6" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {getTechArray(project.technologies).slice(0, 3).map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/10 text-primary text-xs border-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {getTechArray(project.technologies).length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-muted text-muted-foreground text-xs"
                      >
                        +{getTechArray(project.technologies).length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{project.completion_date}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {project.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {project.likes}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {project.github_url && (
                      <Button size="sm" variant="outline" className="flex-1 border-[#333333] text-white hover:bg-[#333333] text-xs" onClick={() => window.open(project.github_url, '_blank')}>
                        <Github className="h-3 w-3 mr-1" />
                        Código
                      </Button>
                    )}
                    {project.project_url && (
                      <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs" onClick={() => window.open(project.project_url, '_blank')}>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Alert />
    </div>
  );
}