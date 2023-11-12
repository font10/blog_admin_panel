import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
  modalUser: false,
  id: '',
  actionCheck: false,
  blogsLength: 0,
  placesLength: 0,
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
    activeModalUser(state, action) {
      state.modalUser = action.payload
    },
    closeModalUser(state, action) {
      state.modalUser = action.payload
    },    
    changeId(state, action) {
      state.id = action.payload
    },
    toggleActionCheck(state) {
      state.actionCheck =!state.actionCheck
    },
    setBlogsLength(state, action) {
      state.blogsLength = action.payload
    },
    setPlacesLength(state, action) {
      state.placesLength = action.payload
    }
  }
})

export const { activeModal, activeModalUser, changeId, closeModal, closeModalUser, toggleActionCheck, blogsLength, placesLength, setBlogsLength, setPlacesLength } = appSlice.actions

export default appSlice.reducer
