'use client';

import { Menu } from 'lucide-react';
import React, { useState } from 'react';

import { Sidebar } from './sidebar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <Sidebar onItemClick={closeSidebar} />
      </SheetContent>
    </Sheet>
  );
};
