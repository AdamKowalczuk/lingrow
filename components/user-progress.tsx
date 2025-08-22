'use client';

import { InfinityIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { courses } from '@/db/schema';
import { useLocale } from '@/hooks/use-locale';

import { Button } from './ui/button';

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  const locale = useLocale();
  const t = useTranslations('userProgress');
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href={`/${locale}/courses`}>
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={locale === 'pl' ? activeCourse.titlePl : activeCourse.titleEn}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href={`/${locale}/shop`}>
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt={t('points')}
            className="mr-2"
            width={28}
            height={28}
          />
          {points}
        </Button>
      </Link>
      <Link href={`/${locale}/shop`}>
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt={t('hearts')}
            className="mr-2"
            width={22}
            height={22}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
