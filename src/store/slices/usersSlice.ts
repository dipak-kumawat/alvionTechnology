import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from '../../types';

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.list = [action.payload, ...state.list];
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;