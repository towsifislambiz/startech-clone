import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS first, so our theme can override its defaults (e.g. blue .btn-primary)
import 'bootstrap/dist/css/bootstrap.min.css';

// Global Styles (override Bootstrap)
import './styles/theme.css';
import './styles/darkmode.css';
import './styles/responsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
