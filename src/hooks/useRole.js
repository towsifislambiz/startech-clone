import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db, doc, getDoc } from '../firebase/config';
import { setRoleState } from '../store/authSlice';

export const useRole = () => {
  const dispatch = useDispatch();
  const { user, role: reduxRole } = useSelector((state) => state.auth);

  const [role, setRole] = useState(reduxRole || 'Customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoleFromFirestore = useCallback(async () => {
    if (!user || !user.uid) {
      setRole('Customer');
      setLoading(false);
      return 'Customer';
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Try reading from cached user profile or localStorage first for instant response
      const cachedRole = localStorage.getItem(`startech-role-${user.uid}`) || user.role;
      if (cachedRole) {
        setRole(cachedRole);
        dispatch(setRoleState(cachedRole));
      }

      // 2. Fetch latest role from Firestore document users/{uid}
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const firestoreRole = userData.role || 'Customer';
        setRole(firestoreRole);
        dispatch(setRoleState(firestoreRole));
        localStorage.setItem(`startech-role-${user.uid}`, firestoreRole);
        setLoading(false);
        return firestoreRole;
      } else {
        // Default role if document does not exist yet
        const defaultRole = user.role || 'Customer';
        setRole(defaultRole);
        dispatch(setRoleState(defaultRole));
        setLoading(false);
        return defaultRole;
      }
    } catch (err) {
      console.warn('Firestore role fetch error fallback to cached role:', err);
      const fallbackRole = user?.role || reduxRole || 'Customer';
      setRole(fallbackRole);
      setError(err.message || 'Failed to fetch user role');
      setLoading(false);
      return fallbackRole;
    }
  }, [user, dispatch, reduxRole]);

  useEffect(() => {
    if (user?.uid) {
      fetchRoleFromFirestore();
    } else {
      setRole('Customer');
      setLoading(false);
    }
  }, [user?.uid, fetchRoleFromFirestore]);

  return {
    role: reduxRole || role || 'Customer',
    loading,
    error,
    refreshRole: fetchRoleFromFirestore
  };
};

export default useRole;
