// =============================================
// Masdar Kitoblari — Auth (Telegram Login)
// =============================================

const Auth = {
  user: null,

  init() {
    this.checkSavedUser();
    this.bindEvents();
  },

  checkSavedUser() {
    const saved = localStorage.getItem('masdar_user');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
        this.updateUI();
      } catch (e) {
        console.error("User data parse error", e);
      }
    }
  },

  bindEvents() {
    const userBtn = document.getElementById('user-btn');

    // Open profile view or go to profile if logged in
    userBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.user) {
        if(confirm("Tizimdan chiqishni xohlaysizmi?")) {
          this.logout();
        }
      } else {
        this.openProfileView();
      }
    });

    // Custom Telegram Login Button
    const customTgBtn = document.getElementById('custom-tg-login-btn');
    customTgBtn?.addEventListener('click', () => {
      if (window.Telegram && window.Telegram.Login) {
        window.Telegram.Login.auth({
          bot_id: '8157364100',
          request_access: 'write'
        }, (data) => {
          if (data) {
            window.onTelegramAuth(data);
          }
        });
      } else {
        alert("Telegram vidjeti yuklanmadi, iltimos sahifani yangilang.");
      }
    });
  },

  openProfileView() {
    // Hide home content and show profile view
    document.getElementById('home-content').style.display = 'none';
    document.getElementById('profile-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  closeProfileView() {
    // Hide profile view and show home content
    document.getElementById('home-content').style.display = 'block';
    document.getElementById('profile-view').style.display = 'none';
  },

  login(userData) {
    this.user = userData;
    localStorage.setItem('masdar_user', JSON.stringify(userData));
    this.updateUI();
    this.closeProfileView();
    // Refresh page or show success message
    alert(`Xush kelibsiz, ${userData.first_name}!`);
  },

  logout() {
    this.user = null;
    localStorage.removeItem('masdar_user');
    this.updateUI();
  },

  updateUI() {
    const userBtn = document.getElementById('user-btn');
    if (!userBtn) return;

    if (this.user) {
      // User is logged in, show avatar or initial
      userBtn.classList.add('nav__action--logged-in');
      if (this.user.photo_url) {
        userBtn.innerHTML = `<img src="${this.user.photo_url}" alt="Avatar" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
      } else {
        userBtn.innerHTML = `<span style="font-weight:600; font-size:14px; display:flex; align-items:center; justify-content:center; height:100%;">${this.user.first_name.charAt(0)}</span>`;
      }
    } else {
      // Not logged in, show default icon
      userBtn.classList.remove('nav__action--logged-in');
      userBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    }
  }
};

// Telegram onauth callback must be global
window.onTelegramAuth = function(user) {
  Auth.login(user);
};

document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
