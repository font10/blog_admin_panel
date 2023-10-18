import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
  id: '',
  actionCheck: false
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
      state.id = action.payload
    },
    toggleActionCheck(state) {
      state.actionCheck =!state.actionCheck
    }
  }
})

export const { activeModal, changeId, closeModal, toggleActionCheck } = appSlice.actions

export default appSlice.reducer
