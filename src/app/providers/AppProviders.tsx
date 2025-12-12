import React from 'react';
import { GestureProvider } from './GestureProvider';
import { SafeAreaWrapper } from './SafeAreaWrapper';
import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <GestureProvider>
      <SafeAreaWrapper>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </SafeAreaWrapper>
    </GestureProvider>
  );
};