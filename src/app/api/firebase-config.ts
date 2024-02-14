import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCGLks1iCavIHAJtOdajhokDuGllERho5A",
  authDomain: "window-shopper-19b37.firebaseapp.com",
  projectId: "window-shopper-19b37",
  storageBucket: "window-shopper-19b37.appspot.com",
  messagingSenderId: "32602699046",
  appId: "1:32602699046:web:a33e5566079aac80d13de7",
  measurementId: "G-Z74DDJ95G8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
