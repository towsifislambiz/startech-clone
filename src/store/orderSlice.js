import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (userId, { rejectWithValue }) => {
  try {
    const data = await orderService.getOrders(userId);
    return data;
  } catch (err) {
    return rejectWithValue(err.message || 'Failed to fetch orders.');
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId, { rejectWithValue }) => {
  try {
    const data = await orderService.getOrderById(orderId);
    if (!data) return rejectWithValue('Order not found.');
    return data;
  } catch (err) {
    return rejectWithValue(err.message || 'Failed to fetch order details.');
  }
});

export const cancelOrderAsync = createAsyncThunk('orders/cancelOrder', async (orderId, { rejectWithValue }) => {
  try {
    const res = await orderService.cancelOrder(orderId);
    if (!res.success) return rejectWithValue(res.message);
    return res.order;
  } catch (err) {
    return rejectWithValue(err.message || 'Order cancellation failed.');
  }
});

const initialState = {
  orders: [],
  currentOrder: null,
  statusFilter: 'All',
  searchQuery: '',
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Order
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel Order
      .addCase(cancelOrderAsync.fulfilled, (state, action) => {
        const updated = action.payload;
        state.orders = state.orders.map((o) => (o.orderId === updated.orderId ? updated : o));
        if (state.currentOrder?.orderId === updated.orderId) {
          state.currentOrder = updated;
        }
      });
  }
});

export const { setStatusFilter, setSearchQuery, clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
