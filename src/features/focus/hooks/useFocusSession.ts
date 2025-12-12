import { useEffect, useState, useCallback } from 'react';
import { NativeModules, DeviceEventEmitter, AppState } from 'react-native';
import { useAppStore } from '../../../store/rootStore';

const { TimerModule } = NativeModules;

export const useFocusSession = (initialDuration = 1500) => {
  const [remaining, setRemaining] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const addFocusTime = useAppStore((s) => s.addFocusTime);

  // Start the Native Foreground Service
  const startSession = useCallback(() => {
    TimerModule.startTimer(initialDuration);
    setIsActive(true);
  }, [initialDuration]);

  // Stop Native Service
  const stopSession = useCallback(() => {
    TimerModule.stopTimer();
    setIsActive(false);
    // Logic to save stats would go here
  }, []);

  // Listen for updates from Java (runs even in background)
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('timerUpdate', (event) => {
      setRemaining(event.remaining);
      
      // If finished
      if (event.remaining === 0) {
        setIsActive(false);
        addFocusTime(initialDuration); // Update global stats
        TimerModule.stopTimer();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [initialDuration, addFocusTime]);

  return {
    remaining,
    isActive,
    startSession,
    stopSession,
    progress: remaining / initialDuration // 0.0 to 1.0 for animations
  };
};