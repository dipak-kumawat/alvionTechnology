import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import Page1 from '../screens/Page1';
import Page2 from '../screens/Page2';
import Page3 from '../screens/Page3';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'User Profiles',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
          }}
        />
        <Stack.Screen
          name="Page1"
          component={Page1}
          options={{
            title: 'Add Profile - Step 1',
          }}
        />
        <Stack.Screen
          name="Page2"
          component={Page2}
          options={{
            title: 'Add Profile - Step 2',
          }}
        />
        <Stack.Screen
          name="Page3"
          component={Page3}
          options={{
            title: 'Add Profile - Step 3',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;