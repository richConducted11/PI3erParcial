import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { Card, Button, InputField } from './components';
import { showToast } from './utils';

// ===== Settings View =====

export const SettingsScreen = ({ user }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [challengeUpdates, setChallengeUpdates] = useState(true);
  const [leaderboardChanges, setLeaderboardChanges] = useState(false);

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      {/* Profile Settings Card */}
      <Card style={styles.profileCard}>
        <Text style={styles.cardTitle}>Profile Settings</Text>

        <InputField
          config={{
            id: 'settings-name',
            label: 'Display Name',
            type: 'text',
            value: user.name,
            placeholder: 'Enter your name',
            icon: 'user',
            onChange: (value) => {
              console.log('Name changed:', value);
            },
          }}
        />

        <InputField
          config={{
            id: 'settings-email',
            label: 'Email',
            type: 'email',
            value: user.email || 'user@example.com',
            placeholder: 'Enter your email',
            icon: 'mail',
            onChange: (value) => {
              console.log('Email changed:', value);
            },
          }}
        />

        <Button
          text="Save Changes"
          variant="primary"
          onPress={handleSave}
          style={styles.saveButton}
        />
      </Card>

      {/* Notification Settings Card */}
      <Card style={styles.notificationCard}>
        <Text style={styles.cardTitle}>Notifications</Text>

        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>Email notifications</Text>
            <Text style={styles.notificationDescription}>
              Receive updates via email
            </Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#3a3a3a', true: '#24eef7' }}
            thumbColor={emailNotifications ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>Challenge updates</Text>
            <Text style={styles.notificationDescription}>
              Get notified about new challenges
            </Text>
          </View>
          <Switch
            value={challengeUpdates}
            onValueChange={setChallengeUpdates}
            trackColor={{ false: '#3a3a3a', true: '#24eef7' }}
            thumbColor={challengeUpdates ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationLabel}>Leaderboard changes</Text>
            <Text style={styles.notificationDescription}>
              Track your ranking updates
            </Text>
          </View>
          <Switch
            value={leaderboardChanges}
            onValueChange={setLeaderboardChanges}
            trackColor={{ false: '#3a3a3a', true: '#24eef7' }}
            thumbColor={leaderboardChanges ? '#ffffff' : '#f4f3f4'}
          />
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
  profileCard: {
    borderWidth: 1,
    borderColor: 'rgba(36, 238, 247, 0.2)',
    marginBottom: 24,
  },
  notificationCard: {
    borderWidth: 1,
    borderColor: 'rgba(36, 238, 247, 0.2)',
  },
  cardTitle: {
    color: '#e5e5e5',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationLabel: {
    color: '#e5e5e5',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationDescription: {
    color: '#8b8b8b',
    fontSize: 14,
  },
});
