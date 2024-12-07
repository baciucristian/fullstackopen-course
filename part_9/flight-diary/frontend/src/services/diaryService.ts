import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

interface ValidationError {
	message: string;
	errors: Record<string, string[]>;
}

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = () => {
	return axios.get<DiaryEntry[]>(`${baseUrl}/fullData`).then((response) => response.data);
};

export const createEntry = async (newEntry: NewDiaryEntry) => {
	console.log(newEntry);
	try {
		const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
			console.error(error);
			const errorMessage = typeof error.response?.data === 'string' ? error.response.data : 'Validation Error';
			return { errorMessage };
		} else {
			console.error(error);
		}
	}
};
