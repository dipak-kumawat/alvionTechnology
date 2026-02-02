export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  age: string;
  city: string;
  state: string;
  country: string;
}

export interface DraftProfile {
  fullName?: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  country?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Page1: { profileId?: string };
  Page2: undefined;
  Page3: undefined;
};