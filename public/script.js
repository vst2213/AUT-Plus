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
