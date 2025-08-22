'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { claimQuestReward } from '@/actions/user-progress';
import { type Quest } from '@/constants';
import { useLocale } from '@/hooks/use-locale';

import { Button } from '../../../../components/ui/button';
import { Progress } from '../../../../components/ui/progress';

type Props = {
  quests: Quest[];
  userProgress: {
    points: number;
  };
  questProgress: Array<{
    id: number;
    questTitle: string;
    questValue: number;
    currentProgress: number;
    completed: boolean;
    rewardClaimed: boolean;
  }> | null;
  onDataUpdate?: () => void;
};

const QuestsList = ({
  quests,
  userProgress,
  questProgress,
  onDataUpdate,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const t = useTranslations('quests');
  const tImages = useTranslations('images');
  const tQuestTitles = useTranslations('questTitles');
  const locale = useLocale();

  const handleClaimReward = (questTitle: string) => {
    startTransition(async () => {
      try {
        const result = await claimQuestReward(questTitle, locale);

        if (result.success) {
          if (onDataUpdate) {
            onDataUpdate();
          }
        }
      } catch {
        toast.error(t('claimError'));
      }
    });
  };

  const calculateQuestProgress = (quest: Quest): number => {
    const currentProgress = Math.min(userProgress.points, quest.value);
    return Math.round((currentProgress / quest.value) * 100);
  };

  const isQuestCompleted = (quest: Quest): boolean => {
    return userProgress.points >= quest.value;
  };

  const isRewardClaimed = (quest: Quest): boolean => {
    if (!questProgress) return false;

    const progress = questProgress.find(qp => qp.questTitle === quest.title);
    if (!progress) return false;

    return progress.rewardClaimed;
  };

  return (
    <ul className="w-full space-y-4 mt-6">
      {quests.map(quest => {
        const progress = calculateQuestProgress(quest);
        const completed = isQuestCompleted(quest);
        const rewardClaimed = isRewardClaimed(quest);

        return (
          <div
            key={quest.title}
            className={`flex items-center w-full p-6 gap-x-4 border-2 rounded-xl hover:bg-gray-50/50 transition-colors ${
              completed && rewardClaimed
                ? 'bg-indigo-500/15 border-indigo-300'
                : ''
            }`}
          >
            <Image
              src="/points.svg"
              alt={tImages('points')}
              width={60}
              height={60}
            />
            <div className="flex flex-col gap-y-3 w-full">
              <div className="flex items-center justify-between">
                <p className="text-neutral-700 text-xl font-bold">
                  {tQuestTitles(quest.title)}
                </p>
                {completed && !rewardClaimed && (
                  <div className="flex items-center gap-x-3">
                    <Button
                      variant="primary"
                      onClick={() => handleClaimReward(quest.title)}
                      disabled={pending}
                    >
                      {t('claim')}
                    </Button>
                  </div>
                )}
                {completed && rewardClaimed && (
                  <span className="text-sm text-gray-500 font-medium">
                    {t('completed')}
                  </span>
                )}
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex items-center justify-between text-sm text-neutral-500">
                <span></span>
                {quest.reward.type === 'hearts' && (
                  <span className="flex items-center gap-1">
                    {t('reward')} {quest.reward.amount}
                    <Image
                      src="/heart.svg"
                      alt={tImages('hearts')}
                      width={16}
                      height={16}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default QuestsList;
