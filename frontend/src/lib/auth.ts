import { fetchApi } from './api';
import { AuthResponse, User } from '@/types';

export const auth = {
  async register(data: any): Promise<AuthResponse> {
    return fetchApi<AuthResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: any): Promise<AuthResponse> {
    return fetchApi<AuthResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async logout(): Promise<{ message: string }> {
    return fetchApi<{ message: string }>('/api/logout', {
      method: 'POST',
    });
  },

  async getUser(): Promise<User> {
    return fetchApi<User>('/api/user', {
      method: 'GET',
    });
  },
};
