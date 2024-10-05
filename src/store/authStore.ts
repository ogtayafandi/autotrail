// store.ts
import { create } from 'zustand';
import { User } from '../types/auth';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
        if(user) {
            set({ user })
        }
    },
}));