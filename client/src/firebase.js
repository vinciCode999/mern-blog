// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-i610.firebaseapp.com",
  projectId: "mern-blog-i610",
  storageBucket: "mern-blog-i610.appspot.com",
  messagingSenderId: "388858557362",
  appId: "1:388858557362:web:5a990e7af3a7e5fc496aab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);