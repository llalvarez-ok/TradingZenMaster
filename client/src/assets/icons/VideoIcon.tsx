import React from 'react';

interface VideoIconProps {
  className?: string;
}

const VideoIcon: React.FC<VideoIconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className || "w-6 h-6"}
    >
      <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
      <path d="m22 8-4 4 4 4"></path>
    </svg>
  );
};

export default VideoIcon;
