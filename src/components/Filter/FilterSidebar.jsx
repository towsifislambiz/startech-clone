import React, { useState } from 'react';
import { FiSliders, FiStar, FiChevronDown, FiChevronUp, FiRotateCcw } from 'react-icons/fi';
import PriceSlider from './PriceSlider';

const FilterSidebar = ({
  categories = [],
  brands = [],
  availableSpecs = {},
  filterState = {},
  onToggleCategory,
  onToggleBrand,
  onPriceChange,
  onToggleAvailability,
  onMinRatingChange,
  onMinDiscountChange,
  onSetSpec,
  onResetAll
}) => {
  const [openAccordion, setOpenAccordion] = useState({
    categories: true,
    brands: true,
    price: true,
    stock: true,
    rating: true,
    discount: true,
    specs: true
  });

  const toggleGroup = (key) => {
    setOpenAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const availabilityOptions = ['In Stock', 'Limited Stock', 'Pre-Order', 'Upcoming', 'Out of Stock'];
  const discountRanges = [
    { label: '10%+ Off', value: 10 },
    { label: '20%+ Off', value: 20 },
    { label: '30%+ Off', value: 30 },
    { label: '50%+ Off', value: 50 }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'sticky',
        top: '80px'
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <FiSliders style={{ color: '#D51E0B' }} /> Filters
        </h3>
        <button
          type="button"
          onClick={onResetAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#D51E0B',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <FiRotateCcw size={12} /> Reset
        </button>
      </div>

      {/* 1. Price Range Section */}
      <div style={{ borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))', paddingBottom: '16px' }}>
        <div
          onClick={() => toggleGroup('price')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)', marginBottom: openAccordion.price ? '12px' : 0 }}
        >
          <span>Price Range</span>
          {openAccordion.price ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {openAccordion.price && (
          <PriceSlider
            min={0}
            max={300000}
            currentMin={filterState.priceRange?.min || 0}
            currentMax={filterState.priceRange?.max || 300000}
            onChange={onPriceChange}
          />
        )}
      </div>

      {/* 2. Availability / Stock Section */}
      <div style={{ borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))', paddingBottom: '16px' }}>
        <div
          onClick={() => toggleGroup('stock')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)', marginBottom: openAccordion.stock ? '10px' : 0 }}
        >
          <span>Availability</span>
          {openAccordion.stock ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {openAccordion.stock && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {availabilityOptions.map((st) => {
              const isChecked = filterState.availability?.includes(st);
              return (
                <label key={st} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleAvailability(st)}
                    style={{ accentColor: '#D51E0B', width: '16px', height: '16px' }}
                  />
                  <span>{st}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Brands Section */}
      {brands.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))', paddingBottom: '16px' }}>
          <div
            onClick={() => toggleGroup('brands')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)', marginBottom: openAccordion.brands ? '10px' : 0 }}
          >
            <span>Brands</span>
            {openAccordion.brands ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {openAccordion.brands && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {brands.map((b) => {
                const bName = typeof b === 'string' ? b : b.name;
                const isChecked = filterState.brands?.includes(bName);
                return (
                  <label key={bName} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleBrand(bName)}
                      style={{ accentColor: '#D51E0B', width: '16px', height: '16px' }}
                    />
                    <span>{bName}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Minimum Rating Section */}
      <div style={{ borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))', paddingBottom: '16px' }}>
        <div
          onClick={() => toggleGroup('rating')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)', marginBottom: openAccordion.rating ? '10px' : 0 }}
        >
          <span>Customer Rating</span>
          {openAccordion.rating ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {openAccordion.rating && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[4, 3, 2].map((r) => (
              <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="minRating"
                  checked={filterState.minRating === r}
                  onChange={() => onMinRatingChange(r)}
                  style={{ accentColor: '#D51E0B' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} size={14} style={{ fill: s <= r ? '#f59e0b' : 'none' }} />
                  ))}
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12px', marginLeft: '4px' }}>& up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Discount Percentage Section */}
      <div style={{ borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))', paddingBottom: '16px' }}>
        <div
          onClick={() => toggleGroup('discount')}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)', marginBottom: openAccordion.discount ? '10px' : 0 }}
        >
          <span>Discount Offer</span>
          {openAccordion.discount ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {openAccordion.discount && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {discountRanges.map((d) => (
              <label key={d.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="minDiscount"
                  checked={filterState.minDiscount === d.value}
                  onChange={() => onMinDiscountChange(d.value)}
                  style={{ accentColor: '#D51E0B' }}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 6. Dynamic Specification Filters (Processor, RAM, Storage, etc.) */}
      {Object.keys(availableSpecs).length > 0 && (
        <div>
          <div
            onClick={() => toggleGroup('specs')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)', marginBottom: openAccordion.specs ? '10px' : 0 }}
          >
            <span>Product Specifications</span>
            {openAccordion.specs ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {openAccordion.specs && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(availableSpecs).map(([specKey, specOptions]) => (
                <div key={specKey}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#D51E0B', marginBottom: '6px' }}>
                    {specKey}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {specOptions.map((optVal) => {
                      const isChecked = filterState.specFilters?.[specKey] === optVal;
                      return (
                        <label key={optVal} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onSetSpec(specKey, isChecked ? null : optVal)}
                            style={{ accentColor: '#D51E0B' }}
                          />
                          <span>{optVal}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
