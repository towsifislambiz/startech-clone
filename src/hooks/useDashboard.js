import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import userService from '../services/userService';
import checkoutService from '../services/checkoutService';
import useAuthState from './useAuthState';
import { useNotification } from '../context/NotificationContext';

export const useDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const { user, role, logout } = useAuthState();
  const { showNotification } = useNotification();

  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = useCallback(() => {
    setOrders(checkoutService.getOrders());
    setAddresses(userService.getAddresses());
    setReviews(userService.getReviews());
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const changeTab = useCallback((tabName) => {
    setSearchParams({ tab: tabName });
  }, [setSearchParams]);

  const updateProfileDetails = useCallback(async (data) => {
    setLoading(true);
    try {
      await userService.updateProfile(user?.uid, data);
      showNotification('Profile updated successfully!', 'success');
      loadDashboardData();
    } catch (e) {
      showNotification('Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showNotification, loadDashboardData]);

  const saveUserAddress = useCallback((addressData) => {
    const updated = userService.saveAddress(addressData);
    setAddresses(updated);
    showNotification('Address saved successfully!', 'success');
  }, [showNotification]);

  const removeUserAddress = useCallback((addressId) => {
    const updated = userService.deleteAddress(addressId);
    setAddresses(updated);
    showNotification('Address removed.', 'info');
  }, [showNotification]);

  const setDefaultUserAddress = useCallback((addressId) => {
    const updated = userService.setDefaultAddress(addressId);
    setAddresses(updated);
    showNotification('Default address set.', 'success');
  }, [showNotification]);

  const postReview = useCallback(async (reviewData) => {
    await userService.submitReview(reviewData);
    setReviews(userService.getReviews());
    showNotification('Review submitted successfully!', 'success');
  }, [showNotification]);

  return {
    activeTab,
    user,
    role,
    orders,
    addresses,
    reviews,
    loading,
    changeTab,
    updateProfileDetails,
    saveUserAddress,
    removeUserAddress,
    setDefaultUserAddress,
    postReview,
    logout
  };
};

export default useDashboard;
