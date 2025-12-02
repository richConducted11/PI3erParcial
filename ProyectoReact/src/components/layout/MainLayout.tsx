import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { User, Screen } from '../../App';

type MainLayoutProps = {
  user: User;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  children: React.ReactNode;
};

export function MainLayout({ user, currentScreen, onNavigate, onLogout, children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header user={user} onLogout={onLogout} />
      <div className="flex pt-16">
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={onNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          userLevel={user.level}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
