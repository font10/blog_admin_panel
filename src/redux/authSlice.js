import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.data.user
      state.token = action.payload.data.token
    },
    logout(state) {
      state.user = null
      state.token = null
      localStorage.clear()
    }
  }
})

export const { register, login, logout } = authSlice.actions

export default authSlice.reducer
