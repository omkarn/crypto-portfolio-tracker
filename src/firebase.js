import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjtINxuC79LaSg9qj1e9QKgu1iT-AuQUE",
  authDomain: "portfolio-tracker-5970f.firebaseapp.com",
  projectId: "portfolio-tracker-5970f",
  storageBucket: "portfolio-tracker-5970f.appspot.com",
  messagingSenderId: "28486600920",
  appId: "1:28486600920:web:bcb0a476f0a3a619be2fad",
  measurementId: "G-4PFZ89M6K7",
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();

export {db,auth};