import { createSlice } from '@reduxjs/toolkit';

const initialUser = (() => {
  try {
    const stored = localStorage.getItem('startech-user');
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
})();

const initialRole = (() => {
  try {
    const storedRole = localStorage.getItem('startech-user-role');
    return storedRole || 'Customer';
  } catch (e) {
    return 'Customer';
  }
})();

const initialState = {
  user: initialUser,
  role: initialUser?.role || initialRole || 'Customer',
  isAuthenticated: !!initialUser,
  loading: true,
  error: null,
  sessionExpired: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const payloadUser = action.payload;
      state.user = payloadUser;
      state.isAuthenticated = !!payloadUser;
      if (payloadUser?.role) {
        state.role = payloadUser.role;
        try {
          localStorage.setItem('startech-user-role', payloadUser.role);
        } catch (e) {}
      }
      state.loading = false;
      state.error = null;
      state.sessionExpired = false;
    },
    setRoleState: (state, action) => {
      state.role = action.payload || 'Customer';
      if (state.user) {
        state.user = { ...state.user, role: state.role };
      }
      try {
        localStorage.setItem('startech-user-role', state.role);
        if (state.user) {
          localStorage.setItem('startech-user', JSON.stringify(state.user));
        }
      } catch (e) {}
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.role = 'Customer';
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.sessionExpired = false;
      try {
        localStorage.removeItem('startech-token');
        localStorage.removeItem('startech-user');
        localStorage.removeItem('startech-user-role');
      } catch (e) {}
    },
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    }
  }
});

export const {
  setAuthUser,
  setRoleState,
  setLoading,
  setError,
  logoutUser,
  setSessionExpired
} = authSlice.actions;

export default authSlice.reducer;
