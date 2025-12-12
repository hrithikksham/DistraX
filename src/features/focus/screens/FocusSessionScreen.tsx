import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusSession } from '../hooks/useFocusSession';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

const FocusSessionScreen = () => {
  const navigation = useNavigation();
  // Standard Pomodoro: 25 minutes (1500 seconds)
  const { remaining, isActive, startSession, stopSession, progress } = useFocusSession(1500);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  // Reanimated Pulse Effect for the circle
  const pulse = useSharedValue(1);
  
  useEffect(() => { // Using React.useEffect directly from imports
    if (isActive) {
      pulse.value = withTiming(1.1, { duration: 1000 }); // Simple breathe
    } else {
      pulse.value = withTiming(1, { duration: 500 });
    }
  }, [isActive]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }]
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} disabled={isActive}>
           <Text style={[styles.backText, isActive && styles.disabledText]}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerContainer}>
        <Animated.View style={[styles.timerCircle, animatedCircleStyle]}>
           <Text style={styles.timerText}>{formatTime(remaining)}</Text>
           <Text style={styles.statusText}>{isActive ? "Focus Mode ON" : "Ready to Focus?"}</Text>
        </Animated.View>
      </View>

      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.startButton} onPress={startSession}>
            <Text style={styles.btnText}>Start Session</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={stopSession}>
            <Text style={styles.btnText}>Give Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 20 },
  backText: { color: '#FFF', fontSize: 16 },
  disabledText: { color: '#333' },
  timerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timerCircle: {
    width: 280, height: 280, borderRadius: 140,
    borderWidth: 2, borderColor: '#333',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0a0a0a'
  },
  timerText: { color: '#FFF', fontSize: 48, fontFamily: 'Monospace', fontWeight: 'bold' },
  statusText: { color: '#666', marginTop: 10 },
  controls: { padding: 40, width: '100%' },
  startButton: { backgroundColor: '#FFF', padding: 18, borderRadius: 30, alignItems: 'center' },
  stopButton: { backgroundColor: '#1f1f1f', borderWidth: 1, borderColor: '#333', padding: 18, borderRadius: 30, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});

export default FocusSessionScreen;