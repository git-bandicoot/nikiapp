// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ37OMPrZo--aij44SvqP5XSfxMzjFqis",
    authDomain: "niki-6b5c2.firebaseapp.com",
    projectId: "niki-6b5c2",
    storageBucket: "niki-6b5c2.firebasestorage.app",
    messagingSenderId: "113352772018",
    appId: "1:113352772018:web:99e16986736caa626d7cab",
    measurementId: "G-7K07MG43CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);