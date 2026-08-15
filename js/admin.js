document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('admin-login-form');
  const logoutBtn = document.getElementById('logout-btn');
  
  const booksList = document.getElementById('admin-books-list');
  const addBookForm = document.getElementById('add-book-form');
  const importBtn = document.getElementById('import-btn');

  // Firebase Auth State Listener
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      loginView.style.display = 'none';
      dashboardView.style.display = 'flex';
      loadBooks();
    } else {
      // No user is signed in
      loginView.style.display = 'flex';
      dashboardView.style.display = 'none';
    }
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("Logged in:", userCredential.user.email);
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Xatolik: " + error.message);
      });
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().catch((error) => {
      console.error("Logout error:", error);
    });
  });

  // Load books from Firestore
  function loadBooks() {
    db.collection("books").onSnapshot((snapshot) => {
      booksList.innerHTML = '';
      snapshot.forEach((doc) => {
        const book = doc.data();
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${book.cover}" width="40" style="border-radius: 4px;"></td>
          <td>${book.title?.uz || book.title || 'Nomsiz'}</td>
          <td>${book.author || 'Noma\'lum'}</td>
          <td>${book.price} so'm</td>
          <td>
            <button class="btn-sm btn-danger" onclick="deleteBook('${doc.id}')">O'chirish</button>
          </td>
        `;
        booksList.appendChild(tr);
      });
    });
  }

  // Add Book
  addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const oldText = btn.textContent;
    btn.textContent = "Yuklanmoqda...";
    btn.disabled = true;

    try {
      const fileInput = document.getElementById('book-cover');
      const file = fileInput.files[0];
      let coverUrl = "";

      if (!file) {
        alert("Iltimos, rasm tanlang!");
        btn.textContent = oldText;
        btn.disabled = false;
        return;
      }

      // Convert image to base64 with compression (to fit in Firestore limit)
      coverUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 600;
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Compress to JPEG with 0.7 quality
            resolve(canvas.toDataURL('image/jpeg', 0.7));
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const newBook = {
        title: document.getElementById('title_uz').value,
        titleRu: document.getElementById('title_uz').value, // Fallback
        author: document.getElementById('author').value,
        price: parseInt(document.getElementById('price').value),
        coverImage: coverUrl,
        category: document.getElementById('category').value,
        isBestseller: false,
        year: 2024,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('books').add(newBook);
      addBookForm.reset();
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xato: " + error.message);
    } finally {
      btn.textContent = oldText;
      btn.disabled = false;
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
            console.error("Error importing:", e);
          }
        }
        alert(`Muvaffaqiyatli! ${count} ta kitob bazaga yozildi.`);
      } else {
        alert("books.js topilmadi yoki BOOKS o'zgaruvchisi yo'q!");
      }
    }
  });

});
