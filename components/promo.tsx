'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useLocale } from '@/hooks/use-locale';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const Promo = () => {
  const t = useTranslations('promo');
  const locale = useLocale();

  return (
    <Card className="border rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Image
                src="/unlimited.svg"
                alt="pro"
                width={20}
                height={20}
                className="text-indigo-600"
              />
            </div>
            <h3 className="font-bold text-lg text-gray-800">{t('title')}</h3>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {t('description')}
          </p>
        </div>

        <Button asChild variant="super" className="w-full" size="lg">
          <Link href={`/${locale}/shop`}>{t('upgradeToday')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Promo;
