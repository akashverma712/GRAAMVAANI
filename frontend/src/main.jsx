import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';


const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New update available. Reload now?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    alert("You are now offline-ready");
  }
});


window.addEventListener('offline', () => {
  alert('You are offline!');
});

window.addEventListener('online', () => {
  alert('You are back online!');
});

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) throw new Error('VITE_CLERK_PUBLISHABLE_KEY is missing');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
