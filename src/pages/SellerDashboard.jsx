import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import sellerService from '../services/sellerService';
import checkoutService from '../services/checkoutService';
import { useNotification } from '../context/NotificationContext';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { showNotification } = useNotification();

  // Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand] = useState('ASUS');
  const [newProdCategory] = useState('Component');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('10');
  const [newProdImg, setNewProdImg] = useState('');

  const loadSellerData = () => {
    sellerService.getProducts().then((data) => setProducts(data));
    setOrders(checkoutService.getOrders());
  };

  useEffect(() => {
    loadSellerData();
    document.title = 'Seller Control Panel | StarTech';
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;

    await sellerService.addProduct({
      name: newProdName,
      brand: newProdBrand,
      category: newProdCategory,
      selling_price: Number(newProdPrice),
      quantity_in_stock: Number(newProdStock),
      featured_image: newProdImg || 'https://placehold.co/600x450/081621/ffffff/png?text=Product'
    });

    showNotification(`Product "${newProdName.substring(0, 20)}..." added successfully!`, 'success');
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('10');
    setNewProdImg('');
    setShowAddModal(false);
    loadSellerData();
  };

  const handleDeleteProduct = async (id) => {
    await sellerService.deleteProduct(id);
    showNotification('Product removed from listing.', 'info');
    loadSellerData();
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.grandTotal || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.orderStatus === 'Pending').length;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", paddingBottom: '40px' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Seller Control Panel
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Manage your store inventory, track order fulfillment, and analyze revenues.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          style={{
            backgroundColor: '#D51E0B',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FiPlus size={18} /> Add New Product
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
        {['overview', 'products', 'orders', 'analytics'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: activeTab === tab ? '#D51E0B' : 'var(--bg-secondary)',
              color: '#ffffff',
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Stat Cards */}
      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Revenue</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
                ৳{totalRevenue.toLocaleString('en-IN')}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Products</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
                {products.length}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Seller Orders</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>
                {orders.length}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Pending Orders</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>
                {pendingOrdersCount}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Recent Orders
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 8px' }}>Order ID</th>
                  <th style={{ padding: '12px 8px' }}>Customer</th>
                  <th style={{ padding: '12px 8px' }}>Amount</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>No seller orders found</td></tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.orderId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 8px', fontWeight: '700', color: '#D51E0B' }}>#{o.orderId}</td>
                      <td style={{ padding: '14px 8px' }}>{o.customer?.firstName}</td>
                      <td style={{ padding: '14px 8px', fontWeight: '600' }}>৳{(o.totals?.grandTotal || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '700' }}>
                          {o.orderStatus || o.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Seller Product Listings ({products.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((prod) => (
              <div key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', backgroundColor: '#081621', borderRadius: '8px' }}>
                <img src={prod.featured_image || (prod.images && prod.images[0]) || ''} alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>{prod.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Brand: {prod.brand} • Stock: {prod.quantity_in_stock}</div>
                </div>
                <strong style={{ fontSize: '15px', color: '#D51E0B' }}>৳{(prod.selling_price || prod.price).toLocaleString('en-IN')}</strong>
                <button type="button" onClick={() => handleDeleteProduct(prod.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <>
          <div onClick={() => setShowAddModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 99990 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '500px', backgroundColor: '#081621', padding: '24px', borderRadius: '16px', zIndex: 99999, color: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Add New Product</h3>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}><FiX size={20} /></button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" required placeholder="Product Title *" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
              <input type="number" required placeholder="Selling Price (৳) *" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
              <input type="number" placeholder="Initial Stock Qty" value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
              <input type="url" placeholder="Image URL" value={newProdImg} onChange={(e) => setNewProdImg(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Save Product Listing</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SellerDashboard;
