import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdkJQSCHNppvbUWeuW2w-JWh3sUSuEQgw",
  authDomain: "e-business-2a7e0.firebaseapp.com",
  projectId: "e-business-2a7e0",
  storageBucket: "e-business-2a7e0.appspot.com",
  messagingSenderId: "160805405013",
  appId: "1:160805405013:web:18f4439c905223c1072fdc",
  measurementId: "G-JJVDHL537R",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
