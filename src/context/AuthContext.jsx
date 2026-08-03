import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  auth,
  db,
  googleProvider,
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
  serverTimestamp
} from '../firebase/config';
import {
  setAuthUser,
  setRoleState,
  setLoading as setReduxLoading,
  setError as setReduxError,
  logoutUser
} from '../store/authSlice';
import { mergeGuestCart } from '../store/cartSlice';

const SUPER_ADMIN_EMAIL = 'towsifislam33@gmail.com';

const AuthContext = createContext();

export const getFirebaseErrorMessage = (error) => {
  if (!error) return 'An error occurred. Please try again.';
  const code = error.code || error;

  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'The email address entered is invalid.';
    case 'auth/weak-password':
      return 'Your password is too weak. Please choose at least 6 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please verify and try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Access blocked temporarily.';
    case 'auth/user-disabled':
      return 'This user account has been disabled by an administrator.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing authentication.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser. Please allow popups for this website.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email address under a different sign-in method.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in popup request was cancelled.';
    default:
      return error.message || 'Authentication failed. Please check your information.';
  }
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxAuth = useSelector((state) => state.auth);

  const [user, setUser] = useState(reduxAuth.user);
  const [role, setRole] = useState(reduxAuth.role || 'Customer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);

  // Sync Firestore document and role for a verified Firebase user
  const syncUserDocAndRole = useCallback(async (firebaseUser, customRole) => {
    if (!firebaseUser || !firebaseUser.uid) return null;

    try {
      console.log('[SYNC_USER_DOC] Syncing Firestore user doc for UID:', firebaseUser.uid);
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      const isSuperAdmin = firebaseUser.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
      let userRole = isSuperAdmin ? 'Admin' : (customRole || 'Customer');

      let userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'StarTech User',
        photoURL: firebaseUser.photoURL || '',
        role: userRole,
        status: 'active',
        emailVerified: firebaseUser.emailVerified,
        lastLogin: new Date().toISOString()
      };

      if (userSnap.exists()) {
        const existingData = userSnap.data();
        userRole = isSuperAdmin ? 'Admin' : (existingData.role || userRole);
        userData = {
          ...existingData,
          ...userData,
          role: userRole
        };
        updateDoc(userRef, { lastLogin: serverTimestamp(), role: userRole, emailVerified: firebaseUser.emailVerified }).catch(() => {});
      } else {
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      }

      dispatch(setRoleState(userRole));
      dispatch(setAuthUser(userData));

      try {
        const savedGuestCart = localStorage.getItem('startech-cart');
        if (savedGuestCart) {
          const parsedCart = JSON.parse(savedGuestCart);
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            dispatch(mergeGuestCart(parsedCart));
          }
        }
      } catch (e) {}

      setUser(userData);
      setRole(userRole);
      return userData;
    } catch (err) {
      console.error('[SYNC_USER_DOC_ERROR]:', err.message);
      const isSuperAdmin = firebaseUser.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
      const authenticUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        role: isSuperAdmin ? 'Admin' : (customRole || 'Customer'),
        status: 'active',
        emailVerified: firebaseUser.emailVerified
      };

      dispatch(setRoleState(authenticUser.role));
      dispatch(setAuthUser(authenticUser));
      setUser(authenticUser);
      setRole(authenticUser.role);
      return authenticUser;
    }
  }, [dispatch]);

  // Strict Firebase Auth State Listener (Requires emailVerified = true)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('[ON_AUTH_STATE_CHANGED] Event Fired:', {
        uid: firebaseUser?.uid,
        email: firebaseUser?.email,
        emailVerified: firebaseUser?.emailVerified
      });

      if (firebaseUser && firebaseUser.emailVerified) {
        setLoading(true);
        dispatch(setReduxLoading(true));
        await syncUserDocAndRole(firebaseUser);
        setLoading(false);
        dispatch(setReduxLoading(false));
      } else {
        setUser(null);
        setRole('Customer');
        dispatch(logoutUser());
        setLoading(false);
        dispatch(setReduxLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch, syncUserDocAndRole]);

  // Google Authentication Handler
  const loginWithGoogle = async (chosenRole = 'Customer') => {
    console.log('[GOOGLE_AUTH_START] Opening Google Auth popup...');
    setLoading(true);
    setError(null);
    dispatch(setReduxLoading(true));

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      console.log('[GOOGLE_AUTH_SUCCESS] Firebase Google Credential Received:', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      });

      const isSuperAdmin = firebaseUser.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
      let userRole = isSuperAdmin ? 'Admin' : (chosenRole || 'Customer');

      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      let userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Google User',
        photoURL: firebaseUser.photoURL || '',
        role: userRole,
        status: 'active',
        emailVerified: true,
        lastLogin: new Date().toISOString()
      };

      if (userSnap.exists()) {
        const existingData = userSnap.data();
        userRole = isSuperAdmin ? 'Admin' : (existingData.role || userRole);
        userData = {
          ...existingData,
          ...userData,
          role: userRole
        };
        await updateDoc(userRef, { lastLogin: serverTimestamp(), role: userRole }).catch(() => {});
      } else {
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        }).catch((err) => console.warn('Firestore setDoc notice:', err));
      }

      dispatch(setRoleState(userRole));
      dispatch(setAuthUser(userData));
      setUser(userData);
      setRole(userRole);

      setLoading(false);
      dispatch(setReduxLoading(false));

      return { success: true, user: userData };
    } catch (err) {
      console.error('[GOOGLE_AUTH_ERROR]:', err.code, err.message);
      const errMsg = getFirebaseErrorMessage(err);
      setError(errMsg);
      dispatch(setReduxError(errMsg));
      setLoading(false);
      dispatch(setReduxLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // Registration Flow (Email/Password)
  const register = async (userData, chosenRole = 'Customer') => {
    console.log("REGISTER FUNCTION STARTED");
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const firebaseUser = userCredential.user;

      const fullName = userData.full_name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email.split('@')[0];

      try {
        await updateProfile(firebaseUser, { displayName: fullName });
      } catch (pErr) {}

      const isSuperAdmin = userData.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
      const finalRole = isSuperAdmin ? 'Admin' : (chosenRole || 'Customer');

      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: fullName,
          photoURL: '',
          role: finalRole,
          status: 'active',
          emailVerified: false,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } catch (fsErr) {}

      try {
        await sendEmailVerification(firebaseUser);
      } catch (evErr) {}

      try {
        await signOut(auth);
      } catch (soErr) {}

      setUser(null);
      setRole('Customer');
      dispatch(logoutUser());

      setLoading(false);
      dispatch(setReduxLoading(false));

      return { success: true };
    } catch (err) {
      console.error("register() caught error:", err.code, err.message);
      const errMsg = getFirebaseErrorMessage(err);
      setError(errMsg);
      dispatch(setReduxError(errMsg));
      setLoading(false);
      dispatch(setReduxLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // Login Flow with user.reload() & emailVerified Check
  const login = async (email, password, desiredRole = null) => {
    console.log('[LOGIN_START] Email:', email);
    setLoading(true);
    setError(null);
    setUnverifiedEmail(null);
    dispatch(setReduxLoading(true));

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      try {
        await firebaseUser.reload();
      } catch (rErr) {}

      if (!firebaseUser.emailVerified) {
        await signOut(auth);
        setUser(null);
        dispatch(logoutUser());

        const errMsg = 'Please verify your email before logging in.';
        setError(errMsg);
        setUnverifiedEmail(email);
        dispatch(setReduxError(errMsg));
        setLoading(false);
        dispatch(setReduxLoading(false));

        return {
          success: false,
          requiresVerification: true,
          email: email,
          error: errMsg
        };
      }

      const isSuperAdmin = email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
      let assignedRole = isSuperAdmin ? 'Admin' : (desiredRole || 'Customer');

      const syncedUser = await syncUserDocAndRole(firebaseUser, assignedRole);
      setLoading(false);
      dispatch(setReduxLoading(false));
      return { success: true, user: syncedUser };
    } catch (err) {
      console.error('[LOGIN_ERROR]:', err.code, err.message);
      const errMsg = getFirebaseErrorMessage(err);
      setError(errMsg);
      dispatch(setReduxError(errMsg));
      setLoading(false);
      dispatch(setReduxLoading(false));
      return { success: false, error: errMsg };
    }
  };

  // Resend Verification Email Function
  const resendVerificationEmail = async (email, password) => {
    try {
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        setUser(null);
        dispatch(logoutUser());
        return { success: true };
      } else if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        await signOut(auth);
        setUser(null);
        dispatch(logoutUser());
        return { success: true };
      } else {
        return { success: false, error: 'Please enter your email and password to resend the verification link.' };
      }
    } catch (err) {
      return { success: false, error: getFirebaseErrorMessage(err) };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setUser(null);
    setRole('Customer');
    dispatch(logoutUser());
  };

  const value = {
    user,
    role,
    isAuthenticated: !!user && user.emailVerified === true,
    loading,
    error,
    unverifiedEmail,
    login,
    loginWithGoogle,
    register,
    logout,
    resendVerificationEmail,
    syncUserDocAndRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
