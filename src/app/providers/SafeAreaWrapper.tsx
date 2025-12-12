import React from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {children}
    </SafeAreaProvider>
  );
};