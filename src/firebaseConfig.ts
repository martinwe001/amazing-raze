// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "amazing-raze.firebaseapp.com",
  databaseURL: "https://amazing-raze-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "amazing-raze",
  storageBucket: "amazing-raze.appspot.com",
  messagingSenderId: "138525351619",
  appId: "1:138525351619:web:efc3c69f65aa09aca6cc76",
  measurementId: "G-KT6MHN1Y7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);