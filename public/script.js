document.getElementById('home').addEventListener('click', function() {
    // Navigate to Home Page
    window.location.href = 'home.html'; // Home page URL
});

document.getElementById('community').addEventListener('click', function() {
    // Navigate to Community Page
    window.location.href = 'community.html'; // This is the current page
});

document.getElementById('search').addEventListener('click', function() {
    // Navigate to Search Page
    window.location.href = 'search.html'; // Search page URL
});

document.getElementById('notifications').addEventListener('click', function() {
    // Navigate to Notifications Page
    window.location.href = 'notifications.html'; // Notifications page URL
});

document.getElementById('profile').addEventListener('click', function() {
    // Navigate to Profile Page
    window.location.href = 'profile.html'; // Profile page URL
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA45uTsNNYPs7qAwJV_gzqioXXg_R_wSy0",
    authDomain: "aut-plus-56681.firebaseapp.com",
    projectId: "aut-plus-56681",
    storageBucket: "aut-plus-56681.appspot.com",
    messagingSenderId: "1053246703227",
    appId: "1:1053246703227:web:7ff53f7dde9c56338004de",
    measurementId: "G-LHK7B8D43L"
};

// Login Function
document.getElementById('loginBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful
            console.log('User logged in:', userCredential.user);
            window.location.href = 'dashboard.html'; // Redirect to a dashboard page or home page
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error logging in:', errorCode, errorMessage);
            alert('Error: ' + errorMessage);
        });
});

// Redirect to Sign-up page
document.getElementById('signup-link').addEventListener('click', function() {
    window.location.href = 'signup.html';
});
