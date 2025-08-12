'use client';
import { courses, userProgress } from '@/db/schema';
import React, { useTransition } from 'react';
import Card from './card';
import { useRouter } from 'next/navigation';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: (typeof userProgress.$inferSelect)['activeCourseId'];
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push('/learn');
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(id);
        router.push('/learn');
      } catch (error) {
        toast.error('Something went wrong');
      }
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map(course => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
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
