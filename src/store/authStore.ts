import { create } from 'zustand';
import type { User } from '../types/chat';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // For demo purposes, only allow specific credentials
    if (email === 'coach.thompson@example.com' && password === 'demo123') {
      const coachUser: User = {
        id: '4',
        name: 'Coach Thompson',
        avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
        role: 'coach',
        status: 'online',
        email: 'coach.thompson@example.com',
        preferences: {
          aiSuggestions: true
        }
      };
      set({ user: coachUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));