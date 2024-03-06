
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0GqccUyPxzsMn7wRsP4OQjeOtEXp_UVI",
  authDomain: "badger-chat-3f317.firebaseapp.com",
  projectId: "badger-chat-3f317",
  storageBucket: "badger-chat-3f317.appspot.com",
  messagingSenderId: "341947762502",
  appId: "1:341947762502:web:fbef422530db99c1830747"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);