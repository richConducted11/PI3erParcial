// ===== Authentication Views =====

// Render Login View
function renderLogin(onLogin, onNavigateToRegister) {
  const container = document.getElementById('login-view');
  clearElement(container);
  container.classList.remove('hidden');
  
  const authContainer = createElement('div', 'auth-container');
  const authBg = createElement('div', 'auth-bg');
  authContainer.appendChild(authBg);
  
  const authBox = createElement('div', 'auth-box');
  
  // Header
  const header = createElement('div', 'auth-header');
  
  const logoDiv = createElement('div', 'auth-logo glow-cyan');
  const shieldIcon = createIcon('shield');
  shieldIcon.style.width = '2.5rem';
  shieldIcon.style.height = '2.5rem';
  shieldIcon.style.color = 'var(--color-black)';
  logoDiv.appendChild(shieldIcon);
  
  const title = createElement('h1', 'auth-title', 'HackLab');
  const subtitle = createElement('p', 'auth-subtitle', 'Master Cybersecurity Through Practice');
  
  header.appendChild(logoDiv);
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Form Card
  const formCard = createCard('glow-cyan');
  formCard.style.backgroundColor = 'var(--card)';
  formCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  
  const formTitle = createElement('h2', '', 'Sign In');
  formTitle.style.color = 'var(--foreground)';
  formTitle.style.marginBottom = '1.5rem';
  formCard.appendChild(formTitle);
  
  const form = createElement('form');
  
  let emailValue = '';
  let passwordValue = '';
  let rememberValue = false;
  const errors = { email: '', password: '' };
  
  // Email field
  const emailField = createInputField({
    id: 'email',
    label: 'Email',
    type: 'email',
    icon: 'mail',
    placeholder: 'your@email.com',
    onChange: (value) => {
      emailValue = value;
      errors.email = '';
      renderLoginForm();
    }
  });
  
  // Password field
  const passwordField = createInputField({
    id: 'password',
    label: 'Password',
    type: 'password',
    icon: 'lock',
    placeholder: 'Enter your password',
    showToggle: true,
    onChange: (value) => {
      passwordValue = value;
      errors.password = '';
      renderLoginForm();
    }
  });
  
  // Remember me checkbox
  const rememberGroup = createElement('div');
  rememberGroup.style.display = 'flex';
  rememberGroup.style.alignItems = 'center';
  rememberGroup.style.justifyContent = 'space-between';
  rememberGroup.style.marginBottom = '1.25rem';
  
  const checkboxWrapper = createElement('div', 'checkbox-wrapper');
  const checkbox = createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'remember';
  checkbox.addEventListener('change', (e) => {
    rememberValue = e.target.checked;
  });
  
  const checkboxLabel = createElement('label');
  checkboxLabel.htmlFor = 'remember';
  checkboxLabel.textContent = 'Remember me';
  checkboxLabel.style.color = 'var(--muted-foreground)';
  checkboxLabel.style.cursor = 'pointer';
  
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(checkboxLabel);
  
  const forgotLink = createElement('button');
  forgotLink.type = 'button';
  forgotLink.textContent = 'Forgot password?';
  forgotLink.className = 'auth-link';
  forgotLink.style.background = 'none';
  forgotLink.style.border = 'none';
  forgotLink.style.padding = '0';
  forgotLink.style.cursor = 'pointer';
  
  rememberGroup.appendChild(checkboxWrapper);
  rememberGroup.appendChild(forgotLink);
  
  // Submit button
  const submitBtn = createButton('Sign In', 'btn-primary btn-full glow-cyan');
  submitBtn.type = 'submit';
  
  function renderLoginForm() {
    clearElement(form);
    
    const emailWithError = createInputField({
      id: 'email',
      label: 'Email',
      type: 'email',
      icon: 'mail',
      placeholder: 'your@email.com',
      value: emailValue,
      error: errors.email,
      onChange: (value) => {
        emailValue = value;
        errors.email = '';
        renderLoginForm();
      }
    });
    
    const passwordWithError = createInputField({
      id: 'password',
      label: 'Password',
      type: 'password',
      icon: 'lock',
      placeholder: 'Enter your password',
      value: passwordValue,
      error: errors.password,
      showToggle: true,
      onChange: (value) => {
        passwordValue = value;
        errors.password = '';
        renderLoginForm();
      }
    });
    
    form.appendChild(emailWithError.group);
    form.appendChild(passwordWithError.group);
    form.appendChild(rememberGroup);
    form.appendChild(submitBtn);
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(emailValue)) {
      errors.email = 'Invalid email format';
    }
    
    if (!passwordValue) {
      errors.password = 'Password is required';
    } else if (passwordValue.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (errors.email || errors.password) {
      renderLoginForm();
      return;
    }
    
    onLogin(emailValue, passwordValue, rememberValue);
  });
  
  renderLoginForm();
  formCard.appendChild(form);
  
  // Footer
  const footer = createElement('div', 'auth-footer');
  const footerText = createElement('p', '', 'Don\'t have an account? ');
  const signupLink = createElement('button', 'auth-link');
  signupLink.textContent = 'Sign up';
  signupLink.style.background = 'none';
  signupLink.style.border = 'none';
  signupLink.style.padding = '0';
  signupLink.style.cursor = 'pointer';
  signupLink.style.fontFamily = 'inherit';
  signupLink.style.fontSize = 'inherit';
  signupLink.addEventListener('click', onNavigateToRegister);
  footerText.appendChild(signupLink);
  footer.appendChild(footerText);
  formCard.appendChild(footer);
  
  // Bottom text
  const bottomText = createElement('p');
  bottomText.style.textAlign = 'center';
  bottomText.style.color = 'var(--muted-foreground)';
  bottomText.style.marginTop = '1.5rem';
  bottomText.style.fontSize = '0.875rem';
  bottomText.textContent = 'Ethical hacking training platform • OWASP Top 10 focused';
  
  authBox.appendChild(header);
  authBox.appendChild(formCard);
  authBox.appendChild(bottomText);
  
  authContainer.appendChild(authBox);
  container.appendChild(authContainer);
}

