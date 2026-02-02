import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateDraftProfile, loadProfileToDraft } from '../redux/profileSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Page1'>;

const Page1: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const draftProfile = useAppSelector(state => state.profiles.draftProfile);
  const profileId = route.params?.profileId;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    // Load profile for editing if profileId is provided
    if (profileId) {
      dispatch(loadProfileToDraft(profileId));
    }
  }, [profileId]);

  useEffect(() => {
    // Populate fields from draft profile
    if (draftProfile.fullName) setFullName(draftProfile.fullName);
    if (draftProfile.email) setEmail(draftProfile.email);
    if (draftProfile.age) setAge(draftProfile.age);
  }, [draftProfile]);

  const validateAndProceed = () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full Name is required');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return;
    }
    if (!age.trim()) {
      Alert.alert('Validation Error', 'Age is required');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      Alert.alert('Validation Error', 'Please enter a valid age (1-120)');
      return;
    }

    // Save to Redux draft
    dispatch(updateDraftProfile({ fullName, email, age }));

    // Navigate to Page 2
    navigation.navigate('Page2');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Basic Information</Text>
      <Text style={styles.subtitle}>Step 1 of 3</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={validateAndProceed}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#007AFF',
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
});

export default Page1;
