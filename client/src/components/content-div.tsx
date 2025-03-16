import React from 'react';

interface ContentDivProps {
  children: React.ReactNode;
  className?: string;
  childrenClass?: string;
}

const ContentDiv: React.FC<ContentDivProps> = ({children, className = "", childrenClass=""}) => {
  return (
    <div className={className}>
      <div className="trapezoid-top-border bg-secondary">
        <div className="trapezoid-top bg-white">
        </div>
      </div>
      <div className="bg-white border border-top-0 border-bottom-0 border-left border-right border-secondary">
        <div className={childrenClass}>
          {children}
        </div>
      </div>
      <div className="trapezoid-border bg-secondary">
        <div className="trapezoid bg-white">
        </div>
      </div>
    </div>
  );
}

export default ContentDiv;

