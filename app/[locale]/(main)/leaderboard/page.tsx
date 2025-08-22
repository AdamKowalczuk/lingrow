import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { FeedWrapper } from '@/components/feed-wrapper';
import Promo from '@/components/promo';
import Quests from '@/components/quests';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { UserProgress } from '@/components/user-progress';
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
  getQuestProgress,
} from '@/db/queries';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

const LeaderboardPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('leaderboardPage');
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();
  const questProgressData = getQuestProgress();
  const [userProgress, userSubscription, leaderboard, questProgress] =
    await Promise.all([
      userProgressData,
      userSubscriptionData,
      leaderboardData,
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
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} questProgress={questProgress} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt={t('leaderboard')}
            width={90}
            height={90}
          />
          <h1 className="text-center text-neutral-800 text-2xl font-bold">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-center text-lg">
            {t('description')}
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
              <Avatar className="border bg-indigo-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage
                  className="object-cover"
                  src={userProgress.userImageSrc}
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">
                {userProgress.points} {t('xp')}
              </p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
