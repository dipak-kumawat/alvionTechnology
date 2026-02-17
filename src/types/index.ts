export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface UsersState {
  list: User[];
}

export interface UIState {
  loading: boolean;
  error: string | null;
}

export interface RootState {
  users: UsersState;
  ui: UIState;
}

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { userId: number };
  AddUser: undefined;
};