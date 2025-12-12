import React, { Suspense } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './NavigationTypes';

// Lazy Load Heavy Screens
const HomeDashboardScreen = React.lazy(() => import('../../features/home/screens/HomeDashboardScreen'));

const Stack = createNativeStackNavigator<AppStackParamList>();

const LoadingFallback = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#4F46E5" />
  </View>
);

export const AppStack = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom', //
          gestureEnabled: true,
          contentStyle: { backgroundColor: '#000000' }, // Dark theme base
        }}
      >
        <Stack.Screen name="Dashboard" component={HomeDashboardScreen} />
      </Stack.Navigator>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});