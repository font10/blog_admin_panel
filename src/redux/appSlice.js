import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
  id: ''
}

export const appSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    activeModal(state, action) {
      state.modal = action.payload
    },
    closeModal(state, action) {
      state.modal = action.payload
    },
    changeId(state, action) {
      state.modal = action.payload
    }
  }
})

export const { activeModal, changeId, closeModal } = appSlice.actions

export default appSlice.reducer
