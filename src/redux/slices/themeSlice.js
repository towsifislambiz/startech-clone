import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const saved = localStorage.getItem('startech-theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('startech-theme', state.isDark ? 'dark' : 'light');
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
      localStorage.setItem('startech-theme', state.isDark ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectIsDark = (state) => state.theme.isDark;

export default themeSlice.reducer;
