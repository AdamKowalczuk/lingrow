import React from 'react';

import { challengeOptions, challenges } from '@/db/schema';
import { useLocale } from '@/hooks/use-locale';
import { cn } from '@/lib/utils';

import Card from './card';

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: 'correct' | 'wrong' | 'none';
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)['type'];
};
const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  const locale = useLocale();

  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, i) => {
        return (
          <Card
            key={option.id}
            id={option.id}
            text={locale === 'pl' ? option.textPl : option.textEn}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={locale === 'pl' ? option.audioSrcPl : option.audioSrcEn}
            disabled={disabled}
            type={type}
          />
        );
      })}
    </div>
  );
};

export default Challenge;
