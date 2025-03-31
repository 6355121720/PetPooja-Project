import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="pt-17">
        {children}
      </main>
    </div>
  );
};

export default Layout;