'use client';
import HeaderLayout from '@/component/layout/header/Header';
import SidebarLayout from '@/component/layout/sidebar/Sidebar';
import React, { useState } from 'react';
import FooterLayout from './footer/Footer';

interface DefaultLayoutProps {
    children: React.ReactNode;
    pageName: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, pageName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* MAIN COLUMN */}
      <div className="flex flex-col flex-1 min-h-0">

        {/* HEADER */}
        <HeaderLayout toggleSidebar={toggleSidebar} pageName={pageName} />

        {/* CONTENT → must be flex-grow + min-h-0 to allow calendar expansion */}
        <div className="flex-1 overflow-auto min-h-0">
          {children}
        </div>

        {/* FOOTER */}
        <FooterLayout />
      </div>
    </div>
  );
};

export default DefaultLayout;
