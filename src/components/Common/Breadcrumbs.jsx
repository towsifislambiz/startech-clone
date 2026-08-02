import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="cat-breadcrumb" style={{ margin: 0 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/">Home</Link>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <FiChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />
            {item.link ? (
              <Link to={item.link}>{item.label}</Link>
            ) : (
              <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
