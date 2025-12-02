import { User, Screen } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Trophy, Target, Flame, Clock, ChevronRight, Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DashboardProps = {
  user: User;
  onNavigate: (screen: Screen, challengeId?: string) => void;
};

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const weeklyData = [
    { day: 'Mon', points: 120 },
    { day: 'Tue', points: 180 },
    { day: 'Wed', points: 150 },
    { day: 'Thu', points: 240 },
    { day: 'Fri', points: 200 },
    { day: 'Sat', points: 280 },
    { day: 'Sun', points: 220 },
  ];

  const recommendedChallenges = [
    { id: '1', title: 'Blind SQL Injection', difficulty: 'Medium', points: 150, category: 'SQL Injection', status: 'available' },
    { id: '2', title: 'Stored XSS Attack', difficulty: 'Hard', points: 200, category: 'XSS', status: 'available' },
    { id: '3', title: 'JWT Token Manipulation', difficulty: 'Expert', points: 300, category: 'Authentication', status: 'locked' },
  ];

  const continueChallenge = {
    id: '4',
    title: 'CSRF Token Bypass',
    difficulty: 'Medium',
    points: 180,
    category: 'CSRF',
    progress: 65,
  };

  const leaderboard = [
    { rank: 1, name: 'CyberNinja', points: 8420, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja' },
    { rank: 2, name: 'HackMaster', points: 7890, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HackMaster' },
    { rank: 3, name: 'SecureCode', points: 7150, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecureCode' },
    { rank: 4, name: 'ByteBreaker', points: 6820, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByteBreaker' },
    { rank: 5, name: 'SQLSlayer', points: 6340, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SQLSlayer' },
  ];

  const upcomingUnlocks = [
    { title: 'Advanced Path Traversal', requiredLevel: 13, requiredPoints: 3500 },
    { title: 'Command Injection Mastery', requiredLevel: 14, requiredPoints: 4000 },
  ];

  const securityTips = [
    'Always validate and sanitize user input',
    'Use parameterized queries to prevent SQL injection',
    'Implement proper CSRF tokens in forms',
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-[#3ef587] border-[#3ef587]';
      case 'Medium': return 'text-[#ffd54f] border-[#ffd54f]';
      case 'Hard': return 'text-[#ff3b3b] border-[#ff3b3b]';
      case 'Expert': return 'text-[#b59efe] border-[#b59efe]';
      default: return 'text-[#c9c9c9] border-[#c9c9c9]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-white mb-2">Welcome back, {user.name}!</h1>
        <p className="text-[#c9c9c9]">Ready to sharpen your cybersecurity skills today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#c9c9c9] text-sm mb-1">Total Points</p>
              <h2 className="text-[#24eef7]">{user.points.toLocaleString()}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#24eef7]/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#24eef7]" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#111111] border-[#48e5c2]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#c9c9c9] text-sm mb-1">Challenges Completed</p>
              <h2 className="text-[#48e5c2]">{user.completedChallenges}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#48e5c2]/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#48e5c2]" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#111111] border-[#b59efe]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#c9c9c9] text-sm mb-1">Current Streak</p>
              <h2 className="text-[#b59efe]">{user.streak} days</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#b59efe]/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#b59efe]" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#111111] border-[#ffd54f]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#c9c9c9] text-sm mb-1">Global Rank</p>
              <h2 className="text-[#ffd54f]">#{user.rank}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#ffd54f]/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#ffd54f]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Challenges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Challenge */}
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Continue Where You Left Off</h3>
              <PlayCircle className="w-5 h-5 text-[#24eef7]" />
            </div>
            <div className="bg-[#0c0c0c] rounded-lg p-4 border border-[#24eef7]/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white mb-1">{continueChallenge.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyColor(continueChallenge.difficulty)} bg-transparent`}>
                      {continueChallenge.difficulty}
                    </Badge>
                    <span className="text-[#c9c9c9] text-sm">{continueChallenge.category}</span>
                  </div>
                </div>
                <span className="text-[#24eef7]">{continueChallenge.points} pts</span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#c9c9c9]">Progress</span>
                  <span className="text-[#24eef7]">{continueChallenge.progress}%</span>
                </div>
                <Progress value={continueChallenge.progress} className="h-2 bg-[#1a1a1a]" />
              </div>
              <Button
                onClick={() => onNavigate('challenge-view', continueChallenge.id)}
                className="w-full bg-[#24eef7] hover:bg-[#48e5c2] text-black"
              >
                Continue Challenge
              </Button>
            </div>
          </Card>

          {/* Recommended Challenges */}
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Recommended for You</h3>
              <Button
                onClick={() => onNavigate('challenges')}
                variant="ghost"
                className="text-[#24eef7] hover:text-[#48e5c2] hover:bg-[#0c0c0c]"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recommendedChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-[#0c0c0c] rounded-lg p-4 border border-[#24eef7]/10 hover:border-[#24eef7]/30 transition-all cursor-pointer"
                  onClick={() => challenge.status === 'available' && onNavigate('challenge-view', challenge.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white">{challenge.title}</h4>
                        {challenge.status === 'locked' && <Lock className="w-4 h-4 text-[#c9c9c9]" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getDifficultyColor(challenge.difficulty)} bg-transparent text-xs`}>
                          {challenge.difficulty}
                        </Badge>
                        <span className="text-[#c9c9c9] text-sm">{challenge.category}</span>
                      </div>
                    </div>
                    <span className="text-[#24eef7]">{challenge.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Progress Chart */}
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-4">Weekly Progress</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="day" stroke="#c9c9c9" />
                  <YAxis stroke="#c9c9c9" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c0c0c',
                      border: '1px solid rgba(36, 238, 247, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="#24eef7"
                    strokeWidth={2}
                    dot={{ fill: '#24eef7', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column - Leaderboard & Tips */}
        <div className="space-y-6">
          {/* Top 5 Leaderboard */}
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Top Hackers</h3>
              <Button
                onClick={() => onNavigate('leaderboard')}
                variant="ghost"
                className="text-[#24eef7] hover:text-[#48e5c2] hover:bg-[#0c0c0c] text-sm"
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center gap-3 p-3 bg-[#0c0c0c] rounded-lg border border-[#24eef7]/10 hover:border-[#24eef7]/30 transition-all cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    player.rank === 1 ? 'bg-[#ffd54f]/10 text-[#ffd54f]' :
                    player.rank === 2 ? 'bg-[#c9c9c9]/10 text-[#c9c9c9]' :
                    player.rank === 3 ? 'bg-[#ff9800]/10 text-[#ff9800]' :
                    'bg-[#24eef7]/10 text-[#24eef7]'
                  }`}>
                    #{player.rank}
                  </div>
                  <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">{player.name}</p>
                    <p className="text-[#c9c9c9] text-xs">{player.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Unlocks */}
          <Card className="bg-[#111111] border-[#b59efe]/20 p-6">
            <h3 className="text-white mb-4">Next Unlocks</h3>
            <div className="space-y-3">
              {upcomingUnlocks.map((unlock, index) => (
                <div key={index} className="bg-[#0c0c0c] rounded-lg p-3 border border-[#b59efe]/10">
                  <div className="flex items-start gap-2 mb-2">
                    <Lock className="w-4 h-4 text-[#b59efe] mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{unlock.title}</p>
                      <p className="text-[#c9c9c9] text-xs mt-1">
                        Level {unlock.requiredLevel} • {unlock.requiredPoints} pts
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Security Tips */}
          <Card className="bg-[#111111] border-[#3ef587]/20 p-6">
            <h3 className="text-white mb-4">Security Tips</h3>
            <div className="space-y-3">
              {securityTips.map((tip, index) => (
                <div key={index} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3ef587] mt-0.5 flex-shrink-0" />
                  <p className="text-[#c9c9c9] text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
