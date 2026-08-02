import { createSlice } from '@reduxjs/toolkit';

const getInitialRecentSearches = () => {
  try {
    const stored = localStorage.getItem('startech-recent-searches');
    return stored ? JSON.parse(stored) : ['RTX 4090', 'Gaming Laptop', 'Monitor'];
  } catch (e) {
    return ['RTX 4090', 'Gaming Laptop', 'Monitor'];
  }
};

const initialState = {
  query: '',
  results: [],
  suggestions: [],
  recentSearches: getInitialRecentSearches(),
  isDropdownOpen: false,
  activeHoverIndex: -1,
  loading: false
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action) => {
      state.results = action.payload.products || [];
      state.suggestions = action.payload.suggestions || [];
      state.loading = false;
      state.activeHoverIndex = -1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
      if (!action.payload) {
        state.activeHoverIndex = -1;
      }
    },
    setActiveHoverIndex: (state, action) => {
      state.activeHoverIndex = action.payload;
    },
    addRecentSearch: (state, action) => {
      const term = action.payload.trim();
      if (!term) return;
      const filtered = state.recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 6);
      state.recentSearches = updated;
      try {
        localStorage.setItem('startech-recent-searches', JSON.stringify(updated));
      } catch (e) {}
    },
    removeRecentSearch: (state, action) => {
      const term = action.payload;
      const updated = state.recentSearches.filter((s) => s !== term);
      state.recentSearches = updated;
      try {
        localStorage.setItem('startech-recent-searches', JSON.stringify(updated));
      } catch (e) {}
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      try {
        localStorage.removeItem('startech-recent-searches');
      } catch (e) {}
    }
  }
});

export const {
  setQuery,
  setSearchResults,
  setLoading,
  setDropdownOpen,
  setActiveHoverIndex,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches
} = searchSlice.actions;

export default searchSlice.reducer;
