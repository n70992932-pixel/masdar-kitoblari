// =============================================
// Masdar Kitoblari — Kitoblar Ma'lumotlar Bazasi
// =============================================

const CATEGORIES = [
  { slug: 'barchasi', nameUz: 'Barchasi', nameRu: 'Все' },
  { slug: 'jahon', nameUz: 'Jahon adabiyoti', nameRu: 'Мировая литература' },
  { slug: 'diniy', nameUz: "Diniy-ma'rifiy", nameRu: 'Религиозная' },
  { slug: 'badiiy-bolmagan', nameUz: "Badiiy bo'lmagan", nameRu: 'Нон-фикшн' },
  { slug: 'oquv', nameUz: "O'quv qurollari", nameRu: 'Учебники' },
  { slug: 'bolalar', nameUz: 'Bolalar adabiyoti', nameRu: 'Детская литература' },
  { slug: 'uzbek', nameUz: "O'zbek adabiyoti", nameRu: 'Узбекская литература' },
];

const PUBLISHERS = [
  { slug: 'hammasi', nameUz: 'Hammasi', nameRu: 'Все' },
  { slug: 'hilolnashr', nameUz: 'Hilolnashr', nameRu: 'Хилолнашр' },
  { slug: 'masdar-nashr', nameUz: 'Masdar nashr', nameRu: 'Масдар нашр' },
  { slug: 'yangi-asr', nameUz: 'Yangi asr avlodi', nameRu: 'Янги аср авлоди' },
  { slug: 'sharq', nameUz: 'Sharq nashriyoti', nameRu: 'Шарк нашриёти' },
  { slug: 'akademnashr', nameUz: 'Akademnashr', nameRu: 'Академнашр' },
];

let BOOKS = [];

async function loadBooksFromFirebase() {
  try {
    const snapshot = await db.collection('books').get();
    BOOKS = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch(e) {
    console.error('Kutubxonani yuklashda xatolik:', e);
  }
}

// Helper functions
function getBooksByCategory(category) {
  if (category === 'barchasi') return BOOKS;
  return BOOKS.filter(b => b.category === category);
}

function getBooksByBadge(badge) {
  return BOOKS.filter(b => b.badge === badge);
}

function getBookById(id) {
  return BOOKS.find(b => b.id === id);
}

function searchBooks(query) {
  const q = query.toLowerCase();
  return BOOKS.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.titleRu.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.authorRu.toLowerCase().includes(q)
  );
}

function filterBooks({ category, priceRange, coverType, publisher, sortBy }) {
  let result = [...BOOKS];

  if (category && category !== 'barchasi') {
    result = result.filter(b => b.category === category);
  }

  if (priceRange) {
    switch (priceRange) {
      case '0-50':
        result = result.filter(b => b.price <= 50000);
        break;
      case '50-100':
        result = result.filter(b => b.price > 50000 && b.price <= 100000);
        break;
      case '100-200':
        result = result.filter(b => b.price > 100000 && b.price <= 200000);
        break;
      case '200+':
        result = result.filter(b => b.price > 200000);
        break;
    }
  }

  if (coverType && coverType !== 'hammasi') {
    result = result.filter(b => b.cover === coverType);
  }

  if (publisher && publisher !== 'hammasi') {
    result = result.filter(b => b.publisher === publisher);
  }

  if (sortBy) {
    switch (sortBy) {
      case 'ommabop':
        result.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0));
        break;
      case 'yangi':
        result.sort((a, b) => (b.badge === 'yangi' ? 1 : 0) - (a.badge === 'yangi' ? 1 : 0));
        break;
      case 'arzon':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'qimmat':
        result.sort((a, b) => b.price - a.price);
        break;
    }
  }

  return result;
}

function formatPrice(price) {
  return price.toLocaleString('uz-UZ') + " so'm";
}
