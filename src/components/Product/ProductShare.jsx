import React, { useState } from 'react';
import { FiShare2, FiCopy, FiCheck, FiMail } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useNotification } from '../../context/NotificationContext';

const ProductShare = ({ product }) => {
  const [copied, setCopied] = useState(false);
  const { showNotification } = useNotification();
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showNotification('Product link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'StarTech Product',
          text: `Check out ${product?.name || 'this product'} on StarTech!`,
          url: currentUrl
        });
      } catch (e) {}
    } else {
      handleCopyLink();
    }
  };

  const shareTitle = encodeURIComponent(`Check out ${product?.name || ''} on StarTech!`);
  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary, #9ca3af)' }}>
        Share Product:
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="Copy Link"
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid var(--border-color, rgba(255,255,255,0.12))',
            backgroundColor: copied ? '#22c55e' : 'var(--bg-secondary, #0c1c28)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#1877f2',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}
        >
          <FaFacebookF size={14} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${shareTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on WhatsApp"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#25d366',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}
        >
          <FaWhatsapp size={16} />
        </a>

        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Twitter"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#1da1f2',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}
        >
          <FaTwitter size={14} />
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=${shareTitle}&body=${encodedUrl}`}
          title="Share via Email"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: '#4b5563',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}
        >
          <FiMail size={14} />
        </a>

        {/* Web Share API */}
        {navigator.share && (
          <button
            type="button"
            onClick={handleNativeShare}
            title="More Share Options"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <FiShare2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductShare;
