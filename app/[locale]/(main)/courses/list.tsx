'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { upsertUserProgress } from '@/actions/user-progress';
import { courses, userProgress } from '@/db/schema';
import { useLocale } from '@/hooks/use-locale';

import Card from './card';

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: (typeof userProgress.$inferSelect)['activeCourseId'];
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push(`/${locale}/learn`);
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(id, locale);
        router.push(`/${locale}/learn`);
      } catch {
        toast.error(tCommon('somethingWentWrong'));
      }
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map(course => (
        <Card
          key={course.id}
          id={course.id}
          title={locale === 'pl' ? course.titlePl : course.titleEn}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={activeCourseId === course.id}
        />
      ))}
    </div>
  );
};

export default List;
