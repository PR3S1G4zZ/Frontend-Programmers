import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import {
  Code,
  User,
  FolderOpen,
  Search,
  MessageSquare,
  Plus,
  Building2,
  Settings,
  LogOut,
  Home,
  X,
  Wallet,
  BarChart3,
  Bell
} from "lucide-react";
import type { User as AuthUser } from "../services/authService";
import { fetchNotifications } from "../services/notificationService";
import { fetchConversations } from "../services/chatService";
import { NotificationSection } from "./dashboard/shared/NotificationSection";

interface SidebarProps {
  userType: 'programmer' | 'company' | 'admin';
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  user?: AuthUser | null;
}

// Maps notification types to programmer sidebar sections
const programmerNotificationSectionMap: Record<string, string> = {
  'App\\Notifications\\NewApplicationNotification': 'projects-active',
  'App\\Notifications\\ApplicationAcceptedNotification': 'projects-active',
  'App\\Notifications\\MilestoneSubmittedNotification': 'projects-active',
  'App\\Notifications\\MilestoneApprovedNotification': 'projects-active',
  'App\\Notifications\\ProjectCompletedNotification': 'projects-active',
  'App\\Notifications\\ReviewReceivedNotification': 'portfolio',
};

// Maps notification types to company sidebar sections (all relate to projects)
const companyNotificationSectionMap: Record<string, string> = {
  'App\\Notifications\\NewApplicationNotification': 'my-projects',
  'App\\Notifications\\ApplicationAcceptedNotification': 'my-projects',
  'App\\Notifications\\MilestoneSubmittedNotification': 'my-projects',
  'App\\Notifications\\MilestoneApprovedNotification': 'my-projects',
  'App\\Notifications\\ProjectCompletedNotification': 'my-projects',
  'App\\Notifications\\ReviewReceivedNotification': 'my-projects',
};

export function Sidebar({
  userType,
  currentSection,
  onSectionChange,
  onLogout,
  isOpen = false,
  onClose,
  user,
}: SidebarProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatUnreadCount, setChatUnreadCount] = useState(0);
  const [notificationDots, setNotificationDots] = useState<Set<string>>(new Set());
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

  const typeMap = userType === 'programmer' ? programmerNotificationSectionMap : companyNotificationSectionMap;

  const loadNotificationData = useCallback(async () => {
    try {
      const res = await fetchNotifications(1, 50, 'unread');
      if (res.success) {
        setUnreadCount(res.unread_count);
        const dots = new Set<string>();
        for (const n of res.data) {
          if (!n.read_at) {
            const section = typeMap[n.type];
            if (section) dots.add(section);
          }
        }
        setNotificationDots(dots);
      }
    } catch {
      // silently fail
    }
  }, [typeMap]);

  const loadChatUnreadCount = useCallback(async () => {
    try {
      const res = await fetchConversations();
      const total = (res.data || []).reduce((sum: number, c: any) => sum + (c.unreadCount || 0), 0);
      setChatUnreadCount(total);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    loadNotificationData();
    loadChatUnreadCount();
    const interval = setInterval(() => {
      loadNotificationData();
      loadChatUnreadCount();
    }, 30000);
    return () => clearInterval(interval);
  }, [loadNotificationData, loadChatUnreadCount]);

  const programmerSections = [
    { id: 'welcome', label: 'Mi Espacio', icon: Home },
    { id: 'projects-active', label: 'Proyectos Activos', icon: Code },
    { id: 'portfolio', label: 'Mi Portafolio', icon: FolderOpen },
    { id: 'projects', label: 'Proyectos Publicados', icon: Search },
    { id: 'profile', label: 'Mi Perfil', icon: User },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: chatUnreadCount },
    { id: 'wallet', label: 'Billetera & Cobros', icon: Wallet },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const companySections = [
    { id: 'welcome', label: 'Dashboard', icon: Home },
    { id: 'my-projects', label: 'Mis Proyectos', icon: FolderOpen },
    { id: 'publish-project', label: 'Publicar Proyecto', icon: Plus },
    { id: 'search-programmers', label: 'Buscar Programadores', icon: Search },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: chatUnreadCount },
    { id: 'wallet', label: 'Billetera & Pagos', icon: Wallet },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const adminSections = [
    { id: 'dashboard', label: 'Dashboard Admin', icon: Home },
    { id: 'users', label: 'Gestión de Usuarios', icon: User },
    { id: 'projects', label: 'Todos los Proyectos', icon: FolderOpen },
    { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const sections = userType === 'programmer' ? programmerSections : userType === 'admin' ? adminSections : companySections;
  const displayName = user ? `${user.name} ${user.lastname}`.trim() : 'Usuario';
  const displaySubtitle =
    userType === 'admin'
      ? 'Administrador'
      : userType === 'company'
        ? 'Cuenta Empresa'
        : 'Desarrollador';

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    if (sectionId === 'chat') {
      setChatUnreadCount(0);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleBellClick = () => {
    setNotificationPanelOpen(true);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar sidebar"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 md:static md:h-screen md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-sidebar-primary p-2 rounded-lg">
                <Code className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-primary glow-text">Programmers</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white md:hidden"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            {userType === 'programmer' ? (
              <>
                <User className="h-8 w-8 text-sidebar-primary" />
                <div>
                  <div className="text-sidebar-foreground font-semibold">{displayName}</div>
                  <div className="text-sidebar-foreground/70 text-sm">{displaySubtitle}</div>
                </div>
              </>
            ) : (
              <>
                <Building2 className="h-8 w-8 text-sidebar-primary" />
                <div>
                  <div className="text-sidebar-foreground font-semibold">{displayName}</div>
                  <div className="text-sidebar-foreground/70 text-sm">{displaySubtitle}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const badge = (section as any).badge;
              const hasDot = notificationDots.has(section.id);
              return (
                <Button
                  key={section.id}
                  variant={currentSection === section.id ? "default" : "ghost"}
                  className={`w-full justify-start relative ${currentSection === section.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  onClick={() => handleSectionChange(section.id)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {section.label}
                  {badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {badge > 99 ? '99+' : badge}
                    </span>
                  )}
                  {hasDot && badge === 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          {userType !== 'admin' && (
            <Button
              variant="ghost"
              className="w-full justify-start relative text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={handleBellClick}
            >
              <Bell className="h-5 w-5 mr-3" />
              Notificaciones
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => {
              if (onClose) onClose();
              if (onLogout) onLogout();
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Notification Panel Overlay */}
      {notificationPanelOpen && (
        <NotificationSection onClose={() => setNotificationPanelOpen(false)} />
      )}
    </>
  );
}
