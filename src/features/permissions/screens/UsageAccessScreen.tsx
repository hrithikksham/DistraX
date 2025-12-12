import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, AppState, NativeModules } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/NavigationTypes';

const { UsageStatsModule } = NativeModules;

const UsageAccessScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasPermission, setHasPermission] = useState(false);

  // Check permission on mount and when app comes back to foreground
  const checkPermission = async () => {
    try {
      const granted = await UsageStatsModule.hasPermission();
      setHasPermission(granted);
      if (granted) {
        // If granted, navigate to Dashboard automatically
        navigation.replace('Dashboard'); 
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkPermission();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkPermission();
      }
    });
    return () => subscription.remove();
  }, []);

  const handlePress = () => {
    UsageStatsModule.showUsageSettings();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Track Your Screen Time</Text>
      <Text style={styles.subtitle}>
        DistraX needs access to see which apps distract you. 
        Please find "DistraX" in the list and enable it.
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          title={hasPermission ? "Permission Granted" : "Enable Usage Access"} 
          onPress={handlePress} 
          variant={hasPermission ? 'secondary' : 'primary'}
        />
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
