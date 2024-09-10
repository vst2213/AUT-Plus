// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config details from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA45uTsNNYPs7qAwJV_gzqioXXg_R_wSy0",
  authDomain: "aut-plus-56681.firebaseapp.com",
  projectId: "aut-plus-56681",
  storageBucket: "aut-plus-56681.appspot.com",
  messagingSenderId: "1053246703227",
  appId: "1:1053246703227:web:7ff53f7dde9c56338004de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
