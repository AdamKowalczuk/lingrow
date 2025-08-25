import React from 'react';

import { MobileSidebar } from './mobile-sidebar';

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-indigo-500/95 backdrop-blur-sm border-b border-indigo-400 fixed top-0 w-full z-50 shadow-lg">
      <MobileSidebar />
    </nav>
  );
};
