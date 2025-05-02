import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJiqU6eVa5NsykLwNwz2YeEoryzyrA3Ss",
  authDomain: "nextrade-ai-82274.firebaseapp.com",
  projectId: "nextrade-ai-82274",
  storageBucket: "nextrade-ai-82274.appspot.com", // you had a typo here also
  messagingSenderId: "952674508668",
  appId: "1:952674508668:web:691e4ad9d47fa7b0484ef9",
  measurementId: "G-2ZT0ZTR743"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("data getting recieved from getAuth function",auth)
export const googleProvider = new GoogleAuthProvider();