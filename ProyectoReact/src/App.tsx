import { useState, useEffect } from 'react';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { ChallengeMap } from './components/challenges/ChallengeMap';
import { ChallengeView } from './components/challenges/ChallengeView';
import { Leaderboard } from './components/leaderboard/Leaderboard';
import { Tutorials } from './components/tutorials/Tutorials';
import { Progress } from './components/progress/Progress';
import { Settings } from './components/settings/Settings';
import { AdminPanel } from './components/admin/AdminPanel';
import { MainLayout } from './components/layout/MainLayout';
import { Toaster } from './components/ui/sonner';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  points: number;
  completedChallenges: number;
  rank: number;
  streak: number;
  badges: string[];
};

export type Screen = 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'challenges' 
  | 'challenge-view'
  | 'leaderboard' 
  | 'tutorials'
  | 'tutorial-view'
  | 'progress' 
  | 'settings'
  | 'admin';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);

  const handleLogin = (email: string, password: string, remember: boolean) => {
    // Mock authentication
    const mockUser: User = {
      id: '1',
      name: 'Alex Rivera',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      level: 12,
      points: 3420,
      completedChallenges: 24,
      rank: 127,
      streak: 7,
      badges: ['sql-master', 'xss-hunter', 'first-blood', 'streak-7']
    };
    setUser(mockUser);
    setCurrentScreen('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      level: 1,
      points: 0,
      completedChallenges: 0,
      rank: 0,
      streak: 0,
      badges: []
    };
    setUser(mockUser);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen, challengeId?: string, tutorialId?: string) => {
    setCurrentScreen(screen);
    if (challengeId) setSelectedChallenge(challengeId);
    if (tutorialId) setSelectedTutorial(tutorialId);
  };

  // Show auth screens
  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        {currentScreen === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setCurrentScreen('register')} 
          />
        )}
        {currentScreen === 'register' && (
          <Register 
            onRegister={handleRegister} 
            onNavigateToLogin={() => setCurrentScreen('login')} 
          />
        )}
        <Toaster />
      </div>
    );
  }

  // Show main app with layout
  return (
    <MainLayout 
      user={user} 
      currentScreen={currentScreen}
      onNavigate={navigateTo}
      onLogout={handleLogout}
    >
      {currentScreen === 'dashboard' && <Dashboard user={user} onNavigate={navigateTo} />}
      {currentScreen === 'challenges' && <ChallengeMap onSelectChallenge={(id) => navigateTo('challenge-view', id)} />}
      {currentScreen === 'challenge-view' && selectedChallenge && (
        <ChallengeView challengeId={selectedChallenge} onBack={() => navigateTo('challenges')} />
      )}
      {currentScreen === 'leaderboard' && <Leaderboard currentUser={user} />}
      {currentScreen === 'tutorials' && <Tutorials onSelectTutorial={(id) => navigateTo('tutorial-view', undefined, id)} />}
      {currentScreen === 'tutorial-view' && selectedTutorial && (
        <Tutorials selectedTutorialId={selectedTutorial} onSelectTutorial={(id) => navigateTo('tutorial-view', undefined, id)} />
      )}
      {currentScreen === 'progress' && <Progress user={user} />}
      {currentScreen === 'settings' && <Settings user={user} />}
      {currentScreen === 'admin' && <AdminPanel />}
      <Toaster />
    </MainLayout>
  );
}
