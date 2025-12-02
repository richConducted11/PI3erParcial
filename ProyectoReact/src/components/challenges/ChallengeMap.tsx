import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Lock, CheckCircle2, PlayCircle, Circle } from 'lucide-react';

type ChallengeNode = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  category: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  prerequisites: string[];
  x: number;
  y: number;
};

type ChallengeMapProps = {
  onSelectChallenge: (id: string) => void;
};

export function ChallengeMap({ onSelectChallenge }: ChallengeMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories', color: '#24eef7' },
    { id: 'sql', label: 'SQL Injection', color: '#ff3b3b' },
    { id: 'xss', label: 'XSS', color: '#ffd54f' },
    { id: 'csrf', label: 'CSRF', color: '#3ef587' },
    { id: 'auth', label: 'Authentication', color: '#b59efe' },
    { id: 'path', label: 'Path Traversal', color: '#48e5c2' },
    { id: 'command', label: 'Command Injection', color: '#ff9800' },
  ];

  const challenges: ChallengeNode[] = [
    // SQL Injection Path
    { id: '1', title: 'Basic SQL Injection', difficulty: 'Easy', points: 100, category: 'sql', status: 'completed', prerequisites: [], x: 100, y: 100 },
    { id: '2', title: 'Blind SQL Injection', difficulty: 'Medium', points: 150, category: 'sql', status: 'in-progress', prerequisites: ['1'], x: 250, y: 100 },
    { id: '3', title: 'Advanced SQL Injection', difficulty: 'Hard', points: 200, category: 'sql', status: 'available', prerequisites: ['2'], x: 400, y: 100 },
    { id: '4', title: 'SQL Injection Master', difficulty: 'Expert', points: 300, category: 'sql', status: 'locked', prerequisites: ['3'], x: 550, y: 100 },

    // XSS Path
    { id: '5', title: 'Reflected XSS', difficulty: 'Easy', points: 100, category: 'xss', status: 'completed', prerequisites: [], x: 100, y: 250 },
    { id: '6', title: 'Stored XSS', difficulty: 'Medium', points: 150, category: 'xss', status: 'available', prerequisites: ['5'], x: 250, y: 250 },
    { id: '7', title: 'DOM-based XSS', difficulty: 'Hard', points: 200, category: 'xss', status: 'locked', prerequisites: ['6'], x: 400, y: 250 },

    // CSRF Path
    { id: '8', title: 'Basic CSRF', difficulty: 'Easy', points: 100, category: 'csrf', status: 'completed', prerequisites: [], x: 100, y: 400 },
    { id: '9', title: 'CSRF Token Bypass', difficulty: 'Medium', points: 180, category: 'csrf', status: 'in-progress', prerequisites: ['8'], x: 250, y: 400 },
    { id: '10', title: 'Advanced CSRF', difficulty: 'Hard', points: 220, category: 'csrf', status: 'locked', prerequisites: ['9'], x: 400, y: 400 },

    // Authentication Path
    { id: '11', title: 'Weak Passwords', difficulty: 'Easy', points: 90, category: 'auth', status: 'completed', prerequisites: [], x: 550, y: 250 },
    { id: '12', title: 'JWT Manipulation', difficulty: 'Medium', points: 170, category: 'auth', status: 'available', prerequisites: ['11'], x: 700, y: 250 },
    { id: '13', title: 'Session Hijacking', difficulty: 'Hard', points: 210, category: 'auth', status: 'locked', prerequisites: ['12'], x: 850, y: 250 },

    // Path Traversal
    { id: '14', title: 'Directory Traversal', difficulty: 'Easy', points: 110, category: 'path', status: 'available', prerequisites: [], x: 250, y: 550 },
    { id: '15', title: 'File Inclusion', difficulty: 'Medium', points: 160, category: 'path', status: 'locked', prerequisites: ['14'], x: 400, y: 550 },

    // Command Injection
    { id: '16', title: 'OS Command Injection', difficulty: 'Medium', points: 180, category: 'command', status: 'locked', prerequisites: ['15'], x: 550, y: 550 },
    { id: '17', title: 'Remote Code Execution', difficulty: 'Expert', points: 350, category: 'command', status: 'locked', prerequisites: ['16'], x: 700, y: 550 },
  ];

  const filteredChallenges = selectedCategory === 'all'
    ? challenges
    : challenges.filter(c => c.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-[#3ef587]" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-[#24eef7]" />;
      case 'available':
        return <Circle className="w-5 h-5 text-[#ffd54f]" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-[#c9c9c9]" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#3ef587';
      case 'Medium': return '#ffd54f';
      case 'Hard': return '#ff3b3b';
      case 'Expert': return '#b59efe';
      default: return '#c9c9c9';
    }
  };

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.id === category)?.color || '#24eef7';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">Challenge Map</h1>
        <p className="text-[#c9c9c9]">Navigate through challenges and unlock new skills</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#24eef7]/10 border-[#24eef7] text-[#24eef7]'
                : 'bg-[#111111] border-[#24eef7]/20 text-[#c9c9c9] hover:border-[#24eef7]/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Challenge Map Visualization */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <div className="relative w-full h-[700px] bg-[#0c0c0c] rounded-lg overflow-auto">
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '900px', minHeight: '700px' }}>
            {filteredChallenges.map((challenge) => {
              return challenge.prerequisites.map((prereqId) => {
                const prereq = challenges.find(c => c.id === prereqId);
                if (!prereq) return null;
                
                return (
                  <line
                    key={`${prereqId}-${challenge.id}`}
                    x1={prereq.x + 60}
                    y1={prereq.y + 40}
                    x2={challenge.x}
                    y2={challenge.y + 40}
                    stroke={getCategoryColor(challenge.category)}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                );
              });
            })}
          </svg>

          {/* Challenge Nodes */}
          {filteredChallenges.map((challenge) => {
            const isHovered = hoveredNode === challenge.id;
            const canClick = challenge.status !== 'locked';

            return (
              <div
                key={challenge.id}
                className={`absolute transition-all ${canClick ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                style={{
                  left: `${challenge.x}px`,
                  top: `${challenge.y}px`,
                  width: '120px',
                }}
                onMouseEnter={() => setHoveredNode(challenge.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => canClick && onSelectChallenge(challenge.id)}
              >
                <div
                  className={`bg-[#111111] border-2 rounded-lg p-3 transition-all ${
                    isHovered && canClick ? 'scale-110 glow-cyan' : ''
                  }`}
                  style={{
                    borderColor: getCategoryColor(challenge.category),
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    {getStatusIcon(challenge.status)}
                    <Badge
                      className="text-xs px-1.5 py-0.5 bg-transparent"
                      style={{
                        color: getDifficultyColor(challenge.difficulty),
                        borderColor: getDifficultyColor(challenge.difficulty),
                      }}
                    >
                      {challenge.difficulty[0]}
                    </Badge>
                  </div>
                  <h4 className="text-white text-xs mb-1 line-clamp-2">{challenge.title}</h4>
                  <p className="text-[#24eef7] text-xs">{challenge.points} pts</p>
                </div>

                {/* Hover Tooltip */}
                {isHovered && (
                  <div className="absolute left-full ml-2 top-0 w-64 bg-[#0c0c0c] border border-[#24eef7]/30 rounded-lg p-4 z-10 glow-cyan">
                    <h4 className="text-white mb-2">{challenge.title}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[#c9c9c9]">Difficulty:</span>
                        <Badge
                          className="text-xs bg-transparent"
                          style={{
                            color: getDifficultyColor(challenge.difficulty),
                            borderColor: getDifficultyColor(challenge.difficulty),
                          }}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#c9c9c9]">Points:</span>
                        <span className="text-[#24eef7]">{challenge.points}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#c9c9c9]">Category:</span>
                        <span className="text-white text-xs">{categories.find(c => c.id === challenge.category)?.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#c9c9c9]">Status:</span>
                        <span className="text-white text-xs capitalize">{challenge.status.replace('-', ' ')}</span>
                      </div>
                      {challenge.prerequisites.length > 0 && (
                        <div className="pt-2 border-t border-[#24eef7]/20">
                          <span className="text-[#c9c9c9] text-xs">
                            Prerequisites: {challenge.prerequisites.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <h3 className="text-white mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#3ef587]" />
            <span className="text-[#c9c9c9]">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-[#24eef7]" />
            <span className="text-[#c9c9c9]">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-[#ffd54f]" />
            <span className="text-[#c9c9c9]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#c9c9c9]" />
            <span className="text-[#c9c9c9]">Locked</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
