import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import useOrders from '../hooks/useOrders';
import OrderCard from '../components/Orders/OrderCard';
import InvoiceModal from '../components/Checkout/InvoiceModal';
import './Category.css';

const TABS = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const OrderHistory = () => {
  const {
    orders,
    statusFilter,
    searchQuery,
    loading,
    cancelOrder,
    reorderItems,
    setStatusFilter,
    setSearchQuery
  } = useOrders();

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    document.title = 'My Orders History | StarTech';
  }, []);

  const handleOpenInvoice = (order) => {
    setSelectedInvoiceOrder(order);
    setInvoiceOpen(true);
  };

  return (
    <div className="cat" style={{ paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <Link to="/dashboard">Account</Link> <FiChevronRight />
          <span>My Orders</span>
        </div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="cat-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <h1>My Order History</h1>
            <p>Track delivery progress, download invoices, or cancel pending orders</p>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Search by Order ID or Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'var(--bg-secondary, #0c1c28)',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
        </div>

        {/* Status Tabs Filter */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', margin: '20px 0' }}>
          {TABS.map((tab) => {
            const isActive = statusFilter.toLowerCase() === tab.toLowerCase();
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backgroundColor: isActive ? '#D51E0B' : 'var(--bg-secondary, #0c1c28)',
                  color: '#ffffff',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Orders List / Loading / Empty */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: 'var(--bg-secondary, #0c1c28)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px'
            }}
          >
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'rgba(213, 30, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#D51E0B' }}>
              <FiShoppingBag size={36} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>
              No Orders Found
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>
              No orders matched your selected status filter or search query.
            </p>
            <Link to="/category/component" className="btn btn-primary">
              Explore Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onCancelOrder={cancelOrder}
                onReorder={reorderItems}
                onOpenInvoice={handleOpenInvoice}
              />
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
};

export default OrderHistory;
