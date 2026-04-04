import { useState, useMemo, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { Button } from '../../ui/button';
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Star, ChevronRight, SkipForward, CheckCircle2, User } from 'lucide-react';
import apiClient from '../../../services/apiClient';
import type { ProjectResponse } from '../../../services/projectService';

interface ReviewDialogProps {
    project: ProjectResponse;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ReviewMetrics {
    rating: number;
    clean_code_rating: number;
    communication_rating: number;
    compliance_rating: number;
    creativity_rating: number;
    post_delivery_support_rating: number;
}

interface AcceptedDeveloper {
    id: number;
    name: string;
    avatar?: string;
}

const DEFAULT_METRICS: ReviewMetrics = {
    rating: 5,
    clean_code_rating: 5,
    communication_rating: 5,
    compliance_rating: 5,
    creativity_rating: 5,
    post_delivery_support_rating: 5,
};

// Metric labels in Spanish
const METRIC_LABELS: Record<keyof Omit<ReviewMetrics, 'rating'>, string> = {
    clean_code_rating: 'Código Limpio',
    communication_rating: 'Comunicación',
    compliance_rating: 'Cumplimiento',
    creativity_rating: 'Creatividad',
    post_delivery_support_rating: 'Soporte Post-Entrega',
};

export function ReviewDialog({ project, open, onOpenChange }: ReviewDialogProps) {
    const [metrics, setMetrics] = useState<ReviewMetrics>({ ...DEFAULT_METRICS });
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ratedDeveloperIds, setRatedDeveloperIds] = useState<Set<number>>(new Set());

    // Get all accepted developers from the project
    const acceptedDevelopers: AcceptedDeveloper[] = useMemo(() => {
        if (!project.applications) return [];
        return project.applications
            .filter((app: any) => app.status === 'accepted' && app.developer?.id)
            .map((app: any) => ({
                id: app.developer.id,
                name: app.developer.name || 'Desarrollador',
                avatar: app.developer.avatar,
            }));
    }, [project.applications]);

    const totalDevelopers = acceptedDevelopers.length;
    const currentDeveloper = acceptedDevelopers[currentIndex] ?? null;
    const isLastDeveloper = currentIndex >= totalDevelopers - 1;

    const resetForm = useCallback(() => {
        setMetrics({ ...DEFAULT_METRICS });
        setComment('');
        setError(null);
    }, []);

    const handleClose = useCallback(() => {
        // Reset everything when dialog closes
        setCurrentIndex(0);
        setRatedDeveloperIds(new Set());
        resetForm();
        onOpenChange(false);
    }, [onOpenChange, resetForm]);

    const handleMetricChange = (metric: keyof ReviewMetrics, value: number) => {
        setMetrics(prev => ({ ...prev, [metric]: value }));
    };

    const handleSubmit = async () => {
        if (!currentDeveloper) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await apiClient.post('/reviews', {
                project_id: project.id,
                developer_id: currentDeveloper.id,
                rating: metrics.rating,
                comment: comment,
                clean_code_rating: metrics.clean_code_rating,
                communication_rating: metrics.communication_rating,
                compliance_rating: metrics.compliance_rating,
                creativity_rating: metrics.creativity_rating,
                post_delivery_support_rating: metrics.post_delivery_support_rating,
            });

            // Mark this developer as rated
            setRatedDeveloperIds(prev => new Set(prev).add(currentDeveloper.id));

            if (isLastDeveloper) {
                // All done — close dialog
                handleClose();
            } else {
                // Move to next developer
                setCurrentIndex(prev => prev + 1);
                resetForm();
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error al enviar la reseña';
            // If review already exists, skip to next automatically
            if (err.response?.status === 422) {
                setRatedDeveloperIds(prev => new Set(prev).add(currentDeveloper.id));
                if (isLastDeveloper) {
                    handleClose();
                } else {
                    setCurrentIndex(prev => prev + 1);
                    resetForm();
                }
            } else {
                setError(msg);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        if (isLastDeveloper) {
            handleClose();
        } else {
            setCurrentIndex(prev => prev + 1);
            resetForm();
        }
    };

    const renderStarRating = (
        metric: keyof ReviewMetrics,
        label: string,
        showLabel: boolean = true
    ) => (
        <div className="space-y-1.5">
            {showLabel && (
                <Label className="text-sm font-medium text-gray-300">{label}</Label>
            )}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleMetricChange(metric, star)}
                        className="p-0.5 hover:scale-125 transition-transform duration-150"
                    >
                        <Star
                            className={`h-5 w-5 transition-colors ${star <= metrics[metric]
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600 hover:text-gray-400'
                                }`}
                        />
                    </button>
                ))}
                <span className="ml-2 text-sm font-medium text-gray-400 tabular-nums">
                    {metrics[metric]}/5
                </span>
            </div>
        </div>
    );

    if (totalDevelopers === 0) return null;

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); else onOpenChange(true); }}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border-[#333333]">
                <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        Reseña del Proyecto
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Evalúa el trabajo de los desarrolladores en "{project.title}"
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-4">
                    {/* Progress indicator — only show if multiple developers */}
                    {totalDevelopers > 1 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Progreso de calificación</span>
                                <span className="text-primary font-medium">
                                    {currentIndex + 1} de {totalDevelopers}
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                {acceptedDevelopers.map((dev, idx) => (
                                    <div
                                        key={dev.id}
                                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                            ratedDeveloperIds.has(dev.id)
                                                ? 'bg-primary'
                                                : idx === currentIndex
                                                    ? 'bg-yellow-400'
                                                    : 'bg-gray-700'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Current developer card */}
                    {currentDeveloper && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0D0D0D] border border-[#333333]">
                            <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {currentDeveloper.avatar ? (
                                    <img src={currentDeveloper.avatar} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-5 w-5 text-primary" />
                                )}
                            </div>
                            <div>
                                <p className="text-white font-medium">{currentDeveloper.name}</p>
                                <p className="text-xs text-gray-500">Desarrollador asignado</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Overall Rating */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold text-white">Calificación General</Label>
                        {renderStarRating('rating', '', false)}
                    </div>

                    {/* Detailed Metrics */}
                    <div className="space-y-3 border-t border-[#333333] pt-4">
                        <Label className="text-base font-semibold text-white">Métricas de Evaluación</Label>

                        {renderStarRating('clean_code_rating', METRIC_LABELS.clean_code_rating)}
                        {renderStarRating('communication_rating', METRIC_LABELS.communication_rating)}
                        {renderStarRating('compliance_rating', METRIC_LABELS.compliance_rating)}
                        {renderStarRating('creativity_rating', METRIC_LABELS.creativity_rating)}
                        {renderStarRating('post_delivery_support_rating', METRIC_LABELS.post_delivery_support_rating)}
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <Label htmlFor="comment" className="text-gray-300">Comentario (opcional)</Label>
                        <Textarea
                            id="comment"
                            placeholder="Comparte tu experiencia trabajando con este desarrollador..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            className="bg-[#0D0D0D] border-[#333333] text-white placeholder:text-gray-600"
                        />
                    </div>
                </div>

                <DialogFooter className="sm:justify-between gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-gray-400 hover:text-white hover:bg-[#333333]"
                    >
                        <SkipForward className="h-4 w-4 mr-1.5" />
                        {isLastDeveloper ? 'Cerrar sin calificar' : 'Omitir'}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !currentDeveloper}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        {isSubmitting ? (
                            'Enviando...'
                        ) : isLastDeveloper ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                                Enviar y Finalizar
                            </>
                        ) : (
                            <>
                                Enviar y Siguiente
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
