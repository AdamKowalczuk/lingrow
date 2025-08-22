'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="flex-shrink-0">
          <Image
            src="en.svg"
            alt={t('english')}
            width={32}
            height={40}
            className="mr-4 rounded-md"
          />
          {t('english')}
        </Button>
        <Button size="lg" variant="ghost" className="flex-shrink-0">
          <Image
            src="jp.svg"
            alt={t('japanese')}
            width={32}
            height={40}
            className="mr-4 rounded-md"
          />
          {t('japanese')}
        </Button>
        <Button size="lg" variant="ghost" className="flex-shrink-0">
          <Image
            src="pl.svg"
            alt={t('polish')}
            width={32}
            height={40}
            className="mr-4 rounded-md"
          />
          {t('polish')}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
