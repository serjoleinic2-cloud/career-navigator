import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerAllProfessions } from './professions/profession_auto_loader';
import { startCareerNavigator } from './core/bootstrap/system_entry';

// Step 1: Register all profession modules (plug-ins)
registerAllProfessions();

// Step 2: Boot system
try {
  startCareerNavigator();
} catch {
  // Already initialised — safe on HMR
}

// Step 3: Render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
