// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import { UserDataProvider } from './userData';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//       <UserDataProvider>
//         <App />
//       </UserDataProvider>
//   </React.StrictMode>
// )
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // ✅ Make sure this file exists
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
