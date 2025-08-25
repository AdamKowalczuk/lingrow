'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { claimQuestReward } from '@/actions/user-progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { type Quest } from '@/constants';
import { useLocale } from '@/hooks/use-locale';

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
    <div className="w-full space-y-4">
      {quests.map(quest => {
        const progress = calculateQuestProgress(quest);
        const completed = isQuestCompleted(quest);
        const rewardClaimed = isRewardClaimed(quest);

        return (
          <Card
            key={quest.title}
            className={`transition-all duration-300 hover:shadow-md ${
              completed && rewardClaimed
                ? 'bg-indigo-50 border-indigo-200 hover:border-indigo-300/50'
                : 'hover:border-indigo-300/30'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/points.svg"
                    alt={tImages('points')}
                    width={32}
                    height={32}
                    className="text-indigo-600"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {tQuestTitles(quest.title)}
                    </h3>
                    {completed && !rewardClaimed && (
                      <Button
                        variant="primary"
                        onClick={() => handleClaimReward(quest.title)}
                        disabled={pending}
                      >
                        {t('claim')}
                      </Button>
                    )}
                    {completed && rewardClaimed && (
                      <span className="text-sm text-gray-500 font-medium">
                        {t('completed')}
                      </span>
                    )}
                  </div>

                  <Progress value={progress} className="h-3 mb-3" />

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{progress}%</span>
                    {quest.reward.type === 'hearts' && (
                      <span className="flex items-center gap-2">
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuestsList;
