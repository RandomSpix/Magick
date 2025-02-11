import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '@/store/theme';
import '@/styles/magic-mode.css';

export const Layout = () => {
  const { isMagicMode, isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : isMagicMode 
          ? 'magic-mode bg-gray-900' 
          : 'bg-gradient-to-br from-purple-50 via-white to-green-50'
    }`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};