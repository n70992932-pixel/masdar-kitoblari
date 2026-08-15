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

const BOOKS = [
  // ==================== JAHON ADABIYOTI ====================
  {
    id: 1,
    title: 'Kichik shahzoda',
    titleRu: 'Маленький принц',
    author: 'Antuan de Sent-Ekzyuperi',
    authorRu: 'Антуан де Сент-Экзюпери',
    price: 35000,
    category: 'jahon',
    badge: 'hafta-lideri',
    publisher: 'hilolnashr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    coverLetter: 'К',
    coverImage: 'assets/images/book_1.jpg',
  },
  {
    id: 2,
    title: 'Kimyogar',
    titleRu: 'Алхимик',
    author: 'Paulo Koelo',
    authorRu: 'Пауло Коэльо',
    price: 42000,
    category: 'jahon',
    badge: null,
    publisher: 'hilolnashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    coverLetter: 'К',
    coverImage: 'assets/images/book_2.jpg',
  },
  {
    id: 3,
    title: '1984',
    titleRu: '1984',
    author: 'Jorj Oruell',
    authorRu: 'Джордж Оруэлл',
    price: 48000,
    category: 'jahon',
    badge: 'bestseller',
    publisher: 'yangi-asr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    coverLetter: '1',
    coverImage: 'assets/images/book_3.jpg',
  },
  {
    id: 4,
    title: "Ko'rlik",
    titleRu: 'Слепота',
    author: 'Joze Saramago',
    authorRu: 'Жозе Сарамаго',
    price: 59000,
    category: 'jahon',
    badge: null,
    publisher: 'hilolnashr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    coverLetter: 'К',
  },
  {
    id: 5,
    title: "Yuz yillik yolg'izlik",
    titleRu: 'Сто лет одиночества',
    author: 'Gabriel Garsia Markes',
    authorRu: 'Габриэль Гарсиа Маркес',
    price: 55000,
    category: 'jahon',
    badge: null,
    publisher: 'yangi-asr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    coverLetter: 'Y',
  },
  {
    id: 6,
    title: "Men Robiya",
    titleRu: 'Я — Робия',
    author: "Sa'diya Erol Aykach",
    authorRu: "Са'дия Эрол Айкач",
    price: 48000,
    category: 'jahon',
    badge: 'yangi',
    publisher: 'hilolnashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    coverLetter: 'М',
  },

  // ==================== DINIY-MA'RIFIY ====================
  {
    id: 7,
    title: 'Qalbga taskin bitiklar',
    titleRu: 'Книги утешения для сердца',
    author: 'Zulfiqor Odil',
    authorRu: 'Зулфикор Одил',
    price: 39000,
    category: 'diniy',
    badge: 'hafta-lideri',
    publisher: 'masdar-nashr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    coverLetter: 'Q',
  },
  {
    id: 8,
    title: 'Nafs tarbiyasi',
    titleRu: 'Воспитание нафса',
    author: 'Hakim Termiziy',
    authorRu: 'Хаким Термизий',
    price: 30000,
    category: 'diniy',
    badge: null,
    publisher: 'masdar-nashr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    coverLetter: 'Н',
  },
  {
    id: 9,
    title: 'Futuvvat: Fazilatli yoshlik',
    titleRu: 'Футувват: Добродетельная молодость',
    author: 'Rajab Shonturk',
    authorRu: 'Раджаб Шонтурк',
    price: 36000,
    category: 'diniy',
    badge: null,
    publisher: 'masdar-nashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    coverLetter: 'Ф',
  },
  {
    id: 10,
    title: 'Sahihi Buxoriy (1-jild)',
    titleRu: 'Сахих аль-Бухари (том 1)',
    author: 'Imom Buxoriy',
    authorRu: 'Имам Бухари',
    price: 85000,
    category: 'diniy',
    badge: 'bestseller',
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    coverLetter: 'С',
    coverImage: 'assets/images/book_10.jpg',
  },
  {
    id: 11,
    title: "Olim tarbiyalagan onalar",
    titleRu: 'Матери, воспитавшие учёных',
    author: 'Murat Tosun',
    authorRu: 'Мурат Тосун',
    price: 33000,
    category: 'diniy',
    badge: 'yangi',
    publisher: 'masdar-nashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    coverLetter: 'O',
  },
  {
    id: 12,
    title: "Baxtiyor oila",
    titleRu: 'Счастливая семья',
    author: 'Shayx Muhammad Sodiq Muhammad Yusuf',
    authorRu: 'Шейх Мухаммад Содик Мухаммад Юсуф',
    price: 87000,
    category: 'diniy',
    badge: null,
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)',
    coverLetter: 'Б',
  },

  // ==================== BADIIY BO'LMAGAN ====================
  {
    id: 13,
    title: 'Pul psixologiyasi',
    titleRu: 'Психология денег',
    author: 'Morgan Hauzel',
    authorRu: 'Морган Хаузел',
    price: 65000,
    category: 'badiiy-bolmagan',
    badge: 'hafta-lideri',
    publisher: 'yangi-asr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
    coverLetter: 'П',
    coverImage: 'assets/images/book_13.jpg',
  },
  {
    id: 14,
    title: 'Atomik odatlar',
    titleRu: 'Атомные привычки',
    author: 'Jeyms Klir',
    authorRu: 'Джеймс Клир',
    price: 58000,
    category: 'badiiy-bolmagan',
    badge: 'bestseller',
    publisher: 'hilolnashr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    coverLetter: 'A',
  },
  {
    id: 15,
    title: "Fikrlash san'ati",
    titleRu: 'Искусство мыслить',
    author: 'Rolf Dobell',
    authorRu: 'Рольф Добелли',
    price: 45000,
    category: 'badiiy-bolmagan',
    badge: null,
    publisher: 'hilolnashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    coverLetter: 'Ф',
  },
  {
    id: 16,
    title: 'Sapiens',
    titleRu: 'Сапиенс',
    author: 'Yuval Noy Xarari',
    authorRu: 'Юваль Ной Харари',
    price: 72000,
    category: 'badiiy-bolmagan',
    badge: 'yangi',
    publisher: 'yangi-asr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    coverLetter: 'S',
    coverImage: 'assets/images/book_16.jpg',
  },
  {
    id: 17,
    title: "Kundalik odoblar",
    titleRu: 'Повседневный этикет',
    author: "G'iyosiddin Yusuf",
    authorRu: 'Гиёсиддин Юсуф',
    price: 23000,
    category: 'badiiy-bolmagan',
    badge: null,
    publisher: 'masdar-nashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    coverLetter: 'К',
  },

  // ==================== O'QUV QUROLLARI ====================
  {
    id: 18,
    title: 'Ingliz tili grammatikasi',
    titleRu: 'Грамматика английского языка',
    author: 'Raymond Murphy',
    authorRu: 'Рэймонд Мёрфи',
    price: 55000,
    category: 'oquv',
    badge: null,
    publisher: 'akademnashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
    coverLetter: 'I',
  },
  {
    id: 19,
    title: 'IELTS tayyorlov kursi',
    titleRu: 'Подготовка к IELTS',
    author: 'Cambridge University Press',
    authorRu: 'Cambridge University Press',
    price: 75000,
    category: 'oquv',
    badge: 'yangi',
    publisher: 'akademnashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #0acffe 0%, #495aff 100%)',
    coverLetter: 'I',
  },
  {
    id: 20,
    title: "Arabcha o'rganamiz",
    titleRu: 'Учим арабский',
    author: 'Masdar nashr jamoasi',
    authorRu: 'Коллектив Масдар нашр',
    price: 35000,
    category: 'oquv',
    badge: null,
    publisher: 'masdar-nashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    coverLetter: 'A',
  },
  {
    id: 21,
    title: 'Dasturlash asoslari',
    titleRu: 'Основы программирования',
    author: 'Python jamoasi',
    authorRu: 'Команда Python',
    price: 48000,
    category: 'oquv',
    badge: null,
    publisher: 'akademnashr',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    coverLetter: 'D',
  },

  // ==================== BOLALAR ADABIYOTI ====================
  {
    id: 22,
    title: 'Bolalar uchun 100 hikoya',
    titleRu: '100 рассказов для детей',
    author: 'Turli mualliflar',
    authorRu: 'Разные авторы',
    price: 25000,
    category: 'bolalar',
    badge: 'yangi',
    publisher: 'masdar-nashr',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    coverLetter: 'Б',
    coverImage: 'assets/images/book_22.jpg',
  },
  {
    id: 23,
    title: 'Alisher Navoiy hayoti',
    titleRu: 'Жизнь Алишера Навои',
    author: 'Erkin Vohidov',
    authorRu: 'Эркин Вохидов',
    price: 18000,
    category: 'bolalar',
    badge: null,
    publisher: 'sharq',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    coverLetter: 'A',
  },
  {
    id: 24,
    title: 'Kichkintoylar alifbosi',
    titleRu: 'Азбука для малышей',
    author: "To'lqin Hayit",
    authorRu: 'Тулкин Хайит',
    price: 15000,
    category: 'bolalar',
    badge: null,
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    coverLetter: 'K',
  },
  {
    id: 25,
    title: 'Ertaklar xazinasi',
    titleRu: 'Сокровищница сказок',
    author: 'Xalq og\'zaki ijodi',
    authorRu: 'Народное творчество',
    price: 28000,
    category: 'bolalar',
    badge: 'bestseller',
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    coverLetter: 'E',
  },

  // ==================== O'ZBEK ADABIYOTI ====================
  {
    id: 26,
    title: 'Ikki eshik orasi',
    titleRu: 'Между двумя дверями',
    author: "O'tkir Hoshimov",
    authorRu: 'Уткир Хошимов',
    price: 23000,
    category: 'uzbek',
    badge: 'hafta-lideri',
    publisher: 'sharq',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #c79081 0%, #dfa579 100%)',
    coverLetter: 'И',
    coverImage: 'assets/images/book_26.jpg',
  },
  {
    id: 27,
    title: 'Dunyoning ishlari',
    titleRu: 'Дела мира',
    author: "O'tkir Hoshimov",
    authorRu: 'Уткир Хошимов',
    price: 15000,
    category: 'uzbek',
    badge: 'bestseller',
    publisher: 'sharq',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #e6b980 0%, #eacda3 100%)',
    coverLetter: 'D',
  },
  {
    id: 28,
    title: 'Tushda kechgan umrlar',
    titleRu: 'Жизни, прожитые во снах',
    author: "O'tkir Hoshimov",
    authorRu: 'Уткир Хошимов',
    price: 17000,
    category: 'uzbek',
    badge: null,
    publisher: 'sharq',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #c7956d 100%)',
    coverLetter: 'T',
  },
  {
    id: 29,
    title: "O'tgan kunlar",
    titleRu: 'Минувшие дни',
    author: 'Abdulla Qodiriy',
    authorRu: 'Абдулла Кадири',
    price: 28000,
    category: 'uzbek',
    badge: 'bestseller',
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #b68d40 0%, #d4a76a 100%)',
    coverLetter: 'Ў',
    coverImage: 'assets/images/book_29.jpg',
  },
  {
    id: 30,
    title: 'Mehrobdan chayon',
    titleRu: 'Скорпион из алтаря',
    author: 'Abdulla Qodiriy',
    authorRu: 'Абдулла Кадири',
    price: 30000,
    category: 'uzbek',
    badge: null,
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #c9a959 0%, #8B7355 100%)',
    coverLetter: 'M',
  },
  {
    id: 31,
    title: 'Sarob',
    titleRu: 'Мираж',
    author: 'Abdulla Qahhor',
    authorRu: 'Абдулла Каххар',
    price: 25000,
    category: 'uzbek',
    badge: null,
    publisher: 'sharq',
    cover: 'softcover',
    gradient: 'linear-gradient(135deg, #8B6914 0%, #DAA520 100%)',
    coverLetter: 'С',
  },
  {
    id: 32,
    title: 'Kecha va kunduz',
    titleRu: 'Ночь и день',
    author: "Cho'lpon",
    authorRu: 'Чулпон',
    price: 32000,
    category: 'uzbek',
    badge: 'yangi',
    publisher: 'sharq',
    cover: 'hardcover',
    gradient: 'linear-gradient(135deg, #AA8B56 0%, #6B4F36 100%)',
    coverLetter: 'K',
  },
];

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
