// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Sign up function
function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User created:", user);
      // You can redirect or update the UI here
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
      // Handle errors here (e.g., show an error message to the user)
    });
}

// Attach the signUp function to the button
document.getElementById("signupButton").addEventListener("click", signUp);
