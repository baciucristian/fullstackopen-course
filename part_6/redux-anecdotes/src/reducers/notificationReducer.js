import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    putNotification(state, action) {
			console.log('action', action)
			const content = action.payload
      return content
    },
		clearNotification() {
			return null
		}
  },
})

export const { putNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, secondsToClear) => {
  return async dispatch => {
    dispatch(putNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, secondsToClear * 1000);
  }
}

export default notificationSlice.reducer