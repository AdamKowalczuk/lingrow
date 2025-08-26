'use client';

import { Pause, Play, Volume2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  src: string;
  className?: string;
  showControls?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  className = '',
  showControls = true,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlayPause}
        className="h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white shadow-lg"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-gray-600" />
        ) : (
          <Play className="h-4 w-4 text-gray-600" />
        )}
      </Button>

      {showControls && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Volume2 className="h-4 w-4" />
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
