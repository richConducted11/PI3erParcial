// ===== Challenges Views =====

function renderChallenges(onSelectChallenge) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  const title = createElement('h1', '', 'Challenges');
  title.style.color = 'var(--foreground)';
  title.style.marginBottom = '1.5rem';
  
  const challenges = [
    { id: '1', title: 'SQL Injection Basics', difficulty: 'Easy', points: 100, category: 'SQL Injection', status: 'completed' },
    { id: '2', title: 'Blind SQL Injection', difficulty: 'Medium', points: 150, category: 'SQL Injection', status: 'available' },
    { id: '3', title: 'Reflected XSS', difficulty: 'Easy', points: 80, category: 'XSS', status: 'available' },
    { id: '4', title: 'Stored XSS Attack', difficulty: 'Hard', points: 200, category: 'XSS', status: 'available' },
    { id: '5', title: 'CSRF Token Bypass', difficulty: 'Medium', points: 180, category: 'CSRF', status: 'in-progress', progress: 65 },
    { id: '6', title: 'JWT Token Manipulation', difficulty: 'Expert', points: 300, category: 'Authentication', status: 'locked' },
  ];
  
  const grid = createElement('div', 'grid grid-cols-1');
  grid.style.gap = '1rem';
  
  challenges.forEach(challenge => {
    const item = createChallengeItem(challenge, onSelectChallenge);
    grid.appendChild(item);
  });
  
  container.appendChild(title);
  container.appendChild(grid);
}

function renderChallengeView(challengeId, onBack) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  const backBtn = createButton('← Back to Challenges', 'btn-ghost', onBack);
  
  const title = createElement('h1', '', 'Challenge: SQL Injection Basics');
  title.style.color = 'var(--foreground)';
  title.style.marginTop = '1rem';
  title.style.marginBottom = '1rem';
  
  const card = createCard();
  card.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  card.innerHTML = `
    <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
      This challenge tests your understanding of SQL injection vulnerabilities. 
      Your goal is to exploit a login form to gain unauthorized access.
    </p>
    <div style="background: var(--input); padding: 1rem; border-radius: var(--radius); font-family: monospace;">
      <p style="color: var(--success);">Target: http://vulnerable-site.com/login</p>
      <p style="color: var(--warning); margin-top: 0.5rem;">Hint: Try using ' OR '1'='1</p>
    </div>
  `;
  
  container.appendChild(backBtn);
  container.appendChild(title);
  container.appendChild(card);
}
