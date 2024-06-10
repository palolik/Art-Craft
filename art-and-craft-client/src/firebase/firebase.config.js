// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_PROJECTID,
  projectId: import.meta.env.VITE_STORAGEBUCKET,
  storageBucket: import.meta.env.VITE_MESSAGINGSENDERID,
  messagingSenderId: import.meta.env.VITE_APPID,
  appId: import.meta.env.VITE_DATA,
  measurementId: import.meta.env.VITE_MEA,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;