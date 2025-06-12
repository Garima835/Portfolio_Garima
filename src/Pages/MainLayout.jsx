// MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './Navbar.jsx';

export const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

