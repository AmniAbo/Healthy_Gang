// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore'; // Correct import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_N0sUmbF2j417xH09YLzBRHKzhMy4IF4",
  authDomain: "be-healthy-9643b.firebaseapp.com",
  projectId: "be-healthy-9643b",
  storageBucket: "be-healthy-9643b.appspot.com",
  messagingSenderId: "792560950302",
  appId: "1:792560950302:web:20d28f8d7bc87e88fca20f",
  measurementId: "G-2LM9B46KGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app); // Correct initialization for Firestore

export default app;
