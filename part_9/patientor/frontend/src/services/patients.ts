import axios from 'axios';
import { apiBaseUrl } from '../constants';
import type {
	NonSensitivePatient,
	Patient,
	PatientFormValues,
} from '../types/types';

const getAll = async () => {
	const { data } = await axios.get<NonSensitivePatient[]>(
		`${apiBaseUrl}/patients`,
	);
	return data;
};

const getById = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
	return data;
};

export const api = {
	getAll,
	getById,
	create,
};

export default api;
