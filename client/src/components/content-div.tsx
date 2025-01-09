import React from 'react';

const ContentDiv: React.FC = ({children, className = "", childrenClass=""}) => {
  return (
    <div class={className}>
      <div class="trapezoid-top-border bg-secondary">
        <div class="trapezoid-top bg-white">
        </div>
      </div>
      <div class="bg-white border border-top-0 border-bottom-0 border-left border-right border-secondary">
        <div class={childrenClass}>
          {children}
        </div>
      </div>
      <div class="trapezoid-border bg-secondary">
        <div class="trapezoid bg-white">
        </div>
      </div>
    </div>
  );
}

export default ContentDiv;

