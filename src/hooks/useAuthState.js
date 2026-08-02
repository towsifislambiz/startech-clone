import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { auth, signOut } from '../firebase/config';

export const useAuthState = () => {
  const dispatch = useDispatch();
  const { user, role, loading, isAuthenticated, error } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase logout warning:', e);
    } finally {
      dispatch(logoutUser());
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user && isAuthenticated,
    role: role || user?.role || 'Customer',
    error,
    logout
  };
};

export default useAuthState;
