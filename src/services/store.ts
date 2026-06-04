import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { feedSlice } from './feedSlice';
import { constructorSlice } from './constructorSlice';
import { userSlice } from './userSlice';
import { userOrderSlice } from './userOrderSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  constructorSlice,
  userSlice,
  userOrderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
