import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = () => {
	return axios.get<DiaryEntry[]>(`${baseUrl}/fullData`).then((response) => response.data);
};

export const createEntry = (newEntry: NewDiaryEntry) => {
	console.log(newEntry);
	return axios.post<DiaryEntry>(baseUrl, newEntry).then((response) => response.data);
};
