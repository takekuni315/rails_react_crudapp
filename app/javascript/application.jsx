import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

// eslint-disable-next-line no-undef
const container = document.getElementById('root');
const root = createRoot(container);

// eslint-disable-next-line no-undef
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
