import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import MyShipments from './pages/myshipment';
import CreateShipment from './pages/createshipment';
import Profile from './pages/profile';
import Wallet from './pages/wallet';
import ShipmentDetails from './pages/shipmentdetails';
import EditShipment from './pages/editshipment';
import './assets/styles/main.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<MyShipments />} />
            <Route path="/create" element={<CreateShipment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/shipments/:id" element={<ShipmentDetails />} />
            <Route path="/edit/:id" element={<EditShipment />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
