import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8TFitMZgSTmxTTIaeCznwN2CpzWoQ6Bc",
    authDomain: "booksdev-3de79.firebaseapp.com",
    databaseURL: "https://booksdev-3de79-default-rtdb.firebaseio.com",
    projectId: "booksdev-3de79",
    storageBucket: "booksdev-3de79.firebasestorage.app",
    messagingSenderId: "39273829148",
    appId: "1:39273829148:web:cbb6d02d4597025e09a0d9",
    measurementId: "G-5Q3BCRZEBZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle Authentication State
onAuthStateChanged(auth, (user) => {
    const isLoginPage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    if (user) {
        // User is signed in
        if (isLoginPage) {
            window.location.href = '/dashboard';
        } else {
            // Update UI with user info if not on login page
            const userAvatar = document.getElementById('user-avatar');
            const userName = document.getElementById('user-name');
            if (userAvatar) userAvatar.src = user.photoURL;
            if (userName) userName.textContent = user.displayName;
        }
    } else {
        // User is signed out
        if (!isLoginPage) {
            window.location.href = '/index.html';
        }
    }
});

// Login Function
const loginBtn = document.getElementById('login-google-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Success handled by onAuthStateChanged
            }).catch((error) => {
                console.error("Login failed:", error.message);
                alert("Erro ao fazer login com o Google. Tente novamente.");
            });
    });
}

// Logout Function
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Success handled by onAuthStateChanged
        }).catch((error) => {
            console.error("Logout failed:", error.message);
        });
    });
}