import { useState } from 'react';
import { Search, Bell, Shield, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { User } from '../../App';

type HeaderProps = {
  user: User;
  onLogout: () => void;
};

export function Header({ user, onLogout }: HeaderProps) {
  const [notifications] = useState([
    { id: 1, type: 'unlock', message: 'New challenge unlocked: Advanced XSS', time: '5m ago' },
    { id: 2, type: 'achievement', message: 'Badge earned: SQL Master', time: '1h ago' },
    { id: 3, type: 'rank', message: 'You moved up to rank #127', time: '2h ago' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-[#24eef7]/20 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#24eef7] to-[#b59efe]">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <span className="text-[#24eef7] uppercase tracking-wider">HackLab</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#48e5c2]" />
            <Input
              type="text"
              placeholder="Search challenges, users, tutorials..."
              className="pl-10 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:ring-[#24eef7]/20"
            />
          </div>
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-[#111111] rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-[#48e5c2]" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff3b3b] rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#111111] border border-[#24eef7]/20 rounded-lg shadow-lg overflow-hidden">
                <div className="p-3 border-b border-[#24eef7]/20">
                  <h3 className="text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 hover:bg-[#0c0c0c] border-b border-[#24eef7]/10 cursor-pointer transition-colors"
                    >
                      <p className="text-white text-sm">{notif.message}</p>
                      <p className="text-[#c9c9c9] text-xs mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-[#24eef7]/20">
                  <button className="text-[#24eef7] hover:text-[#48e5c2] text-sm transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-[#111111] rounded-lg p-2 transition-colors">
              <Avatar className="w-9 h-9 border-2 border-[#24eef7]">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-[#24eef7] text-black">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-white text-sm">{user.name}</p>
                <p className="text-[#c9c9c9] text-xs">Level {user.level}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-[#48e5c2]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#111111] border-[#24eef7]/20">
              <div className="p-3">
                <p className="text-white">{user.name}</p>
                <p className="text-[#c9c9c9] text-sm">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-[#24eef7]/10 text-[#24eef7] border-[#24eef7]/30">
                    {user.points} pts
                  </Badge>
                  <Badge className="bg-[#b59efe]/10 text-[#b59efe] border-[#b59efe]/30">
                    Rank #{user.rank}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-[#24eef7]/20" />
              <DropdownMenuItem className="text-white hover:bg-[#0c0c0c] cursor-pointer">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-[#0c0c0c] cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-[#0c0c0c] cursor-pointer">
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#24eef7]/20" />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-[#ff3b3b] hover:bg-[#0c0c0c] cursor-pointer"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
