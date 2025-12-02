// ===== Progress View =====

function renderProgress(user) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  const title = createElement('h1', '', 'My Progress');
  title.style.color = 'var(--foreground)';
  title.style.marginBottom = '1.5rem';
  
  // Level progress
  const levelCard = createCard();
  levelCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  levelCard.style.marginBottom = '1.5rem';
  
  const levelTitle = createElement('h3', '', `Level ${user.level}`);
  levelTitle.style.color = 'var(--primary)';
  levelTitle.style.marginBottom = '1rem';
  
  const levelProgress = createElement('div');
  levelProgress.style.marginBottom = '0.5rem';
  
  const progressLabel = createElement('div');
  progressLabel.style.display = 'flex';
  progressLabel.style.justifyContent = 'space-between';
  progressLabel.style.marginBottom = '0.5rem';
  progressLabel.style.color = 'var(--muted-foreground)';
  progressLabel.style.fontSize = '0.875rem';
  
  const currentPoints = user.points;
  const nextLevelPoints = (user.level + 1) * 300;
  const levelProgressPercent = Math.min((currentPoints % 300) / 300 * 100, 100);
  
  progressLabel.innerHTML = `<span>Progress to Level ${user.level + 1}</span><span>${currentPoints % 300}/${300} XP</span>`;
  
  const progressBar = createProgressBar(levelProgressPercent);
  
  levelProgress.appendChild(progressLabel);
  levelProgress.appendChild(progressBar);
  
  levelCard.appendChild(levelTitle);
  levelCard.appendChild(levelProgress);
  
  // Stats overview
  const statsCard = createCard();
  statsCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  
  const statsTitle = createElement('h3', '', 'Statistics');
  statsTitle.style.color = 'var(--foreground)';
  statsTitle.style.marginBottom = '1rem';
  
  const statsGrid = createElement('div', 'grid grid-cols-2');
  statsGrid.style.gap = '1rem';
  
  const stats = [
    { label: 'Total Points', value: formatNumber(user.points) },
    { label: 'Challenges Completed', value: user.completedChallenges },
    { label: 'Current Streak', value: `${user.streak} days` },
    { label: 'Global Rank', value: `#${user.rank}` },
  ];
  
  stats.forEach(stat => {
    const statItem = createElement('div');
    statItem.style.padding = '1rem';
    statItem.style.backgroundColor = 'var(--input)';
    statItem.style.borderRadius = 'var(--radius)';
    
    const statLabel = createElement('p');
    statLabel.style.color = 'var(--muted-foreground)';
    statLabel.style.fontSize = '0.875rem';
    statLabel.style.marginBottom = '0.25rem';
    statLabel.textContent = stat.label;
    
    const statValue = createElement('p');
    statValue.style.color = 'var(--primary)';
    statValue.style.fontSize = '1.25rem';
    statValue.style.fontWeight = '600';
    statValue.textContent = stat.value;
    
    statItem.appendChild(statLabel);
    statItem.appendChild(statValue);
    
    statsGrid.appendChild(statItem);
  });
  
  statsCard.appendChild(statsTitle);
  statsCard.appendChild(statsGrid);
  
  container.appendChild(title);
  container.appendChild(levelCard);
  container.appendChild(statsCard);
}
