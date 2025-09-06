import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Add this import

const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "crypto-palace-c261c.firebaseapp.com",
  projectId: "crypto-palace-c261c",
  storageBucket: "crypto-palace-c261c.appspot.com",
  messagingSenderId: "671825383539",
  appId: "1:671825383539:web:167dda0af2a80f4d1b5a06",
  measurementId: "G-J90Y8QML0G"

};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Add this export
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);