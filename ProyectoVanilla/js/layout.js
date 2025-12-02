// ===== Layout Components =====

// Render Header
function renderHeader(user, onLogout) {
  const header = document.getElementById('header');
  clearElement(header);
  
  // Logo
  const logo = createElement('div', 'header-logo');
  const shieldIcon = createIcon('shield');
  shieldIcon.style.width = '1.5rem';
  shieldIcon.style.height = '1.5rem';
  logo.appendChild(shieldIcon);
  const logoText = createElement('span', '', 'HackLab');
  logo.appendChild(logoText);
  
  // User section
  const userSection = createElement('div', 'header-user');
  
  const userName = createElement('span');
  userName.style.color = 'var(--foreground)';
  userName.textContent = user.name;
  
  const avatar = createElement('img', 'header-avatar');
  avatar.src = user.avatar || getAvatarUrl(user.name);
  avatar.alt = user.name;
  
  const logoutBtn = createButton('', 'btn-ghost');
  const logoutIcon = createIcon('logOut', 'sidebar-icon');
  logoutBtn.appendChild(logoutIcon);
  logoutBtn.addEventListener('click', onLogout);
  logoutBtn.title = 'Logout';
  
  userSection.appendChild(userName);
  userSection.appendChild(avatar);
  userSection.appendChild(logoutBtn);
  
  header.appendChild(logo);
  header.appendChild(userSection);
}

// Render Sidebar
function renderSidebar(currentScreen, onNavigate, userLevel) {
  const sidebar = document.getElementById('sidebar');
  clearElement(sidebar);
  
  const nav = createElement('nav', 'sidebar-nav');
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'challenges', label: 'Challenges', icon: 'map' },
    { id: 'tutorials', label: 'Tutorials', icon: 'bookOpen' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'trophy' },
    { id: 'progress', label: 'My Progress', icon: 'barChart' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  
  // Add admin option if user level is high enough
  if (userLevel >= 10) {
    menuItems.push({ id: 'admin', label: 'Admin Panel', icon: 'shield' });
  }
  
  menuItems.forEach(item => {
    const menuItem = createElement('div', 'sidebar-item');
    if (currentScreen === item.id) {
      menuItem.classList.add('active');
    }
    
    const icon = createIcon(item.icon, 'sidebar-icon');
    const text = createElement('span', 'sidebar-text', item.label);
    
    menuItem.appendChild(icon);
    menuItem.appendChild(text);
    
    menuItem.addEventListener('click', () => onNavigate(item.id));
    
    nav.appendChild(menuItem);
  });
  
  sidebar.appendChild(nav);
}

// Show main layout
function showMainLayout() {
  document.getElementById('login-view').classList.add('hidden');
  document.getElementById('register-view').classList.add('hidden');
  document.getElementById('main-layout').classList.remove('hidden');
}

// Hide main layout
function hideMainLayout() {
  document.getElementById('main-layout').classList.add('hidden');
}
