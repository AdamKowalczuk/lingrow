'use client';

import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: Props) => {
  const locale = useLocale();
  const t = useTranslations('learn');
  return (
    <div className="w-full rounded-xl bg-indigo-500 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href={`/${locale}/lesson`}>
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2"
        >
          <NotebookText className="mr-2" />
          {t('continue')}
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
