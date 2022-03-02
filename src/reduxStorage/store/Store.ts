import {configureStore} from '@reduxjs/toolkit';
import imageReducer from '../slice/ImageSlice';

const store = configureStore({
  reducer: {
    imageReducer: imageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
