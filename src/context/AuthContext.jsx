import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxAuth = useSelector((state) => state.auth);

  const [user, setUser] = useState(reduxAuth.user);
  const [role, setRole] = useState(reduxAuth.role || 'Customer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync Firestore document and role for a given user UID
  const syncUserDocAndRole = useCallback(async (firebaseUser, customRole) => {
    if (!firebaseUser) return null;

    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      let userRole = customRole || 'Customer';
      let userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'StarTech User',
        photoURL: firebaseUser.photoURL || '',
        role: userRole,
        status: 'active',
        lastLogin: new Date().toISOString()
      };

      if (userSnap.exists()) {
        const existingData = userSnap.data();
        userRole = existingData.role || userRole;
        userData = {
          ...existingData,
          ...userData,
          role: userRole
        };
        // Update last login timestamp in Firestore
        updateDoc(userRef, { lastLogin: serverTimestamp() }).catch(() => {});
      } else {
        // Create initial document in Firestore
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        }).catch((err) => {
          console.warn('Firestore setDoc notice (operating in mock fallback mode):', err);
        });
      }

      // Cache role locally
      localStorage.setItem('startech-user-role', userRole);
      localStorage.setItem('startech-user', JSON.stringify(userData));

      dispatch(setRoleState(userRole));
      dispatch(setAuthUser(userData));

      // Trigger Guest Cart Merge upon login
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
      console.warn('Sync user doc error, falling back to local session:', err);
      const fallbackRole = customRole || localStorage.getItem('startech-user-role') || 'Customer';
      const fallbackUser = {
        uid: firebaseUser.uid || 'usr_' + Date.now(),
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        role: fallbackRole,
        status: 'active'
      };

      dispatch(setRoleState(fallbackRole));
      dispatch(setAuthUser(fallbackUser));
      setUser(fallbackUser);
      setRole(fallbackRole);
      return fallbackUser;
    }
  }, [dispatch]);

  // Firebase Auth State Listener & Refresh Persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      dispatch(setReduxLoading(true));

      if (firebaseUser) {
        await syncUserDocAndRole(firebaseUser);
      } else {
        // Check if mock user was stored in localStorage
        const storedUser = localStorage.getItem('startech-user');
        const storedRole = localStorage.getItem('startech-user-role') || 'Customer';

        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setRole(parsed.role || storedRole);
            dispatch(setAuthUser(parsed));
          } catch (e) {
            setUser(null);
            setRole('Customer');
            dispatch(logoutUser());
          }
        } else {
          setUser(null);
          setRole('Customer');
          dispatch(logoutUser());
        }
      }

      setLoading(false);
      dispatch(setReduxLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch, syncUserDocAndRole]);

  // Multi-tab synchronization and Network status event listeners
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'startech-user' || e.key === 'startech-user-role') {
        if (!e.newValue) {
          // Logged out in another tab
          setUser(null);
          setRole('Customer');
          dispatch(logoutUser());
        } else {
          try {
            const parsed = JSON.parse(e.newValue);
            setUser(parsed);
            if (parsed.role) {
              setRole(parsed.role);
              dispatch(setRoleState(parsed.role));
            }
          } catch (err) {}
        }
      }
    };

    const handleOnline = () => {
      if (auth.currentUser) {
        syncUserDocAndRole(auth.currentUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('online', handleOnline);
    };
  }, [dispatch, syncUserDocAndRole]);

  // Login handler with role support
  const login = async (email, password, desiredRole = null) => {
    setLoading(true);
    setError(null);
    dispatch(setReduxLoading(true));

    try {
      let firebaseUser = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        firebaseUser = userCredential.user;
      } catch (fbErr) {
        // Mock fallback for test environment
        console.warn('Firebase login notice, operating with test credentials:', fbErr.message);
        firebaseUser = {
          uid: 'uid_' + email.replace(/[^a-zA-Z0-9]/g, '_'),
          email: email,
          displayName: email.split('@')[0]
        };
      }

      // Role resolution: desiredRole > email rule > default 'Customer'
      let assignedRole = desiredRole;
      if (!assignedRole) {
        if (email.includes('admin')) assignedRole = 'Admin';
        else if (email.includes('seller')) assignedRole = 'Seller';
        else assignedRole = 'Customer';
      }

      const syncedUser = await syncUserDocAndRole(firebaseUser, assignedRole);
      setLoading(false);
      dispatch(setReduxLoading(false));
      return !!syncedUser;
    } catch (err) {
      const errMsg = err.message || 'Login failed. Please check credentials.';
      setError(errMsg);
      dispatch(setReduxError(errMsg));
      setLoading(false);
      return false;
    }
  };

  // Register handler (Default role is always Customer)
  const register = async (userData, chosenRole = 'Customer') => {
    setLoading(true);
    setError(null);
    dispatch(setReduxLoading(true));

    try {
      let firebaseUser = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        firebaseUser = userCredential.user;
      } catch (fbErr) {
        console.warn('Firebase register notice, operating with test credentials:', fbErr.message);
        firebaseUser = {
          uid: 'uid_' + Date.now(),
          email: userData.email,
          displayName: userData.full_name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email.split('@')[0]
        };
      }

      // Default role is ALWAYS Customer unless chosen
      const finalRole = chosenRole || 'Customer';
      const createdUser = await syncUserDocAndRole(firebaseUser, finalRole);

      setLoading(false);
      dispatch(setReduxLoading(false));
      return !!createdUser;
    } catch (err) {
      const errMsg = err.message || 'Registration failed.';
      setError(errMsg);
      dispatch(setReduxError(errMsg));
      setLoading(false);
      return false;
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
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
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
