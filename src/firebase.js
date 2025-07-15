// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyCwvZ4pO_lZNZMrRWJ1clKwPPC7R83RKa0",
    authDomain: "campus-ally-29719.firebaseapp.com",
    projectId: "campus-ally-29719",
    storageBucket: "campus-ally-29719.firebasestorage.app",
    messagingSenderId: "852823870696",
    appId: "1:852823870696:web:11446c7cbbb813d90e8d5d",
    measurementId: "G-MRCZCSZXYS"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
