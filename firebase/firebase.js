// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl4xANtpQxHqg9r5CsKakUnlj7ol07L_w",
  authDomain: "auth-67486.firebaseapp.com",
  projectId: "auth-67486",
  storageBucket: "auth-67486.appspot.com",
  messagingSenderId: "268899164629",
  appId: "1:268899164629:web:f8dc6db96ec4c640835d5c",
  measurementId: "G-4WL3CGY97F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)