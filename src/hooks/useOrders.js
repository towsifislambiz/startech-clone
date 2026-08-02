import { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchOrders,
  fetchOrderById,
  cancelOrderAsync,
  setStatusFilter,
  setSearchQuery,
  clearCurrentOrder
} from '../store/orderSlice';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export const useOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderState = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.auth.user?.uid);
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, [dispatch, userId]);

  const filteredOrders = useMemo(() => {
    return orderState.orders.filter((order) => {
      // 1. Status Filter
      const statusMatch =
        orderState.statusFilter === 'All' ||
        order.status?.toLowerCase() === orderState.statusFilter.toLowerCase() ||
        order.orderStatus?.toLowerCase() === orderState.statusFilter.toLowerCase();

      if (!statusMatch) return false;

      // 2. Search Query Filter
      if (!orderState.searchQuery.trim()) return true;
      const q = orderState.searchQuery.toLowerCase();
      const idMatch = order.orderId?.toLowerCase().includes(q);
      const itemMatch = order.items?.some((i) => i.name?.toLowerCase().includes(q));

      return idMatch || itemMatch;
    });
  }, [orderState.orders, orderState.statusFilter, orderState.searchQuery]);

  const handleCancelOrder = useCallback(async (orderId) => {
    try {
      const res = await dispatch(cancelOrderAsync(orderId)).unwrap();
      showNotification(`Order #${res.orderId} has been cancelled.`, 'info');
    } catch (err) {
      showNotification(err || 'Failed to cancel order.', 'error');
    }
  }, [dispatch, showNotification]);

  const handleReorder = useCallback((items = []) => {
    if (!items || items.length === 0) return;
    items.forEach((item) => {
      addItem(
        {
          id: item.productId || item.id,
          name: item.name,
          price: item.price,
          featured_image: item.thumbnail
        },
        item.quantity
      );
    });
    showNotification(`Added ${items.length} items to your Cart!`, 'success');
    navigate('/cart');
  }, [addItem, showNotification, navigate]);

  return {
    orders: filteredOrders,
    rawOrders: orderState.orders,
    currentOrder: orderState.currentOrder,
    statusFilter: orderState.statusFilter,
    searchQuery: orderState.searchQuery,
    loading: orderState.loading,
    error: orderState.error,
    loadOrders: () => dispatch(fetchOrders(userId)),
    loadOrderDetails: (id) => dispatch(fetchOrderById(id)),
    cancelOrder: handleCancelOrder,
    reorderItems: handleReorder,
    setStatusFilter: (f) => dispatch(setStatusFilter(f)),
    setSearchQuery: (q) => dispatch(setSearchQuery(q)),
    clearCurrentOrder: () => dispatch(clearCurrentOrder())
  };
};

export default useOrders;
