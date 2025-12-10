import axios from 'axios';
import { apiBaseUrl } from '../constants';
import type { DiagnoseEntry } from '../types/types';

const getAll = async () => {
	const { data } = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
	return data;
};

const getByCode = async (code: string) => {
	const data = await getAll();
	const diagnose = data.find((item) => item.code === code);
	return diagnose;
};

export const api = {
	getAll,
	getByCode,
};

export default api;
