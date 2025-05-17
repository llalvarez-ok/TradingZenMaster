import React from 'react';

interface ClipboardCheckIconProps {
  className?: string;
}

const ClipboardCheckIcon: React.FC<ClipboardCheckIconProps> = ({ className }) => {
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
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
      <rect x="9" y="3" width="6" height="4" rx="2"></rect>
      <path d="m9 14 2 2 4-4"></path>
    </svg>
  );
};

export default ClipboardCheckIcon;
