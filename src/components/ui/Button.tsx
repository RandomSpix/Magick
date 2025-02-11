import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-lg transition-all duration-200',
        {
          'bg-gradient-to-r from-purple-400 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-600': variant === 'primary',
          'bg-white/10 backdrop-blur-sm text-gray-800 hover:bg-white/20': variant === 'secondary',
          'hover:bg-gray-100 text-gray-700': variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};