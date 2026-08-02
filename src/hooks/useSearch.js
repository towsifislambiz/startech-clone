import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import searchService from '../services/searchService';
import {
  setQuery,
  setSearchResults,
  setLoading,
  setDropdownOpen,
  setActiveHoverIndex,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches
} from '../store/searchSlice';

export const useSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchState = useSelector((state) => state.search);
  const debounceTimerRef = useRef(null);

  // Perform live instant autocomplete search with ultra-fast 150ms debounce
  const performSearch = useCallback((searchTerm) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = searchTerm ? searchTerm.trim() : '';

    if (!trimmed) {
      dispatch(setSearchResults({ products: [], suggestions: [] }));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setLoading(true));

    debounceTimerRef.current = setTimeout(async () => {
      try {
        // Fetch up to 8 matching products for autocomplete suggestions
        const res = await searchService.search(trimmed, { limit: 8 });
        dispatch(setSearchResults(res));
      } catch (err) {
        console.warn('Search error:', err);
        dispatch(setSearchResults({ products: [], suggestions: [] }));
      } finally {
        dispatch(setLoading(false));
      }
    }, 150); // Fast 150ms instant response
  }, [dispatch]);

  // Handle Input text change
  const handleQueryChange = useCallback((text) => {
    dispatch(setQuery(text));
    dispatch(setDropdownOpen(true));
    performSearch(text);
  }, [dispatch, performSearch]);

  // Submit search query and navigate to Search Results Page
  const submitSearch = useCallback((customQuery = null) => {
    const targetQuery = customQuery !== null ? customQuery : searchState.query;
    if (!targetQuery || !targetQuery.trim()) return;

    const trimmed = targetQuery.trim();
    dispatch(addRecentSearch(trimmed));
    dispatch(setDropdownOpen(false));
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }, [dispatch, navigate, searchState.query]);

  // Keyboard navigation handler (Arrow Up, Arrow Down, Enter, Escape)
  const handleKeyDown = useCallback((e) => {
    const resultsCount = searchState.results?.length || 0;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!searchState.isDropdownOpen) {
        dispatch(setDropdownOpen(true));
        return;
      }
      if (resultsCount > 0) {
        const nextIdx = searchState.activeHoverIndex < resultsCount - 1 ? searchState.activeHoverIndex + 1 : 0;
        dispatch(setActiveHoverIndex(nextIdx));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!searchState.isDropdownOpen) return;
      if (resultsCount > 0) {
        const prevIdx = searchState.activeHoverIndex > 0 ? searchState.activeHoverIndex - 1 : resultsCount - 1;
        dispatch(setActiveHoverIndex(prevIdx));
      }
    } else if (e.key === 'Enter') {
      if (searchState.activeHoverIndex >= 0 && searchState.activeHoverIndex < resultsCount) {
        e.preventDefault();
        const selectedProd = searchState.results[searchState.activeHoverIndex];
        dispatch(addRecentSearch(selectedProd.name));
        dispatch(setDropdownOpen(false));
        navigate(`/product/${selectedProd.id}`);
      } else {
        e.preventDefault();
        submitSearch();
      }
    } else if (e.key === 'Escape') {
      dispatch(setDropdownOpen(false));
    }
  }, [dispatch, navigate, searchState, submitSearch]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    ...searchState,
    handleQueryChange,
    submitSearch,
    handleKeyDown,
    openDropdown: () => dispatch(setDropdownOpen(true)),
    closeDropdown: () => dispatch(setDropdownOpen(false)),
    removeRecent: (term) => dispatch(removeRecentSearch(term)),
    clearAllRecent: () => dispatch(clearRecentSearches()),
    popularSearches: searchService.getPopularSearches()
  };
};

export default useSearch;
