import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (newAnecdote) => {
	const response = await axios.post(baseUrl, newAnecdote);
	return response.data;
};

export const updateAnecdote = async (changedAnecdote) => {
	const response = await axios.put(
		baseUrl + `/${changedAnecdote.id}`,
		changedAnecdote,
	);
	return response.data;
};
