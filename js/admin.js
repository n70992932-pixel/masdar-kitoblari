document.addEventListener('DOMContentLoaded', () => {
  const adminLoginView = document.getElementById('admin-login-view');
  const adminMain = document.getElementById('admin-main');
  const customTgBtn = document.getElementById('custom-tg-login-btn');
  const booksList = document.getElementById('admin-books-list');
  const addBookForm = document.getElementById('add-book-form');
  const importBtn = document.getElementById('import-btn');

  // TODO: Replace with the actual admin's Telegram ID later
  const ADMIN_ID = 123456789; // Placeholder

  function checkAuth(user) {
    if (!user) {
      adminLoginView.style.display = 'block';
      adminMain.style.display = 'none';
      return;
    }

    // In a real app, you'd check ADMIN_ID, but for now we'll show their ID so they can tell us
    // if (user.id !== ADMIN_ID) {
    //   alert(`Siz admin emassiz! Sizning ID: ${user.id}`);
    //   return;
    // }

    // For setup purposes, let's just let anyone in, but alert their ID so they know it
    console.log("Logged in user ID:", user.id);
    
    adminLoginView.style.display = 'none';
    adminMain.style.display = 'block';
    loadBooks();
  }

  // Telegram Login Callback
  window.onTelegramAuth = function(user) {
    checkAuth(user);
  };

  // Bind Login Button
  customTgBtn?.addEventListener('click', () => {
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth({
        bot_id: '8157364100',
        request_access: 'write'
      }, (data) => {
        if (data) window.onTelegramAuth(data);
      });
    }
  });

  // Load books from Firestore
  function loadBooks() {
    db.collection("books").onSnapshot((snapshot) => {
      booksList.innerHTML = '';
      snapshot.forEach((doc) => {
        const book = doc.data();
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${book.cover}" width="50" style="border-radius: 4px;"></td>
          <td>${book.title?.uz || book.title}</td>
          <td>${book.author}</td>
          <td>${book.price} so'm</td>
          <td>
            <button class="btn-action btn-delete" onclick="deleteBook('${doc.id}')">O'chirish</button>
          </td>
        `;
        booksList.appendChild(tr);
      });
    });
  }

  // Add Book
  addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newBook = {
      title: {
        uz: document.getElementById('title_uz').value,
        ru: document.getElementById('title_uz').value // simplified for now
      },
      author: document.getElementById('author').value,
      price: parseInt(document.getElementById('price').value),
      cover: document.getElementById('cover').value,
      category: "badiiy",
      isBestseller: false,
      year: 2024
    };

    try {
      await db.collection("books").add(newBook);
      addBookForm.reset();
      alert("Kitob qo'shildi!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Xatolik: " + error.message);
    }
  });

  // Delete Book (Global so HTML onclick can access it)
  window.deleteBook = async function(id) {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      try {
        await db.collection("books").doc(id).delete();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  // Import existing books from books.js
  importBtn.addEventListener('click', async () => {
    if (confirm("Diqqat! Bu hozirgi kod ichidagi barcha kitoblarni bazaga yozadi. Davom etamizmi?")) {
      if (typeof BOOKS !== 'undefined' && Array.isArray(BOOKS)) {
        let count = 0;
        for (const book of BOOKS) {
          try {
            await db.collection("books").doc(book.id).set(book);
            count++;
          } catch(e) {
            console.error(e);
          }
        }
        alert(`Muvaffaqiyatli! ${count} ta kitob bazaga yozildi.`);
      } else {
        alert("books.js topilmadi yoki BOOKS o'zgaruvchisi yo'q!");
      }
    }
  });

});
