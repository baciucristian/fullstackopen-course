import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'anecdotes',
  initialState: null,
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
  },
})

// const filterReducer = (state = 'ALL', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter,
//   }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer