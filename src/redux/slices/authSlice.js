import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const saved = localStorage.getItem('startech-user');
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage(),
  token: localStorage.getItem('startech-token') || null,
  loading: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token || state.token;
      state.loading = false;
      state.error = null;
      if (user) {
        localStorage.setItem('startech-user', JSON.stringify(user));
        if (token) localStorage.setItem('startech-token', token);
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('startech-token');
      localStorage.removeItem('startech-user');
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAuthUser, logoutUser, setAuthLoading, setAuthError } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
