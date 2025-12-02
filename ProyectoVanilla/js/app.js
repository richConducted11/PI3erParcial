// ===== Main Application =====

class HackLabApp {
  constructor() {
    this.currentScreen = 'login';
    this.user = null;
    this.selectedChallenge = null;
    this.selectedTutorial = null;
    
    this.init();
  }
  
  init() {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('hacklab_user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.currentScreen = 'dashboard';
      this.renderApp();
    } else {
      this.renderAuth();
    }
  }
  
  renderAuth() {
    hideMainLayout();
    if (this.currentScreen === 'login') {
      renderLogin(
        (email, password, remember) => this.handleLogin(email, password, remember),
        () => this.navigateTo('register')
      );
    } else if (this.currentScreen === 'register') {
      renderRegister(
        (name, email, password) => this.handleRegister(name, email, password),
        () => this.navigateTo('login')
      );
    }
  }
  
  renderApp() {
    if (!this.user) {
      this.renderAuth();
      return;
    }
    
    showMainLayout();
    renderHeader(this.user, () => this.handleLogout());
    renderSidebar(this.currentScreen, (screen) => this.navigateTo(screen), this.user.level);
    
    switch (this.currentScreen) {
      case 'dashboard':
        renderDashboard(this.user, (screen, challengeId) => this.navigateTo(screen, challengeId));
        break;
      case 'challenges':
        renderChallenges((challengeId) => this.navigateTo('challenge-view', challengeId));
        break;
      case 'challenge-view':
        renderChallengeView(this.selectedChallenge, () => this.navigateTo('challenges'));
        break;
      case 'leaderboard':
        renderLeaderboard(this.user);
        break;
      case 'tutorials':
        renderTutorials((tutorialId) => this.navigateTo('tutorial-view', undefined, tutorialId));
        break;
      case 'tutorial-view':
        renderTutorials((tutorialId) => this.navigateTo('tutorial-view', undefined, tutorialId));
        break;
      case 'progress':
        renderProgress(this.user);
        break;
      case 'settings':
        renderSettings(this.user);
        break;
      case 'admin':
        this.renderAdmin();
        break;
      default:
        renderDashboard(this.user, (screen, challengeId) => this.navigateTo(screen, challengeId));
    }
  }
  
  renderAdmin() {
    const container = document.getElementById('main-content');
    clearElement(container);
    
    const title = createElement('h1', '', 'Admin Panel');
    title.style.color = 'var(--foreground)';
    title.style.marginBottom = '1.5rem';
    
    const card = createCard();
    card.style.border = '1px solid rgba(36, 238, 247, 0.2)';
    card.innerHTML = '<p style="color: var(--muted-foreground);">Admin features coming soon...</p>';
    
    container.appendChild(title);
    container.appendChild(card);
  }
  
  handleLogin(email, password, remember) {
    // Mock authentication
    const mockUser = {
      id: '1',
      name: 'Alex Rivera',
      email: email,
      avatar: getAvatarUrl('Alex Rivera'),
      level: 12,
      points: 3420,
      completedChallenges: 24,
      rank: 127,
      streak: 7,
      badges: ['sql-master', 'xss-hunter', 'first-blood', 'streak-7']
    };
    
    this.user = mockUser;
    
    if (remember) {
      localStorage.setItem('hacklab_user', JSON.stringify(mockUser));
    }
    
    this.currentScreen = 'dashboard';
    showToast('Welcome back!', 'success');
    this.renderApp();
  }
  
  handleRegister(name, email, password) {
    // Mock registration
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      avatar: getAvatarUrl(name),
      level: 1,
      points: 0,
      completedChallenges: 0,
      rank: 0,
      streak: 0,
      badges: []
    };
    
    this.user = mockUser;
    localStorage.setItem('hacklab_user', JSON.stringify(mockUser));
    
    this.currentScreen = 'dashboard';
    showToast('Account created successfully!', 'success');
    this.renderApp();
  }
  
  handleLogout() {
    this.user = null;
    this.currentScreen = 'login';
    localStorage.removeItem('hacklab_user');
    showToast('Logged out successfully', 'info');
    this.renderAuth();
  }
  
  navigateTo(screen, challengeId, tutorialId) {
    this.currentScreen = screen;
    
    if (challengeId) {
      this.selectedChallenge = challengeId;
    }
    
    if (tutorialId) {
      this.selectedTutorial = tutorialId;
    }
    
    if (this.user) {
      this.renderApp();
    } else {
      this.renderAuth();
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new HackLabApp();
  
  // Make app globally accessible for debugging
  window.hackLabApp = app;
  
  console.log('%c🛡️ HackLab App Initialized', 'color: #24eef7; font-size: 16px; font-weight: bold;');
  console.log('%cWelcome to HackLab - Cybersecurity Training Platform', 'color: #48e5c2; font-size: 12px;');
});
