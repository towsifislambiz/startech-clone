import { createSlice } from '@reduxjs/toolkit';

export const BUILD_CATEGORIES = [
  { key: 'cpu', label: 'Processor (CPU)', icon: '💻', required: true },
  { key: 'motherboard', label: 'Motherboard', icon: '🔌', required: true },
  { key: 'ram', label: 'RAM (Memory)', icon: '⚡', required: true },
  { key: 'gpu', label: 'Graphics Card (GPU)', icon: '🎮', required: false },
  { key: 'ssd', label: 'SSD Storage', icon: '💾', required: true },
  { key: 'hdd', label: 'Hard Disk Drive (HDD)', icon: '💽', required: false },
  { key: 'psu', label: 'Power Supply (PSU)', icon: '⚡', required: true },
  { key: 'cooler', label: 'CPU Cooler', icon: '❄️', required: false },
  { key: 'casing', label: 'Casing / Enclosure', icon: '🖥️', required: true },
  { key: 'monitor', label: 'Monitor', icon: '🖥️', required: false },
  { key: 'keyboard', label: 'Keyboard', icon: '⌨️', required: false },
  { key: 'mouse', label: 'Mouse', icon: '🖱️', required: false },
  { key: 'headphone', label: 'Headphone / Headset', icon: '🎧', required: false }
];

const checkCompatibility = (components) => {
  const warnings = [];
  const cpu = components.cpu;
  const motherboard = components.motherboard;

  // Socket validation
  if (cpu && motherboard) {
    const cpuName = cpu.name.toLowerCase();
    const moboName = motherboard.name.toLowerCase();

    if (cpuName.includes('intel') && moboName.includes('amd')) {
      warnings.push('Incompatible: Intel Processor selected with an AMD Motherboard!');
    } else if (cpuName.includes('amd') && moboName.includes('intel')) {
      warnings.push('Incompatible: AMD Processor selected with an Intel Motherboard!');
    }
  }

  return warnings;
};

const initialState = {
  components: {}, // { cpu: productObj, motherboard: productObj, ... }
  warnings: [],
  savedBuilds: [],
  activeSelectorCategory: null, // modal state
  loading: false
};

const pcBuilderSlice = createSlice({
  name: 'pcBuilder',
  initialState,
  reducers: {
    selectComponent: (state, action) => {
      const { categoryKey, product } = action.payload;
      state.components[categoryKey] = product;
      state.warnings = checkCompatibility(state.components);
      state.activeSelectorCategory = null;
    },

    removeComponent: (state, action) => {
      const categoryKey = action.payload;
      delete state.components[categoryKey];
      state.warnings = checkCompatibility(state.components);
    },

    clearBuild: (state) => {
      state.components = {};
      state.warnings = [];
    },

    openSelectorModal: (state, action) => {
      state.activeSelectorCategory = action.payload;
    },

    closeSelectorModal: (state) => {
      state.activeSelectorCategory = null;
    },

    setSavedBuilds: (state, action) => {
      state.savedBuilds = action.payload;
    },

    loadSavedBuild: (state, action) => {
      state.components = action.payload || {};
      state.warnings = checkCompatibility(state.components);
    }
  }
});

export const {
  selectComponent,
  removeComponent,
  clearBuild,
  openSelectorModal,
  closeSelectorModal,
  setSavedBuilds,
  loadSavedBuild
} = pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;
