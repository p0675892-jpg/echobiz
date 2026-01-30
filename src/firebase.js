import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmcGfTbEllGW8MPSPJNcLBqar7fYX6poA",
  authDomain: "echobiz-93da2.firebaseapp.com",
  projectId: "echobiz-93da2",
  storageBucket: "echobiz-93da2.firebasestorage.app",
  messagingSenderId: "596892470746",
  appId: "1:596892470746:web:556808cbac060aa37cc4e3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // 🔥 THIS WAS MISSING
export const db = getFirestore(app);
