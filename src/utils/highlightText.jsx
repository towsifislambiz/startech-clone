import React from 'react';

/**
 * Highlights occurrences of a search query string within text
 * @param {string} text 
 * @param {string} query 
 * @returns {React.ReactNode}
 */
export const HighlightText = ({ text = '', query = '' }) => {
  if (!query || !query.trim()) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={index}
            style={{
              backgroundColor: 'rgba(213, 30, 11, 0.25)',
              color: '#D51E0B',
              fontWeight: '800',
              padding: '0 2px',
              borderRadius: '2px'
            }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightText;
