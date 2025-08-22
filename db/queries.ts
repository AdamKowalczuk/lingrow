import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

const getLocalizedField = (
  locale: string,
  enField: string,
  plField: string,
) => {
  return locale === 'pl' ? plField : enField;
};

import db from './drizzle';
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userSubscription,
  questProgress,
} from './schema';
import { userProgress } from './schema';

export const getUserProgress = cache(async (locale: string = 'en') => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const titleField = getLocalizedField(locale, 'titleEn', 'titlePl');

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  if (data?.activeCourse) {
    (data.activeCourse as any).title = data.activeCourse[
      titleField as keyof typeof data.activeCourse
    ] as string;
  }

  return data;
});

export const getUnits = cache(async (locale: string = 'en') => {
  const { userId } = await auth();
  const userProgress = await getUserProgress(locale);
  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const titleField = getLocalizedField(locale, 'titleEn', 'titlePl');
  const descriptionField = getLocalizedField(
    locale,
    'descriptionEn',
    'descriptionPl',
  );

  const normalizedData = data.map((unit: any) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson: any) => {
      if (lesson.challenges.length === 0) {
        return {
          ...lesson,
          completed: false,
          title: lesson[
            getLocalizedField(
              locale,
              'titleEn',
              'titlePl',
            ) as keyof typeof lesson
          ] as string,
        };
      }

      const normalizedChallenges = lesson.challenges.map((challenge: any) => {
        const questionField = getLocalizedField(
          locale,
          'questionEn',
          'questionPl',
        );

        const normalizedOptions =
          challenge.challengeOptions?.map((option: any) => {
            const textField = getLocalizedField(locale, 'textEn', 'textPl');
            const audioSrcField = getLocalizedField(
              locale,
              'audioSrcEn',
              'audioSrcPl',
            );

            return {
              ...option,
              text: option[textField as keyof typeof option] as string,
              audioSrc: option[audioSrcField as keyof typeof option] as string,
            };
          }) || [];

        return {
          ...challenge,
          question: challenge[
            questionField as keyof typeof challenge
          ] as string,
          challengeOptions: normalizedOptions,
        };
      });

      const allCompletedChallenges = normalizedChallenges.every(
        (challenge: any) => {
          return (
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every(
              (progress: any) => progress.completed,
            )
          );
        },
      );

      return {
        ...lesson,
        completed: allCompletedChallenges,
        title: lesson[
          getLocalizedField(locale, 'titleEn', 'titlePl') as keyof typeof lesson
        ] as string,
        challenges: normalizedChallenges,
      };
    });

    const normalizedUnit = {
      ...unit,
      lessons: lessonsWithCompletedStatus,
    } as any;

    normalizedUnit.title = unit[titleField as keyof typeof unit] as string;
    normalizedUnit.description = unit[
      descriptionField as keyof typeof unit
    ] as string;

    return normalizedUnit;
  });

  return normalizedData;
});

export const getCourses = cache(async (locale: string = 'en') => {
  const data = await db.query.courses.findMany();

  const titleField = getLocalizedField(locale, 'titleEn', 'titlePl');

  const normalizedData = data.map((course: any) => {
    const normalizedCourse = { ...course } as any;
    normalizedCourse.title = course[
      titleField as keyof typeof course
    ] as string;
    return normalizedCourse;
  });

  return normalizedData;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

export const getCourseProgress = cache(async (locale: string = 'en') => {
  const { userId } = await auth();

  const userProgress = await getUserProgress(locale);
  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const titleField = getLocalizedField(locale, 'titleEn', 'titlePl');
  const descriptionField = getLocalizedField(
    locale,
    'descriptionEn',
    'descriptionPl',
  );

  const localizedUnits = unitsInActiveCourse.map((unit: any) => ({
    ...unit,
    title: unit[titleField as keyof typeof unit] as string,
    description: unit[descriptionField as keyof typeof unit] as string,
    lessons: unit.lessons.map((lesson: any) => ({
      ...lesson,
      title: lesson[titleField as keyof typeof lesson] as string,
      description: lesson[descriptionField as keyof typeof lesson] as string,
    })),
  }));

  const firstUncompletedLesson = localizedUnits
    .flatMap(unit => unit.lessons)
    .find(lesson => {
      return lesson.challenges.some((challenge: any) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress: any) => progress.completed === false,
          )
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number, locale: string = 'en') => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const courseProgress = await getCourseProgress(locale);
  const lessonId = id || courseProgress?.activeLessonId;
  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const titleField = getLocalizedField(locale, 'titleEn', 'titlePl');
  const questionField = getLocalizedField(locale, 'questionEn', 'questionPl');

  const normalizedChallenges = data.challenges.map((challenge: any) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress: any) => progress.completed);

    const normalizedOptions =
      challenge.challengeOptions?.map((option: any) => {
        const textField = getLocalizedField(locale, 'textEn', 'textPl');
        const audioSrcField = getLocalizedField(
          locale,
          'audioSrcEn',
          'audioSrcPl',
        );

        return {
          ...option,
          text: option[textField as keyof typeof option] as string,
          audioSrc: option[audioSrcField as keyof typeof option] as string,
        };
      }) || [];

    return {
      ...challenge,
      completed: completed,
      question: challenge[questionField as keyof typeof challenge] as string,
      challengeOptions: normalizedOptions,
    };
  });

  const normalizedLesson = {
    ...data,
    challenges: normalizedChallenges,
  } as any;

  normalizedLesson.title = data[titleField as keyof typeof data] as string;

  return normalizedLesson;
});

export const getLessonPercentage = cache(async (locale: string = 'en') => {
  const courseProgress = await getCourseProgress(locale);
  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId, locale);
  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge: any) => challenge.completed,
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );

  return percentage;
});

export const getQuestProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const data = await db.query.questProgress.findMany({
    where: eq(questProgress.userId, userId),
    orderBy: (questProgress, { asc }) => [asc(questProgress.createdAt)],
  });

  return data;
});

const DAY_IN_MS = 86_400_000;

export const getUserSubscription = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) {
    return null;
  }

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });

  return data;
});
