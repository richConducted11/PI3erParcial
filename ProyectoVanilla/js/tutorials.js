// ===== Tutorials View =====

function renderTutorials(onSelectTutorial) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  const title = createElement('h1', '', 'Tutorials');
  title.style.color = 'var(--foreground)';
  title.style.marginBottom = '1.5rem';
  
  const tutorials = [
    { id: '1', title: 'Introduction to SQL Injection', duration: '15 min', difficulty: 'Beginner' },
    { id: '2', title: 'XSS Attack Fundamentals', duration: '20 min', difficulty: 'Beginner' },
    { id: '3', title: 'CSRF Protection Techniques', duration: '25 min', difficulty: 'Intermediate' },
    { id: '4', title: 'Advanced Authentication Bypass', duration: '30 min', difficulty: 'Advanced' },
  ];
  
  const grid = createElement('div', 'grid grid-cols-1');
  grid.style.gap = '1rem';
  
  tutorials.forEach(tutorial => {
    const card = createCard();
    card.style.cursor = 'pointer';
    card.style.border = '1px solid rgba(36, 238, 247, 0.2)';
    card.style.transition = 'all 0.2s ease';
    
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(36, 238, 247, 0.4)';
      card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'rgba(36, 238, 247, 0.2)';
      card.style.transform = 'translateY(0)';
    });
    
    const tutorialTitle = createElement('h3', '', tutorial.title);
    tutorialTitle.style.color = 'var(--foreground)';
    tutorialTitle.style.marginBottom = '0.5rem';
    
    const meta = createElement('div');
    meta.style.display = 'flex';
    meta.style.gap = '1rem';
    meta.style.color = 'var(--muted-foreground)';
    meta.style.fontSize = '0.875rem';
    
    const duration = createElement('span', '', `⏱️ ${tutorial.duration}`);
    const difficulty = createBadge(tutorial.difficulty, getDifficultyClass(tutorial.difficulty));
    
    meta.appendChild(duration);
    meta.appendChild(difficulty);
    
    card.appendChild(tutorialTitle);
    card.appendChild(meta);
    
    card.addEventListener('click', () => onSelectTutorial(tutorial.id));
    
    grid.appendChild(card);
  });
  
  container.appendChild(title);
  container.appendChild(grid);
}
