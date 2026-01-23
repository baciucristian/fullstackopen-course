import axios from 'axios';
import { apiBaseUrl } from '../constants';
import type { UserLogged } from '../types/types';

interface Credentials {
	username: string;
	password: string;
}

const login = async (credentials: Credentials) => {
	const response = await axios.post<UserLogged>(
		`${apiBaseUrl}/login`,
		credentials,
	);

	return response.data;
};

export default { login };
