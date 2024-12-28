import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Landing from './pages/landing'; 
import './css/style.css';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

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
          path="/contact"
          element={
            <>
              <Contact />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
