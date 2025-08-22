'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  const locale = useLocale();
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href={`/${locale}/courses`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg">{title}</h1>
      <div />
    </div>
  );
};
