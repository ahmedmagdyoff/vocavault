export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: number;
  user_id: number;
  title: string;
  url: string;
  platform: 'youtube' | 'tiktok' | 'facebook' | 'instagram' | 'other';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Word {
  id: number;
  user_id: number;
  category_id: number;
  word: string;
  meaning: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  videos?: Video[];
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
