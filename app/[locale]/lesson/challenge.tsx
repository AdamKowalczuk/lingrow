'use client';

import React from 'react';

import { challengeOptions, challenges } from '@/db/schema';
import { cn } from '@/lib/utils';
import { useTargetLanguage } from '@/store/use-target-language';

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
  const { targetLanguage } = useTargetLanguage();

  const getTextByTargetLanguage = (
    option: typeof challengeOptions.$inferSelect,
  ) => {
    switch (targetLanguage) {
      case 'pl':
        return option.textPl;
      case 'en':
        return option.textEn;
      case 'jp':
        return option.textJp;
      default:
        return option.textEn;
    }
  };

  const getAudioSrcByTargetLanguage = (
    option: typeof challengeOptions.$inferSelect,
  ) => {
    switch (targetLanguage) {
      case 'pl':
        return option.audioSrcPl;
      case 'en':
        return option.audioSrcEn;
      case 'jp':
        return option.audioSrcJp;
      default:
        return option.audioSrcEn;
    }
  };

  return (
    <div
      className={cn(
        'grid gap-2 sm:gap-3 lg:gap-4',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, i) => {
        return (
          <Card
            key={option.id}
            id={option.id}
            text={getTextByTargetLanguage(option)}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={getAudioSrcByTargetLanguage(option)}
            disabled={disabled}
            type={type}
          />
        );
      })}
    </div>
  );
};

export default Challenge;
