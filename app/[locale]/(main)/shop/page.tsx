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
          <div className="relative mb-8 overflow-hidden w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-indigo-400/5 to-transparent rounded-3xl"></div>

            <div className="relative text-center py-6 lg:py-8 px-4 lg:px-6">
              <div className="relative mx-auto mb-3 lg:mb-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                  <Image
                    src="/shop.svg"
                    alt={t('shop')}
                    width={28}
                    height={28}
                    className="filter brightness-0 invert lg:w-8 lg:h-8"
                  />
                </div>
                <div className="absolute inset-0 w-14 h-14 lg:w-16 lg:h-16 bg-indigo-500 rounded-2xl lg:rounded-3xl mx-auto opacity-20 blur-xl"></div>
              </div>

              <h1 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3 text-gray-800">
                {t('title')}
              </h1>
              <p className="text-sm lg:text-base text-gray-600 mx-auto leading-relaxed">
                {t('description')}
              </p>

              <div className="absolute top-2 right-2 lg:top-3 lg:right-3 w-10 h-10 lg:w-12 lg:h-12 bg-indigo-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-2 left-2 lg:bottom-3 lg:left-3 w-6 h-6 lg:w-8 lg:h-8 bg-indigo-500/10 rounded-full blur-xl"></div>
            </div>
          </div>

          <Items hasActiveSubscription={isPro} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
