// ===== Reusable Components =====

// Create a button
function createButton(text, className = 'btn-primary', onClick = null) {
  const button = document.createElement('button');
  button.className = `btn ${className}`;
  button.textContent = text;
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return button;
}

// Create a card
function createCard(className = '') {
  const card = document.createElement('div');
  card.className = `card ${className}`;
  return card;
}

// Create a badge
function createBadge(text, type = '') {
  const badge = document.createElement('span');
  badge.className = `badge ${type}`;
  badge.textContent = text;
  return badge;
}

// Create a progress bar
function createProgressBar(value, max = 100) {
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressBar.style.width = `${(value / max) * 100}%`;
  
  progressContainer.appendChild(progressBar);
  return progressContainer;
}

// Create a stat card
function createStatCard(label, value, iconName, colorClass) {
  const card = createCard(`stat-card border-${colorClass}/20`);
  
  const content = document.createElement('div');
  content.className = 'stat-content';
  
  const labelEl = document.createElement('p');
  labelEl.className = 'text-[#c9c9c9] text-sm mb-1';
  labelEl.textContent = label;
  
  const valueEl = document.createElement('h2');
  valueEl.className = `text-${colorClass}`;
  valueEl.textContent = typeof value === 'number' ? formatNumber(value) : value;
  
  content.appendChild(labelEl);
  content.appendChild(valueEl);
  
  const iconContainer = document.createElement('div');
  iconContainer.className = `stat-icon bg-${colorClass}/10`;
  iconContainer.style.backgroundColor = `rgba(var(--${colorClass}), 0.1)`;
  const icon = createIcon(iconName, 'sidebar-icon');
  icon.style.color = `var(--${colorClass})`;
  iconContainer.appendChild(icon);
  
  card.appendChild(content);
  card.appendChild(iconContainer);
  
  return card;
}

// Create a challenge item
function createChallengeItem(challenge, onClick) {
  const item = document.createElement('div');
  item.className = 'challenge-item';
  
  const header = document.createElement('div');
  header.className = 'challenge-header';
  
  const titleSection = document.createElement('div');
  titleSection.style.flex = '1';
  
  const title = document.createElement('h4');
  title.textContent = challenge.title;
  title.style.color = 'var(--foreground)';
  title.style.marginBottom = '0.5rem';
  
  const badges = document.createElement('div');
  badges.className = 'challenge-badges';
  
  const difficultyBadge = createBadge(challenge.difficulty, getDifficultyClass(challenge.difficulty));
  const categorySpan = document.createElement('span');
  categorySpan.style.color = 'var(--muted-foreground)';
  categorySpan.style.fontSize = '0.875rem';
  categorySpan.textContent = challenge.category;
  
  badges.appendChild(difficultyBadge);
  badges.appendChild(categorySpan);
  
  titleSection.appendChild(title);
  titleSection.appendChild(badges);
  
  const points = document.createElement('span');
  points.style.color = 'var(--primary)';
  points.textContent = `${challenge.points} pts`;
  
  header.appendChild(titleSection);
  header.appendChild(points);
  
  item.appendChild(header);
  
  if (challenge.progress !== undefined) {
    const progressSection = document.createElement('div');
    progressSection.style.marginTop = '0.75rem';
    
    const progressLabel = document.createElement('div');
    progressLabel.style.display = 'flex';
    progressLabel.style.justifyContent = 'space-between';
    progressLabel.style.marginBottom = '0.25rem';
    progressLabel.style.fontSize = '0.875rem';
    
    const progressText = document.createElement('span');
    progressText.style.color = 'var(--muted-foreground)';
    progressText.textContent = 'Progress';
    
    const progressValue = document.createElement('span');
    progressValue.style.color = 'var(--primary)';
    progressValue.textContent = `${challenge.progress}%`;
    
    progressLabel.appendChild(progressText);
    progressLabel.appendChild(progressValue);
    
    const progressBar = createProgressBar(challenge.progress);
    
    progressSection.appendChild(progressLabel);
    progressSection.appendChild(progressBar);
    
    item.appendChild(progressSection);
  }
  
  if (onClick && challenge.status !== 'locked') {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => onClick(challenge.id));
  }
  
  if (challenge.status === 'locked') {
    const lockIcon = createIcon('lock2', 'sidebar-icon');
    lockIcon.style.color = 'var(--muted-foreground)';
    title.appendChild(lockIcon);
    item.style.opacity = '0.6';
    item.style.cursor = 'not-allowed';
  }
  
  return item;
}

