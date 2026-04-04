import { apiRequest } from './apiClient';

export type CompletedProject = {
  id: number;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  company_name: string;
  company_id?: number;
  completed_at: string;
  created_at?: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  technologies: string[];
  completion_date: string | null;
  client: string | null;
  featured: boolean;
};

export type DeveloperProfile = {
  id: string;
  name: string;
  title: string;
  location: string;
  hourlyRate: number | null;
  rating: number;
  reviewsCount: number;
  completedProjects: number;
  completedProjectsList?: CompletedProject[];
  portfolioProjectsList?: PortfolioProject[];
  availability: 'available' | 'busy' | 'unavailable';
  skills: string[];
  experience: number | null;
  languages: string[];
  bio: string;
  links?: Record<string, string>;
  lastActive: string | undefined;
  isVerified: boolean;
  profilePicture?: string | null;
  joinedAt?: string;
};

export async function fetchDevelopers(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiRequest<{ success: boolean; data: DeveloperProfile[] }>(`/developers${query}`);
}

export async function fetchDeveloper(id: string) {
  return apiRequest<{ success: boolean; data: DeveloperProfile }>(`/developers/${id}`);
}

export async function fetchMyCompletedProjects() {
  return apiRequest<{ success: boolean; data: CompletedProject[] }>('/developer/completed-projects');
}
