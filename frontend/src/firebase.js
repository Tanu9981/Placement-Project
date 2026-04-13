import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsxhxiGK4fMaa_GHxxzGpdSaIK6D4IQ_Q",
  authDomain: "placement-portal-e8d54.firebaseapp.com",
  projectId: "placement-portal-e8d54",
  storageBucket: "placement-portal-e8d54.firebasestorage.app",
  messagingSenderId: "261603361227",
  appId: "1:261603361227:web:ce45d142f3552b39b2764e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
