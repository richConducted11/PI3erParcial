import { LayoutDashboard, Map, Trophy, BookOpen, TrendingUp, Settings, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Screen } from '../../App';
import { Progress } from '../ui/progress';

type SidebarProps = {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userLevel: number;
};

export function Sidebar({ currentScreen, onNavigate, collapsed, onToggleCollapse, userLevel }: SidebarProps) {
  const menuItems = [
    { screen: 'dashboard' as Screen, icon: LayoutDashboard, label: 'Dashboard' },
    { screen: 'challenges' as Screen, icon: Map, label: 'Challenge Map' },
    { screen: 'leaderboard' as Screen, icon: Trophy, label: 'Leaderboard' },
    { screen: 'tutorials' as Screen, icon: BookOpen, label: 'Tutorials' },
    { screen: 'progress' as Screen, icon: TrendingUp, label: 'My Progress' },
    { screen: 'settings' as Screen, icon: Settings, label: 'Settings' },
    { screen: 'admin' as Screen, icon: Shield, label: 'Admin Panel' },
  ];

  const levelProgress = ((userLevel % 10) / 10) * 100;

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 bg-black border-r border-[#24eef7]/20 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Toggle button */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-4 w-6 h-6 bg-[#111111] border border-[#24eef7]/20 rounded-full flex items-center justify-center hover:bg-[#0c0c0c] transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-[#24eef7]" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-[#24eef7]" />
          )}
        </button>

        {/* Menu Items */}
        <nav className="flex-1 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            const isAdmin = item.screen === 'admin';

            // Hide admin for non-admins in collapsed view
            if (isAdmin && collapsed) return null;

            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all relative group ${
                  isActive
                    ? 'text-[#24eef7] bg-[#111111]'
                    : 'text-[#c9c9c9] hover:text-[#48e5c2] hover:bg-[#111111]'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                {isActive && !collapsed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#24eef7] glow-cyan" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'glow-cyan' : ''}`} />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#111111] border border-[#24eef7]/20 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Level Progress */}
        {!collapsed && (
          <div className="p-4 border-t border-[#24eef7]/20">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#c9c9c9] text-sm">Level {userLevel}</span>
                <span className="text-[#24eef7] text-sm">{Math.floor(levelProgress)}%</span>
              </div>
              <Progress value={levelProgress} className="h-2 bg-[#0c0c0c]" />
            </div>
            <p className="text-[#c9c9c9] text-xs">
              {100 - Math.floor(levelProgress)}% to level {userLevel + 1}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
