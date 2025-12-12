import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrbitAnimation } from '../components/OrbitAnimation';
import { Button } from '../../../components/ui/Button';
import { useOnboarding } from '../hooks/useOnboarding';

const OnboardingScreen = () => {
  const { handleStart } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Animation Section */}
      <View style={styles.animationContainer}>
        <OrbitAnimation />
      </View>

      {/* Bottom Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>DistraX</Text>
          <Text style={styles.subtitle}>Your Mind, Uninterrupted.</Text>
        </View>

        <Button 
          title="Start your Journey" 
          onPress={handleStart} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dark Theme
  },
  animationContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  textWrapper: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '300', // Thin elegant font
    color: '#FFFFFF',
    letterSpacing: 1,
    fontFamily: 'System', 
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;