import React from 'react';

interface AdBannerProps {
  size?: 'leaderboard' | 'banner' | 'rectangle' | 'skyscraper';
  className?: string;
}

const AdBanner = ({ size = 'leaderboard', className = '' }: AdBannerProps) => {
  const sizeClasses = {
    leaderboard: 'h-[90px] max-w-[728px]', // 728x90
    banner: 'h-[60px] max-w-[468px]', // 468x60
    rectangle: 'h-[250px] max-w-[300px]', // 300x250
    skyscraper: 'h-[600px] max-w-[160px]', // 160x600
  };

  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <div 
        className={`${sizeClasses[size]} w-full bg-muted/50 border border-dashed border-border rounded-lg flex items-center justify-center`}
        data-ad-slot={`ad-${size}`}
      >
        <div className="text-center text-muted-foreground text-sm">
          <p className="font-medium">Advertisement</p>
          <p className="text-xs opacity-70">Google Ad Space</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
