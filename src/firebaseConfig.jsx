import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Dt07sCmO7UcXCrc_J8HRdF7QItSVpf4",
  authDomain: "startech-77d5d.firebaseapp.com",
  projectId: "startech-77d5d",
  storageBucket: "startech-77d5d.firebasestorage.app",
  messagingSenderId: "45047495218",
  appId: "1:45047495218:web:48ac80748cf42efba61a2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default firebaseConfig;