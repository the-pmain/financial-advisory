import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/inter';
import './index.css';
import { App } from './App';
import { LocaleProvider } from './i18n';

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');

const app = (
  <StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </BrowserRouter>
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
