import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: {
    title: '',
    drawer: '',
    department: '',
    screenSize: '',
    date: '',
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    updateDescription: (state, action) => {
      state.description = {...state.description, ...action.payload}
    },
  },
});

export const {updateDescription} = formSlice.actions;
export default formSlice.reducer;