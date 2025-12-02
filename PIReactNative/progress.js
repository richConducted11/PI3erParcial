import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Card, ProgressBar } from './components';
import { formatNumber } from './utils';

// ===== Progress View =====

export const ProgressScreen = ({ user }) => {
  const currentPoints = user.points;
  const pointsInCurrentLevel = currentPoints % 300;
  const nextLevelPoints = 300;
  const levelProgressPercent = Math.min((pointsInCurrentLevel / nextLevelPoints) * 100, 100);

  const stats = [
    { label: 'Total Points', value: formatNumber(user.points) },
    { label: 'Challenges Completed', value: user.completedChallenges },
    { label: 'Current Streak', value: `${user.streak} days` },
    { label: 'Global Rank', value: `#${user.rank}` },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My Progress</Text>

      {/* Level Progress Card */}
      <Card style={styles.levelCard}>
        <Text style={styles.levelTitle}>Level {user.level}</Text>

        <View style={styles.progressSection}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressText}>Progress to Level {user.level + 1}</Text>
            <Text style={styles.progressValue}>
              {pointsInCurrentLevel}/{nextLevelPoints} XP
            </Text>
          </View>
          <ProgressBar value={levelProgressPercent} max={100} />
        </View>
      </Card>

      {/* Statistics Card */}
      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>Statistics</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#e5e5e5',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  levelCard: {
    borderWidth: 1,
    borderColor: 'rgba(36, 238, 247, 0.2)',
    marginBottom: 24,
  },
  levelTitle: {
    color: '#24eef7',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 8,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: '#8b8b8b',
    fontSize: 14,
  },
  progressValue: {
    color: '#8b8b8b',
    fontSize: 14,
  },
  statsCard: {
    borderWidth: 1,
    borderColor: 'rgba(36, 238, 247, 0.2)',
  },
  statsTitle: {
    color: '#e5e5e5',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '47%',
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  statLabel: {
    color: '#8b8b8b',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#24eef7',
    fontSize: 20,
    fontWeight: '600',
  },
});
