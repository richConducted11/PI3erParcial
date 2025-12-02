import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { BookOpen, Search, Clock, ChevronLeft, ChevronRight, CheckCircle2, Play } from 'lucide-react';

type TutorialsProps = {
  selectedTutorialId?: string;
  onSelectTutorial: (id: string) => void;
};

export function Tutorials({ selectedTutorialId, onSelectTutorial }: TutorialsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tutorials = [
    { id: '1', title: 'Introduction to Web Security', category: 'fundamentals', level: 'Beginner', duration: '45 min', completed: true, description: 'Learn the basics of web security and common vulnerabilities.' },
    { id: '2', title: 'SQL Injection Fundamentals', category: 'sql', level: 'Beginner', duration: '60 min', completed: true, description: 'Understanding SQL injection attacks and prevention techniques.' },
    { id: '3', title: 'Advanced SQL Injection', category: 'sql', level: 'Intermediate', duration: '90 min', completed: false, description: 'Deep dive into blind SQL injection and advanced exploitation.' },
    { id: '4', title: 'Cross-Site Scripting (XSS)', category: 'xss', level: 'Beginner', duration: '50 min', completed: true, description: 'Learn about reflected, stored, and DOM-based XSS attacks.' },
    { id: '5', title: 'XSS Exploitation Techniques', category: 'xss', level: 'Advanced', duration: '75 min', completed: false, description: 'Advanced XSS payloads and bypass techniques.' },
    { id: '6', title: 'CSRF Attacks Explained', category: 'csrf', level: 'Intermediate', duration: '40 min', completed: false, description: 'Understanding Cross-Site Request Forgery and mitigation.' },
    { id: '7', title: 'OWASP Top 10 Overview', category: 'owasp', level: 'Beginner', duration: '120 min', completed: false, description: 'Comprehensive overview of the OWASP Top 10 vulnerabilities.' },
    { id: '8', title: 'Burp Suite Essentials', category: 'tools', level: 'Intermediate', duration: '90 min', completed: false, description: 'Master the essential features of Burp Suite for web testing.' },
  ];

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'sql', label: 'SQL Injection' },
    { id: 'xss', label: 'XSS' },
    { id: 'csrf', label: 'CSRF' },
    { id: 'owasp', label: 'OWASP Top 10' },
    { id: 'tools', label: 'Tools' },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-[#3ef587] border-[#3ef587]';
      case 'Intermediate': return 'text-[#ffd54f] border-[#ffd54f]';
      case 'Advanced': return 'text-[#ff3b3b] border-[#ff3b3b]';
      default: return 'text-[#c9c9c9] border-[#c9c9c9]';
    }
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // If a tutorial is selected, show the tutorial view
  if (selectedTutorialId) {
    const tutorial = tutorials.find(t => t.id === selectedTutorialId);
    if (!tutorial) return null;

    const currentIndex = tutorials.findIndex(t => t.id === selectedTutorialId);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < tutorials.length - 1;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => onSelectTutorial('')}
            variant="ghost"
            className="text-[#24eef7] hover:text-[#48e5c2] hover:bg-[#111111]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Tutorials
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => hasPrevious && onSelectTutorial(tutorials[currentIndex - 1].id)}
              disabled={!hasPrevious}
              variant="outline"
              className="border-[#24eef7] text-[#24eef7] disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={() => hasNext && onSelectTutorial(tutorials[currentIndex + 1].id)}
              disabled={!hasNext}
              variant="outline"
              className="border-[#24eef7] text-[#24eef7] disabled:opacity-30"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <Card className="bg-[#111111] border-[#24eef7]/20 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-white">{tutorial.title}</h1>
              <Badge className={`${getLevelColor(tutorial.level)} bg-transparent`}>
                {tutorial.level}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-[#c9c9c9]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{tutorial.duration}</span>
              </div>
              <span>•</span>
              <span className="capitalize">{tutorial.category}</span>
            </div>
          </div>

          {/* Video/Presentation Area */}
          <div className="bg-[#0c0c0c] rounded-lg aspect-video mb-6 flex items-center justify-center border border-[#24eef7]/20">
            <div className="text-center">
              <Play className="w-16 h-16 text-[#24eef7] mx-auto mb-4" />
              <p className="text-[#c9c9c9]">Video content would be embedded here</p>
            </div>
          </div>

          {/* Tutorial Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-white mb-3">About This Tutorial</h2>
              <p className="text-[#c9c9c9]">{tutorial.description}</p>
            </div>

            <div>
              <h2 className="text-white mb-3">Code Example</h2>
              <div className="bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-4 font-mono text-sm">
                <pre className="text-[#c9c9c9]">
                  <code>{`// Vulnerable code example
function searchProducts(userInput) {
  const query = \`SELECT * FROM products 
                 WHERE name LIKE '%\${userInput}%'\`;
  return db.query(query);
}

// Secure code example
function searchProducts(userInput) {
  const query = 'SELECT * FROM products WHERE name LIKE ?';
  return db.query(query, ['%' + userInput + '%']);
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-white mb-3">Key Takeaways</h2>
              <ul className="space-y-2">
                {['Always validate and sanitize user input', 'Use parameterized queries', 'Implement proper error handling', 'Follow the principle of least privilege'].map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3ef587] mt-0.5 flex-shrink-0" />
                    <span className="text-[#c9c9c9]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-white mb-3">Related Challenges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Basic SQL Injection', 'Blind SQL Injection'].map((challenge, i) => (
                  <div key={i} className="bg-[#0c0c0c] border border-[#24eef7]/20 rounded-lg p-4 hover:border-[#24eef7]/50 transition-all cursor-pointer">
                    <h4 className="text-white mb-1">{challenge}</h4>
                    <p className="text-[#c9c9c9] text-sm">Complete this challenge to practice</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-[#24eef7] hover:bg-[#48e5c2] text-black"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Completed
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Tutorial library view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white mb-2">Tutorials</h1>
        <p className="text-[#c9c9c9]">Learn cybersecurity concepts through comprehensive guides</p>
      </div>

      {/* Search and Filter */}
      <Card className="bg-[#111111] border-[#24eef7]/20 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#48e5c2]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials..."
              className="pl-10 bg-[#0c0c0c] border-[#24eef7]/30 text-white placeholder:text-[#c9c9c9]/50"
            />
          </div>
        </div>
      </Card>

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

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <Card
            key={tutorial.id}
            onClick={() => onSelectTutorial(tutorial.id)}
            className="bg-[#111111] border-[#24eef7]/20 p-6 hover:border-[#24eef7]/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#24eef7]/10 flex items-center justify-center group-hover:bg-[#24eef7]/20 transition-colors">
                <BookOpen className="w-6 h-6 text-[#24eef7]" />
              </div>
              {tutorial.completed && (
                <CheckCircle2 className="w-5 h-5 text-[#3ef587]" />
              )}
            </div>

            <h3 className="text-white mb-2 group-hover:text-[#24eef7] transition-colors">
              {tutorial.title}
            </h3>
            <p className="text-[#c9c9c9] text-sm mb-4 line-clamp-2">
              {tutorial.description}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <Badge className={`${getLevelColor(tutorial.level)} bg-transparent text-xs`}>
                {tutorial.level}
              </Badge>
              <div className="flex items-center gap-1 text-[#c9c9c9] text-xs">
                <Clock className="w-3 h-3" />
                <span>{tutorial.duration}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-[#24eef7] text-[#24eef7] hover:bg-[#24eef7] hover:text-black"
            >
              {tutorial.completed ? 'Review' : 'Start Learning'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
