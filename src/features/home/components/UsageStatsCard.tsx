import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Assuming you have vector icons

interface StatItemProps {
  label: string;
  value: string | number;
  icon: string;
}

const StatItem = ({ label, value, icon }: StatItemProps) => (
  <View style={styles.statItem}>
    <Icon name={icon} size={20} color="#888" style={{ marginBottom: 5 }} />
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

export const UsageStatsCard = React.memo(() => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Your Stats Today</Text>
      <View style={styles.row}>
        <StatItem label="Screen Time" value="2hr 43m" icon="clock" />
        <View style={styles.divider} />
        <StatItem label="Unlocks" value="21" icon="lock" />
        <View style={styles.divider} />
        <StatItem label="Distractions" value="7" icon="alert-circle" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
  },
  header: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#888',
    fontSize: 10,
    marginBottom: 2,
  },
  statValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#333',
  },
});