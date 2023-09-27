import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NylasProvider } from '@nylas/nylas-react';
import reportWebVitals from './reportWebVitals';
const SERVER_URI = 'http://localhost:8000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NylasProvider serverBaseUrl={SERVER_URI}>
    <App />
    </NylasProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
