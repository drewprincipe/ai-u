import React from 'react';

// Clean ruled line underline
export const RuledUnderline = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <div className={`absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${className}`} 
       style={{ color }} />
);

// Notebook margin line
export const MarginLine = ({ className = "" }: { className?: string }) => (
  <div className={`absolute left-8 top-0 bottom-0 w-px bg-red-300/40 ${className}`} />
);

// Grid paper background pattern
export const GridPattern = ({ className = "" }: { className?: string }) => (
  <div 
    className={`absolute inset-0 opacity-5 ${className}`}
    style={{
      backgroundImage: `
        linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    }}
  />
);

// Ruled paper lines
export const RuledLines = ({ className = "" }: { className?: string }) => (
  <div 
    className={`absolute inset-0 opacity-5 ${className}`}
    style={{
      backgroundImage: `repeating-linear-gradient(
        transparent,
        transparent 23px,
        rgba(124, 58, 237, 0.1) 24px
      )`
    }}
  />
);

// Paper texture overlay
export const PaperTexture = ({ className = "" }: { className?: string }) => (
  <div 
    className={`absolute inset-0 pointer-events-none opacity-10 ${className}`}
    style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '10px 10px, 15px 15px'
    }}
  />
);

// Academic bracket
export const AcademicBracket = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -left-2 top-0 bottom-0 w-px bg-primary/30" />
    <div className="absolute -left-3 top-0 w-2 h-px bg-primary/30" />
    <div className="absolute -left-3 bottom-0 w-2 h-px bg-primary/30" />
    {children}
  </div>
);

// Clean notebook tab
export const NotebookTab = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`
    relative bg-background/80 backdrop-blur-sm border border-border/50 
    px-3 py-1 rounded-t-lg font-mono text-xs uppercase tracking-wider
    ${className}
  `}>
    {text}
    <div className="absolute -bottom-px left-0 right-0 h-px bg-background" />
  </div>
);

// Academic highlight box
export const HighlightBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`
    relative bg-accent/5 border-l-2 border-accent/30 pl-4 py-2
    before:absolute before:left-0 before:top-0 before:bottom-0 before:w-6 
    before:bg-gradient-to-r before:from-accent/10 before:to-transparent
    ${className}
  `}>
    {children}
  </div>
);