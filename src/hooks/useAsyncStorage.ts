import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const STORAGE_KEY = '@users_list';

export const saveUsersToStorage = async (users: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to AsyncStorage', e);
  }
};

export const loadUsersFromStorage = async (): Promise<User[] | null> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      return JSON.parse(value) as User[];
    }
    return null;
  } catch (e) {
    console.error('Failed to load users from AsyncStorage', e);
    return null;
  }
};