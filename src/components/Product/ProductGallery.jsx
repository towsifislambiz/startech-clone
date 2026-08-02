import React, { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';

const ProductGallery = ({ images = [], name = 'Product', discount = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const galleryList = images.length > 0 ? images : ['https://placehold.co/600x480/081621/ffffff/png?text=No+Image'];
  const activeImage = galleryList[activeIndex] || galleryList[0];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Main Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          backgroundColor: 'var(--bg-secondary, #0c1c28)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'zoom-in'
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '800',
              padding: '4px 10px',
              borderRadius: '6px',
              zIndex: 10
            }}
          >
            -{discount}% OFF
          </span>
        )}

        {/* Zoom Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            backgroundColor: 'rgba(8, 22, 33, 0.8)',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '99px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <FiZoomIn size={14} /> Hover to Zoom
        </div>

        {/* Standard Image */}
        <img
          src={activeImage}
          alt={`${name} view ${activeIndex + 1}`}
          loading="lazy"
          style={{
            maxHeight: '90%',
            maxWidth: '90%',
            objectFit: 'contain',
            opacity: isZoomed ? 0 : 1,
            transition: 'opacity 0.2s ease'
          }}
        />

        {/* Magnified Zoom Lens */}
        {isZoomed && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '220%',
              backgroundRepeat: 'no-repeat',
              borderRadius: '16px'
            }}
          />
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryList.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {galleryList.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                border: activeIndex === idx ? '2px solid #D51E0B' : '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
                backgroundColor: 'var(--bg-secondary, #0c1c28)',
                padding: '6px',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'border-color 0.2s ease'
              }}
            >
              <img
                src={imgUrl}
                alt={`thumb ${idx + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
