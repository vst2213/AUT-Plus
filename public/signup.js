// Initialize Firebase (replace with your Firebase configuration)
const firebaseConfig = {
    apiKey: "AIzaSyA45uTsNNYPs7qAwJV_gzqioXXg_R_wSy0",
    authDomain: "aut-plus-56681.firebaseapp.com",
    projectId: "aut-plus-56681",
    storageBucket: "aut-plus-56681.appspot.com",
    messagingSenderId: "1053246703227",
    appId: "1:1053246703227:web:7ff53f7dde9c56338004de"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign-Up Function
document.getElementById('signupBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sign-Up successful
            console.log('User signed up:', userCredential.user);
            window.location.href = 'index.html'; // Redirect to login page or dashboard
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
            alert('Error: ' + errorMessage);
        });
});
