import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useAudio } from 'react-use';

type Props = {
  question: string;
  audioSrc?: string | null;
};

const QuestionBubble = ({ question, audioSrc }: Props) => {
  const t = useTranslations('lesson.questionBubble');
  const [audio, , controls] = useAudio({ src: audioSrc || '' });

  const handlePlayAudio = () => {
    if (audioSrc) {
      controls.play();
    }
  };

  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/donkey/question.png"
        alt="Question"
        width={100}
        height={100}
        className="block"
      />
      <div className="relative py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm lg:text-base shadow-sm">
        {audio}
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">{question}</span>
          {audioSrc && (
            <button
              onClick={handlePlayAudio}
              className="ml-2 p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors shadow-sm"
              title={t('playAudio')}
            >
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.794a1 1 0 011.617.794zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-200 transform -translate-y-1/2 rotate-90"></div>
      </div>
    </div>
  );
};

export default QuestionBubble;
