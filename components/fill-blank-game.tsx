'use client';

import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { useAudio } from 'react-use';

import { cn } from '@/lib/utils';

interface FillBlankOptionButtonProps {
  option: FillBlankOption;
  isSelected: boolean;
  isCorrect: boolean;
  status: 'correct' | 'wrong' | 'none';
  disabled: boolean;
  onSelect: (optionId: number) => void;
}

const FillBlankOptionButton: React.FC<FillBlankOptionButtonProps> = ({
  option,
  isSelected,
  isCorrect,
  status,
  disabled,
  onSelect,
}) => {
  const [audio, , controls] = useAudio({ src: option.audioSrc || '' });

  const handleClick = useCallback(() => {
    if (disabled || status !== 'none') return;

    controls.play();
    onSelect(option.id);
  }, [disabled, status, onSelect, option.id, controls]);

  return (
    <>
      {audio}
      <button
        onClick={handleClick}
        disabled={disabled || status !== 'none'}
        className={cn(
          'p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer',
          'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          !isSelected &&
            status === 'none' &&
            'border-gray-200 hover:border-indigo-300',
          isSelected && status === 'none' && 'border-indigo-400 bg-indigo-50',
          status === 'correct' && isSelected && 'border-green-500 bg-green-50',
          status === 'wrong' && isSelected && 'border-red-500 bg-red-50',
          status === 'correct' &&
            !isSelected &&
            isCorrect &&
            'border-green-500 bg-green-100',
          status !== 'none' && !isSelected && !isCorrect && 'opacity-50',
        )}
      >
        <div className="flex items-center gap-3">
          {option.imageSrc && (
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={option.imageSrc}
                alt={option.text}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span
            className={cn(
              'font-medium',
              status === 'correct' && isSelected && 'text-green-700',
              status === 'wrong' && isSelected && 'text-red-700',
              status === 'none' && isSelected && 'text-indigo-700',
              !isSelected && 'text-gray-700',
            )}
          >
            {option.text}
          </span>
        </div>
      </button>
    </>
  );
};

interface FillBlankOption {
  id: number;
  text: string;
  imageSrc?: string | null;
  audioSrc?: string | null;
}

interface FillBlankGameProps {
  text: string;
  blankPosition: number; // Position where the blank should be (0-based index)
  options: FillBlankOption[];
  correctAnswerId: number;
  onSelect: (optionId: number) => void;
  status: 'correct' | 'wrong' | 'none';
  disabled?: boolean;
}

const FillBlankGame: React.FC<FillBlankGameProps> = ({
  text,
  blankPosition,
  options,
  correctAnswerId,
  onSelect,
  status,
  disabled = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Reset state when text changes (new question)
  useEffect(() => {
    setSelectedOption(null);
  }, [text]);

  const handleOptionSelect = useCallback(
    (optionId: number) => {
      if (disabled || status !== 'none') return;

      setSelectedOption(optionId);
      onSelect(optionId);
    },
    [disabled, status, onSelect],
  );

  // Split text into parts around the blank
  const textParts = text.split(' ');
  const beforeBlank = textParts.slice(0, blankPosition).join(' ');
  const afterBlank = textParts.slice(blankPosition + 1).join(' ');

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Text with blank */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-lg leading-relaxed text-gray-800">
          {beforeBlank && <span>{beforeBlank} </span>}
          <span
            className={cn(
              'inline-block min-w-[120px] h-8 mx-1 relative border-b-2 border-dashed border-gray-400',
              status === 'correct' && 'border-green-500 bg-green-50',
              status === 'wrong' && 'border-red-500 bg-red-50',
            )}
          >
            {selectedOption && (
              <span
                className={cn(
                  'font-medium',
                  status === 'correct' && 'text-green-700',
                  status === 'wrong' && 'text-red-700',
                )}
              >
                {options.find(opt => opt.id === selectedOption)?.text}
              </span>
            )}
          </span>
          {afterBlank && <span> {afterBlank}</span>}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map(option => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.id === correctAnswerId;

          return (
            <FillBlankOptionButton
              key={option.id}
              option={option}
              isSelected={isSelected}
              isCorrect={isCorrect}
              status={status}
              disabled={disabled}
              onSelect={handleOptionSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FillBlankGame;
