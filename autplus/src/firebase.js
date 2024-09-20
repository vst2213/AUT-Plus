// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
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

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.error("Offline persistence failed: Multiple tabs open");
  } else if (err.code === "unimplemented") {
    console.error("Offline persistence is not available");
  }
});

// Export the Firebase services
export { auth, db, storage, analytics };
