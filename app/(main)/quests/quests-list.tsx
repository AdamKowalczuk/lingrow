'use client';

import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { claimQuestReward } from '@/actions/user-progress';
import { type Quest } from '@/constants';

import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';

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

  const handleClaimReward = (questTitle: string) => {
    startTransition(async () => {
      try {
        const result = await claimQuestReward(questTitle);

        if (result.success) {
          if (onDataUpdate) {
            onDataUpdate();
          }
        }
      } catch {
        toast.error('Nie udało się odebrać nagrody');
      }
    });
  };

  const calculateQuestProgress = (quest: Quest): number => {
    if (!questProgress) return 0;

    const progress = questProgress.find(qp => qp.questTitle === quest.title);
    if (!progress) return 0;

    if (quest.title.includes('XP')) {
      return Math.min((userProgress.points / quest.value) * 100, 100);
    }

    return 0;
  };

  const isQuestCompleted = (quest: Quest): boolean => {
    const progress = calculateQuestProgress(quest);
    return progress >= 100;
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
            className="flex items-center w-full p-6 gap-x-4 border-2 rounded-xl hover:bg-gray-50/50 transition-colors"
          >
            <Image src="/points.svg" alt="points" width={60} height={60} />
            <div className="flex flex-col gap-y-3 w-full">
              <div className="flex items-center justify-between">
                <p className="text-neutral-700 text-xl font-bold">
                  {quest.title}
                </p>
                {completed && !rewardClaimed && (
                  <div className="flex items-center gap-x-3">
                    <Button
                      variant="primary"
                      onClick={() => handleClaimReward(quest.title)}
                      disabled={pending}
                    >
                      Odbierz
                    </Button>
                  </div>
                )}
                {completed && rewardClaimed && (
                  <span className="text-sm text-green-600 font-medium">
                    ✅ Odebrano
                  </span>
                )}
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex items-center justify-between text-sm text-neutral-500">
                <span></span>
                {quest.reward.type === 'hearts' && (
                  <span className="flex items-center gap-1">
                    Nagroda: {quest.reward.amount}
                    <Image
                      src="/heart.svg"
                      alt="heart"
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
