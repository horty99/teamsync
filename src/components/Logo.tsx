import React from 'react';
import { Users } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size]} bg-primary-600 rounded-xl flex items-center justify-center`}>
        <Users className={`${variant === 'light' ? 'text-white' : 'text-white'} ${size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'}`} />
      </div>
      <span className={`font-bold text-xl ${variant === 'light' ? 'text-white' : 'text-gray-900'}`}>
        TeamSync
      </span>
    </div>
  );
};

export default Logo;