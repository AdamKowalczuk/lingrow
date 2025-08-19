import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

import { FeedWrapper } from '@/components/feed-wrapper';
import Promo from '@/components/promo';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { quests } from '@/constants';
import {
  getUserProgress,
  getUserSubscription,
  getQuestProgress,
} from '@/db/queries';

import QuestsList from './quests-list';

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const questProgressData = getQuestProgress();

  const [userProgress, userSubscription, questProgress] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    questProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
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
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/quests.svg" alt="quests" width={90} height={90} />
          <h1 className="text-center text-neutral-800 text-2xl font-bold">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg">
            Complete quests to earn hearts and rewards
          </p>
          <QuestsList
            quests={quests}
            userProgress={userProgress}
            questProgress={questProgress}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
