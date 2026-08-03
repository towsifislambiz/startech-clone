import React, { useState, useEffect, useCallback } from 'react';
import {
  FiShield, FiGrid, FiUsers, FiBox, FiShoppingBag,
  FiLayers, FiPercent, FiSliders
} from 'react-icons/fi';
import adminService from '../services/adminService';
import { useNotification } from '../context/NotificationContext';

import AdminOverview from '../components/Admin/AdminOverview';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminProducts from '../components/Admin/AdminProducts';
import AdminOrders from '../components/Admin/AdminOrders';
import AdminInventory from '../components/Admin/AdminInventory';
import AdminCoupons from '../components/Admin/AdminCoupons';
import AdminSettings from '../components/Admin/AdminSettings';
import AdminProductModal from '../components/Admin/AdminProductModal';
import AdminOrderModal from '../components/Admin/AdminOrderModal';

const TABS = [
  { id: 'overview', label: 'Overview', icon: FiGrid },
  { id: 'users', label: 'Users Governance', icon: FiUsers },
  { id: 'products', label: 'Product Catalog', icon: FiBox },
  { id: 'orders', label: 'Order History', icon: FiShoppingBag },
  { id: 'inventory', label: 'Stock Inventory', icon: FiLayers },
  { id: 'coupons', label: 'Promo Coupons', icon: FiPercent },
  { id: 'settings', label: 'Platform Settings', icon: FiSliders }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [settings, setSettings] = useState({});

  // Modals state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { showSuccess, showError } = useNotification();

  const loadData = useCallback(async () => {
    try {
      const [uData, pData, oData] = await Promise.all([
        adminService.getUsers(),
        adminService.getProducts(),
        adminService.getOrders()
      ]);
      setUsers(uData || []);
      setProducts(pData || []);
      setOrders(oData || []);
      setCoupons(adminService.getCoupons());
      setSettings(adminService.getSettings());
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
    document.title = 'Super Admin Control Panel | StarTech';
  }, [loadData]);

  // User Governance Handlers
  const handleRoleChange = async (uid, newRole) => {
    await adminService.updateUserRole(uid, newRole);
    setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u)));
    showSuccess(`User role updated to "${newRole}".`);
  };

  const handleStatusToggle = async (uid, currentStatus) => {
    const res = await adminService.toggleUserStatus(uid, currentStatus);
    setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, status: res.status } : u)));
    showSuccess(`User status changed to "${res.status}".`);
  };

  // Product Management Handlers
  const handleSaveProduct = async (formData) => {
    try {
      if (productToEdit) {
        await adminService.updateProduct(productToEdit.id, formData);
        setProducts((prev) => prev.map((p) => (p.id === productToEdit.id ? { ...p, ...formData } : p)));
        showSuccess(`Product "${formData.name}" updated successfully!`);
      } else {
        const newP = await adminService.addProduct(formData);
        setProducts((prev) => [newP, ...prev]);
        showSuccess(`New product "${formData.name}" created successfully!`);
      }
      setProductModalOpen(false);
      setProductToEdit(null);
    } catch (err) {
      showError('Failed to save product changes.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await adminService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showSuccess('Product removed from catalog.');
    }
  };

  const handleToggleStock = async (id, currentInStock) => {
    const nextStock = await adminService.toggleProductStock(id, currentInStock);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, in_stock: nextStock } : p)));
    showSuccess(`Product stock status set to ${nextStock ? 'In Stock' : 'Out of Stock'}.`);
  };

  // Order Management Handlers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const updatedOrders = await adminService.updateOrderStatus(orderId, newStatus);
    setOrders(updatedOrders);
    showSuccess(`Order #${orderId} status updated to "${newStatus}".`);
  };

  // Coupon Management Handlers
  const handleCreateCoupon = (couponData) => {
    const updated = adminService.createCoupon(couponData);
    setCoupons(updated);
    showSuccess(`Promo coupon "${couponData.code.toUpperCase()}" created!`);
  };

  const handleDeleteCoupon = (code) => {
    const updated = adminService.deleteCoupon(code);
    setCoupons(updated);
    showSuccess(`Coupon "${code}" deleted.`);
  };

  // Settings Handler
  const handleSaveSettings = (settingsData) => {
    const updated = adminService.updateSettings(settingsData);
    setSettings(updated);
    showSuccess('Global platform settings updated successfully!');
  };

  // Metrics for Overview
  const metrics = {
    totalGMV: orders.reduce((sum, o) => sum + (o.totals?.grandTotal || 0), 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => (o.orderStatus || 'Processing').toLowerCase() === 'pending' || (o.orderStatus || '').toLowerCase() === 'processing').length,
    deliveredOrders: orders.filter((o) => (o.orderStatus || '').toLowerCase() === 'delivered').length,
    totalUsers: users.length,
    totalProducts: products.length,
    outOfStockCount: products.filter((p) => p.in_stock === false).length,
    activeCoupons: coupons.length
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", paddingBottom: '60px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-primary, #ffffff)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.5px' }}>
            <FiShield style={{ color: '#D51E0B' }} size={28} /> Super Admin Governance Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
            Platform governance, real-time analytics, catalog maintenance, order fulfillment, and user role security
          </p>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '28px',
          overflowX: 'auto',
          paddingBottom: '6px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 18px',
                borderRadius: '12px',
                backgroundColor: isActive ? '#D51E0B' : 'var(--bg-secondary, #0c1c28)',
                color: '#ffffff',
                border: isActive ? '1px solid #D51E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                fontWeight: isActive ? '800' : '600',
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? '0 6px 20px rgba(213, 30, 11, 0.35)' : 'none'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Modular Tab View */}
      {activeTab === 'overview' && (
        <AdminOverview metrics={metrics} onTabChange={setActiveTab} />
      )}

      {activeTab === 'users' && (
        <AdminUsers
          users={users}
          onRoleChange={handleRoleChange}
          onStatusToggle={handleStatusToggle}
        />
      )}

      {activeTab === 'products' && (
        <AdminProducts
          products={products}
          onOpenAddModal={() => {
            setProductToEdit(null);
            setProductModalOpen(true);
          }}
          onOpenEditModal={(p) => {
            setProductToEdit(p);
            setProductModalOpen(true);
          }}
          onDeleteProduct={handleDeleteProduct}
          onToggleStock={handleToggleStock}
        />
      )}

      {activeTab === 'orders' && (
        <AdminOrders
          orders={orders}
          onUpdateStatus={handleUpdateOrderStatus}
          onOpenOrderModal={(o) => {
            setSelectedOrder(o);
            setOrderModalOpen(true);
          }}
        />
      )}

      {activeTab === 'inventory' && (
        <AdminInventory
          products={products}
          onToggleStock={handleToggleStock}
        />
      )}

      {activeTab === 'coupons' && (
        <AdminCoupons
          coupons={coupons}
          onCreateCoupon={handleCreateCoupon}
          onDeleteCoupon={handleDeleteCoupon}
        />
      )}

      {activeTab === 'settings' && (
        <AdminSettings
          settings={settings}
          onSaveSettings={handleSaveSettings}
        />
      )}

      {/* Modals */}
      <AdminProductModal
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      <AdminOrderModal
        isOpen={orderModalOpen}
        onClose={() => {
          setOrderModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
};

export default AdminDashboard;
