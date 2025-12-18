import axios from 'axios';
import { apiBaseUrl } from '../constants';
import type {
	Entry,
	NewEntry,
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

const createNewEntry = async (patientId: string, entry: NewEntry) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${patientId}/entries`,
		entry,
	);
	return data;
};

export const api = {
	getAll,
	getById,
	create,
	createNewEntry,
};

export default api;
