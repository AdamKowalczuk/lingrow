'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState, useTransition } from 'react';
import Confetti from 'react-confetti';
import { useAudio, useWindowSize, useMount } from 'react-use';
import { toast } from 'sonner';

import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progress';
import { challengeOptions, challenges, userSubscription } from '@/db/schema';
import { useLocale } from '@/hooks/use-locale';
import { useHeartsModal } from '@/store/use-hearts-modal';
import { usePracticeModal } from '@/store/use-practice-modal';
import { useTargetLanguage } from '@/store/use-target-language';

import Challenge from './challenge';
import Footer from './footer';
import Header from './header';
import QuestionBubble from './question-bubble';
import ResultCard from './result-card';

type Props = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  const { targetLanguage } = useTargetLanguage();
  const t = useTranslations('lesson');

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();
  const router = useRouter();
  const locale = useLocale();

  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true });
  const [correctAudio, , correctControls] = useAudio({ src: '/correct.wav' });
  const [incorrectAudio, , incorrectControls] = useAudio({
    src: '/incorrect.wav',
  });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const [challenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      challenge => !challenge.completed,
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [status, setStatus] = useState<'none' | 'correct' | 'wrong'>('none');

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex(current => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find(option => option.correct);

    if (!correctOption) return;
    if (correctOption?.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then(response => {
            if (response?.error === 'hearts') {
              openHeartsModal();
              return;
            }
            setStatus('correct');
            correctControls.play();
            setPercentage(prev => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts(prev => Math.min(prev + 1, 5));
            }
          })
          .catch(() => {
            toast.error(t('quiz.somethingWentWrong'));
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id, locale)
          .then(response => {
            if (response?.error === 'hearts') {
              openHeartsModal();
              return;
            }

            setStatus('wrong');
            incorrectControls.play();
            if (!response?.error) {
              setHearts(prev => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error(t('quiz.somethingWentWrong')));
      });
    }
  };

  const onSelect = (id: number) => {
    if (status !== 'none') return;
    setSelectedOption(id);
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/donkey/winner.png"
            alt="finish"
            className="block"
            height={200}
            width={200}
          />
          <h1 className="tex-xl lg:text-3xl font-bold text-neutral-700">
            {t('quiz.greatJob')} <br /> {t('quiz.completedLesson')}
          </h1>
          <div className="flex items-stretch gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push(`/${locale}/learn`)}
        />
      </>
    );
  }

  const title =
    challenge.type === 'ASSIST'
      ? t('quiz.selectCorrectMeaning')
      : locale === 'pl'
        ? challenge.questionPl
        : challenge.questionEn;
  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            {challenge.type !== 'LISTEN' && (
              <h1 className="text-lg lg:text-3xl text-center font-bold text-gray-800 leading-tight">
                {title}
              </h1>
            )}
            <div>
              {challenge.type === 'ASSIST' && (
                <QuestionBubble
                  question={
                    locale === 'pl'
                      ? challenge.questionPl
                      : challenge.questionEn
                  }
                />
              )}
              {challenge.type === 'LISTEN' && (
                <QuestionBubble
                  question={t('questionBubble.listenInstruction')}
                  audioSrc={
                    targetLanguage === 'pl'
                      ? challenge.audioSrcPl
                      : targetLanguage === 'jp'
                        ? challenge.audioSrcJp
                        : challenge.audioSrcEn
                  }
                />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
