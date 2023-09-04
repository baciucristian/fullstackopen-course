import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = () => {
	const anecdotes = useSelector(state => {
		console.log(state)

    if ( !state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => {
			const content = anecdote.content.toLowerCase();
			return content.includes(state.filter.toLowerCase())
		})
  })

	const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: 'anecdotes/addVote', payload: id })
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
		<>
			{sortedAnecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</>
  )
}

export default AnecdoteForm