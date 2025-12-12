import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './NavigationTypes';
import OnboardingScreen from '../../features/onboarding/screens/OnboardingScreen'; 
import UsageAccessScreen from '../../features/permissions/screens/UsageAcessScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom', // Smoother transition
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="UsageAccess" component={UsageAccessScreen} />
    </Stack.Navigator>
  );
};