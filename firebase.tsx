// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdQqHo2Hw6gAwFm0vTexkzicCykMZ7cGo",
  authDomain: "tribu-ff872.firebaseapp.com",
  projectId: "tribu-ff872",
  storageBucket: "tribu-ff872.appspot.com",
  messagingSenderId: "220387369572",
  appId: "1:220387369572:web:65944fbc293271fdc0f571",
  measurementId: "G-0PFDKL6ESK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);