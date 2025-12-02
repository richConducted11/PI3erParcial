// ===== Settings View =====

function renderSettings(user) {
  const container = document.getElementById('main-content');
  clearElement(container);
  
  const title = createElement('h1', '', 'Settings');
  title.style.color = 'var(--foreground)';
  title.style.marginBottom = '1.5rem';
  
  // Profile settings
  const profileCard = createCard();
  profileCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  profileCard.style.marginBottom = '1.5rem';
  
  const profileTitle = createElement('h3', '', 'Profile Settings');
  profileTitle.style.color = 'var(--foreground)';
  profileTitle.style.marginBottom = '1rem';
  
  const nameField = createInputField({
    id: 'settings-name',
    label: 'Display Name',
    type: 'text',
    value: user.name,
    onChange: (value) => {
      showToast('Name updated', 'success');
    }
  });
  
  const emailField = createInputField({
    id: 'settings-email',
    label: 'Email',
    type: 'email',
    value: user.email,
    onChange: (value) => {
      showToast('Email updated', 'success');
    }
  });
  
  const saveBtn = createButton('Save Changes', 'btn-primary');
  saveBtn.addEventListener('click', () => {
    showToast('Settings saved successfully', 'success');
  });
  
  profileCard.appendChild(profileTitle);
  profileCard.appendChild(nameField.group);
  profileCard.appendChild(emailField.group);
  profileCard.appendChild(saveBtn);
  
  // Notification settings
  const notifCard = createCard();
  notifCard.style.border = '1px solid rgba(36, 238, 247, 0.2)';
  
  const notifTitle = createElement('h3', '', 'Notifications');
  notifTitle.style.color = 'var(--foreground)';
  notifTitle.style.marginBottom = '1rem';
  
  const notifOptions = [
    { id: 'email-notif', label: 'Email notifications', checked: true },
    { id: 'challenge-notif', label: 'Challenge updates', checked: true },
    { id: 'leaderboard-notif', label: 'Leaderboard changes', checked: false },
  ];
  
  notifOptions.forEach(option => {
    const wrapper = createElement('div', 'checkbox-wrapper');
    wrapper.style.marginBottom = '1rem';
    
    const checkbox = createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = option.id;
    checkbox.checked = option.checked;
    
    const label = createElement('label');
    label.htmlFor = option.id;
    label.textContent = option.label;
    label.style.color = 'var(--muted-foreground)';
    label.style.cursor = 'pointer';
    
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    
    notifCard.appendChild(wrapper);
  });
  
  notifCard.insertBefore(notifTitle, notifCard.firstChild);
  
  container.appendChild(title);
  container.appendChild(profileCard);
  container.appendChild(notifCard);
}
