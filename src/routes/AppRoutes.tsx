import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import HomePage from '../pages/HomePage';
import SensorsPage from '../pages/SensorsPage';
import SunPage from '../pages/SunPage';
import TemperaturePage from '../pages/TemperaturePage';
import WindPage from '../pages/WindPage';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/radiacion" element={<SunPage />} />
      <Route path="/temperatura" element={<TemperaturePage />} />
      <Route path="/Viento" element={<WindPage />} />
      


      {/* Ruta login solo si NO está logueado */}
      {!isLoggedIn && <Route path="/login" element={<AdminLoginPage />} />}

      {/* Ruta sensores solo si está logueado */}
      {isLoggedIn ? (
        <Route path="/sensores" element={<SensorsPage />} />
      ) : (
        // Si no está logueado y quiere entrar a /sensors, redirige a login
        <Route path="/sensores" element={<Navigate to="/login" replace />} />
      )}

      {/* Ruta comodín */}
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
