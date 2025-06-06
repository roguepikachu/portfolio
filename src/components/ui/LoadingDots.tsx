import React from 'react';

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ className = '', size = 'md' }: LoadingDotsProps) {
  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }[size];

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      <div className={`${dotSize} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
      <div className={`${dotSize} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
      <div className={`${dotSize} bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce`}></div>
    </div>
  );
} 