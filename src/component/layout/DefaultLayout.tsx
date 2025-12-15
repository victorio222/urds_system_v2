// "use client";
// import HeaderLayout from "@/component/layout/header/Header";
// import SidebarLayout from "@/component/layout/sidebar/Sidebar";
// import React, { useState, useEffect } from "react";
// import FooterLayout from "./footer/Footer";

// interface DefaultLayoutProps {
//   children: React.ReactNode;
//   pageName: string;
// }

// const DefaultLayout: React.FC<DefaultLayoutProps> = ({
//   children,
//   pageName,
// }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const isMobile = window.innerWidth < 768;
//     if (isMobile) {
//       setIsSidebarOpen(false);
//     }
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <SidebarLayout
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />
//       <div className="flex flex-col flex-1 overflow-x-hidden">
//         <HeaderLayout toggleSidebar={toggleSidebar} pageName={pageName} />
//         <main className="flex-1 overflow-y-auto p-0">
//           <div>{children}</div>
//         </main>
//         <FooterLayout />
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;







"use client";

import React, { useEffect, useState } from "react";
import HeaderLayout from "@/component/layout/header/Header";
import SidebarLayout from "@/component/layout/sidebar/Sidebar";
import FooterLayout from "./footer/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
  pageName: string;
}

const MOBILE_BREAKPOINT = 768;

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  pageName,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= MOBILE_BREAKPOINT);
    };

    // Initial check
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarLayout
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex flex-col flex-1 overflow-x-hidden">
        <HeaderLayout
          toggleSidebar={toggleSidebar}
          pageName={pageName}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        <FooterLayout />
      </div>
    </div>
  );
};

export default DefaultLayout;
