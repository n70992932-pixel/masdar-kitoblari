// =============================================
// Masdar Kitoblari — Asosiy Ilova Logikasi
// =============================================

const App = {
  currentView: 'home', // 'home' or 'catalog'
  catalogFilters: {
    sort: 'ommabop',
    price: 'all',
    cover: 'hammasi',
    publisher: 'hammasi',
  },
  catalogPage: 1,
  catalogPerPage: 15,

  // ---- Initialization ----
  async init() {
    this.initTheme();
    I18n.init();
    Cart.init();
    
    // Load books from Firebase before rendering
    if (typeof loadBooksFromFirebase === 'function') {
      await loadBooksFromFirebase();
    }

    this.renderCategories();
    this.renderAllSections();
    this.renderPublisherFilters();
    this.bindEvents();
  },

  // ---- Theme ----
  initTheme() {
    const saved = localStorage.getItem('masdar-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('masdar-theme', next);
  },

  // ---- View Switching ----
  showHome() {
    this.currentView = 'home';
    document.getElementById('home-content').classList.remove('home-content--hidden');
    document.getElementById('catalog-section').classList.remove('catalog--active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showCatalog() {
    this.currentView = 'catalog';
    document.getElementById('home-content').classList.add('home-content--hidden');
    document.getElementById('catalog-section').classList.add('catalog--active');
    this.catalogPage = 1;
    this.renderCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.remove('mobile-menu--open');
  },

  // ---- Book Card Rendering ----
  createBookCard(book) {
    const isUz = I18n.isUzbek();
    const title = isUz ? book.title : book.titleRu;
    const author = isUz ? book.author : book.authorRu;

    let badgeHTML = '';
    if (book.badge) {
      const badgeText = {
        'hafta-lideri': I18n.t('badge.weekly'),
        'bestseller': I18n.t('badge.bestseller'),
        'yangi': I18n.t('badge.new'),
      }[book.badge] || '';
      badgeHTML = `<span class="book-card__badge book-card__badge--${book.badge}">${badgeText}</span>`;
    }

    const card = document.createElement('div');
    card.className = 'book-card animate-in';
    card.dataset.bookId = book.id;
    card.dataset.category = book.category;

    let coverHTML;
    if (book.coverImage) {
      coverHTML = `
        <div class="book-card__cover-art" style="background: ${book.gradient}; padding: 0;">
          <img src="${book.coverImage}" alt="${title}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">
        </div>
      `;
    } else {
      coverHTML = `
        <div class="book-card__cover-art" style="background: ${book.gradient}">
          <span class="book-card__cover-title">${title}</span>
          <span class="book-card__cover-author">${author}</span>
          <span class="book-card__cover-letter">${book.coverLetter}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="book-card__cover">
        ${badgeHTML}
        ${coverHTML}
      </div>
      <div class="book-card__info">
        <h3 class="book-card__title">${title}</h3>
        <p class="book-card__author">${author}</p>
        <p class="book-card__price">${book.price.toLocaleString('uz-UZ')} so'm</p>
      </div>
      <button class="book-card__add-btn" data-id="${book.id}" data-i18n="catalog.addtocart">Savatga qo'shish</button>
    `;

    // Add to cart handler
    const cartBtn = card.querySelector('.book-card__add-btn');
    cartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      Cart.addItem(book.id);
    });

    return card;
  },

  // ---- Render Sections ----
  renderBooksToTrack(trackId, books) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = '';
    books.forEach(book => {
      track.appendChild(this.createBookCard(book));
    });
  },

  renderAllSections() {
    // Hafta bestsellerlari - all books with hafta-lideri badge + some bestsellers
    const weeklyBooks = [
      ...getBooksByBadge('hafta-lideri'),
      ...getBooksByBadge('bestseller'),
    ];
    this.renderBooksToTrack('bestsellers-track', weeklyBooks);

    // Eng ko'p sotilganlar
    const bestsellerBooks = [
      ...getBooksByBadge('bestseller'),
      ...getBooksByBadge('hafta-lideri'),
    ];
    this.renderBooksToTrack('mostsold-track', bestsellerBooks);

    // Yangi kelganlar
    const newBooks = [
      ...getBooksByBadge('yangi'),
      ...BOOKS.filter(b => !b.badge).slice(0, 4),
    ];
    this.renderBooksToTrack('newarrivals-track', newBooks);

    // Jahon adabiyoti
    this.renderBooksToTrack('worldlit-track', getBooksByCategory('jahon'));

    // Diniy-ma'rifiy
    this.renderBooksToTrack('religious-track', getBooksByCategory('diniy'));

    // Badiiy bo'lmagan
    this.renderBooksToTrack('nonfiction-track', getBooksByCategory('badiiy-bolmagan'));

    // O'zbek adabiyoti
    this.renderBooksToTrack('uzbeklit-track', getBooksByCategory('uzbek'));
  },

  // ---- Categories ----
  renderCategories() {
    const scroll = document.getElementById('categories-scroll');
    if (!scroll) return;
    scroll.innerHTML = '';

    CATEGORIES.forEach((cat, i) => {
      const tag = document.createElement('button');
      tag.className = 'categories__tag' + (i === 0 ? ' categories__tag--active' : '');
      tag.dataset.category = cat.slug;
      tag.textContent = I18n.isUzbek() ? cat.nameUz : cat.nameRu;
      tag.addEventListener('click', () => this.handleCategoryClick(cat.slug, tag));
      scroll.appendChild(tag);
    });
  },

  handleCategoryClick(slug, tag) {
    // Update active tag
    document.querySelectorAll('.categories__tag').forEach(t => t.classList.remove('categories__tag--active'));
    tag.classList.add('categories__tag--active');

    if (slug === 'barchasi') {
      // Show all sections
      this.showHome();
      document.querySelectorAll('#home-content .section').forEach(s => s.style.display = '');
    } else {
      // Switch to catalog with category filter
      this.catalogFilters = { sort: 'ommabop', price: 'all', cover: 'hammasi', publisher: 'hammasi' };
      this.showCatalog();
    }
  },

  // ---- Catalog ----
  renderPublisherFilters() {
    const container = document.getElementById('publisher-filters');
    if (!container) return;

    // Keep the label
    const label = container.querySelector('.catalog__filter-label');
    container.innerHTML = '';
    if (label) container.appendChild(label);
    else {
      const newLabel = document.createElement('span');
      newLabel.className = 'catalog__filter-label';
      newLabel.dataset.i18n = 'catalog.publisher';
      newLabel.textContent = I18n.t('catalog.publisher');
      container.appendChild(newLabel);
    }

    PUBLISHERS.forEach(pub => {
      const btn = document.createElement('button');
      btn.className = 'catalog__filter-tag' + (pub.slug === 'hammasi' ? ' catalog__filter-tag--active' : '');
      btn.dataset.filter = 'publisher';
      btn.dataset.value = pub.slug;
      btn.textContent = I18n.isUzbek() ? pub.nameUz : pub.nameRu;
      container.appendChild(btn);
    });
  },

  renderCatalog() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    // Filter books
    const filtered = filterBooks({
      category: null, // show all in catalog
      priceRange: this.catalogFilters.price === 'all' ? null : this.catalogFilters.price,
      coverType: this.catalogFilters.cover,
      publisher: this.catalogFilters.publisher,
      sortBy: this.catalogFilters.sort,
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / this.catalogPerPage));
    this.catalogPage = Math.min(this.catalogPage, totalPages);
    const start = (this.catalogPage - 1) * this.catalogPerPage;
    const pageBooks = filtered.slice(start, start + this.catalogPerPage);

    // Render
    grid.innerHTML = '';
    pageBooks.forEach(book => {
      grid.appendChild(this.createBookCard(book));
    });

    // Update pagination
    document.getElementById('catalog-page-info').textContent = `${this.catalogPage} / ${totalPages}`;
    document.getElementById('catalog-prev').disabled = this.catalogPage <= 1;
    document.getElementById('catalog-next').disabled = this.catalogPage >= totalPages;
  },

  // ---- Search ----
  handleSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    const results = searchBooks(query);
    this.showCatalog();

    // Render search results directly
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = '';

    if (results.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--color-text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 16px; display: block;">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 4px;">Natija topilmadi</p>
          <p style="font-size: 0.9rem;">"${query}" bo'yicha hech narsa topilmadi</p>
        </div>
      `;
    } else {
      results.forEach(book => {
        grid.appendChild(this.createBookCard(book));
      });
    }

    // Hide pagination for search
    document.getElementById('catalog-pagination').style.display = results.length > 0 ? 'none' : 'none';
  },

  // ---- Carousel Scroll ----
  scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const scrollAmount = 420;
    track.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  },

  // ---- Event Binding ----
  bindEvents() {
    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());

    // Language toggle
    document.querySelectorAll('.lang-toggle-pill__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        I18n.setLang(btn.dataset.lang);
        this.renderCategories();
        this.renderAllSections();
        this.renderPublisherFilters();
        Cart.updateUI();
        if (this.currentView === 'catalog') {
          this.renderCatalog();
        }
      });
    });

    // Logo click -> home
    document.getElementById('logo-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showHome();
    });

    // Catalog link
    document.getElementById('catalog-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showCatalog();
    });

    document.getElementById('mobile-catalog-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showCatalog();
    });

    // Hero CTA -> catalog
    document.getElementById('hero-cta')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showCatalog();
    });

    document.getElementById('featured-cta')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showCatalog();
    });

    // "Barchasi →" links
    document.querySelectorAll('.section__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showCatalog();
      });
    });

    // Search
    document.getElementById('search-btn')?.addEventListener('click', () => this.handleSearch());
    document.getElementById('search-input')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });

    // Carousel buttons
    document.querySelectorAll('.carousel__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const trackId = btn.dataset.carousel;
        const dir = btn.dataset.dir;
        this.scrollCarousel(trackId, dir);
      });
    });

    // Catalog filters
    document.getElementById('catalog-filters')?.addEventListener('click', (e) => {
      const tag = e.target.closest('.catalog__filter-tag');
      if (!tag) return;

      const filterType = tag.dataset.filter;
      const value = tag.dataset.value;

      // Update active state within the same filter group
      const group = tag.closest('.catalog__filter-group');
      group.querySelectorAll('.catalog__filter-tag').forEach(t => t.classList.remove('catalog__filter-tag--active'));
      tag.classList.add('catalog__filter-tag--active');

      // Update filter value
      switch (filterType) {
        case 'sort': this.catalogFilters.sort = value; break;
        case 'price': this.catalogFilters.price = value; break;
        case 'cover': this.catalogFilters.cover = value; break;
        case 'publisher': this.catalogFilters.publisher = value; break;
      }

      this.catalogPage = 1;
      this.renderCatalog();
    });

    // Catalog pagination
    document.getElementById('catalog-prev')?.addEventListener('click', () => {
      if (this.catalogPage > 1) {
        this.catalogPage--;
        this.renderCatalog();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.getElementById('catalog-next')?.addEventListener('click', () => {
      this.catalogPage++;
      this.renderCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu
    document.getElementById('hamburger-btn')?.addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.add('mobile-menu--open');
      document.body.style.overflow = 'hidden';
    });

    const closeMobile = () => {
      document.getElementById('mobile-menu').classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    };

    document.getElementById('mobile-menu-close')?.addEventListener('click', closeMobile);
    document.getElementById('mobile-menu-overlay')?.addEventListener('click', closeMobile);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Cart.closeDrawer();
        closeMobile();
      }
    });
  },
};

// ---- Start the app ----
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
