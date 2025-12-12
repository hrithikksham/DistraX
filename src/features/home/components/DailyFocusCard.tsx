import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Canvas, Path, Skia, LinearGradient, vec } from "@shopify/react-native-skia";
import Animated, { useSharedValue, withTiming, useDerivedValue } from 'react-native-reanimated';

interface Props {
  score: number; // e.g., 62
  status: string; // e.g., "Good"
}

const RADIUS = 80;
const STROKE_WIDTH = 12;
const CENTER = RADIUS + STROKE_WIDTH;
const SIZE = CENTER * 2;

export const DailyFocusCard = React.memo(({ score, status }: Props) => {
  // Logic: Calculate path for the arc based on score
  const path = Skia.Path.Make();
  path.addCircle(CENTER, CENTER, RADIUS);
  
  // Note: For a real arc progress, we'd use trim path, 
  // but for this snippet we'll render the visual container structure first.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus Score</Text>
      
      <View style={styles.chartContainer}>
        {/* Placeholder for Skia Arc - simplified for stability */}
        <View style={styles.circlePlaceholder}>
            <View style={[styles.innerCircle, { borderColor: score > 50 ? '#06C32B' : '#FF4444' }]}>
                <Text style={styles.scoreText}>{score}%</Text>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'System',
  },
  chartContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePlaceholder: {
      width: RADIUS * 2,
      height: RADIUS * 2,
      borderRadius: RADIUS,
      borderWidth: 10,
      borderColor: '#333',
      justifyContent: 'center',
      alignItems: 'center',
  },
  innerCircle: {
      width: RADIUS * 2,
      height: RADIUS * 2,
      borderRadius: RADIUS,
      borderWidth: 10,
      position: 'absolute',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent', // Simple CSS hack for partial circle
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{rotate: '45deg'}]
  },
  scoreText: {
      color: '#FFF',
      fontSize: 32,
      fontWeight: 'bold',
      transform: [{rotate: '-45deg'}] // Counteract parent rotation
  },
  statusText: {
      color: '#888',
      fontSize: 14,
      transform: [{rotate: '-45deg'}]
  }
});