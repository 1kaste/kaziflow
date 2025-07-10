// src/firebase.ts (or src/firebase.js)

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
// Import the services you plan to use, e.g.,
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// You might also need:
// import { getDatabase } from "firebase/database"; // For Realtime Database
// import { getFunctions } from "firebase/functions"; // For Cloud Functions
// import { getAnalytics } from "firebase/analytics"; // If you enabled Analytics

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDug6i2EJEWR1MfYcunSmxV1SQgySZLzN0",
  authDomain: "displaywebsites.firebaseapp.com",
  databaseURL: "https://displaywebsites-default-rtdb.firebaseio.com",
  projectId: "displaywebsites",
  storageBucket: "displaywebsites.firebasestorage.app",
  messagingSenderId: "336087816407",
  appId: "1:336087816407:web:c3972bb85ce1e0d4c53892",
  measurementId: "G-EK1KG6ZRCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const database = getDatabase(app); // If using Realtime Database
// export const functions = getFunctions(app); // If using Cloud Functions
// export const analytics = getAnalytics(app); // If using Analytics

// You can also export the app instance itself if needed
export default app;
