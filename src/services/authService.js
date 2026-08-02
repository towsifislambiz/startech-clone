import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebaseConfig';
import { getAuthErrorMessage, saveUserProfileToFirestore } from './firebaseAuthService';

export const authService = {
  /**
   * Email & Password Signup
   */
  signup: async (email, password, displayName, extraData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (displayName) {
        await firebaseUpdateProfile(user, { displayName }).catch(() => {});
      }

      // Send Email Verification
      await sendEmailVerification(user).catch(() => {});

      // Save to Firestore
      const userProfile = await saveUserProfileToFirestore(user, { displayName, ...extraData });

      return { success: true, user, profile: userProfile };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * Email & Password Login
   */
  login: async (email, password, rememberMe = true) => {
    try {
      const persistenceMode = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceMode).catch(() => {});

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userProfile = await saveUserProfileToFirestore(user);
      return { success: true, user, profile: userProfile };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * Google Login
   */
  googleLogin: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userProfile = await saveUserProfileToFirestore(user);
      return { success: true, user, profile: userProfile };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * GitHub Login
   */
  githubLogin: async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const userProfile = await saveUserProfileToFirestore(user);
      return { success: true, user, profile: userProfile };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * Forgot Password / Reset Password Email
   */
  forgotPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * Update Profile
   */
  updateProfile: async (user, profileData) => {
    try {
      if (profileData.displayName || profileData.photoURL) {
        await firebaseUpdateProfile(user, {
          displayName: profileData.displayName || user.displayName,
          photoURL: profileData.photoURL || user.photoURL,
        });
      }
      const updatedProfile = await saveUserProfileToFirestore(user, profileData);
      return { success: true, profile: updatedProfile };
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  /**
   * Send Email Verification manually
   */
  sendEmailVerification: async (user) => {
    try {
      if (user) {
        await sendEmailVerification(user);
        return { success: true };
      }
      throw new Error('No user is currently signed in');
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },
};

export default authService;
