// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXbGxBr28ByLMI_QkJ0EA3jvUZR0S5hlo",
  authDomain: "blog-react-6172c.firebaseapp.com",
  projectId: "blog-react-6172c",
  storageBucket: "blog-react-6172c.appspot.com",
  messagingSenderId: "181969437984",
  appId: "1:181969437984:web:b6b145f24436809f458345",
  measurementId: "G-S8F19SXPQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);