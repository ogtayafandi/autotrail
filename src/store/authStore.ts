// store.ts
import { create } from 'zustand';
import { SignedUser } from '../types/auth';

interface UserState {
  user: SignedUser | null;
  setUser: (user: SignedUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
        if(user) {
            set({ user })
        }
    },
}));