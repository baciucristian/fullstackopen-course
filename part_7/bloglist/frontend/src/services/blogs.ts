import axios from 'axios';
import { apiBaseUrl } from '../constants';

import type { BlogEntry, BlogFullEntry } from '../types/types';

type NewBlog = {
	title: string;
	author: string;
	url: string;
	likes?: number;
};

let token: string = '';

const setToken = (newToken: string) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get<BlogFullEntry[]>(`${apiBaseUrl}/blogs`);
	const blogs: BlogEntry[] = response.data.map((blog) => {
		return {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes,
			id: blog.id,
			user: blog.user.id,
		};
	});

	return blogs;
};

const create = async (newObject: NewBlog) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post<BlogEntry>(
		`${apiBaseUrl}/blogs`,
		newObject,
		config,
	);

	return response.data;
};

const update = async (id: string, newObject: NewBlog) => {
	const response = await axios.put<BlogEntry>(
		`${apiBaseUrl}/blogs/${id}`,
		newObject,
	);

	return response.data;
};

const deleteBlog = async (id: string) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.delete(`${apiBaseUrl}/blogs/${id}`, config);
	return response.data;
};

export default { getAll, create, update, deleteBlog, setToken };
