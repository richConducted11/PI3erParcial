import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Users, Target, FileText, BarChart3, Plus, Edit, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalUsers: 1543,
    activeUsers: 892,
    totalChallenges: 48,
    completionRate: 67,
  };

  const challenges = [
    { id: '1', title: 'Basic SQL Injection', category: 'SQL', difficulty: 'Easy', attempts: 1243, successRate: 85 },
    { id: '2', title: 'Blind SQL Injection', category: 'SQL', difficulty: 'Medium', attempts: 876, successRate: 62 },
    { id: '3', title: 'Stored XSS', category: 'XSS', difficulty: 'Hard', attempts: 534, successRate: 45 },
  ];

  const users = [
    { id: '1', name: 'CyberNinja', email: 'cyber@example.com', level: 25, status: 'active', joinDate: '2025-01-15' },
    { id: '2', name: 'HackMaster', email: 'hack@example.com', level: 23, status: 'active', joinDate: '2025-02-20' },
    { id: '3', name: 'SecureCode', email: 'secure@example.com', level: 22, status: 'suspended', joinDate: '2025-03-10' },
  ];

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    points: '',
    flag: '',
    vulnerableCode: '',
    hints: '',
  });

  const handleCreateChallenge = () => {
    toast.success('Challenge created successfully!');
    setNewChallenge({
      title: '',
      description: '',
      category: '',
      difficulty: '',
      points: '',
      flag: '',
      vulnerableCode: '',
      hints: '',
    });
  };

  const handleExportReport = () => {
    toast.success('Report exported successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">Admin Panel</h1>
        <p className="text-[#c9c9c9]">Manage challenges, users, and platform settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#111111] border border-[#24eef7]/20">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="challenges" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <Target className="w-4 h-4 mr-2" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#c9c9c9] text-sm mb-1">Total Users</p>
                    <h2 className="text-[#24eef7]">{stats.totalUsers.toLocaleString()}</h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#24eef7]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#24eef7]" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[#111111] border-[#48e5c2]/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#c9c9c9] text-sm mb-1">Active Users</p>
                    <h2 className="text-[#48e5c2]">{stats.activeUsers.toLocaleString()}</h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#48e5c2]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#48e5c2]" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[#111111] border-[#b59efe]/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#c9c9c9] text-sm mb-1">Total Challenges</p>
                    <h2 className="text-[#b59efe]">{stats.totalChallenges}</h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#b59efe]/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#b59efe]" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[#111111] border-[#ffd54f]/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#c9c9c9] text-sm mb-1">Avg Completion</p>
                    <h2 className="text-[#ffd54f]">{stats.completionRate}%</h2>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#ffd54f]/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-[#ffd54f]" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Most Popular Challenges */}
            <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Most Popular Challenges</h3>
                <Button
                  onClick={handleExportReport}
                  variant="outline"
                  className="border-[#24eef7] text-[#24eef7] hover:bg-[#24eef7] hover:text-black"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center justify-between p-4 bg-[#0c0c0c] rounded-lg border border-[#24eef7]/10"
                  >
                    <div className="flex-1">
                      <h4 className="text-white mb-1">{challenge.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#24eef7]/10 text-[#24eef7] border-[#24eef7]/30 text-xs">
                          {challenge.category}
                        </Badge>
                        <span className="text-[#c9c9c9] text-sm">{challenge.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{challenge.attempts} attempts</p>
                      <p className="text-[#3ef587] text-sm">{challenge.successRate}% success</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white">Manage Challenges</h3>
              <Button
                onClick={() => setActiveTab('create')}
                className="bg-[#24eef7] hover:bg-[#48e5c2] text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>
            <div className="space-y-3">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex items-center justify-between p-4 bg-[#0c0c0c] rounded-lg border border-[#24eef7]/10"
                >
                  <div className="flex-1">
                    <h4 className="text-white mb-2">{challenge.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-[#c9c9c9]">
                      <span>{challenge.category}</span>
                      <span>•</span>
                      <span>{challenge.difficulty}</span>
                      <span>•</span>
                      <span>{challenge.attempts} attempts</span>
                      <span>•</span>
                      <span className="text-[#3ef587]">{challenge.successRate}% success</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="text-[#24eef7] hover:text-[#24eef7] hover:bg-[#24eef7]/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-[#ff3b3b] hover:text-[#ff3b3b] hover:bg-[#ff3b3b]/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-6">User Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0c0c0c] border-b border-[#24eef7]/20">
                  <tr>
                    <th className="px-4 py-3 text-left text-[#c9c9c9]">Name</th>
                    <th className="px-4 py-3 text-left text-[#c9c9c9]">Email</th>
                    <th className="px-4 py-3 text-left text-[#c9c9c9]">Level</th>
                    <th className="px-4 py-3 text-left text-[#c9c9c9]">Status</th>
                    <th className="px-4 py-3 text-left text-[#c9c9c9]">Join Date</th>
                    <th className="px-4 py-3 text-left text-[#c9c9c9]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-[#24eef7]/10 hover:bg-[#0c0c0c] transition-colors">
                      <td className="px-4 py-4 text-white">{user.name}</td>
                      <td className="px-4 py-4 text-[#c9c9c9]">{user.email}</td>
                      <td className="px-4 py-4">
                        <Badge className="bg-[#b59efe]/10 text-[#b59efe] border-[#b59efe]/30">
                          Level {user.level}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className={user.status === 'active' 
                          ? 'bg-[#3ef587]/10 text-[#3ef587] border-[#3ef587]/30'
                          : 'bg-[#ff3b3b]/10 text-[#ff3b3b] border-[#ff3b3b]/30'
                        }>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-[#c9c9c9]">{user.joinDate}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" className="text-[#24eef7] hover:text-[#24eef7] hover:bg-[#24eef7]/10">
                            View
                          </Button>
                          <Button variant="ghost" className="text-[#ff3b3b] hover:text-[#ff3b3b] hover:bg-[#ff3b3b]/10">
                            Suspend
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Create Challenge Tab */}
        <TabsContent value="create">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-6">Create New Challenge</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-[#c9c9c9] mb-2 block">Challenge Title</Label>
                  <Input
                    id="title"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                    placeholder="e.g., Advanced SQL Injection"
                    className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-[#c9c9c9] mb-2 block">Category</Label>
                  <Select value={newChallenge.category} onValueChange={(value) => setNewChallenge({ ...newChallenge, category: value })}>
                    <SelectTrigger className="bg-[#0c0c0c] border-[#24eef7]/30 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-[#24eef7]/20">
                      <SelectItem value="sql">SQL Injection</SelectItem>
                      <SelectItem value="xss">XSS</SelectItem>
                      <SelectItem value="csrf">CSRF</SelectItem>
                      <SelectItem value="auth">Authentication</SelectItem>
                      <SelectItem value="path">Path Traversal</SelectItem>
                      <SelectItem value="command">Command Injection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty" className="text-[#c9c9c9] mb-2 block">Difficulty</Label>
                  <Select value={newChallenge.difficulty} onValueChange={(value) => setNewChallenge({ ...newChallenge, difficulty: value })}>
                    <SelectTrigger className="bg-[#0c0c0c] border-[#24eef7]/30 text-white">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-[#24eef7]/20">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="points" className="text-[#c9c9c9] mb-2 block">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={newChallenge.points}
                    onChange={(e) => setNewChallenge({ ...newChallenge, points: e.target.value })}
                    placeholder="150"
                    className="bg-[#0c0c0c] border-[#24eef7]/30 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#c9c9c9] mb-2 block">Description</Label>
                <Textarea
                  id="description"
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                  placeholder="Describe the challenge, scenario, and objectives..."
                  className="bg-[#0c0c0c] border-[#24eef7]/30 text-white h-32"
                />
              </div>

              <div>
                <Label htmlFor="flag" className="text-[#c9c9c9] mb-2 block">Flag</Label>
                <Input
                  id="flag"
                  value={newChallenge.flag}
                  onChange={(e) => setNewChallenge({ ...newChallenge, flag: e.target.value })}
                  placeholder="FLAG{...}"
                  className="bg-[#0c0c0c] border-[#24eef7]/30 text-white font-mono"
                />
              </div>

              <div>
                <Label htmlFor="code" className="text-[#c9c9c9] mb-2 block">Vulnerable Code</Label>
                <Textarea
                  id="code"
                  value={newChallenge.vulnerableCode}
                  onChange={(e) => setNewChallenge({ ...newChallenge, vulnerableCode: e.target.value })}
                  placeholder="Paste vulnerable code here..."
                  className="bg-[#0c0c0c] border-[#24eef7]/30 text-white font-mono h-48"
                />
              </div>

              <div>
                <Label htmlFor="hints" className="text-[#c9c9c9] mb-2 block">Hints (one per line)</Label>
                <Textarea
                  id="hints"
                  value={newChallenge.hints}
                  onChange={(e) => setNewChallenge({ ...newChallenge, hints: e.target.value })}
                  placeholder="Hint 1&#10;Hint 2&#10;Hint 3"
                  className="bg-[#0c0c0c] border-[#24eef7]/30 text-white h-24"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCreateChallenge}
                  className="flex-1 bg-[#24eef7] hover:bg-[#48e5c2] text-black"
                >
                  Create Challenge
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#24eef7] text-[#24eef7] hover:bg-[#24eef7] hover:text-black"
                >
                  Preview
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
