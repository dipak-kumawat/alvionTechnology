import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ListRenderItem,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setUsers, deleteUser } from '../store/slices/usersSlice';
import { setLoading, setError } from '../store/slices/uiSlice';
import { saveUsersToStorage, loadUsersFromStorage } from '../hooks/useAsyncStorage';
import { useAppDispatch, useAppSelector } from '../store/store';
import { RootStackParamList, User } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserList'>;
};

const UserListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.list);
  const loading = useAppSelector(state => state.ui.loading);
  const error = useAppSelector(state => state.ui.error);

  useEffect(() => {
    initUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      saveUsersToStorage(users);
    }
  }, [users]);

  const initUsers = async (): Promise<void> => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const localUsers = await loadUsersFromStorage();
      if (localUsers && localUsers.length > 0) {
        dispatch(setUsers(localUsers));
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await response.json();
        dispatch(setUsers(data));
        await saveUsersToStorage(data);
      }
    } catch (err) {
      dispatch(setError('Failed to load users.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = (id: number): void => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteUser(id)),
      },
    ]);
  };

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UserDetail', { userId: item.id })}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={initUsers}>
          <Text style={styles.retryBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item: User) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F3FF',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#6B7280',
  },
  deleteBtn: {
    backgroundColor: '#FFE4E4',
    borderRadius: 20,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  deleteBtnText: {
    color: '#E53E3E',
    fontWeight: '700',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: '#6C63FF',
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 34,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F3FF',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 15,
    marginBottom: 12,
  },
  retryBtn: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserListScreen;