import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { blockThirdPartyScripts } from './utils/scriptBlocker';

// Block third-party scripts before rendering
blockThirdPartyScripts();

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);