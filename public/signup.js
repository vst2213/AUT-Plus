

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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
        });
}

document.getElementById("signupButton").addEventListener("click", signUp);