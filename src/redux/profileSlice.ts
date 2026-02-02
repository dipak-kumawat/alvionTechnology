import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, DraftProfile } from '../types';

interface ProfileState {
  profiles: UserProfile[];
  draftProfile: DraftProfile;
  isLoading: boolean;
}

const initialState: ProfileState = {
  profiles: [],
  draftProfile: {},
  isLoading: false,
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    // Update draft profile with partial data
    updateDraftProfile: (state, action: PayloadAction<DraftProfile>) => {
      state.draftProfile = { ...state.draftProfile, ...action.payload };
    },
    
    // Clear draft profile
    clearDraftProfile: (state) => {
      state.draftProfile = {};
    },
    
    // Add new profile
    addProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profiles.push(action.payload);
      state.draftProfile = {};
    },
    
    // Update existing profile
    updateProfile: (state, action: PayloadAction<UserProfile>) => {
      const index = state.profiles.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
      state.draftProfile = {};
    },
    
    // Delete profile
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(p => p.id !== action.payload);
    },
    
    // Load profile into draft for editing
    loadProfileToDraft: (state, action: PayloadAction<string>) => {
      const profile = state.profiles.find(p => p.id === action.payload);
      if (profile) {
        state.draftProfile = { ...profile };
      }
    },
    
    // Set loading state (for simulating async operations)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  updateDraftProfile,
  clearDraftProfile,
  addProfile,
  updateProfile,
  deleteProfile,
  loadProfileToDraft,
  setLoading,
} = profileSlice.actions;

export default profileSlice.reducer;