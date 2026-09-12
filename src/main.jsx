import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

/**
 * Clean URLs (/contact) in production — that is what is indexed, and Vercel
 * answers every path with index.html (see vercel.json).
 *
 * Hash URLs (#/contact) are for builds that have to run from an unknown
 * path or a host with no rewrite rule, such as a shared preview:
 *
 *     VITE_HASH_ROUTER=true npm run build
 */
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
