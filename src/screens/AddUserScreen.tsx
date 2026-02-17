import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addUser } from '../store/slices/usersSlice';
import { useAppDispatch } from '../store/store';
import { RootStackParamList, User } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddUser'>;
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

interface FieldProps {
  label: string;
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
}

const Field: React.FC<FieldProps> = ({
  label,
  icon,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
}) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputRow, error ? styles.inputError : null]}>
      <Text style={styles.inputIcon}>{icon}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
    {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
  </View>
);

const AddUserScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const set =
    (field: keyof FormState) =>
    (value: string): void =>
      setForm(prev => ({ ...prev, [field]: value }));

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required.';
    }
    if (!form.website.trim()) {
      newErrors.website = 'Website is required.';
    }
    return newErrors;
  };

  const handleSubmit = (): void => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim(),
    };

    dispatch(addUser(newUser));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>New User</Text>

        <Field
          label="Name"
          icon="👤"
          value={form.name}
          onChangeText={set('name')}
          error={errors.name}
        />
        <Field
          label="Email"
          icon="✉️"
          value={form.email}
          onChangeText={set('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <Field
          label="Phone"
          icon="📞"
          value={form.phone}
          onChangeText={set('phone')}
          keyboardType="phone-pad"
          autoCapitalize="none"
          error={errors.phone}
        />
        <Field
          label="Website"
          icon="🌐"
          value={form.website}
          onChangeText={set('website')}
          autoCapitalize="none"
          error={errors.website}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Add User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F3FF' },
  content: { padding: 24, paddingBottom: 48 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 24,
    marginTop: 8,
  },
  fieldWrapper: { marginBottom: 18 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  inputError: { borderColor: '#FC8181' },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#1A1A2E', paddingVertical: 14 },
  errorMsg: { color: '#E53E3E', fontSize: 12, marginTop: 4, marginLeft: 4 },
  submitBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6C63FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelBtn: { marginTop: 14, alignItems: 'center', paddingVertical: 12 },
  cancelBtnText: { color: '#9CA3AF', fontSize: 15, fontWeight: '500' },
});

export default AddUserScreen;
