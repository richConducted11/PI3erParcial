import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { ShieldAlert, Terminal, CheckCircle, Lock, PlayCircle, ArrowRight } from 'lucide-react-native';
import { COLORS, DIFFICULTY_COLORS, FONTS } from './theme';

// DATOS (Igual que antes)
const CHALLENGES_DATA = [
    { id: '1', title: 'SQL Injection Basics', difficulty: 'Easy', points: 100, category: 'SQL Injection', status: 'completed', description: 'Explota el login para ganar acceso.', targetUrl: 'http://vulnerable.com/login', hint: "' OR '1'='1" },
    { id: '2', title: 'Blind SQL Injection', difficulty: 'Medium', points: 150, category: 'SQL Injection', status: 'available', description: 'Inyección basada en tiempo.', targetUrl: 'http://vulnerable.com/news?id=5', hint: "SLEEP()" },
    { id: '3', title: 'Reflected XSS', difficulty: 'Easy', points: 80, category: 'XSS', status: 'available', description: 'Ejecuta JS en el navegador.', targetUrl: 'http://vulnerable.com/search', hint: "<script>alert(1)</script>" },
    { id: '4', title: 'Stored XSS Attack', difficulty: 'Hard', points: 200, category: 'XSS', status: 'available', description: 'Persistencia de scripts maliciosos.', targetUrl: 'http://vulnerable.com/guestbook', hint: "Check input filters" },
    { id: '5', title: 'CSRF Token Bypass', difficulty: 'Medium', points: 180, category: 'CSRF', status: 'in-progress', progress: 65, description: 'Falsificación de petición en sitio cruzado.', targetUrl: 'http://vulnerable.com/profile', hint: "Check hidden fields" },
    { id: '6', title: 'JWT Manipulation', difficulty: 'Expert', points: 300, category: 'Authentication', status: 'locked', description: 'Escalada de privilegios vía Token.', targetUrl: 'http://api.vulnerable.com', hint: "Alg: None" },
];

// --- COMPONENTES ---

const ChallengeItem = ({ item, onPress }) => {
    const isLocked = item.status === 'locked';
    const diffColor = DIFFICULTY_COLORS[item.difficulty] || COLORS.mutedForeground;

    // Estilo dinámico para el borde brillante si está en progreso o completado
    const glowStyle = item.status === 'in-progress' ? styles.glowCyan : {};

    return (
        <TouchableOpacity
            style={[styles.card, isLocked && styles.cardLocked, glowStyle]}
            onPress={onPress}
            disabled={isLocked}
            activeOpacity={0.7}
        >
            <View style={styles.cardHeader}>
                <View style={styles.badgeContainer}>
                    {/* Badge Style CSS: background con opacidad 0.1 */}
                    <View style={[styles.badge, { borderColor: diffColor, backgroundColor: `${diffColor}1A` }]}>
                        <Text style={[styles.badgeText, { color: diffColor }]}>
                            {item.difficulty === 'Easy' ? 'Fácil' : item.difficulty === 'Hard' ? 'Difícil' : item.difficulty}
                        </Text>
                    </View>
                    <Text style={styles.pointsText}>{item.points} PTS</Text>
                </View>

                {item.status === 'completed' && <CheckCircle size={20} color={COLORS.success} />}
                {item.status === 'in-progress' && <PlayCircle size={20} color={COLORS.warning} />}
                {item.status === 'locked' && <Lock size={20} color={COLORS.mutedForeground} />}
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCategory}>{item.category}</Text>

            {/* Progress Bar CSS logic */}
            {item.progress && (
                <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
                </View>
            )}
        </TouchableOpacity>
    );
};

export const ChallengesScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <Text style={styles.h1}>Misiones</Text>
            <FlatList
                data={CHALLENGES_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChallengeItem
                        item={item}
                        onPress={() => navigation.navigate('ChallengeDetail', { challengeId: item.id, title: item.title })}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export const ChallengeDetailScreen = ({ route }) => {
    const { challengeId } = route.params;
    const challenge = CHALLENGES_DATA.find(c => c.id === challengeId) || CHALLENGES_DATA[0];
    const diffColor = DIFFICULTY_COLORS[challenge.difficulty];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailHeader}>
                <ShieldAlert size={48} color={COLORS.primary} style={{ marginBottom: 15 }} />
                <Text style={styles.h2}>{challenge.title}</Text>

                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    <View style={[styles.badge, { borderColor: diffColor, backgroundColor: `${diffColor}1A` }]}>
                        <Text style={{ color: diffColor, fontWeight: 'bold' }}>{challenge.difficulty}</Text>
                    </View>
                    <View style={[styles.badge, { borderColor: COLORS.mutedForeground }]}>
                        <Text style={{ color: COLORS.mutedForeground }}>{challenge.category}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>INSTRUCCIONES</Text>
                <Text style={styles.p}>{challenge.description}</Text>
            </View>

            {/* Terminal Style */}
            <View style={[styles.card, styles.terminalCard]}>
                <View style={styles.terminalHeader}>
                    <Terminal size={14} color={COLORS.primary} />
                    <Text style={styles.terminalHeaderText}>TERMINAL OBJETIVO</Text>
                </View>
                <View style={{ padding: 16 }}>
                    <Text style={styles.terminalLine}><Text style={{ color: COLORS.success }}>TARGET: </Text>{challenge.targetUrl}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.terminalLine}><Text style={{ color: COLORS.warning }}>HINT: </Text>{challenge.hint}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={() => alert('Iniciando...')}>
                <Text style={styles.btnText}>INICIAR ATAQUE</Text>
                <ArrowRight color={COLORS.primaryForeground} size={20} />
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

// --- ESTILOS BASADOS EN TU CSS ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 24, // Equivale a p-1.5rem (24px)
    },
    h1: {
        fontSize: 24, // 1.5rem
        fontWeight: '500',
        color: COLORS.foreground,
        marginBottom: 24,
    },
    h2: {
        fontSize: 20, // 1.25rem
        fontWeight: '500',
        color: COLORS.foreground,
        textAlign: 'center',
    },
    p: {
        fontSize: 16,
        color: COLORS.mutedForeground,
        lineHeight: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.mutedForeground,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    // Cards
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 8, // 0.5rem
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 24, // 1.5rem
        marginBottom: 16,
    },
    cardLocked: {
        opacity: 0.5,
    },
    glowCyan: {
        // Simula .glow-cyan
        borderColor: 'rgba(36, 238, 247, 0.5)',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardTitle: {
        color: COLORS.foreground,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    cardCategory: {
        color: COLORS.mutedForeground,
        fontSize: 14,
    },
    // Badges
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    pointsText: {
        color: COLORS.mutedForeground,
        fontSize: 12,
    },
    // Progress
    progressTrack: {
        height: 8,
        backgroundColor: COLORS.muted,
        borderRadius: 999,
        marginTop: 12,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    // Terminal
    terminalCard: {
        padding: 0, // Reset padding para header
        backgroundColor: COLORS.input,
        overflow: 'hidden',
        marginTop: 12,
        marginBottom: 24,
    },
    terminalHeader: {
        backgroundColor: 'rgba(36, 238, 247, 0.1)',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    terminalHeaderText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: FONTS.mono,
    },
    terminalLine: {
        color: COLORS.foreground,
        fontFamily: FONTS.mono,
        fontSize: 14,
        marginBottom: 4,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    // Buttons
    btnPrimary: {
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    btnText: {
        color: COLORS.primaryForeground, // Black
        fontWeight: 'bold',
        fontSize: 16,
    },
    detailHeader: {
        alignItems: 'center',
        marginBottom: 24,
    }
});