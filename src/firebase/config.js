import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Safe environment variable getter with authentic fallback for startech-77d5d
const getEnv = (key, fallback) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return fallback;
};

// Authentic Firebase Configuration for startech-77d5d
const firebaseConfig = {
  apiKey: getEnv('REACT_APP_FIREBASE_API_KEY', "AIzaSyC3Dt07sCmO7UcXCrc_J8HRdF7QItSVpf4"),
  authDomain: getEnv('REACT_APP_FIREBASE_AUTH_DOMAIN', "startech-77d5d.firebaseapp.com"),
  projectId: getEnv('REACT_APP_FIREBASE_PROJECT_ID', "startech-77d5d"),
  storageBucket: getEnv('REACT_APP_FIREBASE_STORAGE_BUCKET', "startech-77d5d.firebasestorage.app"),
  messagingSenderId: getEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID', "45047495218"),
  appId: getEnv('REACT_APP_FIREBASE_APP_ID', "1:45047495218:web:48ac80748cf42efba61a2b")
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication Providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const githubProvider = new GithubAuthProvider();

// Ensure local persistence
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Firebase persistence setup warning:', err);
});

export {
  app,
  auth,
  db,
  storage,
  googleProvider,
  githubProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
};
