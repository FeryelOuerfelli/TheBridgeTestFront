import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import AdminPage from './components/AdminPage'; 
import Landing from './pages/landing'; 
import './css/style.css';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/landing"
          element={
            <>
              <Landing />
            </>
          }
        />
           <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <AdminPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
