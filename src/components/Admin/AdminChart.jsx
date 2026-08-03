import React from 'react';
import { FiTrendingUp, FiPieChart } from 'react-icons/fi';

const AdminChart = ({ totalGMV = 0, totalOrders = 0 }) => {
  const chartData = [
    { month: 'Jan', val: 32000 },
    { month: 'Feb', val: 45000 },
    { month: 'Mar', val: 68000 },
    { month: 'Apr', val: 54000 },
    { month: 'May', val: 89000 },
    { month: 'Jun', val: totalGMV > 0 ? totalGMV : 124000 }
  ];

  const maxVal = Math.max(...chartData.map((d) => d.val));

  const categoryBreakdown = [
    { name: 'Laptops & Notebooks', pct: 45, color: '#D51E0B' },
    { name: 'Desktops & PC Components', pct: 30, color: '#3b82f6' },
    { name: 'Monitors & Displays', pct: 15, color: '#10b981' },
    { name: 'Gaming Accessories', pct: 10, color: '#8b5cf6' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', fontFamily: "'Inter', sans-serif" }}>
      {/* Revenue Trend Visual Chart */}
      <div
        style={{
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiTrendingUp style={{ color: '#D51E0B' }} /> Revenue Growth Analytics
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '12.5px', margin: 0 }}>Monthly Gross Merchandise Volume (GMV)</p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: '800', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: '8px' }}>
            +24.5% YoY
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '20px', gap: '12px' }}>
          {chartData.map((d, idx) => {
            const barHeight = Math.round((d.val / maxVal) * 140);

            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>
                  ৳{Math.round(d.val / 1000)}k
                </div>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '36px',
                    height: `${barHeight}px`,
                    background: idx === chartData.length - 1 ? 'linear-gradient(180deg, #D51E0B 0%, #ff4b3e 100%)' : 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '8px 8px 0 0',
                    transition: 'all 0.3s ease',
                    boxShadow: idx === chartData.length - 1 ? '0 4px 16px rgba(213, 30, 11, 0.4)' : 'none'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: '700' }}>{d.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Sales Distribution */}
      <div
        style={{
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiPieChart style={{ color: '#3b82f6' }} /> Category Revenue Distribution
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '12.5px', margin: 0 }}>Sales breakdown across product categories</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700' }}>
                <span style={{ color: '#ffffff' }}>{cat.name}</span>
                <span style={{ color: cat.color }}>{cat.pct}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${cat.pct}%`,
                    height: '100%',
                    backgroundColor: cat.color,
                    borderRadius: '10px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
