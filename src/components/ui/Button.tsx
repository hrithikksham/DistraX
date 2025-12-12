import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  style?: ViewStyle;
}

export const Button = React.memo(({ title, onPress, variant = 'primary', loading, style }: ButtonProps) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={loading}
      style={[
        styles.container,
        isPrimary ? styles.primaryBg : styles.secondaryBg,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#000' : '#FFF'} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  primaryBg: {
    backgroundColor: '#FFFFFF', // White button from screenshot
  },
  secondaryBg: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System', // Use system font for now, replace with custom font later
  },
  primaryText: {
    color: '#000000',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
});