import React from 'react';

const ProductSpecsTable = ({ specifications = {} }) => {
  if (!specifications || Object.keys(specifications).length === 0) {
    return (
      <div style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>
        No specifications specified for this item.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {Object.entries(specifications).map(([groupTitle, groupFields]) => (
        <div
          key={groupTitle}
          style={{
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          {/* Section Group Header */}
          <div
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(213, 30, 11, 0.08)',
              borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
              fontWeight: '700',
              fontSize: '15px',
              color: '#D51E0B'
            }}
          >
            {groupTitle}
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <tbody>
              {Object.entries(groupFields || {}).map(([key, val], idx) => (
                <tr
                  key={key}
                  style={{
                    borderBottom: idx === Object.keys(groupFields).length - 1 ? 'none' : '1px solid var(--border-color, rgba(255, 255, 255, 0.05))'
                  }}
                >
                  <td
                    style={{
                      width: '30%',
                      padding: '12px 20px',
                      fontWeight: '600',
                      color: 'var(--text-secondary, #9ca3af)',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {key}
                  </td>
                  <td
                    style={{
                      padding: '12px 20px',
                      color: 'var(--text-primary, #ffffff)',
                      lineHeight: '1.5'
                    }}
                  >
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecsTable;
