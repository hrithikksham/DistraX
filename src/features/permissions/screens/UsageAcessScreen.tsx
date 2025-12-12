import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/ui/Button';
import { NativeModules } from 'react-native';

const { UsageStatsModule } = NativeModules;

const UsageAccessScreen = () => {
  const requestPermission = async () => {
    try {
      // Connect to the Native Module we built earlier
      const hasPermission = await UsageStatsModule.hasPermission();
      if (!hasPermission) {
         // In a real app, we would open settings here
         console.log("Opening settings...");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Track Your Screen Time</Text>
      <Text style={styles.subtitle}>
        DistraX analyzes how often you open apps to detect distraction patterns.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Enable Usage Access" onPress={requestPermission} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  }
});

export default UsageAccessScreen;