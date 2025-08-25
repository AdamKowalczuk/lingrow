import { Loader } from 'lucide-react';
import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      className={`h-full w-full flex items-center justify-center ${className}`}
    >
      <Loader
        className={`${sizeClasses[size]} text-muted-foreground animate-spin`}
      />
    </div>
  );
};

export default Loading;
