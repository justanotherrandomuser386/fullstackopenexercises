import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (message, timeout) => {
  console.log('setNotification')
  return async dispatch => {
    setTimeout(() => dispatch(notify('')), timeout*1000)
    dispatch(notify(message))
  }
}

export default notificationSlice.reducer
export const { notify } = notificationSlice.actions
