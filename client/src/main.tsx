import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './Router.tsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ClinicsProvider } from './contexts/ClinicsContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
  <ClinicsProvider>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
    </ClinicsProvider>
  </AuthProvider>
);
