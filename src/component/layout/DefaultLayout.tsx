'use client';
import HeaderLayout from '@/component/layout/header/Header';
import SidebarLayout from '@/component/layout/sidebar/Sidebar';
import React, { useState } from 'react';
import FooterLayout from './footer/Footer';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="flex max-h-screen w-full">
      <SidebarLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <HeaderLayout toggleSidebar={toggleSidebar} />
        <div style={{ height: 'calc(100vh - 85px)'}}>
          {/* Main content goes here */}
          {children}
        </div>
        <FooterLayout />
      </div>
    </div>
  );
};

export default DefaultLayout;