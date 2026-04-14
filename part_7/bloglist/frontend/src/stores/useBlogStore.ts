import { create } from 'zustand';
import type { BlogEntry } from '../types/types';

interface BlogState {
	blogs: BlogEntry[];
	blogsToRender: BlogEntry[];
	actions: {
		setBlogs: (blogs: BlogEntry[]) => void;
		setBlogsToRender: (blogsToRender: BlogEntry[]) => void;
	};
}

const useBlogStore = create<BlogState>((set) => ({
	blogs: [],
	blogsToRender: [],
	actions: {
		setBlogs: (blogs: BlogEntry[]) => set({ blogs }),
		setBlogsToRender: (blogsToRender: BlogEntry[]) => set({ blogsToRender }),
	},
}));

export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlogsToRender = () => useBlogStore((state) => state.blogsToRender);
export const useBlogActions = () => useBlogStore((state) => state.actions);
