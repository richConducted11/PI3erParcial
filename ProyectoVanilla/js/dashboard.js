// ===== Dashboard View =====

function renderDashboard(user, onNavigate) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  // Welcome section
  const welcomeSection = createElement('div', 'dashboard-section');
  const welcomeTitle = createElement('h1', '', `Welcome back, ${user.name}!`);
  welcomeTitle.style.color = 'var(--foreground)';
  welcomeTitle.style.marginBottom = '0.5rem';
  
  const welcomeSubtitle = createElement('p');
  welcomeSubtitle.style.color = 'var(--muted-foreground)';
  welcomeSubtitle.textContent = 'Ready to sharpen your cybersecurity skills today?';
  
  welcomeSection.appendChild(welcomeTitle);
  welcomeSection.appendChild(welcomeSubtitle);
  
  // Stats cards
  const statsGrid = createElement('div', 'stats-grid');
  
  const statCards = [
    { label: 'Total Points', value: user.points, icon: 'trophy', color: '[#24eef7]' },
    { label: 'Challenges Completed', value: user.completedChallenges, icon: 'target', color: '[#48e5c2]' },
    { label: 'Current Streak', value: `${user.streak} days`, icon: 'flame', color: '[#b59efe]' },
    { label: 'Global Rank', value: `#${user.rank}`, icon: 'award', color: '[#ffd54f]' },
  ];
  
  statCards.forEach(stat => {
    const card = createCard('stat-card');
    card.style.border = `1px solid rgba(36, 238, 247, 0.2)`;
    card.style.backgroundColor = 'var(--card)';
    
    const content = createElement('div');
    const label = createElement('p');
    label.style.color = 'var(--muted-foreground)';
    label.style.fontSize = '0.875rem';
    label.style.marginBottom = '0.25rem';
    label.textContent = stat.label;
    
    const value = createElement('h2');
    value.style.color = stat.color;
    value.textContent = typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value;
    
    content.appendChild(label);
    content.appendChild(value);
    
    const iconContainer = createElement('div', 'stat-icon');
    iconContainer.style.backgroundColor = `${stat.color.replace('[', 'rgba(').replace(']', ', 0.1)')}`;
    const icon = createIcon(stat.icon, 'sidebar-icon');
    icon.style.color = stat.color;
    iconContainer.appendChild(icon);
    
    card.appendChild(content);
    card.appendChild(iconContainer);
    
    statsGrid.appendChild(card);
  });
  
  // Continue challenge section
  const continueSection = createElement('div', 'dashboard-section');
  continueSection.style.marginTop = '1.5rem';
  
  const continueCard = createCard();
  continueCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  continueCard.style.backgroundColor = 'var(--card)';
  
  const continueHeader = createElement('div');
  continueHeader.style.display = 'flex';
  continueHeader.style.alignItems = 'center';
  continueHeader.style.justifyContent = 'space-between';
  continueHeader.style.marginBottom = '1rem';
  
  const continueTitle = createElement('h3', '', 'Continue Where You Left Off');
  continueTitle.style.color = 'var(--foreground)';
  const playIcon = createIcon('playCircle', 'sidebar-icon');
  playIcon.style.color = 'var(--primary)';
  
  continueHeader.appendChild(continueTitle);
  continueHeader.appendChild(playIcon);
  
  const continueChallenge = {
    id: '4',
    title: 'CSRF Token Bypass',
    difficulty: 'Medium',
    points: 180,
    category: 'CSRF',
    progress: 65,
  };
  
  const challengeItem = createChallengeItem(continueChallenge, (id) => onNavigate('challenge-view', id));
  
  const continueBtn = createButton('Continue Challenge', 'btn-primary btn-full glow-cyan');
  continueBtn.addEventListener('click', () => onNavigate('challenge-view', continueChallenge.id));
  challengeItem.appendChild(continueBtn);
  
  continueCard.appendChild(continueHeader);
  continueCard.appendChild(challengeItem);
  continueSection.appendChild(continueCard);
  
  // Recommended challenges section
  const recommendedSection = createElement('div', 'dashboard-section');
  recommendedSection.style.marginTop = '1.5rem';
  
  const recommendedCard = createCard();
  recommendedCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  recommendedCard.style.backgroundColor = 'var(--card)';
  
  const recommendedHeader = createSectionHeader('Recommended for You', 'View All', () => onNavigate('challenges'));
  
  const recommendedChallenges = [
    { id: '1', title: 'Blind SQL Injection', difficulty: 'Medium', points: 150, category: 'SQL Injection', status: 'available' },
    { id: '2', title: 'Stored XSS Attack', difficulty: 'Hard', points: 200, category: 'XSS', status: 'available' },
    { id: '3', title: 'JWT Token Manipulation', difficulty: 'Expert', points: 300, category: 'Authentication', status: 'locked' },
  ];
  
  const challengeList = createElement('div', 'challenge-list');
  recommendedChallenges.forEach(challenge => {
    const item = createChallengeItem(challenge, (id) => {
      if (challenge.status === 'available') {
        onNavigate('challenge-view', id);
      }
    });
    challengeList.appendChild(item);
  });
  
  recommendedCard.appendChild(recommendedHeader);
  recommendedCard.appendChild(challengeList);
  recommendedSection.appendChild(recommendedCard);
  
  // Leaderboard section
  const leaderboardSection = createElement('div', 'dashboard-section');
  leaderboardSection.style.marginTop = '1.5rem';
  
  const leaderboardCard = createCard();
  leaderboardCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  leaderboardCard.style.backgroundColor = 'var(--card)';
  
  const leaderboardHeader = createSectionHeader('Top Hackers', 'View All', () => onNavigate('leaderboard'));
  
  const leaderboard = [
    { rank: 1, name: 'CyberNinja', points: 8420, avatar: getAvatarUrl('CyberNinja') },
    { rank: 2, name: 'HackMaster', points: 7890, avatar: getAvatarUrl('HackMaster') },
    { rank: 3, name: 'SecureCode', points: 7150, avatar: getAvatarUrl('SecureCode') },
    { rank: 4, name: 'ByteBreaker', points: 6820, avatar: getAvatarUrl('ByteBreaker') },
    { rank: 5, name: 'SQLSlayer', points: 6340, avatar: getAvatarUrl('SQLSlayer') },
  ];
  
  const leaderboardList = createElement('div', 'leaderboard-list');
  leaderboard.forEach(player => {
    const item = createLeaderboardItem(player, () => {
      showToast(`Viewing ${player.name}'s profile`, 'info');
    });
    leaderboardList.appendChild(item);
  });
  
  leaderboardCard.appendChild(leaderboardHeader);
  leaderboardCard.appendChild(leaderboardList);
  leaderboardSection.appendChild(leaderboardCard);
  
  // Security tips section
  const tipsSection = createElement('div', 'dashboard-section');
  tipsSection.style.marginTop = '1.5rem';
  
  const tipsCard = createCard();
  tipsCard.style.border = '1px solid rgba(62, 245, 135, 0.2)';
  tipsCard.style.backgroundColor = 'var(--card)';
  
  const tipsTitle = createElement('h3', '', 'Security Tips');
  tipsTitle.style.color = 'var(--foreground)';
  tipsTitle.style.marginBottom = '1rem';
  
  const tips = [
    'Always validate and sanitize user input',
    'Use parameterized queries to prevent SQL injection',
    'Implement proper CSRF tokens in forms',
  ];
  
  const tipsList = createElement('div');
  tipsList.style.display = 'flex';
  tipsList.style.flexDirection = 'column';
  tipsList.style.gap = '0.75rem';
  
  tips.forEach(tip => {
    const tipItem = createElement('div');
    tipItem.style.display = 'flex';
    tipItem.style.gap = '0.5rem';
    
    const checkIcon = createIcon('checkCircle', 'sidebar-icon');
    checkIcon.style.color = 'var(--success)';
    checkIcon.style.flexShrink = '0';
    checkIcon.style.marginTop = '0.125rem';
    
    const tipText = createElement('p');
    tipText.style.color = 'var(--muted-foreground)';
    tipText.style.fontSize = '0.875rem';
    tipText.textContent = tip;
    
    tipItem.appendChild(checkIcon);
    tipItem.appendChild(tipText);
    tipsList.appendChild(tipItem);
  });
  
  tipsCard.appendChild(tipsTitle);
  tipsCard.appendChild(tipsList);
  tipsSection.appendChild(tipsCard);
  
  // Append all sections
  container.appendChild(welcomeSection);
  container.appendChild(statsGrid);
  container.appendChild(continueSection);
  container.appendChild(recommendedSection);
  container.appendChild(leaderboardSection);
  container.appendChild(tipsSection);
}
