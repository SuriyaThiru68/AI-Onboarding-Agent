import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import VendorDashboard from './pages/VendorDashboard';
import DistributorDashboard from './pages/DistributorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/vendor/login" element={<Login />} />
          <Route path="/distributor/login" element={<Login />} />
          <Route
            path="/vendor/*"
            element={
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/distributor/*"
            element={
              <ProtectedRoute role="distributor">
                <DistributorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
