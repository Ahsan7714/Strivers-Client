// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCNAymJtftKYEiEMcdZJXFkxMVc6QfGX18",
    authDomain: "strivers-3e7bc.firebaseapp.com",
    projectId: "strivers-3e7bc",
    storageBucket: "strivers-3e7bc.appspot.com",
    messagingSenderId: "185967010487",
    appId: "1:185967010487:web:502e88a46184faae3c2332",
    measurementId: "G-V8RFHZHNTJ"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
