import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

/*
Settings был убран из-за сообщения Линтера в App.
До этого задания 7 8 9 были выполнены так, как было сказано в учебном задании
 */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
