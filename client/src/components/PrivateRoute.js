import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Функція для отримання токена з localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Компонент PrivateRoute для захисту маршрутів
const PrivateRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
