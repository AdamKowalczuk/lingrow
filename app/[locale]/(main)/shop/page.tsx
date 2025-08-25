import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { FeedWrapper } from '@/components/feed-wrapper';
import Promo from '@/components/promo';
import Quests from '@/components/quests';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import {
  getUserProgress,
  getUserSubscription,
  getQuestProgress,
} from '@/db/queries';
import { routing } from '@/i18n/routing';

import Items from './items';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const ShopPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('shopPage');
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const questProgressData = getQuestProgress();
  const [userProgress, userSubscription, questProgress] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    questProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect(`/${locale}/courses`);
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} questProgress={questProgress} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" alt={t('shop')} width={90} height={90} />
          <h1 className="text-center text-neutral-800 text-2xl font-bold">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-center text-lg">
            {t('description')}
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
