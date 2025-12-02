import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Shield, Home, Map, BookOpen, Trophy, BarChart2, Settings, ShieldAlert, LogOut } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS } from '../theme'; // Tu archivo de tema

// ==========================================
// 1. COMPONENTE HEADER (Barra Superior)
// ==========================================

export const CustomHeader = ({ user, onLogout }) => {
    // Si no pasas usuario, usamos uno dummy para que no rompa visualmente
    const safeUser = user || { name: 'Hacker', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hacker' };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.card }}>
            <View style={styles.headerContainer}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Shield color={COLORS.background} fill={COLORS.primary} size={24} />
                    <Text style={styles.logoText}>HackLab</Text>
                </View>

                {/* User Section */}
                <View style={styles.userContainer}>
                    <Text style={styles.userName} numberOfLines={1}>
                        {safeUser.name}
                    </Text>

                    <Image
                        source={{ uri: safeUser.avatar }}
                        style={styles.avatar}
                    />

                    <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
                        <LogOut color={COLORS.mutedForeground} size={20} />
                    </TouchableOpacity>
                </View>

            </View>
            {/* Línea divisoria inferior */}
            <View style={styles.divider} />
        </SafeAreaView>
    );
};

// ==========================================
// 2. COMPONENTE SIDEBAR (Menú Lateral)
// ==========================================
// Nota: En móviles, esto se usa normalmente dentro de un "Drawer Navigator" 
// o como un menú modal. Aquí recreamos la lógica visual de tu lista.

export const SidebarMenu = ({ userLevel = 1, onNavigate, currentRouteName }) => {
    const navigation = useNavigation();

    // Si no se pasa currentRouteName, intentamos deducirlo (útil si está en un Drawer)
    const route = useRoute();
    const activeRoute = currentRouteName || route.name;

    const menuItems = [
        { id: 'Dashboard', label: 'Inicio', icon: Home },
        { id: 'Challenges', label: 'Misiones', icon: Map },
        { id: 'Tutorials', label: 'Tutoriales', icon: BookOpen },
        { id: 'Leaderboard', label: 'Ranking', icon: Trophy },
        { id: 'Progress', label: 'Mi Progreso', icon: BarChart2 },
        { id: 'Settings', label: 'Configuración', icon: Settings },
    ];

    // Lógica de Admin (Nivel >= 10)
    if (userLevel >= 10) {
        menuItems.push({ id: 'Admin', label: 'Panel Admin', icon: ShieldAlert });
    }

    const handlePress = (screenId) => {
        if (onNavigate) {
            onNavigate(screenId);
        } else {
            navigation.navigate(screenId);
        }
    };

    return (
        <View style={styles.sidebarContainer}>
            <View style={styles.navContainer}>
                {menuItems.map((item) => {
                    const isActive = activeRoute === item.id;
                    const IconComponent = item.icon;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.sidebarItem,
                                isActive && styles.sidebarItemActive
                            ]}
                            onPress={() => handlePress(item.id)}
                        >
                            <IconComponent
                                size={20}
                                color={isActive ? COLORS.primary : COLORS.mutedForeground}
                            />
                            <Text style={[
                                styles.sidebarText,
                                isActive && styles.sidebarTextActive
                            ]}>
                                {item.label}
                            </Text>

                            {/* Indicador visual de activo (Barra vertical derecha) */}
                            {isActive && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

// ==========================================
// 3. ESTILOS (Adaptados de tu CSS)
// ==========================================

const styles = StyleSheet.create({
    // --- HEADER STYLES ---
    headerContainer: {
        height: 60, // Equivalente a --header-height
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.card,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoText: {
        color: COLORS.primary, // Cyan
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    userName: {
        color: COLORS.foreground,
        fontSize: 14,
        fontWeight: '500',
        maxWidth: 100, // Evita que nombres largos rompan el layout
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    logoutBtn: {
        padding: 4,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        width: '100%',
    },

    // --- SIDEBAR STYLES ---
    sidebarContainer: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
        paddingVertical: 16,
        // Si usas esto en un Drawer, ocupa todo el alto.
        // Si lo usas en web/tablet, ocupa el ancho definido.
    },
    navContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    sidebarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        gap: 12,
        position: 'relative', // Para el indicador absoluto
    },
    sidebarItemActive: {
        backgroundColor: 'rgba(36, 238, 247, 0.1)', // Fondo cyan muy sutil
    },
    sidebarText: {
        color: COLORS.mutedForeground,
        fontSize: 16,
        fontWeight: '500',
    },
    sidebarTextActive: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    activeIndicator: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 3,
        backgroundColor: COLORS.primary,
    }
});