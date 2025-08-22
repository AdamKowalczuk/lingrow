import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  variant: 'points' | 'hearts';
  value: number;
};

const ResultCard = ({ variant, value }: Props) => {
  const imageSrc = variant === 'hearts' ? '/heart.svg' : '/points.svg';
  const t = useTranslations('lesson.resultCard');
  const tImages = useTranslations('images');
  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full md:min-w-[200px] h-full flex flex-col justify-between',
        variant === 'points' && 'bg-orange-400 border-orange-400',
        variant === 'hearts' && 'bg-rose-500 border-rose-500',
      )}
    >
      <div
        className={cn(
          'p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs',
          variant === 'points' && 'bg-orange-400 ',
          variant === 'hearts' && 'bg-rose-500 ',
        )}
      >
        {variant === 'hearts' ? t('heartsLeft') : t('totalXp')}
      </div>
      <div
        className={cn(
          'rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg',
          variant === 'points' && 'text-orange-400',
          variant === 'hearts' && 'text-rose-500',
        )}
      >
        <Image
          src={imageSrc}
          alt={tImages('icon')}
          width={30}
          height={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
