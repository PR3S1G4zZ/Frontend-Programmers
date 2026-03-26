import apiClient from './apiClient';

export interface NotificationData {
  type: string;
  title: string;
  message: string;
  project_id?: number;
  project_title?: string;
  milestone_id?: number;
  milestone_title?: string;
  amount?: string;
  developer_id?: number;
  developer_name?: string;
  company_name?: string;
  rating?: number;
  comment?: string;
  action_url?: string;
}

export interface Notification {
  id: string;
  type: string;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
  unread_count: number;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface UnreadCountResponse {
  success: boolean;
  unread_count: number;
}

export async function fetchNotifications(page = 1, perPage = 20, filter: 'all' | 'unread' | 'read' = 'all'): Promise<NotificationsResponse> {
  return apiClient.get<NotificationsResponse>(`/notifications?page=${page}&per_page=${perPage}&filter=${filter}`);
}

export async function fetchUnreadCount(): Promise<UnreadCountResponse> {
  return apiClient.get<UnreadCountResponse>('/notifications/unread-count');
}

export async function markNotificationAsRead(id: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post(`/notifications/${id}/read`, {});
}

export async function markAllNotificationsAsRead(): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/notifications/read-all', {});
}

export async function deleteNotification(id: string): Promise<{ success: boolean; message: string }> {
  return apiClient.delete(`/notifications/${id}`);
}

export async function clearReadNotifications(): Promise<{ success: boolean; message: string }> {
  return apiClient.delete('/notifications/clear-read');
}
