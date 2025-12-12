import React, { act, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../app/navigation/NavigationTypes';
import { useAppStore } from '../../../store/rootStore'; // Access Global Store

// Components
import { DailyFocusCard } from '../components/DailyFocusCard';
import { UsageStatsCard } from '../components/UsageStatsCard';

const HomeDashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  
  // Connect to Zustand Store for real data
  const { dailyGoalMinutes, totalFocusTime } = useAppStore();

  // Calculate real progress (Simple logic for demo: Total Time / Goal)
  const progressPercent = Math.min(Math.round((totalFocusTime / 60 / dailyGoalMinutes) * 100), 100);

  const handleStartFocus = () => {
    navigation.navigate('FocusSession');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.appTitle}>DistraX</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={{fontSize:20}}>⚙️</Text> 
            </TouchableOpacity>
        </View>

        {/* Feature 1: Focus Score (Connected to Store) */}
        <DailyFocusCard 
          score={progressPercent > 0 ? progressPercent : 0} 
          status={progressPercent > 50 ? "Good" : "Start Now"} 
        />

        {/* Feature 2: Stats Row */}
        <UsageStatsCard />

        {/* Feature 3: Functional Session Card */}
        <TouchableOpacity 
          style={styles.sessionCard} 
          activeOpacity={0.8}
          onPress={handleStartFocus}
        >
            <View>
                <Text style={styles.sessionTitle}>Start Focus Session</Text>
                <Text style={styles.sessionSubtitle}>Tap to enter deep work</Text>
            </View>
            <View style={styles.actionIcon}>
               <Text style={styles.actionArrow}>→</Text>
            </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    color: '#888',
    fontFamily: 'System', 
    fontWeight: '300',
    letterSpacing: 1,
  },
  sessionCard: {
      backgroundColor: '#171920', // Pale purple from palette
      borderRadius: 16,
      padding: 24,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#333',
  },
  sessionTitle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
  },
  sessionSubtitle: {
      color: '#888888',
      fontSize: 14,
  },
  actionIcon: {
        backgroundColor: '#333',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
  },
  actionArrow: {
      fontSize: 28,
      color: '#FFF',
      fontWeight: 'bold',
      marginLeft: 12,
  },

});

export default HomeDashboardScreen;