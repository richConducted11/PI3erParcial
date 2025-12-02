import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Trophy, Medal, Award, Flame } from 'lucide-react';
import { User } from '../../App';

type LeaderboardProps = {
  currentUser: User;
};

export function Leaderboard({ currentUser }: LeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('global');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const leaderboardData = [
    { rank: 1, name: 'CyberNinja', level: 25, points: 8420, challenges: 78, streak: 45, badges: 24, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja' },
    { rank: 2, name: 'HackMaster', level: 23, points: 7890, challenges: 72, streak: 38, badges: 22, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HackMaster' },
    { rank: 3, name: 'SecureCode', level: 22, points: 7150, challenges: 68, streak: 32, badges: 20, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecureCode' },
    { rank: 4, name: 'ByteBreaker', level: 21, points: 6820, challenges: 65, streak: 28, badges: 19, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByteBreaker' },
    { rank: 5, name: 'SQLSlayer', level: 20, points: 6340, challenges: 62, streak: 25, badges: 18, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SQLSlayer' },
    { rank: 6, name: 'XSSHunter', level: 19, points: 5980, challenges: 58, streak: 22, badges: 17, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=XSSHunter' },
    { rank: 7, name: 'CodeBreaker', level: 18, points: 5640, challenges: 55, streak: 20, badges: 16, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeBreaker' },
    { rank: 127, name: currentUser.name, level: currentUser.level, points: currentUser.points, challenges: currentUser.completedChallenges, streak: currentUser.streak, badges: currentUser.badges.length, avatar: currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-[#ffd54f]" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-[#c9c9c9]" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-[#ff9800]" />;
    return null;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-[#ffd54f]/20 to-transparent border-[#ffd54f]/30';
    if (rank === 2) return 'bg-gradient-to-r from-[#c9c9c9]/20 to-transparent border-[#c9c9c9]/30';
    if (rank === 3) return 'bg-gradient-to-r from-[#ff9800]/20 to-transparent border-[#ff9800]/30';
    return 'border-[#24eef7]/10';
  };

  const filteredData = leaderboardData.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">Leaderboard</h1>
        <p className="text-[#c9c9c9]">Compete with the best hackers worldwide</p>
      </div>

      {/* Filters */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#48e5c2]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="pl-10 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50"
            />
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="bg-[#0c0c0c] border-[#24eef7]/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#24eef7]/20">
              <SelectItem value="global">All Time</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-[#0c0c0c] border-[#24eef7]/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#24eef7]/20">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sql">SQL Injection</SelectItem>
              <SelectItem value="xss">XSS</SelectItem>
              <SelectItem value="csrf">CSRF</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.slice(0, 3).map((player) => (
          <Card
            key={player.rank}
            className={`${getRankBg(player.rank)} border p-6 text-center ${
              player.rank === 1 ? 'md:order-2' : player.rank === 2 ? 'md:order-1' : 'md:order-3'
            }`}
          >
            <div className="mb-4">
              {getRankIcon(player.rank)}
            </div>
            <div className="relative inline-block mb-4">
              <img
                src={player.avatar}
                alt={player.name}
                className="w-20 h-20 rounded-full border-4 border-[#24eef7]"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#24eef7] rounded-full flex items-center justify-center">
                <span className="text-black">#{player.rank}</span>
              </div>
            </div>
            <h3 className="text-white mb-1">{player.name}</h3>
            <p className="text-[#c9c9c9] text-sm mb-3">Level {player.level}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4 text-[#24eef7]" />
                <span className="text-[#24eef7]">{player.points.toLocaleString()} pts</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 text-[#ff3b3b]" />
                <span className="text-white">{player.streak} day streak</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <Card className="bg-[#111111] border-[#24eef7]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0c0c0c] border-b border-[#24eef7]/20">
              <tr>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">Rank</th>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">User</th>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">Level</th>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">Points</th>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">Challenges</th>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">Streak</th>
                <th className="px-6 py-4 text-left text-[#c9c9c9]">Badges</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((player) => {
                const isCurrentUser = player.name === currentUser.name;
                return (
                  <tr
                    key={player.rank}
                    className={`border-b border-[#24eef7]/10 hover:bg-[#0c0c0c] transition-colors ${
                      isCurrentUser ? 'bg-[#24eef7]/5 border-[#24eef7]/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(player.rank)}
                        <span className={`${isCurrentUser ? 'text-[#24eef7]' : 'text-white'}`}>
                          #{player.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-10 h-10 rounded-full border-2 border-[#24eef7]"
                        />
                        <div>
                          <p className={`${isCurrentUser ? 'text-[#24eef7]' : 'text-white'}`}>
                            {player.name}
                            {isCurrentUser && (
                              <Badge className="ml-2 bg-[#24eef7]/10 text-[#24eef7] border-[#24eef7]/30">
                                You
                              </Badge>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-[#b59efe]/10 text-[#b59efe] border-[#b59efe]/30">
                        Level {player.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#24eef7]">{player.points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{player.challenges}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#ff3b3b]" />
                        <span className="text-white">{player.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#ffd54f]" />
                        <span className="text-white">{player.badges}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
