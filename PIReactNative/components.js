import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    Lock,
    Eye,
    EyeOff,
    ChevronRight,
    Award,
    Target,
    Zap,
    Mail,
    User,
    AlertCircle
} from 'lucide-react-native';

// ===== Reusable Components =====

// Button Component
export const Button = ({ text, variant = 'primary', onPress, style, disabled }) => {
    return (
        <TouchableOpacity
            style={[
                styles.btn,
                variant === 'primary' && styles.btnPrimary,
                variant === 'ghost' && styles.btnGhost,
                disabled && styles.btnDisabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    styles.btnText,
                    variant === 'ghost' && styles.btnGhostText,
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

// Card Component
export const Card = ({ children, style }) => {
    return <View style={[styles.card, style]}>{children}</View>;
};

// Badge Component
export const Badge = ({ text, type = '' }) => {
    return (
        <View
            style={[
                styles.badge,
                type === 'badge-easy' && styles.badgeEasy,
                type === 'badge-medium' && styles.badgeMedium,
                type === 'badge-hard' && styles.badgeHard,
                type === 'badge-expert' && styles.badgeExpert,
            ]}
        >
            <Text style={styles.badgeText}>{text}</Text>
        </View>
    );
};

// Progress Bar Component
export const ProgressBar = ({ value, max = 100 }) => {
    const percentage = (value / max) * 100;
    return (
        <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
    );
};

// Stat Card Component
export const StatCard = ({ label, value, iconName, colorClass }) => {
    const formatValue = typeof value === 'number' ? formatNumber(value) : value;

    // Mapeo de nombres de iconos a componentes de Lucide
    const IconComponent = {
        'award': Award,
        'target': Target,
        'zap': Zap,
        'mail': Mail,
        'user': User,
    }[iconName] || Award;

    return (
        <Card style={styles.statCard}>
            <View style={styles.statContent}>
                <Text style={styles.statLabel}>{label}</Text>
                <Text style={[styles.statValue, { color: getColor(colorClass) }]}>
                    {formatValue}
                </Text>
            </View>
            <View style={[styles.statIcon, { backgroundColor: getColorWithOpacity(colorClass, 0.1) }]}>
                <IconComponent size={24} color={getColor(colorClass)} />
            </View>
        </Card>
    );
};

// Challenge Item Component
export const ChallengeItem = ({ challenge, onPress }) => {
    const getDifficultyBadge = (difficulty) => {
        const classMap = {
            'Easy': 'badge-easy',
            'Medium': 'badge-medium',
            'Hard': 'badge-hard',
            'Expert': 'badge-expert',
        };
        return classMap[difficulty] || 'badge-easy';
    };

    return (
        <TouchableOpacity
            style={[
                styles.challengeItem,
                challenge.status === 'locked' && styles.challengeItemLocked,
            ]}
            onPress={() => challenge.status !== 'locked' && onPress && onPress(challenge.id)}
            disabled={challenge.status === 'locked'}
            activeOpacity={0.7}
        >
            <View style={styles.challengeHeader}>
                <View style={styles.challengeTitleSection}>
                    <View style={styles.challengeTitleRow}>
                        <Text style={styles.challengeTitle}>{challenge.title}</Text>
                        {challenge.status === 'locked' && (
                            <Lock size={16} color="#8b8b8b" style={styles.lockIcon} />
                        )}
                    </View>
                    <View style={styles.challengeBadges}>
                        <Badge text={challenge.difficulty} type={getDifficultyBadge(challenge.difficulty)} />
                        <Text style={styles.challengeCategory}>{challenge.category}</Text>
                    </View>
                </View>
                <Text style={styles.challengePoints}>{challenge.points} pts</Text>
            </View>

            {challenge.progress !== undefined && (
                <View style={styles.progressSection}>
                    <View style={styles.progressLabel}>
                        <Text style={styles.progressText}>Progress</Text>
                        <Text style={styles.progressValue}>{challenge.progress}%</Text>
                    </View>
                    <ProgressBar value={challenge.progress} />
                </View>
            )}
        </TouchableOpacity>
    );
};

// Leaderboard Item Component
export const LeaderboardItem = ({ player, onPress }) => {
    const getRankStyle = (rank) => {
        const styles = {
            1: { backgroundColor: 'rgba(255, 213, 79, 0.1)', color: '#ffd54f' },
            2: { backgroundColor: 'rgba(201, 201, 201, 0.1)', color: '#c9c9c9' },
            3: { backgroundColor: 'rgba(255, 152, 0, 0.1)', color: '#ff9800' },
        };
        return styles[rank] || { backgroundColor: 'rgba(36, 238, 247, 0.1)', color: '#24eef7' };
    };

    const rankStyle = getRankStyle(player.rank);

    return (
        <TouchableOpacity
            style={styles.leaderboardItem}
            onPress={() => onPress && onPress(player)}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.leaderboardRank,
                    { backgroundColor: rankStyle.backgroundColor },
                ]}
            >
                <Text style={[styles.leaderboardRankText, { color: rankStyle.color }]}>
                    #{player.rank}
                </Text>
            </View>
            <Image source={{ uri: player.avatar }} style={styles.leaderboardAvatar} />
            <View style={styles.leaderboardInfo}>
                <Text style={styles.leaderboardName}>{player.name}</Text>
                <Text style={styles.leaderboardPoints}>{formatNumber(player.points)} pts</Text>
            </View>
        </TouchableOpacity>
    );
};

// Input Field Component
export const InputField = ({ config }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [value, setValue] = React.useState(config.value || '');

    const handleChange = (text) => {
        setValue(text);
        if (config.onChange) {
            config.onChange(text);
        }
    };

    // Mapeo de nombres de iconos
    const iconMap = {
        'mail': Mail,
        'lock': Lock,
        'user': User,
    };

    const IconComponent = config.icon ? iconMap[config.icon] : null;

    return (
        <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{config.label}</Text>
            <View style={styles.formInputWrapper}>
                {IconComponent && (
                    <IconComponent size={20} color="#8b8b8b" style={styles.formIcon} />
                )}
                <TextInput
                    style={[styles.formInput, IconComponent && styles.formInputWithIcon]}
                    placeholder={config.placeholder || ''}
                    placeholderTextColor="#8b8b8b"
                    value={value}
                    onChangeText={handleChange}
                    secureTextEntry={config.type === 'password' && !showPassword}
                    autoCapitalize="none"
                />
                {config.type === 'password' && config.showToggle && (
                    <TouchableOpacity
                        style={styles.togglePassword}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff size={20} color="#8b8b8b" />
                        ) : (
                            <Eye size={20} color="#8b8b8b" />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            {config.error && <Text style={styles.formError}>{config.error}</Text>}
        </View>
    );
};

// Section Header Component
export const SectionHeader = ({ title, actionText, onAction }) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {actionText && onAction && (
                <TouchableOpacity onPress={onAction} style={styles.sectionAction}>
                    <Text style={styles.sectionActionText}>{actionText}</Text>
                    <ChevronRight size={16} color="#24eef7" />
                </TouchableOpacity>
            )}
        </View>
    );
};

// Helper Functions
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getColor = (colorClass) => {
    const colors = {
        primary: '#24eef7',
        success: '#4ade80',
        warning: '#fbbf24',
        danger: '#ef4444',
        muted: '#8b8b8b',
    };
    return colors[colorClass] || '#24eef7';
};

const getColorWithOpacity = (colorClass, opacity) => {
    const colors = {
        primary: `rgba(36, 238, 247, ${opacity})`,
        success: `rgba(74, 222, 128, ${opacity})`,
        warning: `rgba(251, 191, 36, ${opacity})`,
        danger: `rgba(239, 68, 68, ${opacity})`,
    };
    return colors[colorClass] || `rgba(36, 238, 247, ${opacity})`;
};

// Styles
const styles = StyleSheet.create({
    // Button Styles
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnPrimary: {
        backgroundColor: '#24eef7',
    },
    btnGhost: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(36, 238, 247, 0.2)',
    },
    btnDisabled: {
        opacity: 0.5,
    },
    btnText: {
        color: '#0a0a0a',
        fontSize: 16,
        fontWeight: '600',
    },
    btnGhostText: {
        color: '#24eef7',
    },

    // Card Styles
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },

    // Badge Styles
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    badgeEasy: {
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
    },
    badgeMedium: {
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
    },
    badgeHard: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    badgeExpert: {
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },

    // Progress Bar Styles
    progressContainer: {
        height: 8,
        backgroundColor: 'rgba(36, 238, 247, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#24eef7',
        borderRadius: 4,
    },

    // Stat Card Styles
    statCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statContent: {
        flex: 1,
    },
    statLabel: {
        color: '#c9c9c9',
        fontSize: 14,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Challenge Item Styles
    challengeItem: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(36, 238, 247, 0.2)',
        marginBottom: 12,
    },
    challengeItemLocked: {
        opacity: 0.6,
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    challengeTitleSection: {
        flex: 1,
    },
    challengeTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    challengeTitle: {
        color: '#e5e5e5',
        fontSize: 16,
        fontWeight: '600',
    },
    lockIcon: {
        marginLeft: 8,
    },
    challengeBadges: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    challengeCategory: {
        color: '#8b8b8b',
        fontSize: 14,
    },
    challengePoints: {
        color: '#24eef7',
        fontSize: 16,
        fontWeight: '600',
    },
    progressSection: {
        marginTop: 12,
    },
    progressLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    progressText: {
        color: '#8b8b8b',
        fontSize: 14,
    },
    progressValue: {
        color: '#24eef7',
        fontSize: 14,
    },

    // Leaderboard Item Styles
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(36, 238, 247, 0.2)',
        marginBottom: 12,
    },
    leaderboardRank: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    leaderboardRankText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    leaderboardAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    leaderboardInfo: {
        flex: 1,
    },
    leaderboardName: {
        color: '#e5e5e5',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    leaderboardPoints: {
        color: '#24eef7',
        fontSize: 14,
    },

    // Form Styles
    formGroup: {
        marginBottom: 16,
    },
    formLabel: {
        color: '#e5e5e5',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    formInputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    formInput: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 12,
        color: '#e5e5e5',
        fontSize: 16,
    },
    formInputWithIcon: {
        paddingLeft: 40,
    },
    formIcon: {
        position: 'absolute',
        left: 12,
        zIndex: 1,
    },
    togglePassword: {
        position: 'absolute',
        right: 12,
    },
    formError: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
    },

    // Section Header Styles
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#e5e5e5',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionActionText: {
        color: '#24eef7',
        fontSize: 14,
        marginRight: 4,
    },
});
