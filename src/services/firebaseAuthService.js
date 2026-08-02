import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/**
 * Format Firebase Auth Error Codes to user-friendly messages
 */
export const getAuthErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred.';
  const code = typeof error === 'string' ? error : error.code || '';

  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing login.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address using another sign-in method.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/requires-recent-login':
      return 'Please re-authenticate before performing this operation.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is currently disabled.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
};

/**
 * Save / Update User Profile in Firestore
 */
export const saveUserProfileToFirestore = async (firebaseUser, additionalData = {}) => {
  if (!firebaseUser) return null;

  const userRef = doc(db, 'users', firebaseUser.uid);
  const snap = await getDoc(userRef).catch(() => null);

  const userData = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: additionalData.displayName || firebaseUser.displayName || '',
    firstName: additionalData.firstName || (firebaseUser.displayName ? firebaseUser.displayName.split(' ')[0] : 'User'),
    lastName: additionalData.lastName || (firebaseUser.displayName ? firebaseUser.displayName.split(' ').slice(1).join(' ') : ''),
    photoURL: firebaseUser.photoURL || '',
    provider: firebaseUser.providerData[0]?.providerId || 'password',
    role: additionalData.role || (snap?.exists() ? snap.data().role : 'user'),
    createdAt: snap?.exists() ? snap.data().createdAt : serverTimestamp(),
    lastLogin: serverTimestamp(),
  };

  await setDoc(userRef, userData, { merge: true }).catch(() => {});
  return userData;
};

const firebaseAuthService = { getAuthErrorMessage, saveUserProfileToFirestore };
export default firebaseAuthService;
