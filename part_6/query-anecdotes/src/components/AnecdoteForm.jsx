import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
			console.log('anecdote created successfully', newAnecdote);
		},
		onError: (res) => {
			console.log('anecdote creation error');
			const errorMessage = res.response.data.error;
			dispatch({ type: 'SET', notification: errorMessage });
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		newAnecdoteMutation.mutate({ content, votes: 0 });
		dispatch({ type: 'SET', notification: `you created '${content}'` });
		setTimeout(() => {
			dispatch({ type: 'CLEAR' });
		}, 5 * 1000);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
