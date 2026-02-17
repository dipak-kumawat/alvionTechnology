import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useAppSelector } from '../store/store';
import { RootStackParamList, User } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;
  route: RouteProp<RootStackParamList, 'UserDetail'>;
};

interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowIcon}>{icon}</Text>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
);

const UserDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params;

  // Data comes from Redux store — not navigation params
  const user = useAppSelector((state) =>
    state.users.list.find((u: User) => u.id === userId)
  );

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>User not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBack}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const initials: string = user.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.fullName}>{user.name}</Text>

      <View style={styles.card}>
        <DetailRow icon="✉️" label="Email" value={user.email} />
        <View style={styles.divider} />
        <DetailRow icon="📞" label="Phone" value={user.phone} />
        <View style={styles.divider} />
        <DetailRow icon="🌐" label="Website" value={user.website} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F3FF' },
  content: { alignItems: 'center', padding: 24 },
  avatar: {
    backgroundColor: '#6C63FF',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  fullName: { fontSize: 22, fontWeight: '800', color: '#1A1A2E', marginBottom: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  rowIcon: { fontSize: 22, marginRight: 14 },
  rowLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  rowValue: { fontSize: 15, color: '#1A1A2E', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F3F4F6' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F3FF' },
  notFound: { fontSize: 16, color: '#6B7280', marginBottom: 12 },
  goBack: { color: '#6C63FF', fontWeight: '600', fontSize: 15 },
});

export default UserDetailScreen;