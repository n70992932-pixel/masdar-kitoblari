// =============================================
// Masdar Kitoblari — Savat (Shopping Cart)
// =============================================

const Cart = {
  items: [], // [{ bookId, quantity }]

  init() {
    const saved = localStorage.getItem('masdar-cart');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch {
        this.items = [];
      }
    }
    this.updateUI();
  },

  save() {
    localStorage.setItem('masdar-cart', JSON.stringify(this.items));
  },

  addItem(bookId) {
    const existing = this.items.find(i => i.bookId === bookId);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ bookId, quantity: 1 });
    }
    this.save();
    this.updateUI();
    this.showAddedFeedback(bookId);
  },

  removeItem(bookId) {
    this.items = this.items.filter(i => i.bookId !== bookId);
    this.save();
    this.updateUI();
  },

  updateQuantity(bookId, qty) {
    const item = this.items.find(i => i.bookId === bookId);
    if (!item) return;
    if (qty <= 0) {
      this.removeItem(bookId);
    } else {
      item.quantity = qty;
      this.save();
      this.updateUI();
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => {
      const book = getBookById(item.bookId);
      return sum + (book ? book.price * item.quantity : 0);
    }, 0);
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  },

  // ---- UI Methods ----

  updateUI() {
    // Update cart count badge
    const countEl = document.getElementById('cart-count');
    if (countEl) {
      const count = this.getItemCount();
      countEl.textContent = count;
      countEl.style.display = count > 0 ? 'flex' : 'none';
    }

    // Update cart drawer items
    this.renderDrawerItems();

    // Update cart total
    const totalEl = document.getElementById('cart-total-amount');
    if (totalEl) {
      totalEl.textContent = formatPrice(this.getTotal());
    }
  },

  renderDrawerItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-drawer__empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p data-i18n="cart.empty">${I18n.t('cart.empty')}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.items.map(item => {
      const book = getBookById(item.bookId);
      if (!book) return '';
      const title = I18n.isUzbek() ? book.title : book.titleRu;
      const author = I18n.isUzbek() ? book.author : book.authorRu;
      return `
        <div class="cart-drawer__item" data-book-id="${book.id}">
          <div class="cart-drawer__item-cover" style="background: ${book.gradient}">
            <span class="cart-drawer__item-letter">${book.coverLetter}</span>
          </div>
          <div class="cart-drawer__item-info">
            <h4 class="cart-drawer__item-title">${title}</h4>
            <p class="cart-drawer__item-author">${author}</p>
            <p class="cart-drawer__item-price">${formatPrice(book.price)}</p>
            <div class="cart-drawer__item-controls">
              <button class="cart-drawer__qty-btn" onclick="Cart.updateQuantity(${book.id}, ${item.quantity - 1})">−</button>
              <span class="cart-drawer__qty">${item.quantity}</span>
              <button class="cart-drawer__qty-btn" onclick="Cart.updateQuantity(${book.id}, ${item.quantity + 1})">+</button>
              <button class="cart-drawer__remove-btn" onclick="Cart.removeItem(${book.id})" data-i18n="cart.remove">${I18n.t('cart.remove')}</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  showAddedFeedback(bookId) {
    // Create a brief toast notification
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    const book = getBookById(bookId);
    const title = I18n.isUzbek() ? book.title : book.titleRu;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${title}</span>
    `;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('cart-toast--visible');
    });

    // Remove after 2 seconds
    setTimeout(() => {
      toast.classList.remove('cart-toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  },

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('cart-drawer--open');
    if (overlay) overlay.classList.add('cart-overlay--active');
    document.body.style.overflow = 'hidden';
    this.updateUI();
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('cart-drawer--open');
    if (overlay) overlay.classList.remove('cart-overlay--active');
    document.body.style.overflow = '';
  },

  // Checkout Methods
  openCheckout() {
    if (this.items.length === 0) {
      alert("Savat bo'sh!");
      return;
    }
    this.closeDrawer();
    const modal = document.getElementById('checkout-modal');
    const overlay = document.getElementById('checkout-overlay');
    if (modal) modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
  },

  closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    const overlay = document.getElementById('checkout-overlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  },

  toggleDeliveryFields() {
    const delivery = document.getElementById('checkout-delivery').value;
    const addressGroup = document.getElementById('checkout-address-group');
    const addressInput = document.getElementById('checkout-address');
    if (delivery === 'olib-ketish') {
      addressGroup.style.display = 'none';
      addressInput.required = false;
    } else {
      addressGroup.style.display = 'block';
      addressInput.required = true;
    }
  },

  async submitCheckout(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Yuborilmoqda...';

    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const delivery = document.getElementById('checkout-delivery').value;
    const address = document.getElementById('checkout-address').value;

    let itemsText = '';
    this.items.forEach((item, index) => {
      const book = getBookById(item.bookId);
      const title = book ? (typeof book.title === 'object' && book.title !== null ? (book.title.uz || book.title.ru) : book.title) : 'Noma\'lum kitob';
      itemsText += `${index + 1}. ${title} x ${item.quantity} ta\n`;
    });

    const total = this.getTotal().toLocaleString('ru-RU');

    const text = `📦 Yangi Buyurtma!\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🚚 Yetkazish turi: ${delivery}\n📍 Manzil: ${delivery === 'olib-ketish' ? "Do'kondan olib ketish" : address}\n\n📚 Kitoblar:\n${itemsText}\n💰 Jami: ${total} so'm`;

    const BOT_TOKEN = '8157364100:AAFSVUaDT8V5b1RqDaTtmzQURNkqC0z1UC4';
    const CHAT_ID = '6883047494';

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      });
      if (res.ok) {
        alert("Buyurtmangiz muvaffaqiyatli qabul qilindi! Tez orada siz bilan bog'lanamiz.");
        this.items = [];
        this.save();
        this.updateUI();
        this.closeCheckout();
      } else {
        alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
      }
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      btn.disabled = false;
      btn.textContent = 'Tasdiqlash va Buyurtma berish';
    }
  }
};

// Bind form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => Cart.submitCheckout(e));
  }
});
