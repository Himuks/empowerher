import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkqIi70Ie_N_Ye8GavPu6_M-pP7TMBjc4",
    authDomain: "empowerher-3789a.firebaseapp.com",
    projectId: "empowerher-3789a",
    storageBucket: "empowerher-3789a.firebasestorage.app",
    messagingSenderId: "806935385499",
    appId: "1:806935385499:web:06e2cdbf92b30d554dfd3e",
    measurementId: "G-0JH34CKW5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
