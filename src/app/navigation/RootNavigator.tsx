import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
// In a real scenario, use a store to check if onboarded
// import { useAuthStore } from '../../store/authStore'; 

export const RootNavigator = () => {
  // Mock state: Change to true to test AppStack, false for Onboarding
  const hasCompletedOnboarding = true; 

  return (
    <NavigationContainer>
      {hasCompletedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};