// Create a leaderboard item
function createLeaderboardItem(player, onClick) {
  const item = document.createElement('div');
  item.className = 'leaderboard-item';
  
  const rank = document.createElement('div');
  rank.className = 'leaderboard-rank';
  
  let rankColor = '';
  if (player.rank === 1) {
    rankColor = 'background-color: rgba(255, 213, 79, 0.1); color: #ffd54f;';
  } else if (player.rank === 2) {
    rankColor = 'background-color: rgba(201, 201, 201, 0.1); color: #c9c9c9;';
  } else if (player.rank === 3) {
    rankColor = 'background-color: rgba(255, 152, 0, 0.1); color: #ff9800;';
  } else {
    rankColor = 'background-color: rgba(36, 238, 247, 0.1); color: #24eef7;';
  }
  
  rank.style.cssText = rankColor;
  rank.textContent = `#${player.rank}`;
  
  const avatar = document.createElement('img');
  avatar.className = 'leaderboard-avatar';
  avatar.src = player.avatar;
  avatar.alt = player.name;
  
  const info = document.createElement('div');
  info.className = 'leaderboard-info';
  
  const name = document.createElement('p');
  name.className = 'leaderboard-name';
  name.textContent = player.name;
  
  const points = document.createElement('p');
  points.className = 'leaderboard-points';
  points.textContent = `${formatNumber(player.points)} pts`;
  
  info.appendChild(name);
  info.appendChild(points);
  
  item.appendChild(rank);
  item.appendChild(avatar);
  item.appendChild(info);
  
  if (onClick) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => onClick(player));
  }
  
  return item;
}

// Create input field with icon
function createInputField(config) {
  const group = document.createElement('div');
  group.className = 'form-group';
  
  const label = document.createElement('label');
  label.htmlFor = config.id;
  label.textContent = config.label;
  
  const wrapper = document.createElement('div');
  wrapper.className = 'form-input-wrapper';
  
  if (config.icon) {
    const icon = createIcon(config.icon, 'form-icon');
    wrapper.appendChild(icon);
  }
  
  const input = document.createElement('input');
  input.type = config.type || 'text';
  input.id = config.id;
  input.placeholder = config.placeholder || '';
  input.value = config.value || '';
  
  if (config.onChange) {
    input.addEventListener('input', (e) => config.onChange(e.target.value));
  }
  
  wrapper.appendChild(input);
  
  if (config.type === 'password' && config.showToggle) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'toggle-password';
    const eyeIcon = createIcon('eye');
    toggle.appendChild(eyeIcon);
    
    toggle.addEventListener('click', () => {
      if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '';
        toggle.appendChild(createIcon('eyeOff'));
      } else {
        input.type = 'password';
        toggle.innerHTML = '';
        toggle.appendChild(createIcon('eye'));
      }
    });
    
    wrapper.appendChild(toggle);
  }
  
  group.appendChild(label);
  group.appendChild(wrapper);
  
  if (config.error) {
    const errorEl = document.createElement('p');
    errorEl.className = 'form-error';
    errorEl.textContent = config.error;
    group.appendChild(errorEl);
  }
  
  return { group, input };
}

// Create section header
function createSectionHeader(title, actionText, onAction) {
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  titleEl.style.color = 'var(--foreground)';
  
  header.appendChild(titleEl);
  
  if (actionText && onAction) {
    const actionBtn = createButton(actionText, 'btn-ghost', onAction);
    actionBtn.innerHTML = actionText;
    const chevron = createIcon('chevronRight', 'sidebar-icon');
    actionBtn.appendChild(chevron);
    header.appendChild(actionBtn);
  }
  
  return header;
}
