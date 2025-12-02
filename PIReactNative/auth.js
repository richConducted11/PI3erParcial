import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar
} from 'react-native';
import { Shield, Mail, Lock, User, Eye, EyeOff, CheckSquare, Square } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../App'; // Asumiendo que AuthProvider está en App.tsx o un contexto separado
import { COLORS, FONTS } from '../theme';

// ==========================================
// 1. COMPONENTES REUTILIZABLES (UI)
// ==========================================

// Campo de Texto con Icono y Error
const AuthInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    icon: Icon,
    isPassword = false,
    error
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputWrapper,
                isFocused && styles.inputFocused,
                error && styles.inputError
            ]}>
                {/* Icono Izquierdo */}
                <View style={styles.inputIcon}>
                    <Icon color={error ? COLORS.destructive : (isFocused ? COLORS.primary : COLORS.mutedForeground)} size={20} />
                </View>

                {/* Campo de Texto */}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#666"
                    secureTextEntry={isPassword && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoCapitalize="none"
                />

                {/* Toggle Password (Ojo) */}
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        {showPassword ?
                            <EyeOff color={COLORS.mutedForeground} size={20} /> :
                            <Eye color={COLORS.mutedForeground} size={20} />
                        }
                    </TouchableOpacity>
                )}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

// Checkbox Personalizado
const Checkbox = ({ label, checked, onPress }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        {checked ?
            <CheckSquare color={COLORS.primary} size={20} /> :
            <Square color={COLORS.mutedForeground} size={20} />
        }
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

// Header con Logo (Escudo)
const AuthHeader = ({ title, subtitle }) => (
    <View style={styles.headerContainer}>
        <View style={[styles.logoContainer, styles.glowCyan]}>
            <Shield color="#000" fill={COLORS.primary} size={30} />
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
);

// ==========================================
// 2. PANTALLA DE LOGIN
// ==========================================

export const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth(); // Función del contexto

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        // Validación Simple
        let newErrors = {};
        if (!email) newErrors.email = 'El email es requerido';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Formato de email inválido';

        if (!password) newErrors.password = 'La contraseña es requerida';
        else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Llamar a la función real de login
            login(email, password, rememberMe);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <AuthHeader title="HackLab" subtitle="Domina la Ciberseguridad" />

                <View style={[styles.card, styles.glowCyanBorder]}>
                    <Text style={styles.cardTitle}>Iniciar Sesión</Text>

                    <AuthInput
                        label="Email"
                        placeholder="tu@email.com"
                        icon={Mail}
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                    />

                    <AuthInput
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        icon={Lock}
                        isPassword
                        value={password}
                        onChangeText={setPassword}
                        error={errors.password}
                    />

                    <View style={styles.rowBetween}>
                        <Checkbox label="Recuérdame" checked={rememberMe} onPress={() => setRememberMe(!rememberMe)} />
                        <TouchableOpacity>
                            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.btn, styles.glowCyan]} onPress={handleLogin}>
                        <Text style={styles.btnText}>ENTRAR</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={[styles.linkText, { fontWeight: 'bold' }]}>Regístrate</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.bottomText}>
                    Plataforma de entrenamiento ético • Enfocado en OWASP Top 10
                </Text>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// ==========================================
// 3. PANTALLA DE REGISTRO
// ==========================================

export const RegisterScreen = () => {
    const navigation = useNavigation();
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleRegister = () => {
        let newErrors = {};
        if (!name) newErrors.name = 'El nombre es requerido';
        if (!email) newErrors.email = 'El email es requerido';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Formato inválido';
        if (!password) newErrors.password = 'Requerida';
        else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            register(name, email, password);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <AuthHeader title="HackLab" subtitle="Comienza tu viaje" />

                <View style={[styles.card, styles.glowCyanBorder]}>
                    <Text style={styles.cardTitle}>Crear Cuenta</Text>

                    <AuthInput
                        label="Nombre Completo"
                        placeholder="John Doe"
                        icon={User}
                        value={name}
                        onChangeText={setName}
                        error={errors.name}
                    />

                    <AuthInput
                        label="Email"
                        placeholder="tu@email.com"
                        icon={Mail}
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                    />

                    <AuthInput
                        label="Contraseña"
                        placeholder="Mínimo 6 caracteres"
                        icon={Lock}
                        isPassword
                        value={password}
                        onChangeText={setPassword}
                        error={errors.password}
                    />

                    <TouchableOpacity style={[styles.btn, styles.glowCyan, { marginTop: 10 }]} onPress={handleRegister}>
                        <Text style={styles.btnText}>CREAR CUENTA</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[styles.linkText, { fontWeight: 'bold' }]}>Inicia Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// ==========================================
// 4. ESTILOS (Adaptación del CSS)
// ==========================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    // Header Styles
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary, // Fondo cyan para el logo
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.primary,
        letterSpacing: 2,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    headerSubtitle: {
        color: COLORS.mutedForeground,
        fontSize: 16,
    },
    // Card Styles
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.foreground,
        marginBottom: 24,
        textAlign: 'center',
    },
    // Inputs
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: COLORS.mutedForeground,
        marginBottom: 8,
        fontSize: 14,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.input,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        height: 50,
    },
    inputFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    inputError: {
        borderColor: COLORS.destructive,
    },
    inputIcon: {
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        color: COLORS.foreground,
        height: '100%',
        fontSize: 16,
    },
    eyeIcon: {
        paddingHorizontal: 12,
    },
    errorText: {
        color: COLORS.destructive,
        fontSize: 12,
        marginTop: 4,
    },
    // Checkbox & Links
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkboxLabel: {
        color: COLORS.mutedForeground,
        fontSize: 14,
    },
    linkText: {
        color: COLORS.primary,
        fontSize: 14,
    },
    // Buttons
    btn: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#000', // Texto negro sobre fondo cyan
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    // Glow Effects (Simulación)
    glowCyan: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5, // Android
    },
    glowCyanBorder: {
        borderColor: 'rgba(36, 238, 247, 0.3)',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        color: COLORS.mutedForeground,
    },
    bottomText: {
        textAlign: 'center',
        color: '#444',
        fontSize: 12,
        marginTop: 30,
    }
});