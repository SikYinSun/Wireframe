import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice';
import screenReducer from './screenSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    screen: screenReducer,
  },
})

export default store;