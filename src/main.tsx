import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerProfession, hasProfession } from './professions/profession_registry';
import SoftwareEngineerModule from './professions/software_engineer/module';
import { startCareerNavigator } from './core/bootstrap/system_entry';

// Register profession FIRST — before any runtime initialisation
if (!hasProfession(SoftwareEngineerModule.id)) {
  registerProfession(SoftwareEngineerModule);
}

// Boot system
try {
  startCareerNavigator();
} catch {
  // Already initialised — safe on HMR
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
