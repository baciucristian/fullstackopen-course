import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './NotificationContext';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const addVoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (changedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);

			const updatedAnecdotes = anecdotes.map((anecdote) =>
				anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote,
			);

			queryClient.setQueryData(['anecdotes'], updatedAnecdotes);
		},
	});

	const handleVote = (anecdote) => {
		const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
		addVoteMutation.mutate(changedAnecdote);

		dispatch({ type: 'SET', notification: anecdote.content });
		setTimeout(() => {
			dispatch({ type: 'CLEAR' });
		}, 5 * 1000);
	};

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: 1,
		refetchOnWindowFocus: false,
	});

	// console.log('retrieved data', JSON.parse(JSON.stringify(result)));

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>anecodte service not available due to problems in server</div>;
	}

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
