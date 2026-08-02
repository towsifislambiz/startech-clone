import React, { useState, useEffect } from 'react';
import { FiPlus, FiShoppingCart } from 'react-icons/fi';
import productService from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const FrequentlyBoughtTogether = ({ currentProduct }) => {
  const [bundleItems, setBundleItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    let isMounted = true;
    const loadBundleAccessories = async () => {
      if (!currentProduct) return;
      try {
        const res = await productService.getProducts({});
        const candidates = res.products.filter((p) => p.id !== currentProduct.id).slice(0, 2);
        if (isMounted) {
          const items = [currentProduct, ...candidates];
          setBundleItems(items);
          setSelectedIds(items.map((i) => i.id));
        }
      } catch (err) {}
    };

    loadBundleAccessories();
    return () => { isMounted = false; };
  }, [currentProduct]);

  if (!bundleItems || bundleItems.length <= 1) return null;

  const toggleItem = (id) => {
    if (id === currentProduct.id) return; // Main product cannot be unselected
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedItems = bundleItems.filter((i) => selectedIds.includes(i.id));
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddBundleToCart = () => {
    selectedItems.forEach((item) => addToCart(item, 1));
    showNotification(`Added ${selectedItems.length} bundle items to Cart!`, 'success');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '16px',
        padding: '24px',
        marginTop: '32px'
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', marginBottom: '16px' }}>
        Frequently Bought Together
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
        {/* Bundle Product Items Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', flex: 1 }}>
          {bundleItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg, #081621)',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                  maxWidth: '240px'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  disabled={item.id === currentProduct.id}
                  onChange={() => toggleItem(item.id)}
                  style={{ accentColor: '#D51E0B', width: '16px', height: '16px' }}
                />
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.name}
                  style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#D51E0B', marginTop: '2px' }}>
                    ৳{item.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              {index < bundleItems.length - 1 && <FiPlus size={20} style={{ color: '#9ca3af' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Total Price & Add Bundle Button */}
        <div
          style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(213, 30, 11, 0.08)',
            border: '1px solid rgba(213, 30, 11, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '200px'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Bundle Total ({selectedItems.length} items):
          </div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#D51E0B' }}>
            ৳{totalPrice.toLocaleString('en-IN')}
          </div>
          <button
            type="button"
            onClick={handleAddBundleToCart}
            style={{
              padding: '10px 14px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <FiShoppingCart /> Add Bundle to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
