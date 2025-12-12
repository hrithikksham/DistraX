import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const SIZE = width * 0.8;

export const OrbitAnimation = React.memo(() => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1, // Infinite loop
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  // Reverse rotation for the outer ring to create depth
  const reverseAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `-${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Central Shield Icon Placeholder */}
      <View style={styles.shieldContainer}>
         <View style={styles.shieldCore} />
      </View>

      {/* Orbit 1 */}
      <Animated.View style={[styles.orbitContainer, animatedStyle]}>
        <View style={styles.planet} />
        <View style={[styles.planet, { top: '80%', left: '20%' }]} />
      </Animated.View>

       {/* Orbit 2 (Outer) */}
       <Animated.View style={[styles.orbitContainer, styles.outerOrbit, reverseAnimatedStyle]}>
        <View style={[styles.planet, { top: 0, left: '50%' }]} />
      </Animated.View>
      
      {/* Visual rings */}
      <Svg height={SIZE} width={SIZE} style={StyleSheet.absoluteFill}>
        <Circle cx={SIZE/2} cy={SIZE/2} r={SIZE/2 - 20} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <Circle cx={SIZE/2} cy={SIZE/2} r={SIZE/3} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  shieldCore: {
    width: 40,
    height: 50,
    backgroundColor: '#3b82f6', // Blue accent
    borderRadius: 8,
  },
  orbitContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerOrbit: {
    transform: [{ scale: 1.2 }],
  },
  planet: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: '50%',
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});