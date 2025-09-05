import React from 'react';

// Hand-drawn arrow pointing right
export const DoodleArrow = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2 10 C20 8, 40 12, 60 9 C70 8, 80 11, 92 10 M85 5 C88 8, 91 9, 94 10 C91 11, 88 12, 85 15" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="draw-animation"
      fill="none"
    />
  </svg>
);

// Hand-drawn underline
export const DoodleUnderline = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={`absolute -bottom-2 left-0 w-full ${className}`} 
    viewBox="0 0 200 10" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 6 C30 4, 60 8, 90 5 C120 7, 150 3, 190 6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      className="draw-animation"
    />
  </svg>
);

// Hand-drawn star
export const DoodleStar = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2 L14 8 L20 8 L16 12 L18 18 L12 15 L6 18 L8 12 L4 8 L10 8 Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
      className="wiggle"
    />
  </svg>
);

// Hand-drawn circle
export const DoodleCircle = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20 50 C20 25, 35 15, 50 20 C65 15, 80 25, 80 50 C80 75, 65 85, 50 80 C35 85, 20 75, 20 50" 
      stroke={color} 
      strokeWidth="3" 
      strokeLinecap="round"
      fill="none"
      className="bounce-soft"
    />
  </svg>
);

// Educational doodles
export const BookDoodle = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 40 30" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 25 L5 8 C5 6, 7 5, 10 5 L18 5 C19 5, 20 6, 20 7 L20 23 C20 24, 19 25, 18 25 L10 25 C7 25, 5 24, 5 25 Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M20 7 C20 6, 21 5, 22 5 L30 5 C33 5, 35 6, 35 8 L35 25 C35 24, 33 25, 30 25 L22 25 C21 25, 20 24, 20 23" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <line 
      x1="20" y1="7" 
      x2="20" y2="23" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const LightbulbDoodle = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 30 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M15 5 C20 5, 23 9, 23 14 C23 18, 21 20, 19 22 L19 26 L11 26 L11 22 C9 20, 7 18, 7 14 C7 9, 10 5, 15 5 Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
      className="bounce-soft"
    />
    <line x1="11" y1="30" x2="19" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="13" y1="34" x2="17" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 8 L6 6 M22 8 L24 6 M15 2 L15 0 M4 14 L2 14 M26 14 L28 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const PencilDoodle = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M32 8 L36 4 C37 3, 38 4, 37 5 L33 9 M32 8 L12 28 L4 36 L12 28' L32 8 Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
      className="wiggle"
    />
    <path d="M28 12 L32 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 28 L8 32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);