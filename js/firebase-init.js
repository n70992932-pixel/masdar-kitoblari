// Firebase SDK (Compat Version)
const firebaseConfig = {
  apiKey: "AIzaSyAB9yCMRZIAedOMmxxYZcdeR6Bon6ecimw",
  authDomain: "masdar-kitoblari.firebaseapp.com",
  projectId: "masdar-kitoblari",
  storageBucket: "masdar-kitoblari.firebasestorage.app",
  messagingSenderId: "659978757613",
  appId: "1:659978757613:web:5b565be3693e26e72273e4",
  measurementId: "G-S8Q5R6T4DW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
