import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
			console.log('action', action)
			const content = action.payload
      return content
    },
		clearNotification() {
			return null
		}
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer