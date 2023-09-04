import { useDispatch } from 'react-redux'

const Filter = () => {
	const dispatch = useDispatch()

  const handleChange = (event) => {
		const toFilter = event.target.value
		dispatch({ type: 'anecdotes/filterChange', payload: toFilter })
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter