import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Briefcase,
  Star,
  DollarSign,
  FileCheck,
  FolderCheck,
  RefreshCw,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearReadNotifications,
  type Notification,
} from '../../../services/notificationService';

const typeConfig: Record<string, { icon: typeof Bell; color: string; bgColor: string }> = {
  'App\\Notifications\\NewApplicationNotification': {
    icon: Briefcase,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  'App\\Notifications\\ApplicationAcceptedNotification': {
    icon: Check,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  'App\\Notifications\\MilestoneSubmittedNotification': {
    icon: FileCheck,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  'App\\Notifications\\MilestoneApprovedNotification': {
    icon: DollarSign,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  'App\\Notifications\\ProjectCompletedNotification': {
    icon: FolderCheck,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  'App\\Notifications\\ReviewReceivedNotification': {
    icon: Star,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
};

interface NotificationSectionProps {
  onClose?: () => void;
}

export function NotificationSection({ onClose }: NotificationSectionProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchNotifications(1, 50, filter);
      if (res.success) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAsRead = async (id: string) => {
    setActionLoading(id);
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    setActionLoading('all');
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
      );
    } catch (err) {
      console.error('Error marking all as read:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearRead = async () => {
    setActionLoading('clear-read');
    try {
      await clearReadNotifications();
      setNotifications((prev) => prev.filter((n) => !n.read_at));
    } catch (err) {
      console.error('Error clearing read:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const content = (
    <div className={onClose ? 'p-4 sm:p-6' : 'p-4 sm:p-8'}>
      <div className={onClose ? 'space-y-4' : 'max-w-4xl mx-auto space-y-6'}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className={onClose ? 'text-xl font-bold text-white flex items-center gap-2' : 'text-3xl font-bold text-white flex items-center gap-3'}>
              <Bell className={onClose ? 'h-5 w-5 text-primary' : 'h-8 w-8 text-primary'} />
              Notificaciones
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {unreadCount > 0
                ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? 'es' : ''} sin leer`
                : 'Estás al día'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadNotifications}
              disabled={loading}
              className="border-border"
            >
              <RefreshCw className={`h-4 w-4 ${onClose ? '' : 'mr-2'} ${loading ? 'animate-spin' : ''}`} />
              {!onClose && 'Actualizar'}
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(['all', 'unread', 'read'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
              >
                {f === 'all' ? 'Todas' : f === 'unread' ? 'Sin leer' : 'Leídas'}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={actionLoading === 'all'}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Marcar todas leídas
              </Button>
            )}
            {notifications.some((n) => n.read_at) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearRead}
                disabled={actionLoading === 'clear-read'}
                className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Limpiar leídas
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className={onClose ? 'h-[calc(100vh-220px)]' : 'h-[calc(100vh-320px)]'}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Sin notificaciones</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {filter === 'unread'
                  ? 'No tienes notificaciones sin leer'
                  : filter === 'read'
                    ? 'No tienes notificaciones leídas'
                    : 'Cuando recibas notificaciones aparecerán aquí'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {notifications.map((notification) => {
                  const config = typeConfig[notification.type] || { icon: Bell, color: 'text-gray-400', bgColor: 'bg-gray-500/10' };
                  const Icon = config.icon;
                  const isUnread = !notification.read_at;

                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`group relative flex items-start gap-4 p-4 rounded-lg border transition-all ${
                        isUnread
                          ? 'bg-card border-primary/20 hover:border-primary/40'
                          : 'bg-card/50 border-border hover:border-border/80'
                      }`}
                    >
                      {/* Unread indicator */}
                      {isUnread && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                      )}

                      {/* Icon */}
                      <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${config.bgColor}`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className={`text-sm font-semibold ${isUnread ? 'text-white' : 'text-gray-300'}`}>
                              {notification.data.title}
                            </h4>
                            <p className={`text-sm mt-0.5 ${isUnread ? 'text-gray-300' : 'text-gray-500'}`}>
                              {notification.data.message}
                            </p>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(notification.created_at)}
                          </span>
                          {notification.data.project_title && (
                            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                              {notification.data.project_title}
                            </Badge>
                          )}
                          {notification.data.amount && (
                            <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                              ${notification.data.amount}
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isUnread && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              disabled={actionLoading === notification.id}
                              className="h-7 text-xs text-primary hover:bg-primary/10"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Marcar leída
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(notification.id)}
                            disabled={actionLoading === notification.id}
                            className="h-7 text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );

  if (onClose) {
    return (
      <>
        <div
          className="fixed inset-0 z-[55] bg-black/60"
          onClick={onClose}
        />
        <div className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-background border-l border-border shadow-2xl overflow-hidden">
          {content}
        </div>
      </>
    );
  }

  return content;
}
