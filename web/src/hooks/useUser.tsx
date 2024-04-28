import { create } from 'zustand';

type UserType = {
  email: string;
  isTestUser: boolean;
  setEmail: (email: string) => void;
  setIsTestUser: (isTestUser: boolean) => void;
};

export const useUser = create<UserType>((set) => ({
  email: '',
  isTestUser: false,
  setEmail: (email) => set({ email }),
  setIsTestUser: (isTestUser) => set({ isTestUser }),
}));