// Render Register View
function renderRegister(onRegister, onNavigateToLogin) {
  const container = document.getElementById('register-view');
  clearElement(container);
  container.classList.remove('hidden');
  
  const authContainer = createElement('div', 'auth-container');
  const authBg = createElement('div', 'auth-bg');
  authContainer.appendChild(authBg);
  
  const authBox = createElement('div', 'auth-box');
  
  // Header
  const header = createElement('div', 'auth-header');
  
  const logoDiv = createElement('div', 'auth-logo glow-cyan');
  const shieldIcon = createIcon('shield');
  shieldIcon.style.width = '2.5rem';
  shieldIcon.style.height = '2.5rem';
  shieldIcon.style.color = 'var(--color-black)';
  logoDiv.appendChild(shieldIcon);
  
  const title = createElement('h1', 'auth-title', 'HackLab');
  const subtitle = createElement('p', 'auth-subtitle', 'Begin Your Cybersecurity Journey');
  
  header.appendChild(logoDiv);
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Form Card
  const formCard = createCard('glow-cyan');
  formCard.style.backgroundColor = 'var(--card)';
  formCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  
  const formTitle = createElement('h2', '', 'Create Account');
  formTitle.style.color = 'var(--foreground)';
  formTitle.style.marginBottom = '1.5rem';
  formCard.appendChild(formTitle);
  
  const form = createElement('form');
  
  let nameValue = '';
  let emailValue = '';
  let passwordValue = '';
  const errors = { name: '', email: '', password: '' };
  
  function renderRegisterForm() {
    clearElement(form);
    
    const nameField = createInputField({
      id: 'name',
      label: 'Full Name',
      type: 'text',
      icon: 'user',
      placeholder: 'John Doe',
      value: nameValue,
      error: errors.name,
      onChange: (value) => {
        nameValue = value;
        errors.name = '';
        renderRegisterForm();
      }
    });
    
    const emailField = createInputField({
      id: 'email-reg',
      label: 'Email',
      type: 'email',
      icon: 'mail',
      placeholder: 'your@email.com',
      value: emailValue,
      error: errors.email,
      onChange: (value) => {
        emailValue = value;
        errors.email = '';
        renderRegisterForm();
      }
    });
    
    const passwordField = createInputField({
      id: 'password-reg',
      label: 'Password',
      type: 'password',
      icon: 'lock',
      placeholder: 'At least 6 characters',
      value: passwordValue,
      error: errors.password,
      showToggle: true,
      onChange: (value) => {
        passwordValue = value;
        errors.password = '';
        renderRegisterForm();
      }
    });
    
    const submitBtn = createButton('Create Account', 'btn-primary btn-full glow-cyan');
    submitBtn.type = 'submit';
    
    form.appendChild(nameField.group);
    form.appendChild(emailField.group);
    form.appendChild(passwordField.group);
    form.appendChild(submitBtn);
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!nameValue) {
      errors.name = 'Name is required';
    } else if (nameValue.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!emailValue) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(emailValue)) {
      errors.email = 'Invalid email format';
    }
    
    if (!passwordValue) {
      errors.password = 'Password is required';
    } else if (passwordValue.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (errors.name || errors.email || errors.password) {
      renderRegisterForm();
      return;
    }
    
    onRegister(nameValue, emailValue, passwordValue);
  });
  
  renderRegisterForm();
  formCard.appendChild(form);
  
  // Footer
  const footer = createElement('div', 'auth-footer');
  const footerText = createElement('p', '', 'Already have an account? ');
  const loginLink = createElement('button', 'auth-link');
  loginLink.textContent = 'Sign in';
  loginLink.style.background = 'none';
  loginLink.style.border = 'none';
  loginLink.style.padding = '0';
  loginLink.style.cursor = 'pointer';
  loginLink.style.fontFamily = 'inherit';
  loginLink.style.fontSize = 'inherit';
  loginLink.addEventListener('click', onNavigateToLogin);
  footerText.appendChild(loginLink);
  footer.appendChild(footerText);
  formCard.appendChild(footer);
  
  authBox.appendChild(header);
  authBox.appendChild(formCard);
  
  authContainer.appendChild(authBox);
  container.appendChild(authContainer);
}
