// ===== Leaderboard View =====

function renderLeaderboard(currentUser) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  const title = createElement('h1', '', 'Leaderboard');
  title.style.color = 'var(--foreground)';
  title.style.marginBottom = '1.5rem';
  
  const leaderboard = [
    { rank: 1, name: 'CyberNinja', points: 8420, avatar: getAvatarUrl('CyberNinja'), level: 25 },
    { rank: 2, name: 'HackMaster', points: 7890, avatar: getAvatarUrl('HackMaster'), level: 23 },
    { rank: 3, name: 'SecureCode', points: 7150, avatar: getAvatarUrl('SecureCode'), level: 22 },
    { rank: 4, name: 'ByteBreaker', points: 6820, avatar: getAvatarUrl('ByteBreaker'), level: 21 },
    { rank: 5, name: 'SQLSlayer', points: 6340, avatar: getAvatarUrl('SQLSlayer'), level: 20 },
    { rank: currentUser.rank, name: currentUser.name, points: currentUser.points, avatar: currentUser.avatar, level: currentUser.level, isCurrentUser: true },
  ];
  
  // Sort by rank
  leaderboard.sort((a, b) => a.rank - b.rank);
  
  const list = createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.gap = '0.75rem';
  
  leaderboard.forEach(player => {
    const item = createLeaderboardItem(player);
    if (player.isCurrentUser) {
      item.style.border = '2px solid var(--primary)';
      item.style.backgroundColor = 'rgba(36, 238, 247, 0.05)';
    }
    list.appendChild(item);
  });
  
  container.appendChild(title);
  container.appendChild(list);
}
