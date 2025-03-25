/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 10/02/2025 - 13:39:37
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>{' '}
  </StrictMode>
);
