import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Search, Send, MoreVertical, ArrowLeft, MessageSquare, Paperclip, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { fetchConversationMessages, fetchConversations, sendConversationMessage, sendConversationFile } from '../../services/chatService';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ALLOWED_FILE_EXTENSIONS = [
  'jpg', 'jpeg', 'png', 'gif',
  'pdf', 'doc', 'docx', 'xls', 'xlsx',
  'zip', 'rar', 'txt', 'csv'
];
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
const ALLOWED_DOC_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-rar-compressed',
  'text/plain',
  'text/csv'
];

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping?: boolean;
  isGroup?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  isRead: boolean;
}

interface ChatSectionProps {
  userType: 'programmer' | 'company';
  initialChatId?: string;
}

export function ChatSection({ userType, initialChatId }: ChatSectionProps) {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState<string | null>(initialChatId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const currentUserId = user ? String(user.id) : 'me';

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  useEffect(() => {
    let isMounted = true;
    const loadConversations = async () => {
      try {
        const response = await fetchConversations();
        if (!isMounted) return;
        const data = Array.isArray(response.data) ? response.data : [];
        const mapped = data.map((contact: any) => ({
          id: String(contact.id),
          name: contact.name,
          role: contact.role,
          avatar: undefined,
          lastMessage: contact.lastMessage,
          timestamp: contact.timestamp ? formatTimestamp(contact.timestamp) : '',
          unreadCount: contact.unreadCount,
          isOnline: contact.isOnline,
          isTyping: false,
          isGroup: contact.role === 'group',
        }));
        setContacts(mapped);
        if (mapped.length > 0 && !selectedContact) {
          setSelectedContact(mapped[0].id);
        }
      } catch (error) {
        console.error('Error cargando conversaciones', error);
      }
    };

    loadConversations();

    const conversationsInterval = setInterval(loadConversations, 30000);

    return () => {
      isMounted = false;
      clearInterval(conversationsInterval);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval>;

    const loadMessages = async () => {
      if (!selectedContact) {
        setMessages([]);
        return;
      }
      try {
        const response = await fetchConversationMessages(Number(selectedContact));
        if (!isMounted) return;
        const data = Array.isArray(response?.data) ? response.data : [];

        const newMessages = data.map((message: any) => ({
          id: String(message.id),
          senderId: message.senderId,
          content: message.content,
          timestamp: formatTimestamp(message.timestamp),
          type: message.type,
          fileName: message.fileName,
          fileSize: message.fileSize,
          fileUrl: message.fileUrl,
          isRead: message.isRead,
        }));

        setMessages(prev => {
          if (prev.length !== newMessages.length) return newMessages;
          if (prev.length > 0 && newMessages.length > 0 && prev[prev.length - 1].id !== newMessages[newMessages.length - 1].id) return newMessages;
          return prev;
        });

      } catch (error) {
        console.error('Error cargando mensajes', error);
      }
    };

    loadMessages();
    intervalId = setInterval(loadMessages, 3000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [selectedContact]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;

    const content = newMessage.trim();
    setNewMessage('');

    try {
      const response = await sendConversationMessage(Number(selectedContact), content);
      const sentMessage = response?.data;

      if (!sentMessage) {
        console.error("No data received for sent message");
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(sentMessage.id),
          senderId: sentMessage.senderId,
          content: sentMessage.content,
          timestamp: formatTimestamp(sentMessage.timestamp),
          type: sentMessage.type,
          fileUrl: sentMessage.fileUrl,
          fileName: sentMessage.fileName,
          fileSize: sentMessage.fileSize,
          isRead: sentMessage.isRead,
        },
      ]);
    } catch (error) {
      console.error('Error enviando mensaje', error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedContact) return;

    // Validate file type - only photos and documents allowed
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const isValidExtension = ALLOWED_FILE_EXTENSIONS.includes(extension);
    const isValidMime = [...ALLOWED_FILE_TYPES, ...ALLOWED_DOC_MIMES].includes(file.type);

    if (!isValidExtension && !isValidMime) {
      MySwal.fire({
        icon: 'warning',
        title: 'Archivo no permitido',
        html: 'Solo se permiten subir <b>fotos</b> (JPG, PNG, GIF) o <b>documentos</b> (PDF, DOC, XLS, ZIP, TXT, CSV).<br><br>No se permiten archivos de código ni ejecutables.',
        confirmButtonColor: '#00FF85',
        confirmButtonText: '<span style="color: #020617; font-weight: bold;">Entendido</span>',
        background: '#0f172a',
        color: '#f8fafc',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      MySwal.fire({
        icon: 'error',
        title: 'Archivo muy grande',
        text: 'El archivo no puede superar los 10MB.',
        confirmButtonColor: '#00FF85',
        confirmButtonText: '<span style="color: #020617; font-weight: bold;">Entendido</span>',
        background: '#0f172a',
        color: '#f8fafc',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const response = await sendConversationFile(Number(selectedContact), file);
      const sentMessage = response?.data;
      if (sentMessage) {
        setMessages((prev) => [
          ...prev,
          {
            id: String(sentMessage.id),
            senderId: sentMessage.senderId,
            content: sentMessage.content,
            timestamp: formatTimestamp(sentMessage.timestamp),
            type: sentMessage.type,
            fileUrl: sentMessage.fileUrl,
            fileName: sentMessage.fileName,
            fileSize: sentMessage.fileSize,
            isRead: sentMessage.isRead,
          },
        ]);
      }
    } catch (error) {
      console.error('Error enviando archivo', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error al subir',
        text: 'No se pudo subir el archivo. Inténtalo de nuevo.',
        confirmButtonColor: '#00FF85',
        confirmButtonText: '<span style="color: #020617; font-weight: bold;">Entendido</span>',
        background: '#0f172a',
        color: '#f8fafc',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteMessage = (id: string) => setMessages(prev => prev.filter(m => m.id !== id));
  const handleCopyMessage = (content: string) => navigator.clipboard.writeText(content);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden font-sans selection:bg-primary/20">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Contact List */}
        <div className={`w-full lg:w-80 flex flex-col border-r border-border bg-card ${selectedContact && isMobileView ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-bold text-foreground tracking-tight mb-1">Mensajes</h1>
            <p className="text-xs text-gray-400 font-medium">
              {userType === 'programmer' ? 'Chats con Empresas' : 'Equipo & Devs'}
            </p>
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted border-transparent focus:bg-accent focus:border-primary/20 transition-all rounded-lg h-10 text-sm"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-1">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-10 opacity-40">
                  <p className="text-sm">Sin resultados</p>
                </div>
              ) : filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact.id);
                    setIsMobileView(true);
                  }}
                  className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all duration-200 group relative overflow-hidden ${selectedContact === contact.id
                    ? 'bg-gradient-to-r from-primary/10 to-transparent'
                    : 'hover:bg-accent'
                    }`}
                >
                  {selectedContact === contact.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full"
                    />
                  )}

                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 border-2 border-border shadow-sm">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className={`font-bold text-xs ${selectedContact === contact.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                        {contact.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-card rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className={`font-semibold text-sm truncate ${selectedContact === contact.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                        {contact.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">{contact.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 truncate max-w-[160px] group-hover:text-gray-400 transition-colors">
                        {contact.isTyping ? <span className="text-primary animate-pulse">Escribiendo...</span> : contact.lastMessage}
                      </p>
                      {contact.unreadCount > 0 && (
                        <Badge className="h-5 min-w-[20px] bg-primary text-primary-foreground text-[10px] px-0 flex items-center justify-center rounded-full">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col bg-background relative ${!selectedContact ? 'hidden lg:flex' : 'flex'} ${selectedContact && isMobileView ? 'fixed inset-0 z-50 lg:static' : ''}`}>
          {!selectedContact ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 rounded-full bg-[#111] flex items-center justify-center mb-6 animate-pulse">
                <MessageSquare className="h-10 w-10 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-200">Selecciona un chat</h2>
              <p className="text-gray-500 mt-2 max-w-sm">Elige una conversación del panel izquierdo para comenzar a colaborar.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="h-[73px] border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="lg:hidden -ml-2 text-gray-400" onClick={() => setIsMobileView(false)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={selectedContactData?.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {selectedContactData?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-bold text-white leading-none mb-1">{selectedContactData?.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${selectedContactData?.isOnline ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-gray-500'}`}></span>
                      <span className="text-xs text-gray-400 font-medium">{selectedContactData?.isOnline ? 'En línea' : 'Desconectado'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
                      <DropdownMenuLabel>Opciones del Chat</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Search className="h-4 w-4 mr-2" /> Buscar en chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-hidden relative bg-background">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <ScrollArea className="h-full px-4 py-6">
                  <div className="space-y-6 pb-4 max-w-4xl mx-auto">
                    <AnimatePresence initial={false}>
                      {messages.map((message) => {
                        const isMe = message.senderId === currentUserId;
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex group ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex flex-col max-w-[80%] md:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                              <div className={`relative px-5 py-3 shadow-sm text-sm leading-relaxed ${isMe
                                ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm'
                                : 'bg-[#1E1E1E] text-gray-100 rounded-2xl rounded-tl-sm border border-[#2A2A2A]'
                                }`}>
                                {message.type === 'image' && message.fileUrl && (
                                  <div className="mb-2 rounded-lg overflow-hidden border border-black/10">
                                    <img
                                      src={message.fileUrl}
                                      alt={message.fileName || 'Imagen'}
                                      className="max-w-full max-h-64 object-contain cursor-pointer"
                                      onClick={() => window.open(message.fileUrl, '_blank')}
                                    />
                                  </div>
                                )}

                                {message.type === 'file' && message.fileUrl && (
                                  <div className="mb-2 flex items-center gap-3 p-3 rounded-lg bg-black/10 border border-black/10">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                      <Download className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">{message.fileName}</p>
                                      <p className="text-xs opacity-70">{message.fileSize}</p>
                                    </div>
                                    <a
                                      href={message.fileUrl}
                                      download={message.fileName}
                                      className="shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                                    >
                                      <Download className="h-4 w-4" />
                                    </a>
                                  </div>
                                )}

                                {message.content && message.type !== 'file' && (
                                  <p className="whitespace-pre-wrap">{message.content}</p>
                                )}
                                {message.type === 'file' && !message.fileUrl && (
                                  <p className="whitespace-pre-wrap">{message.content}</p>
                                )}

                                {/* Message Meta & Actions */}
                                <div className={`absolute -bottom-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isMe ? 'right-0' : 'left-0'}`}>
                                  <span className="text-[10px] text-gray-500 font-mono">{message.timestamp}</span>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-4 w-4 text-gray-500 hover:text-white">
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-card border-border">
                                      <DropdownMenuItem onClick={() => handleCopyMessage(message.content)}>Copiar</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteMessage(message.id)}>Eliminar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>

                              {isMe && (
                                <span className="text-[10px] text-gray-600 mt-1 mr-1 flex items-center gap-0.5">
                                  {message.isRead && <span className="text-primary">✓✓</span>}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-card border-t border-border">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-end gap-2 bg-muted p-2 rounded-2xl border border-border focus-within:border-primary/50 focus-within:bg-accent transition-all shadow-sm">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.txt,.csv"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="shrink-0 h-10 w-10 text-gray-400 hover:text-primary hover:bg-primary/10"
                      title="Adjuntar archivo"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>

                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={isUploading ? 'Subiendo archivo...' : 'Escribe un mensaje...'}
                      className="border-0 bg-transparent p-2 h-auto text-sm focus-visible:ring-0 placeholder-gray-500 text-white min-h-[40px] max-h-32 resize-none"
                    />

                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`h-10 w-10 rounded-xl shrink-0 transition-all duration-200 ${newMessage.trim()
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground'
                        }`}
                    >
                      <Send className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
