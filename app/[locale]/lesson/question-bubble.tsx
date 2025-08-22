import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  question: string;
};

const QuestionBubble = ({ question }: Props) => {
  const t = useTranslations('images');
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/mascot.svg"
        alt={t('mascot')}
        width={40}
        height={40}
        className="block"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"></div>
      </div>
    </div>
  );
};

export default QuestionBubble;
