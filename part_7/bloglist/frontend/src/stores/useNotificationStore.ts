import { create } from 'zustand';

interface NotificationState {
	message: string;
	color: string;
	actions: {
		setNotification: (message: string, color: string) => void;
		clearNotification: () => void;
	};
}

const useNotificationStore = create<NotificationState>((set) => ({
	message: '',
	color: 'green',
	actions: {
		setNotification: (message: string, color: string) => set({ message, color }),
		clearNotification: () => set({ message: '', color: 'green' }),
	},
}));

export const useNotificationMessage = () => useNotificationStore((state) => state.message);
export const useNotificationColor = () => useNotificationStore((state) => state.color);
export const useNotificationControls = () => useNotificationStore((state) => state.actions);
