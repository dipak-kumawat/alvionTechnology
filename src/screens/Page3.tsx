import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, UserProfile } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addProfile,
  updateProfile,
  clearDraftProfile,
  setLoading,
} from '../redux/profileSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Page3'>;

const Page3: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const draftProfile = useAppSelector(state => state.profiles.draftProfile);
  const isLoading = useAppSelector(state => state.profiles.isLoading);
  const profiles = useAppSelector(state => state.profiles.profiles);

  // Check if we're editing an existing profile
  const existingProfile = profiles.find(
    p =>
      p.fullName === draftProfile.fullName &&
      p.email === draftProfile.email &&
      p.age === draftProfile.age,
  );

  const handleSubmit = async () => {
    // Simulate async operation
    dispatch(setLoading(true));

    // Mock API delay
    setTimeout(() => {
      const profileData: UserProfile = {
        id: existingProfile?.id || Date.now().toString(),
        fullName: draftProfile.fullName || '',
        email: draftProfile.email || '',
        age: draftProfile.age || '',
        city: draftProfile.city || '',
        state: draftProfile.state || '',
        country: draftProfile.country || '',
      };

      if (existingProfile) {
        dispatch(updateProfile(profileData));
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        dispatch(addProfile(profileData));
        Alert.alert('Success', 'Profile created successfully!');
      }

      dispatch(setLoading(false));
      dispatch(clearDraftProfile());
      navigation.navigate('Home');
    }, 1000);
  };

  const handleEdit = () => {
    navigation.navigate('Page1');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Summary</Text>
      <Text style={styles.subtitle}>Step 3 of 3 - Review your information</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{draftProfile.fullName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{draftProfile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{draftProfile.age}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.value}>{draftProfile.city}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>State:</Text>
          <Text style={styles.value}>{draftProfile.state}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Country:</Text>
          <Text style={styles.value}>{draftProfile.country}</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Saving profile...</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {existingProfile ? 'Update Profile' : 'Submit'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit Information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              dispatch(clearDraftProfile());
              navigation.navigate('Home');
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default Page3;
