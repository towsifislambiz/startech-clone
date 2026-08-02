import React, { useState, useMemo } from 'react';
import {
  FiCpu, FiHardDrive, FiMonitor, FiZap, FiCheckCircle, FiAlertTriangle,
  FiPlus, FiTrash2, FiShoppingCart, FiSave, FiShare2, FiX, FiActivity
} from 'react-icons/fi';
import useCartSystem from '../hooks/useCartSystem';
import { useNotification } from '../context/NotificationContext';
import pcBuilderService from '../services/pcBuilderService';
import './PCBuilder.css';

/* Themed image helper — reliable branded product image */
const img = (label, bg = '081621') =>
  `https://placehold.co/600x450/${bg}/ffffff/png?text=${encodeURIComponent(label)}&font=montserrat`;

/* ===== Component database ===== */
const PARTS = {
  cpu: [
    { id: 'cpu1', name: 'Intel Core i9-14900K Processor', brand: 'Intel', socket: 'LGA1700', img: img('Core i9-14900K', '0f2742'), price: 68500, watt: 125, perf: 98, specs: ['24 Cores / 32 Threads', '6.0GHz Turbo', 'LGA 1700'] },
    { id: 'cpu2', name: 'AMD Ryzen 7 7800X3D Gaming Processor', brand: 'AMD', socket: 'AM5', img: img('Ryzen 7 7800X3D', 'a01406'), price: 45000, watt: 120, perf: 92, specs: ['8 Cores / 16 Threads', '5.0GHz Boost', 'AM5'] },
    { id: 'cpu3', name: 'Intel Core i5-14600K Desktop Processor', brand: 'Intel', socket: 'LGA1700', img: img('Core i5-14600K', '0f2742'), price: 32000, watt: 100, perf: 80, specs: ['14 Cores / 20 Threads', '5.3GHz Turbo', 'LGA 1700'] },
    { id: 'cpu4', name: 'AMD Ryzen 5 7600 Desktop Processor', brand: 'AMD', socket: 'AM5', img: img('Ryzen 5 7600', 'a01406'), price: 24000, watt: 65, perf: 70, specs: ['6 Cores / 12 Threads', '5.1GHz Boost', 'AM5'] }
  ],
  motherboard: [
    { id: 'mb1', name: 'ASUS ROG Strix Z790-E Gaming WiFi', brand: 'ASUS', socket: 'LGA1700', ram: 'DDR5', form: 'ATX', img: img('ROG Z790-E', '111827'), price: 52000, watt: 50, specs: ['LGA 1700', 'DDR5, WiFi 6E', 'ATX'] },
    { id: 'mb2', name: 'MSI MAG B650 Tomahawk WiFi Motherboard', brand: 'MSI', socket: 'AM5', ram: 'DDR5', form: 'ATX', img: img('B650 Tomahawk', '111827'), price: 28000, watt: 45, specs: ['AM5', 'DDR5', 'ATX'] },
    { id: 'mb3', name: 'Gigabyte B760M DS3H AX Motherboard', brand: 'Gigabyte', socket: 'LGA1700', ram: 'DDR5', form: 'mATX', img: img('B760M DS3H', '111827'), price: 16500, watt: 40, specs: ['LGA 1700', 'DDR5', 'Micro-ATX'] }
  ],
  ram: [
    { id: 'ram1', name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', brand: 'Corsair', type: 'DDR5', img: img('Vengeance 32GB', '4a1d96'), price: 14500, watt: 10, specs: ['2x16GB', '6000MHz', 'RGB'] },
    { id: 'ram2', name: 'G.Skill Trident Z5 RGB 16GB (2x8GB) DDR5', brand: 'G.Skill', type: 'DDR5', img: img('Trident Z5 16GB', '4a1d96'), price: 8500, watt: 8, specs: ['2x8GB', '5600MHz', 'RGB'] },
    { id: 'ram3', name: 'Corsair Vengeance 64GB (2x32GB) DDR5 6000MHz', brand: 'Corsair', type: 'DDR5', img: img('Vengeance 64GB', '4a1d96'), price: 28000, watt: 14, specs: ['2x32GB', '6000MHz', 'RGB'] }
  ],
  gpu: [
    { id: 'gpu1', name: 'ASUS ROG Strix GeForce RTX 4090 24GB GDDR6X', brand: 'NVIDIA', img: img('RTX 4090', '0a5c2e'), price: 215000, watt: 450, perf: 100, specs: ['24GB GDDR6X', 'PCIe 4.0', 'Triple Fan'] },
    { id: 'gpu2', name: 'Gigabyte GeForce RTX 4070 Ti Gaming OC 12GB', brand: 'NVIDIA', img: img('RTX 4070 Ti', '0a5c2e'), price: 95000, watt: 285, perf: 78, specs: ['12GB GDDR6X', 'PCIe 4.0', 'Dual Fan'] },
    { id: 'gpu3', name: 'MSI GeForce RTX 4060 Ti Ventus 2X 8GB', brand: 'NVIDIA', img: img('RTX 4060 Ti', '0a5c2e'), price: 52000, watt: 160, perf: 58, specs: ['8GB GDDR6', 'PCIe 4.0', 'Dual Fan'] },
    { id: 'gpu4', name: 'AMD Sapphire PULSE Radeon RX 7800 XT 16GB', brand: 'AMD', img: img('RX 7800 XT', 'a01406'), price: 68000, watt: 263, perf: 72, specs: ['16GB GDDR6', 'PCIe 4.0', 'Triple Fan'] }
  ],
  storage: [
    { id: 'st1', name: 'Samsung 990 PRO 2TB PCIe 4.0 M.2 NVMe SSD', brand: 'Samsung', img: img('990 PRO 2TB', '1a4a7a'), price: 24500, watt: 8, specs: ['7450MB/s', 'PCIe 4.0', 'M.2 NVMe'] },
    { id: 'st2', name: 'WD Black SN770 1TB PCIe 4.0 NVMe SSD', brand: 'WD', img: img('SN770 1TB', '1a4a7a'), price: 11000, watt: 6, specs: ['5150MB/s', 'PCIe 4.0', 'M.2 NVMe'] },
    { id: 'st3', name: 'Seagate Barracuda 2TB 7200RPM Desktop Hard Drive', brand: 'Seagate', img: img('Barracuda 2TB', '1a4a7a'), price: 6500, watt: 9, specs: ['7200 RPM', 'SATA III', '256MB Cache'] }
  ],
  psu: [
    { id: 'psu1', name: 'Corsair RM1000x 1000W 80 Plus Gold Fully Modular', brand: 'Corsair', wattage: 1000, img: img('RM1000x 1000W', '7c3aed'), price: 18500, watt: 0, specs: ['1000W', '80+ Gold', 'Fully Modular'] },
    { id: 'psu2', name: 'Cooler Master MWE Gold 750W V2 Full Modular', brand: 'Cooler Master', wattage: 750, img: img('MWE 750W', '7c3aed'), price: 11000, watt: 0, specs: ['750W', '80+ Gold', 'Modular'] },
    { id: 'psu3', name: 'Antec CSK 650W 80 Plus Bronze Power Supply', brand: 'Antec', wattage: 650, img: img('CSK 650W', '7c3aed'), price: 7500, watt: 0, specs: ['650W', '80+ Bronze', 'Non-Modular'] }
  ],
  case: [
    { id: 'cs1', name: 'NZXT H7 Flow RGB Mid Tower Casing', brand: 'NZXT', form: 'ATX', img: img('NZXT H7 Flow', '374151'), price: 13500, watt: 15, specs: ['Mid Tower', 'ATX', '4x RGB Fans'] },
    { id: 'cs2', name: 'Lian Li Lancool 216 RGB Mesh Casing', brand: 'Lian Li', form: 'ATX', img: img('Lancool 216', '374151'), price: 11000, watt: 12, specs: ['Mid Tower', 'ATX', '3x Fans'] },
    { id: 'cs3', name: 'Cooler Master MasterBox NR200P Mini-ITX', brand: 'Cooler Master', form: 'mATX', img: img('NR200P', '374151'), price: 12000, watt: 8, specs: ['Mini ITX', 'mATX', 'Compact'] }
  ],
  cooler: [
    { id: 'cl1', name: 'NZXT Kraken 360 RGB Liquid Cooler', brand: 'NZXT', img: img('Kraken 360', '0891b2'), price: 22000, watt: 25, specs: ['360mm AIO', 'LCD Display', 'RGB'] },
    { id: 'cl2', name: 'DeepCool AK620 High-Performance CPU Air Cooler', brand: 'DeepCool', img: img('AK620', '0891b2'), price: 7500, watt: 12, specs: ['Dual Tower', 'Air Cooling', '260W TDP'] },
    { id: 'cl3', name: 'Corsair iCUE H150i Elite Capellix XT Liquid Cooler', brand: 'Corsair', img: img('H150i 360', '0891b2'), price: 24000, watt: 28, specs: ['360mm AIO', 'RGB', 'Quiet'] }
  ],
  monitor: [
    { id: 'mn1', name: 'LG UltraGear 27" 240Hz QHD Gaming Monitor', brand: 'LG', img: img('UltraGear 27', 'be123c'), price: 52000, watt: 45, specs: ['2560x1440', '240Hz, 1ms', 'IPS'] },
    { id: 'mn2', name: 'Samsung Odyssey G7 32" 240Hz QHD Curved Gaming Monitor', brand: 'Samsung', img: img('Odyssey G7', 'be123c'), price: 68000, watt: 60, specs: ['2560x1440', '240Hz Curved', 'VA'] },
    { id: 'mn3', name: 'ASUS TUF Gaming 24" 165Hz Full HD Monitor', brand: 'ASUS', img: img('TUF 24', 'be123c'), price: 22000, watt: 35, specs: ['1920x1080', '165Hz, 1ms', 'IPS'] }
  ]
};

const SLOTS = [
  { key: 'cpu', label: 'Processor (CPU)', icon: FiCpu, required: true },
  { key: 'motherboard', label: 'Motherboard', icon: FiActivity, required: true },
  { key: 'ram', label: 'Memory (RAM)', icon: FiHardDrive, required: true },
  { key: 'gpu', label: 'Graphics Card (GPU)', icon: FiMonitor, required: true },
  { key: 'storage', label: 'Storage', icon: FiHardDrive, required: true },
  { key: 'psu', label: 'Power Supply (PSU)', icon: FiZap, required: true },
  { key: 'case', label: 'Casing', icon: FiActivity, required: false },
  { key: 'cooler', label: 'CPU Cooler', icon: FiActivity, required: false },
  { key: 'monitor', label: 'Monitor', icon: FiMonitor, required: false }
];

const PCBuilder = () => {
  const [build, setBuild] = useState({});
  const [openSlot, setOpenSlot] = useState(null);
  const { addItem } = useCartSystem();
  const { showNotification } = useNotification();

  const selectPart = (slot, part) => {
    setBuild((prev) => ({ ...prev, [slot]: part }));
    setOpenSlot(null);
    showNotification(`${part.name} added to build!`, 'success');
  };

  const removePart = (slot) => {
    setBuild((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
    showNotification('Component removed from build.', 'info');
  };

  /* ===== Calculations ===== */
  const stats = useMemo(() => {
    const parts = Object.values(build);
    const totalPrice = parts.reduce((s, p) => s + p.price, 0);
    const totalWatt = parts.reduce((s, p) => s + (p.watt || 0), 0) + 80;
    const recommendedPSU = Math.ceil((totalWatt * 1.35) / 50) * 50;

    const gpuPerf = build.gpu?.perf || 0;
    const cpuPerf = build.cpu?.perf || 0;
    const blend = gpuPerf * 0.8 + cpuPerf * 0.2;
    const fps = gpuPerf
      ? {
          p1080: Math.round(blend * 2.4),
          p1440: Math.round(blend * 1.7),
          p4k: Math.round(blend * 0.95)
        }
      : null;

    const selectedCount = parts.length;
    const requiredCount = SLOTS.filter((s) => s.required).length;
    const completedRequired = SLOTS.filter((s) => s.required && build[s.key]).length;

    return { totalPrice, totalWatt, recommendedPSU, fps, selectedCount, requiredCount, completedRequired };
  }, [build]);

  /* ===== Compatibility checks ===== */
  const checks = useMemo(() => {
    const list = [];
    if (build.cpu && build.motherboard) {
      const ok = build.cpu.socket === build.motherboard.socket;
      list.push({ ok, msg: ok ? `CPU socket matches motherboard (${build.cpu.socket})` : `CPU socket ${build.cpu.socket} ≠ motherboard ${build.motherboard.socket}` });
    }
    if (build.ram && build.motherboard) {
      const ok = build.ram.type === build.motherboard.ram;
      list.push({ ok, msg: ok ? `RAM type ${build.ram.type} supported` : `RAM ${build.ram.type} not supported by motherboard (${build.motherboard.ram})` });
    }
    if (build.psu) {
      const ok = build.psu.wattage >= stats.recommendedPSU;
      list.push({ ok, msg: ok ? `PSU ${build.psu.wattage}W is sufficient` : `PSU may be underpowered — need ${stats.recommendedPSU}W+` });
    }
    if (build.case && build.motherboard) {
      const ok = build.case.form === 'ATX' || build.motherboard.form !== 'ATX';
      list.push({ ok, msg: ok ? `Motherboard fits the case` : `${build.motherboard.form} board may not fit ${build.case.form} case` });
    }
    return list;
  }, [build, stats.recommendedPSU]);

  const hasIssues = checks.some((c) => !c.ok);

  const addAllToCart = () => {
    const parts = Object.values(build);
    if (parts.length === 0) {
      showNotification('Please add components to your custom build first.', 'error');
      return;
    }
    parts.forEach((p) => addItem({ id: p.id, name: p.name, price: p.price, thumbnail: p.img }, 1));
    showNotification(`Added ${parts.length} custom build components to Cart!`, 'success');
  };

  const handleSaveBuild = async () => {
    if (Object.keys(build).length === 0) {
      showNotification('Add components before saving your build.', 'error');
      return;
    }
    await pcBuilderService.saveBuild({
      buildName: 'StarTech Custom Build',
      components: build,
      totalPrice: stats.totalPrice
    });
    showNotification('Custom PC Build saved successfully!', 'success');
  };

  const progressPct = Math.round((stats.completedRequired / stats.requiredCount) * 100);

  return (
    <div className="pcb">
      {/* HERO HEADER */}
      <div className="pcb-hero">
        <div className="container pcb-hero-inner">
          <div className="pcb-hero-text">
            <span className="pcb-eyebrow">⚙️ INTERACTIVE TOOL</span>
            <h1>PC Builder</h1>
            <p>Build your custom PC with real-time compatibility checking, power calculation & FPS estimates</p>
          </div>
          <div className="pcb-hero-progress">
            <div className="pcb-progress-ring" style={{ '--pct': progressPct }}>
              <span>{progressPct}%</span>
            </div>
            <small>{stats.completedRequired}/{stats.requiredCount} essentials</small>
          </div>
        </div>
      </div>

      <div className="container pcb-layout">
        {/* LEFT: component slots */}
        <div className="pcb-slots">
          {SLOTS.map((slot) => {
            const Icon = slot.icon;
            const part = build[slot.key];
            return (
              <div key={slot.key} className={`pcb-slot ${part ? 'filled' : ''}`}>
                <div className="pcb-slot-icon"><Icon size={22} /></div>
                <div className="pcb-slot-info">
                  <div className="pcb-slot-label">
                    {slot.label}
                    {slot.required && <span className="pcb-req">Required</span>}
                  </div>
                  {part ? (
                    <div className="pcb-slot-selected">
                      <img src={part.img} alt={part.name} />
                      <div>
                        <strong>{part.name}</strong>
                        <span className="pcb-slot-price">৳{part.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="pcb-slot-empty">No component selected</div>
                  )}
                </div>
                <div className="pcb-slot-actions">
                  {part && (
                    <button className="pcb-remove" onClick={() => removePart(slot.key)} title="Remove">
                      <FiTrash2 />
                    </button>
                  )}
                  <button className="pcb-choose" onClick={() => setOpenSlot(slot.key)}>
                    {part ? 'Change' : <><FiPlus /> Add</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: summary panel */}
        <aside className="pcb-summary">
          <div className="pcb-summary-card">
            <h3>Build Summary</h3>

            <div className="pcb-total">
              <span>Total Price</span>
              <strong>৳{stats.totalPrice.toLocaleString('en-IN')}</strong>
            </div>

            {/* Power */}
            <div className="pcb-metric">
              <div className="pcb-metric-head"><FiZap /> Power Consumption</div>
              <div className="pcb-metric-body">
                <div className="pcb-watt-bar">
                  <div className="pcb-watt-fill" style={{ width: `${Math.min((stats.totalWatt / 1000) * 100, 100)}%` }} />
                </div>
                <div className="pcb-metric-row">
                  <span>Estimated Draw</span>
                  <strong>{stats.totalWatt} W</strong>
                </div>
                <div className="pcb-metric-row">
                  <span>Recommended PSU</span>
                  <strong>{stats.recommendedPSU} W</strong>
                </div>
              </div>
            </div>

            {/* FPS */}
            <div className="pcb-metric">
              <div className="pcb-metric-head"><FiActivity /> FPS Estimator</div>
              {stats.fps ? (
                <div className="pcb-fps-grid">
                  <div className="pcb-fps"><span>1080p</span><strong>{stats.fps.p1080}</strong><small>FPS</small></div>
                  <div className="pcb-fps"><span>1440p</span><strong>{stats.fps.p1440}</strong><small>FPS</small></div>
                  <div className="pcb-fps"><span>4K</span><strong>{stats.fps.p4k}</strong><small>FPS</small></div>
                </div>
              ) : (
                <div className="pcb-metric-empty">Select a GPU to estimate FPS</div>
              )}
            </div>

            {/* Compatibility */}
            <div className="pcb-metric">
              <div className="pcb-metric-head">
                {hasIssues ? <FiAlertTriangle className="warn" /> : <FiCheckCircle className="ok" />}
                Compatibility
              </div>
              {checks.length ? (
                <ul className="pcb-checks">
                  {checks.map((c, i) => (
                    <li key={i} className={c.ok ? 'ok' : 'bad'}>
                      {c.ok ? <FiCheckCircle /> : <FiAlertTriangle />}
                      {c.msg}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pcb-metric-empty">Add parts to check compatibility</div>
              )}
            </div>

            {/* Actions */}
            <button className="pcb-btn-primary" onClick={addAllToCart}>
              <FiShoppingCart /> Add All to Cart
            </button>
            <div className="pcb-btn-row">
              <button className="pcb-btn-ghost" onClick={handleSaveBuild}><FiSave /> Save</button>
              <button className="pcb-btn-ghost" onClick={() => showNotification('Share link copied to clipboard!', 'info')}><FiShare2 /> Share</button>
            </div>
          </div>
        </aside>
      </div>

      {/* SELECTOR MODAL */}
      {openSlot && PARTS[openSlot] && (
        <div className="pcb-modal-overlay" onClick={() => setOpenSlot(null)}>
          <div className="pcb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pcb-modal-head">
              <h3>Select {SLOTS.find((s) => s.key === openSlot)?.label}</h3>
              <button onClick={() => setOpenSlot(null)}><FiX size={22} /></button>
            </div>
            <div className="pcb-modal-grid">
              {PARTS[openSlot].map((part) => (
                <div key={part.id} className="pcb-part-card">
                  <div className="pcb-part-img">
                    <img src={part.img} alt={part.name} />
                    <span className="pcb-part-brand">{part.brand}</span>
                  </div>
                  <div className="pcb-part-body">
                    <strong className="pcb-part-name">{part.name}</strong>
                    <ul className="pcb-part-specs">
                      {part.specs.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                    <div className="pcb-part-foot">
                      <span className="pcb-part-price">৳{part.price.toLocaleString('en-IN')}</span>
                      <button onClick={() => selectPart(openSlot, part)}>Select</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PCBuilder;
