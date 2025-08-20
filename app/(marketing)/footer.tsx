import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="flex-shrink-0">
          <Image
            src="en.svg"
            alt="English"
            width={32}
            height={40}
            className="mr-4 rounded-md"
          />
          English
        </Button>
        <Button size="lg" variant="ghost" className="flex-shrink-0">
          <Image
            src="jp.svg"
            alt="Japanese"
            width={32}
            height={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
        <Button size="lg" variant="ghost" className="flex-shrink-0">
          <Image
            src="pl.svg"
            alt="Polish"
            width={32}
            height={40}
            className="mr-4 rounded-md"
          />
          Polish
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
