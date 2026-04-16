import { create } from 'zustand';
import type { UserLogged } from '../types/types';

interface UserState {
	username: string;
	password: string;
	user: UserLogged | null;
	actions: {
		setUsername: (username: string) => void;
		setPassword: (password: string) => void;
		setUser: (user: UserLogged | null) => void;
	};
}

const useUserStore = create<UserState>((set) => ({
	username: '',
	password: '',
	user: {
		name: '',
		username: '',
		token: '',
	},
	actions: {
		setUsername: (username: string) => set({ username }),
		setPassword: (password: string) => set({ password }),
		setUser: (user: UserLogged | null) => set({ user }),
	},
}));

export const useUsername = () => useUserStore((state) => state.username);
export const usePassword = () => useUserStore((state) => state.password);
export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
