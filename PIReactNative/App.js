import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Home, Map, Trophy, BookOpen, User as UserIcon, LogOut, ChevronRight } from 'lucide-react-native';

// Importar componentes personalizados
import {
  Button as CustomButton,
  Card,
  Badge,
  StatCard,
  ChallengeItem,
  LeaderboardItem,
  SectionHeader
} from './components';
import { TutorialsScreen as TutorialsView } from './tutorials';
import { formatNumber, getAvatarUrl } from './utils';

const MOCK_USER = {
  id: '1',
  name: 'Alex Rivera',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  level: 12,
  points: 3420,
  completedChallenges: 24,
  rank: 127,
  streak: 7,
  badges: ['Maestro SQL', 'Cazador XSS']
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('hacklab_user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setUser(MOCK_USER);
    await AsyncStorage.setItem('hacklab_user', JSON.stringify(MOCK_USER));
  };

  const register = async (name, email, password) => {
    const newUser = { ...MOCK_USER, name, email, level: 1, points: 0 };
    setUser(newUser);
    await AsyncStorage.setItem('hacklab_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('hacklab_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>HackLab</Text>
      <Text style={styles.subtitle}>Plataforma de Ciberseguridad</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bienvenido de nuevo</Text>
        <Button title="Iniciar Sesión (Demo)" color="#0ea5e9" onPress={() => login('test@test.com', '123')} />
        <View style={{ marginTop: 10 }}>
          <Button title="Crear cuenta nueva" color="gray" onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <View style={styles.card}>
        <Button title="Registrarse (Demo)" color="#22c55e" onPress={() => register('Nuevo Usuario', 'a@a.com', '123')} />
        <View style={{ marginTop: 10 }}>
          <Button title="¿Ya tienes cuenta? Inicia sesión" color="gray" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
};

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Hola, {user?.name} 👋</Text>

      <View style={styles.statsContainer}>
        <StatCard label="Nivel" value={user?.level} iconName="award" colorClass="primary" />
        <StatCard label="Puntos" value={user?.points} iconName="target" colorClass="success" />
        <StatCard label="Racha" value={`${user?.streak}🔥`} iconName="zap" colorClass="warning" />
      </View>

      <SectionHeader
        title="Continuar Aprendiendo"
        actionText="Ver todos"
        onAction={() => navigation.navigate('Challenges')}
      />

      <ChallengeItem
        challenge={{
          id: '1',
          title: 'Inyección SQL Básica',
          difficulty: 'Easy',
          points: 100,
          category: 'SQL Injection',
          status: 'in-progress',
          progress: 65
        }}
        onPress={(id) => navigation.navigate('ChallengeDetail', { id, title: 'Inyección SQL Básica' })}
      />
    </ScrollView>
  );
};

const ChallengesScreen = ({ navigation }) => {
  const challenges = [
    { id: '1', title: 'SQL Injection Básica', difficulty: 'Easy', points: 100, category: 'SQL Injection', status: 'completed' },
    { id: '2', title: 'Blind SQL Injection', difficulty: 'Medium', points: 150, category: 'SQL Injection', status: 'available' },
    { id: '3', title: 'XSS Reflejado', difficulty: 'Easy', points: 80, category: 'XSS', status: 'available' },
    { id: '4', title: 'XSS Almacenado', difficulty: 'Hard', points: 200, category: 'XSS', status: 'available' },
    { id: '5', title: 'CSRF Token Bypass', difficulty: 'Medium', points: 180, category: 'CSRF', status: 'in-progress', progress: 65 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Mapa de Desafíos</Text>
      {challenges.map((challenge) => (
        <ChallengeItem
          key={challenge.id}
          challenge={challenge}
          onPress={(id) => navigation.navigate('ChallengeDetail', { id, title: challenge.title })}
        />
      ))}
    </ScrollView>
  );
};

const LeaderboardScreen = () => {
  const players = [
    { rank: 1, name: 'Sarah Chen', points: 8450, avatar: getAvatarUrl('Sarah Chen') },
    { rank: 2, name: 'Mike Rodriguez', points: 7820, avatar: getAvatarUrl('Mike Rodriguez') },
    { rank: 3, name: 'Emma Wilson', points: 7350, avatar: getAvatarUrl('Emma Wilson') },
    { rank: 4, name: 'Alex Rivera', points: 6890, avatar: getAvatarUrl('Alex Rivera') },
    { rank: 5, name: 'David Kim', points: 6420, avatar: getAvatarUrl('David Kim') },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Tabla de Posiciones</Text>
      <Text style={{ color: '#888', marginBottom: 20 }}>Top Hackers de la semana</Text>
      {players.map((player) => (
        <LeaderboardItem key={player.rank} player={player} onPress={(p) => console.log('Ver perfil', p.name)} />
      ))}
    </ScrollView>
  );
};

const TutorialsScreen = ({ navigation }) => {
  return <TutorialsView navigation={navigation} />;
};

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={{ color: 'white', marginBottom: 20 }}>Usuario: {user?.name}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <LogOut color="white" size={20} />
        <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChallengeDetailScreen = ({ route, navigation }) => {
  const { title } = route.params;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{title}</Text>
      <Card style={{ marginBottom: 20 }}>
        <Text style={{ color: '#ccc', marginBottom: 20 }}>
          Aquí iría la terminal interactiva o las instrucciones del laboratorio de hacking.
        </Text>
        <Text style={{ color: '#24eef7', fontFamily: 'monospace', marginBottom: 20 }}>
          Target: http://vulnerable-site.com/login{'\n'}
          Hint: Intenta usar ' OR '1'='1
        </Text>
        <CustomButton text="Validar Bandera (Flag)" variant="primary" onPress={() => alert('¡Correcto!')} />
      </Card>
    </ScrollView>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#09090b', // Zinc-950
          borderTopColor: '#27272a',  // Zinc-800
          height: 60,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarActiveTintColor: '#22d3ee', // Cyan-400
        tabBarInactiveTintColor: '#71717a', // Zinc-500
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarLabel: 'Misiones',
          tabBarIcon: ({ color }) => <Map color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color }) => <Trophy color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Tutorials"
        component={TutorialsScreen}
        options={{
          tabBarLabel: 'Aprender',
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <UserIcon color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#22d3ee" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000' }
      }}>
        {user ? (
          <Stack.Group>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="ChallengeDetail"
              component={ChallengeDetailScreen}
              options={{
                headerShown: true,
                title: 'Detalles del Desafío',
                headerStyle: { backgroundColor: '#09090b' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' }
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ animation: 'fade' }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// --- 5. EXPORTACIÓN PRINCIPAL ---
export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

// --- 6. ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#22d3ee', // Cyan
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e4e4e7',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#18181b', // Zinc-900
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444', // Red-500
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  }
});