import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

const Setting = {
  OffersCount: 10
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.OffersCount}
    />
  </React.StrictMode>
);
