import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ArrowLeft, BookOpen, Lightbulb, Code, StickyNote, Send, CheckCircle2, XCircle, Trophy, Clock, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ChallengeViewProps = {
  challengeId: string;
  onBack: () => void;
};

export function ChallengeView({ challengeId, onBack }: ChallengeViewProps) {
  const [flagInput, setFlagInput] = useState('');
  const [attempts, setAttempts] = useState<{ flag: string; correct: boolean; timestamp: Date }[]>([]);
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [notes, setNotes] = useState('');

  // Mock challenge data
  const challenge = {
    id: challengeId,
    title: 'Blind SQL Injection',
    difficulty: 'Medium',
    points: 150,
    category: 'SQL Injection',
    description: `You've discovered a search function on a vulnerable web application. The application seems to be using SQL queries to search through a database of products. However, the application doesn't display SQL errors directly.

Your objective is to exploit a blind SQL injection vulnerability to extract sensitive information from the database. The flag is hidden in the 'admin' table.`,
    objective: 'Extract the administrator password from the database using blind SQL injection techniques.',
    hints: [
      { id: 1, cost: 10, text: 'Try using boolean-based blind SQL injection with AND 1=1 and AND 1=2' },
      { id: 2, cost: 20, text: 'Use SUBSTRING() or SUBSTR() functions to extract character by character' },
      { id: 3, cost: 30, text: 'The flag format is FLAG{...}. Look for the admin password in the users table.' },
    ],
    resources: [
      { title: 'OWASP SQL Injection', url: 'https://owasp.org/www-community/attacks/SQL_Injection' },
      { title: 'Blind SQL Injection Guide', url: '#' },
      { title: 'SQL Cheat Sheet', url: '#' },
    ],
    correctFlag: 'FLAG{BLIND_SQL_1NJ3CT10N}',
  };

  const handleValidateFlag = () => {
    const isCorrect = flagInput.trim() === challenge.correctFlag;
    
    setAttempts([...attempts, {
      flag: flagInput,
      correct: isCorrect,
      timestamp: new Date(),
    }]);

    if (isCorrect) {
      setShowCompletionModal(true);
      toast.success('🎉 Flag correct! Challenge completed!');
    } else {
      toast.error('❌ Incorrect flag. Try again!');
    }

    setFlagInput('');
  };

  const revealHint = (hintId: number, cost: number) => {
    if (!hintsRevealed.includes(hintId)) {
      setHintsRevealed([...hintsRevealed, hintId]);
      toast.info(`Hint revealed! -${cost} points`);
    }
  };

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-[#24eef7] hover:text-[#48e5c2] hover:bg-[#111111]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-white">{challenge.title}</h1>
              <Badge className={`${getDifficultyColor(challenge.difficulty)} bg-transparent`}>
                {challenge.difficulty}
              </Badge>
            </div>
            <p className="text-[#c9c9c9]">{challenge.category} • {challenge.points} points</p>
          </div>
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Information */}
        <div className="lg:col-span-3">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6 sticky top-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#0c0c0c]">
                <TabsTrigger value="description" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
                  <BookOpen className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="hints" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
                  <Lightbulb className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
                  <Code className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-[#24eef7] data-[state=active]:text-black">
                  <StickyNote className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-white mb-2">Description</h3>
                  <p className="text-[#c9c9c9] text-sm whitespace-pre-line">{challenge.description}</p>
                </div>
                <div>
                  <h3 className="text-white mb-2">Objective</h3>
                  <p className="text-[#24eef7] text-sm">{challenge.objective}</p>
                </div>
              </TabsContent>

              <TabsContent value="hints" className="space-y-3 mt-4">
                <h3 className="text-white mb-2">Hints</h3>
                {challenge.hints.map((hint) => {
                  const isRevealed = hintsRevealed.includes(hint.id);
                  return (
                    <div
                      key={hint.id}
                      className="bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-3"
                    >
                      {isRevealed ? (
                        <p className="text-[#c9c9c9] text-sm">{hint.text}</p>
                      ) : (
                        <Button
                          onClick={() => revealHint(hint.id, hint.cost)}
                          variant="outline"
                          className="w-full border-[#ffd54f] text-[#ffd54f] hover:bg-[#ffd54f] hover:text-black"
                        >
                          Reveal Hint ({hint.cost} pts)
                        </Button>
                      )}
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="resources" className="space-y-3 mt-4">
                <h3 className="text-white mb-2">Resources</h3>
                {challenge.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-3 hover:border-[#24eef7]/50 transition-all"
                  >
                    <p className="text-[#24eef7] text-sm">{resource.title}</p>
                  </a>
                ))}
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <h3 className="text-white mb-2">Personal Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                  className="w-full h-64 bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-3 text-white placeholder:text-[#c9c9c9]/50 focus:border-[#24eef7] focus:outline-none resize-none font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Center Panel - Practice Area */}
        <div className="lg:col-span-6">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
            <h3 className="text-white mb-4">Vulnerable Application</h3>
            
            {/* Simulated vulnerable app */}
            <div className="bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-6 mb-6">
              <div className="bg-white text-black p-6 rounded-lg">
                <h2 className="mb-4">Product Search</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Search
                </button>
                <div className="mt-6 p-4 bg-gray-100 rounded">
                  <p className="text-sm text-gray-600">Search results will appear here...</p>
                </div>
              </div>
            </div>

            {/* Interactive Console */}
            <div>
              <h3 className="text-white mb-3">SQL Payload Console</h3>
              <div className="bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-4 font-mono">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#48e5c2]">$</span>
                  <input
                    type="text"
                    placeholder="Enter your SQL payload..."
                    className="flex-1 bg-transparent text-white placeholder:text-[#c9c9c9]/50 focus:outline-none"
                  />
                </div>
                <div className="text-[#c9c9c9] text-sm mt-4">
                  <p className="mb-1">&gt; Testing payload...</p>
                  <p className="text-[#3ef587]">&gt; Response: 200 OK</p>
                </div>
              </div>
            </div>

            {/* Source Code View */}
            <div className="mt-6">
              <h3 className="text-white mb-3">Vulnerable Code</h3>
              <div className="bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-[#c9c9c9]">
                  <code>
{`// Vulnerable PHP code
$search = $_GET['search'];
$query = "SELECT * FROM products 
          WHERE name LIKE '%$search%'";
$result = mysqli_query($conn, $query);`}
                  </code>
                </pre>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Validation */}
        <div className="lg:col-span-3">
          <Card className="bg-[#111111] border-[#24eef7]/20 p-6 sticky top-6">
            <h3 className="text-white mb-4">Submit Flag</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[#c9c9c9] text-sm mb-2 block">Flag Format: FLAG{`{...}`}</label>
                <div className="flex gap-2">
                  <Input
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="Enter flag..."
                    className="bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50 font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && handleValidateFlag()}
                  />
                  <Button
                    onClick={handleValidateFlag}
                    disabled={!flagInput.trim()}
                    className="bg-[#24eef7] hover:bg-[#48e5c2] text-black"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Attempts */}
              <div>
                <h4 className="text-white text-sm mb-2">Attempts ({attempts.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {attempts.map((attempt, index) => (
                    <div
                      key={index}
                      className={`bg-[#0c0c0c] border rounded-lg p-2 ${
                        attempt.correct ? 'border-[#3ef587]' : 'border-[#ff3b3b]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {attempt.correct ? (
                          <CheckCircle2 className="w-4 h-4 text-[#3ef587]" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#ff3b3b]" />
                        )}
                        <span className="text-white text-xs font-mono truncate flex-1">
                          {attempt.flag}
                        </span>
                      </div>
                      <p className="text-[#c9c9c9] text-xs">
                        {attempt.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-[#24eef7]/20">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-[#0c0c0c] rounded-lg p-3">
                    <Clock className="w-5 h-5 text-[#24eef7] mx-auto mb-1" />
                    <p className="text-white text-sm">12:34</p>
                    <p className="text-[#c9c9c9] text-xs">Time</p>
                  </div>
                  <div className="bg-[#0c0c0c] rounded-lg p-3">
                    <Trophy className="w-5 h-5 text-[#ffd54f] mx-auto mb-1" />
                    <p className="text-white text-sm">{challenge.points}</p>
                    <p className="text-[#c9c9c9] text-xs">Points</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Completion Modal */}
      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="bg-[#111111] border-[#24eef7]/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#24eef7] to-[#b59efe] mx-auto mb-4 flex items-center justify-center glow-cyan">
                <Trophy className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-[#24eef7]">Challenge Completed!</h2>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Star className="w-8 h-8 text-[#ffd54f] mx-auto mb-2" />
                <p className="text-white">+{challenge.points}</p>
                <p className="text-[#c9c9c9] text-sm">Points</p>
              </div>
              <div>
                <Clock className="w-8 h-8 text-[#48e5c2] mx-auto mb-2" />
                <p className="text-white">12:34</p>
                <p className="text-[#c9c9c9] text-sm">Time</p>
              </div>
              <div>
                <Trophy className="w-8 h-8 text-[#b59efe] mx-auto mb-2" />
                <p className="text-white">SQL Master</p>
                <p className="text-[#c9c9c9] text-sm">Badge</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCompletionModal(false)}
                variant="outline"
                className="flex-1 border-[#24eef7] text-[#24eef7] hover:bg-[#24eef7] hover:text-black"
              >
                View Explanation
              </Button>
              <Button
                onClick={onBack}
                className="flex-1 bg-[#24eef7] hover:bg-[#48e5c2] text-black"
              >
                Next Challenge
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
