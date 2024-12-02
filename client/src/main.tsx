import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './Router.tsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </AuthProvider>
);
