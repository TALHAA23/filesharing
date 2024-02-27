// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAxFv_rvJLv-cbLw6snlve4icHcKWQH_E",
  authDomain: "file-sharing-bd3e7.firebaseapp.com",
  projectId: "file-sharing-bd3e7",
  storageBucket: "file-sharing-bd3e7.appspot.com",
  messagingSenderId: "290673134250",
  appId: "1:290673134250:web:97da8f44da772eca595ed3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
export const registeredUserCollection = collection(db, "registeredUsers");
export const usersCollection = collection(db, "users");
