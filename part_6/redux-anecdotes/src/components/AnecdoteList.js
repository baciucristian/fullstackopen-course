import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const anecdotes = useSelector(state => {
		// console.log(state)

    if (!state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => {
			const content = anecdote.content.toLowerCase();
			return content.includes(state.filter.toLowerCase())
		})
  })

	const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(updateVote(id))
		dispatch(setNotification(`you voted '${content}'`, 10))
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
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
		</>
  )
}

export default AnecdoteForm