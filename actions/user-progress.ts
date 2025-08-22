'use server';

import { error } from 'console';

import { auth, currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { POINTS_TO_REFILL, quests, type Quest } from '@/constants';
import db from '@/db/drizzle';
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';
import {
  challengeProgress,
  challenges,
  userProgress,
  questProgress,
} from '@/db/schema';

export const upsertUserProgress = async (
  courseId: number,
  locale: string = 'en',
) => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) {
    throw new Error('Unauthorized');
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error('Course is empty');
  }

  const existingUserProgress = await getUserProgress(locale);

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || 'User',
      userImageSrc: user.imageUrl || '/mascot.svg',
    });

    revalidatePath('/courses');
    revalidatePath('/learn');
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || 'User',
    userImageSrc: user.imageUrl || '/mascot.svg',
  });

  revalidatePath('/courses');
  revalidatePath('/learn');

  await updateQuestProgress('lessons', 1);
};

export const reduceHearts = async (
  challengeId: number,
  locale: string = 'en',
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const currentUserProgress = await getUserProgress(locale);
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: 'practice' };
  }

  if (!currentUserProgress) {
    throw new Error('User progress not found');
  }

  if (userSubscription?.isActive) {
    return {
      error: 'subscription',
    };
  }

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);

  await updateQuestProgress('xp', 1);
};

export const refillHearts = async (locale: string = 'en') => {
  const currentUserProgress = await getUserProgress(locale);

  if (!currentUserProgress) {
    throw new Error('User progress not found');
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error('Hearts are already full');
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error('Not enough points');
  }

  await db
    .update(userProgress)
    .set({ hearts: 5, points: currentUserProgress.points - POINTS_TO_REFILL })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');
};

export const claimQuestReward = async (
  questTitle: string,
  locale: string = 'en',
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const currentUserProgress = await getUserProgress(locale);

  if (!currentUserProgress) {
    throw new Error('User progress not found');
  }

  const quest: Quest | undefined = quests.find(
    (q: Quest) => q.title === questTitle,
  );
  if (!quest || quest.reward.type !== 'hearts') {
    throw new Error('Invalid quest or reward type');
  }

  if (currentUserProgress.points < quest.value) {
    throw new Error('Quest not completed yet');
  }

  const questProgressData = await db.query.questProgress.findFirst({
    where: and(
      eq(questProgress.userId, userId),
      eq(questProgress.questTitle, questTitle),
    ),
  });

  if (questProgressData?.rewardClaimed) {
    throw new Error('Reward already claimed');
  }

  const newHearts = Math.min(
    currentUserProgress.hearts + quest.reward.amount,
    5,
  );

  await db
    .update(userProgress)
    .set({ hearts: newHearts })
    .where(eq(userProgress.userId, userId));

  if (!questProgressData) {
    await db.insert(questProgress).values({
      userId,
      questTitle: quest.title,
      questValue: quest.value,
      currentProgress: quest.value,
      completed: true,
      rewardClaimed: true,
    });
  } else {
    await db
      .update(questProgress)
      .set({ rewardClaimed: true })
      .where(eq(questProgress.id, questProgressData.id));
  }

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');

  return { success: true, newHearts };
};

export const updateQuestProgress = async (
  questType: 'xp' | 'lessons',
  amount: number,
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const allQuests = quests;

  for (const quest of allQuests) {
    if (questType === 'xp') {
      const questProgressData = await db.query.questProgress.findFirst({
        where: and(
          eq(questProgress.userId, userId),
          eq(questProgress.questTitle, quest.title),
        ),
      });

      if (questProgressData) {
        const currentProgress = questProgressData.currentProgress + amount;
        const completed = currentProgress >= quest.value;

        await db
          .update(questProgress)
          .set({
            currentProgress,
            completed,
          })
          .where(eq(questProgress.id, questProgressData.id));
      } else {
        const currentProgress = amount;
        const completed = currentProgress >= quest.value;

        await db.insert(questProgress).values({
          userId,
          questTitle: quest.title,
          questValue: quest.value,
          currentProgress,
          completed,
          rewardClaimed: false,
        });
      }
    }
  }

  revalidatePath('/quests');
};
