import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trophy, Target, Flame, Award, PlayCircle, ArrowRight, CheckCircle, ChevronRight, Lock } from 'lucide-react-native';
import { COLORS, COLORS as THEME } from '../theme'; // Importamos el mismo tema

// --- UI COMPONENTS REUTILIZABLES ---

const StatCard = ({ label, value, icon: Icon, color }) => {
    // CSS Logic: backgroundColor: rgba(color, 0.1) para el icono
    const iconBg = `${color}1A`;

    return (
        <View style={[styles.card, styles.statCard, { borderColor: `${color}33` }]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.label}>{label}</Text>
                <Text style={[styles.statValue, { color: color }]}>{value}</Text>
            </View>
            <View style={[styles.statIconBox, { backgroundColor: iconBg }]}>
                <Icon color={color} size={24} />
            </View>
        </View>
    );
};

const SectionHeader = ({ title, actionText, onPress }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.h3}>{title}</Text>
        {actionText && (
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.linkText}>{actionText}</Text>
            </TouchableOpacity>
        )}
    </View>
);

// --- DASHBOARD PRINCIPAL ---

export const DashboardScreen = () => {
    const navigation = useNavigation();

    // Mock User (Simulando lo que llega de la DB)
    const user = {
        name: 'Alex Rivera',
        points: 3420,
        completedChallenges: 24,
        streak: 7,
        rank: 127,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* Welcome Section */}
            <View style={styles.section}>
                <Text style={styles.h1}>¡Hola de nuevo, {user.name}!</Text>
                <Text style={styles.subtitle}>¿Listo para mejorar tu ciberseguridad hoy?</Text>
            </View>

            {/* Stats Grid - Simulando CSS Grid columns */}
            <View style={styles.grid}>
                <View style={styles.gridRow}>
                    <StatCard label="Puntos" value={user.points} icon={Trophy} color={THEME.primary} />
                    <StatCard label="Completados" value={user.completedChallenges} icon={Target} color={THEME.secondary} />
                </View>
                <View style={styles.gridRow}>
                    <StatCard label="Racha" value={`${user.streak} días`} icon={Flame} color={THEME.accent} />
                    <StatCard label="Ranking" value={`#${user.rank}`} icon={Award} color={THEME.warning} />
                </View>
            </View>

            {/* Continue Section (Glow Effect) */}
            <View style={styles.section}>
                <SectionHeader title="Continuar Misión" />
                <View style={[styles.card, styles.glowCyan]}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.cardTitle}>Bypass Token CSRF</Text>
                            <Text style={styles.mutedText}>CSRF • Medio</Text>
                        </View>
                        <PlayCircle color={THEME.primary} size={32} />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <View style={styles.rowBetween}>
                            <Text style={styles.mutedText}>Progreso</Text>
                            <Text style={styles.mutedText}>65%</Text>
                        </View>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressBar, { width: '65%' }]} />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.btn, styles.btnPrimary, { marginTop: 16 }]}
                        onPress={() => navigation.navigate('ChallengeDetail', { challengeId: '5', title: 'CSRF Token Bypass' })}
                    >
                        <Text style={styles.btnTextPrimary}>Continuar Desafío</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recommended List */}
            <View style={styles.section}>
                <SectionHeader title="Recomendados para ti" actionText="Ver todo" onPress={() => navigation.navigate('Challenges')} />
                <View style={[styles.card, { padding: 0, overflow: 'hidden' }]}>
                    {[
                        { title: 'Blind SQL Injection', cat: 'SQLi', diff: 'Medium', locked: false },
                        { title: 'Stored XSS Attack', cat: 'XSS', diff: 'Hard', locked: false },
                        { title: 'JWT Manipulation', cat: 'Auth', diff: 'Expert', locked: true },
                    ].map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={[styles.listItem, idx !== 2 && styles.borderBottom]}
                            disabled={item.locked}
                        >
                            <View>
                                <Text style={[styles.itemTitle, item.locked && { color: THEME.mutedForeground }]}>{item.title}</Text>
                                <Text style={styles.mutedText}>{item.cat} • {item.diff}</Text>
                            </View>
                            {item.locked ? <Lock size={20} color={THEME.mutedForeground} /> : <ChevronRight size={20} color={THEME.mutedForeground} />}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Leaderboard Preview */}
            <View style={[styles.section, { marginBottom: 40 }]}>
                <SectionHeader title="Top Hackers" actionText="Ver Ranking" onPress={() => navigation.navigate('Leaderboard')} />
                <View style={[styles.card, { padding: 0, overflow: 'hidden' }]}>
                    {[
                        { name: 'CyberNinja', pts: 8420, rank: 1 },
                        { name: 'HackMaster', pts: 7890, rank: 2 },
                        { name: 'SecureCode', pts: 7150, rank: 3 },
                    ].map((player, idx) => (
                        <View key={idx} style={[styles.listItem, idx !== 2 && styles.borderBottom]}>
                            <View style={styles.rankCircle}><Text style={{ fontWeight: 'bold', color: THEME.card }}>{player.rank}</Text></View>
                            <Image source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}` }} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemTitle}>{player.name}</Text>
                            </View>
                            <Text style={{ color: THEME.primary, fontWeight: 'bold' }}>{player.pts}</Text>
                        </View>
                    ))}
                </View>
            </View>

        </ScrollView>
    );
};

// --- ESTILOS (Mismo lenguaje visual que el CSS) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
        padding: 24,
    },
    section: {
        marginBottom: 24,
    },
    // Textos
    h1: { fontSize: 24, fontWeight: '500', color: THEME.foreground, marginBottom: 8 },
    h3: { fontSize: 18, fontWeight: '500', color: THEME.foreground },
    subtitle: { fontSize: 16, color: THEME.mutedForeground },
    label: { fontSize: 14, color: THEME.mutedForeground, marginBottom: 4 },
    linkText: { color: THEME.primary, fontSize: 14 },
    mutedText: { color: THEME.mutedForeground, fontSize: 12 },
    cardTitle: { color: THEME.foreground, fontSize: 18, fontWeight: '500' },
    itemTitle: { color: THEME.foreground, fontSize: 16, fontWeight: '500' },

    // Layout Grid (Simulado con Flex)
    grid: { gap: 16, marginBottom: 24 },
    gridRow: { flexDirection: 'row', gap: 16 },

    // Cards
    card: {
        backgroundColor: THEME.card,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: THEME.border,
        padding: 24,
    },
    statCard: {
        flex: 1, // Para que ocupen 50% cada uno
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    statValue: { fontSize: 20, fontWeight: 'bold' },
    statIconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },

    // Section Header
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    // List Items
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: THEME.input, // Var(--input)
        gap: 12,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(36, 238, 247, 0.1)',
    },

    // Componentes específicos
    rankCircle: {
        width: 24, height: 24, borderRadius: 12,
        backgroundColor: THEME.primary,
        justifyContent: 'center', alignItems: 'center'
    },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#333' },

    // Progress & Buttons
    progressTrack: { height: 8, backgroundColor: THEME.muted, borderRadius: 999, overflow: 'hidden', marginTop: 8 },
    progressBar: { height: '100%', backgroundColor: THEME.primary },

    btn: { padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    btnPrimary: { backgroundColor: THEME.primary },
    btnTextPrimary: { color: THEME.primaryForeground, fontWeight: '600' },

    // Helpers
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    glowCyan: {
        borderColor: 'rgba(36, 238, 247, 0.5)',
        // Nota: El shadow en Android es limitado, usamos border brillante
        elevation: 4,
        shadowColor: THEME.primary,
        shadowOpacity: 0.2,
        shadowRadius: 8,
    }
});