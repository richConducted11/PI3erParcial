import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Card, Badge } from './components';

// ===== Tutorials View =====

export const TutorialsScreen = ({ navigation }) => {
    const tutorials = [
        { id: '1', title: 'Introduction to SQL Injection', duration: '15 min', difficulty: 'Beginner' },
        { id: '2', title: 'XSS Attack Fundamentals', duration: '20 min', difficulty: 'Beginner' },
        { id: '3', title: 'CSRF Protection Techniques', duration: '25 min', difficulty: 'Intermediate' },
        { id: '4', title: 'Advanced Authentication Bypass', duration: '30 min', difficulty: 'Advanced' },
    ];

    const getDifficultyClass = (difficulty) => {
        const map = {
            'Beginner': 'badge-easy',
            'Intermediate': 'badge-medium',
            'Advanced': 'badge-hard',
            'Expert': 'badge-expert',
        };
        return map[difficulty] || 'badge-easy';
    };

    const handleSelectTutorial = (tutorialId) => {
        // Navigate to tutorial detail screen
        navigation.navigate('TutorialDetail', { tutorialId });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Tutorials</Text>

            <View style={styles.grid}>
                {tutorials.map((tutorial) => (
                    <TouchableOpacity
                        key={tutorial.id}
                        activeOpacity={0.7}
                        onPress={() => handleSelectTutorial(tutorial.id)}
                    >
                        <Card style={styles.tutorialCard}>
                            <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                            <View style={styles.tutorialMeta}>
                                <Text style={styles.tutorialDuration}>⏱️ {tutorial.duration}</Text>
                                <Badge
                                    text={tutorial.difficulty}
                                    type={getDifficultyClass(tutorial.difficulty)}
                                />
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

// Tutorial Detail Component (Optional)
export const TutorialDetailScreen = ({ route, navigation }) => {
    const { tutorialId } = route.params;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Back to Tutorials</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Tutorial Detail</Text>

            <Card style={styles.detailCard}>
                <Text style={styles.detailText}>
                    Tutorial content for ID: {tutorialId}
                </Text>
                <Text style={styles.detailDescription}>
                    Here you can display the full tutorial content, videos, exercises, and interactive elements.
                </Text>
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
    grid: {
        gap: 16,
    },
    tutorialCard: {
        borderWidth: 1,
        borderColor: 'rgba(36, 238, 247, 0.2)',
        marginBottom: 16,
    },
    tutorialTitle: {
        color: '#e5e5e5',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    tutorialMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    tutorialDuration: {
        color: '#8b8b8b',
        fontSize: 14,
    },
    backButton: {
        marginBottom: 16,
    },
    backButtonText: {
        color: '#24eef7',
        fontSize: 16,
    },
    detailCard: {
        padding: 20,
    },
    detailText: {
        color: '#e5e5e5',
        fontSize: 16,
        marginBottom: 12,
    },
    detailDescription: {
        color: '#8b8b8b',
        fontSize: 14,
        lineHeight: 20,
    },
});
