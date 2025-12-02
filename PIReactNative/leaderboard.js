import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, StatusBar } from 'react-native';
import { Trophy, Medal, Award } from 'lucide-react-native'; // Iconos para el top 3
import { COLORS, FONTS } from '../theme'; // Tu archivo de tema

// ==========================================
// 1. DATOS DE EJEMPLO (MOCK DATA)
// ==========================================

const INITIAL_DATA = [
    { rank: 1, name: 'CyberNinja', points: 8420, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja', level: 25 },
    { rank: 2, name: 'HackMaster', points: 7890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HackMaster', level: 23 },
    { rank: 3, name: 'SecureCode', points: 7150, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecureCode', level: 22 },
    { rank: 4, name: 'ByteBreaker', points: 6820, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByteBreaker', level: 21 },
    { rank: 5, name: 'SQLSlayer', points: 6340, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SQLSlayer', level: 20 },
];

// Helper para obtener color según el rango (Oro, Plata, Bronce)
const getRankColor = (rank) => {
    switch (rank) {
        case 1: return '#FFD700'; // Gold
        case 2: return '#C0C0C0'; // Silver
        case 3: return '#CD7F32'; // Bronze
        default: return COLORS.mutedForeground; // Gris para el resto
    }
};

// ==========================================
// 2. COMPONENTE DE ITEM (FILA DE LA TABLA)
// ==========================================

const LeaderboardItem = ({ item, isCurrentUser }) => {
    const rankColor = getRankColor(item.rank);

    // Estilos dinámicos para el usuario actual (Tu lógica CSS original)
    const containerStyle = [
        styles.itemContainer,
        isCurrentUser && styles.currentUserContainer // Borde Cyan y fondo sutil
    ];

    return (
        <View style={containerStyle}>
            {/* Columna 1: Rango */}
            <View style={styles.rankColumn}>
                {item.rank <= 3 ? (
                    <Trophy size={24} color={rankColor} fill={item.rank === 1 ? rankColor : 'transparent'} />
                ) : (
                    <Text style={styles.rankText}>#{item.rank}</Text>
                )}
            </View>

            {/* Columna 2: Avatar y Nombre */}
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.infoColumn}>
                <Text style={[styles.nameText, isCurrentUser && { color: COLORS.primary }]}>
                    {item.name} {isCurrentUser && '(Tú)'}
                </Text>
                <Text style={styles.levelText}>Nivel {item.level}</Text>
            </View>

            {/* Columna 3: Puntos */}
            <View style={styles.pointsColumn}>
                <Text style={styles.pointsValue}>{item.points.toLocaleString()}</Text>
                <Text style={styles.pointsLabel}>PTS</Text>
            </View>
        </View>
    );
};

// ==========================================
// 3. PANTALLA PRINCIPAL
// ==========================================

export const LeaderboardScreen = () => {
    // Simulamos obtener al usuario actual del Contexto o Auth
    const currentUser = {
        rank: 127,
        name: 'Alex Rivera',
        points: 3420,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        level: 12,
        id: 'my-user-id'
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        // Lógica para combinar la lista global + el usuario actual
        // En una app real, esto lo hace el Backend.

        // 1. Clonamos la lista top
        let combinedList = [...INITIAL_DATA];

        // 2. Insertamos al usuario actual para mostrarlo en la lista (como en tu ejemplo)
        // Nota: Le agregamos la bandera isCurrentUser
        const userEntry = { ...currentUser, isCurrentUser: true };
        combinedList.push(userEntry);

        // 3. Ordenamos (aunque en tu código original ya venían ordenados, nos aseguramos)
        // Como el usuario rank 127 va al final, el sort lo pondrá al final.
        combinedList.sort((a, b) => a.rank - b.rank);

        setData(combinedList);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Clasificación Global</Text>
                <Text style={styles.headerSubtitle}>Los mejores hackers de la temporada</Text>
            </View>

            {/* Lista */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <LeaderboardItem item={item} isCurrentUser={item.isCurrentUser} />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                // Separador sutil entre items (opcional)
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
        </View>
    );
};

// ==========================================
// 4. ESTILOS
// ==========================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // #000000
        padding: 24,
    },
    // Header Text
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.foreground, // #ffffff
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.mutedForeground,
    },
    // Item Styles
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.input, // Fondo gris muy oscuro (var(--input))
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: 'transparent', // Borde invisible por defecto
    },
    currentUserContainer: {
        // REPLICANDO TU CSS ORIGINAL:
        // border: '2px solid var(--primary)'
        // backgroundColor: 'rgba(36, 238, 247, 0.05)'
        borderColor: COLORS.primary,
        borderWidth: 2,
        backgroundColor: 'rgba(36, 238, 247, 0.05)',
    },
    // Columnas internas
    rankColumn: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.mutedForeground,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    infoColumn: {
        flex: 1, // Toma el espacio disponible
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.foreground,
    },
    levelText: {
        fontSize: 12,
        color: COLORS.mutedForeground,
        marginTop: 2,
    },
    pointsColumn: {
        alignItems: 'flex-end',
    },
    pointsValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary, // Cyan para los puntos
    },
    pointsLabel: {
        fontSize: 10,
        color: COLORS.mutedForeground,
        fontWeight: 'bold',
    },
});