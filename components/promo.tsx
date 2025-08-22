'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useLocale } from '@/hooks/use-locale';

import { Button } from './ui/button';

const Promo = () => {
  const t = useTranslations('promo');
  const locale = useLocale();
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="pro" width={26} height={26} />
          <h3 className="font-bold text-lg">{t('title')}</h3>
        </div>

        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <Button asChild variant="super" className="w-full" size="lg">
        <Link href={`/${locale}/shop`}>{t('upgradeToday')}</Link>
      </Button>
    </div>
  );
};

export default Promo;
