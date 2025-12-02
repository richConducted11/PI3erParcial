import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress as ProgressBar } from '../ui/progress';
import { Trophy, Target, Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { User } from '../../App';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

type ProgressProps = {
  user: User;
};

export function Progress({ user }: ProgressProps) {
  const categoryData = [
    { name: 'SQL Injection', value: 8, color: '#ff3b3b' },
    { name: 'XSS', value: 6, color: '#ffd54f' },
    { name: 'CSRF', value: 4, color: '#3ef587' },
    { name: 'Authentication', value: 3, color: '#b59efe' },
    { name: 'Path Traversal', value: 2, color: '#48e5c2' },
    { name: 'Command Injection', value: 1, color: '#24eef7' },
  ];

  const weeklyProgress = [
    { week: 'Week 1', points: 320 },
    { week: 'Week 2', points: 480 },
    { week: 'Week 3', points: 620 },
    { week: 'Week 4', points: 890 },
    { week: 'Week 5', points: 1110 },
  ];

  const activityCalendar = Array.from({ length: 84 }, (_, i) => ({
    day: i,
    challenges: Math.floor(Math.random() * 5),
  }));

  const badges = [
    { id: 'sql-master', name: 'SQL Master', description: 'Complete all SQL challenges', icon: '🛡️', unlocked: true },
    { id: 'xss-hunter', name: 'XSS Hunter', description: 'Complete 5 XSS challenges', icon: '🎯', unlocked: true },
    { id: 'first-blood', name: 'First Blood', description: 'Complete your first challenge', icon: '🩸', unlocked: true },
    { id: 'streak-7', name: '7 Day Streak', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: true },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Complete a challenge in under 5 minutes', icon: '⚡', unlocked: false },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Complete a challenge without hints', icon: '💎', unlocked: false },
    { id: 'expert', name: 'Expert', description: 'Complete 10 Expert challenges', icon: '👑', unlocked: false },
    { id: 'researcher', name: 'Researcher', description: 'Read 20 tutorials', icon: '📚', unlocked: false },
  ];

  const completedChallenges = [
    { title: 'Basic SQL Injection', date: '2025-11-01', points: 100, time: '12:34' },
    { title: 'Reflected XSS', date: '2025-11-02', points: 100, time: '15:22' },
    { title: 'Basic CSRF', date: '2025-11-03', points: 100, time: '08:45' },
    { title: 'Weak Passwords', date: '2025-11-04', points: 90, time: '10:15' },
    { title: 'Blind SQL Injection', date: '2025-11-05', points: 150, time: '22:18' },
  ];

  const getActivityColor = (challenges: number) => {
    if (challenges === 0) return '#1a1a1a';
    if (challenges === 1) return '#24eef7/20';
    if (challenges === 2) return '#24eef7/40';
    if (challenges === 3) return '#24eef7/60';
    if (challenges === 4) return '#24eef7/80';
    return '#24eef7';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">My Progress</h1>
        <p className="text-[#c9c9c9]">Track your learning journey and achievements</p>
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
              <p className="text-[#c9c9c9] text-sm mb-1">Time Invested</p>
              <h2 className="text-[#ffd54f]">42h 15m</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#ffd54f]/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#ffd54f]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
          <h3 className="text-white mb-4">Points Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="week" stroke="#c9c9c9" />
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
          <h3 className="text-white mb-4">Challenges by Category</h3>
          <div className="flex items-center justify-center">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-6 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[#c9c9c9] text-sm">{cat.name}</span>
                  <span className="text-white text-sm">({cat.value})</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Badges */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <h3 className="text-white mb-4">Badges & Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`text-center p-4 rounded-lg border transition-all ${
                badge.unlocked
                  ? 'bg-[#24eef7]/5 border-[#24eef7]/30 glow-cyan'
                  : 'bg-[#0c0c0c] border-[#24eef7]/10 opacity-40'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-white text-xs mb-1">{badge.name}</p>
              <p className="text-[#c9c9c9] text-xs line-clamp-2">{badge.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Calendar */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <h3 className="text-white mb-4">Activity Calendar</h3>
        <div className="grid grid-cols-12 gap-1">
          {activityCalendar.map((day) => (
            <div
              key={day.day}
              className="aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer"
              style={{ backgroundColor: getActivityColor(day.challenges) }}
              title={`${day.challenges} challenges`}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-[#c9c9c9]">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getActivityColor(i) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </Card>

      {/* Comparison */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <h3 className="text-white mb-4">Compare to Average User</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#c9c9c9]">Challenges Completed</span>
              <div className="flex items-center gap-4">
                <span className="text-[#24eef7]">You: {user.completedChallenges}</span>
                <span className="text-[#c9c9c9]">Avg: 15</span>
              </div>
            </div>
            <ProgressBar value={(user.completedChallenges / 30) * 100} className="h-2 bg-[#0c0c0c]" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#c9c9c9]">Points Earned</span>
              <div className="flex items-center gap-4">
                <span className="text-[#24eef7]">You: {user.points}</span>
                <span className="text-[#c9c9c9]">Avg: 2100</span>
              </div>
            </div>
            <ProgressBar value={(user.points / 5000) * 100} className="h-2 bg-[#0c0c0c]" />
          </div>
        </div>
      </Card>

      {/* Recent Completions */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <h3 className="text-white mb-4">Recent Completions</h3>
        <div className="space-y-3">
          {completedChallenges.map((challenge, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#0c0c0c] rounded-lg border border-[#24eef7]/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3ef587]/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[#3ef587]" />
                </div>
                <div>
                  <h4 className="text-white">{challenge.title}</h4>
                  <p className="text-[#c9c9c9] text-sm">{challenge.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#24eef7]">+{challenge.points} pts</p>
                <p className="text-[#c9c9c9] text-sm">{challenge.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
