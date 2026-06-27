import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { startCareerNavigator } from './core/bootstrap/system_entry';
import { registerProfession, hasProfession } from './professions/profession_registry';
import SoftwareEngineerModule from './professions/software_engineer/module';

startCareerNavigator();

if (!hasProfession(SoftwareEngineerModule.id)) {
  registerProfession(SoftwareEngineerModule);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
