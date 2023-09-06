import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

		const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'anecdotes/createAnecdote', payload: newAnecdote })
    dispatch({ type: 'notification/setNotification', payload: `you created '${content}'` })
		setTimeout(() => {
			dispatch({ type: 'notification/clearNotification' })
		}, 5 * 1000);
  }

  return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote'/></div>
				<button type='submit'>create</button>
			</form>
		</>
  )
}

export default AnecdoteForm