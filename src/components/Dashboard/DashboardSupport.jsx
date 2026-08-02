import React, { useState } from 'react';
import { FiPhone, FiMail, FiChevronDown } from 'react-icons/fi';

const FAQS = [
  { q: 'How do I track my order delivery status?', a: 'You can track your order status live under the "My Orders" tab in your dashboard, or call our hotline 16793.' },
  { q: 'What is the return policy for defective products?', a: 'StarTech offers a 7-day hassle-free replacement policy for manufacturing defects. Visit any of our physical outlets or submit a online return request.' },
  { q: 'How long does EMI approval take?', a: 'Online EMI is processed instantly for supported Credit Cards (City Bank, EBL, BRAC, Mutual Trust Bank).' }
];

const DashboardSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      style={{
        backgroundColor: '#0c1c28',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        Help & Customer Support
      </h3>

      {/* Hotline & Email Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#081621', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FiPhone size={24} style={{ color: '#D51E0B' }} />
          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Hotline Support (9am - 8pm)</div>
            <strong style={{ color: '#ffffff', fontSize: '16px' }}>16793</strong>
          </div>
        </div>

        <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#081621', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FiMail size={24} style={{ color: '#3b82f6' }} />
          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Email Support</div>
            <strong style={{ color: '#ffffff', fontSize: '14px' }}>support@startech.com.bd</strong>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div>
        <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>Frequently Asked Questions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: '#081621',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#ffffff', fontSize: '13px', fontWeight: '700' }}>
                {faq.q} <FiChevronDown size={14} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
              {openFaq === idx && (
                <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px', marginBottom: 0, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSupport;
