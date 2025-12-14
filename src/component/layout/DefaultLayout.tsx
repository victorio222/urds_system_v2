// 'use client';
// import HeaderLayout from '@/component/layout/header/Header';
// import SidebarLayout from '@/component/layout/sidebar/Sidebar';
// import React, { useState } from 'react';
// import FooterLayout from './footer/Footer';

// interface DefaultLayoutProps {
//     children: React.ReactNode;
//     pageName: string;
// }

// const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, pageName }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(prevState => !prevState);
//   };

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       <SidebarLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* MAIN COLUMN */}
//       <div className="flex flex-col flex-1 min-h-0">

//         {/* HEADER */}
//         <HeaderLayout toggleSidebar={toggleSidebar} pageName={pageName} />

//         {/* CONTENT → must be flex-grow + min-h-0 to allow calendar expansion */}
//         <div className="flex-1 overflow-auto min-h-0">
//           {children}
//         </div>

//         {/* FOOTER */}
//         <FooterLayout />
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;







'use client';
import HeaderLayout from '@/component/layout/header/Header';
import SidebarLayout from '@/component/layout/sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import FooterLayout from './footer/Footer';

interface DefaultLayoutProps {
    children: React.ReactNode;
    pageName: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, pageName }) => {
    // 💡 FIX 1: Initialize the state based on a safe default (e.g., desktop/open).
    // The CSS will handle hiding it on mobile first.
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    // 💡 FIX 2: Check screen width on mount to set the correct initial state.
    // If the screen is small (<768px), set the sidebar to closed.
    useEffect(() => {
        const isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
        if (isMobile) {
            setIsSidebarOpen(false); 
        }
    }, []);

    // ... (rest of your component remains the same)

    return (
        <div className="flex min-h-screen bg-gray-50">
            
            <SidebarLayout 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
            />

            {/* MAIN COLUMN */}
            <div className="flex flex-col flex-1 overflow-x-hidden">

                {/* HEADER */}
                <HeaderLayout toggleSidebar={toggleSidebar} pageName={pageName} />

                {/* CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-0"> 
                    <div className="p-4 md:p-6"> 
                        {children}
                    </div>
                </main>

                {/* FOOTER */}
                <FooterLayout />
            </div>
        </div>
    );
};

export default DefaultLayout;