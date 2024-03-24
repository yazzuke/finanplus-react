// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKRpKk5ITF1po3TZd4R5qGu43nwBnXKo4",
  authDomain: "finanplus-4cfd2.firebaseapp.com",
  projectId: "finanplus-4cfd2",
  storageBucket: "finanplus-4cfd2.appspot.com",
  messagingSenderId: "536975511924",
  appId: "1:536975511924:web:190bd0c4371bdcee0bdc21",
  measurementId: "G-WV7J7XB3FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);