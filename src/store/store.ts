import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import usersReducer from './slices/usersSlice';
import uiReducer from './slices/uiSlice';
import { RootState } from '../types';

const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these everywhere instead of plain useDispatch / useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;