// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the Firebase auth module
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA45uTsNNYPs7qAwJV_gzqioXXg_R_wSy0",
  authDomain: "aut-plus-56681.firebaseapp.com",
  projectId: "aut-plus-56681",
  storageBucket: "aut-plus-56681.appspot.com",
  messagingSenderId: "1053246703227",
  appId: "1:1053246703227:web:7ff53f7dde9c56338004de",
  measurementId: "G-LHK7B8D43L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // Exporting the 'auth' object for use in your app
