import type { UserLogged } from '../types/types';

const getUser = () => {
	return window.localStorage.getItem('loggedBloglistUser');
};

const saveUser = (user: UserLogged) => {
	window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
};

const removeUser = () => {
	window.localStorage.removeItem('loggedBloglistUser');
};

export default { getUser, saveUser, removeUser };
