import React from 'react';

export const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 1l2.4 7.2H22l-6 4.8 2.4 7.2L12 15l-6.4 5.2L8 13 2 8.2h7.6z"/>
    <path d="M19 2l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" opacity="0.6"/>
    <path d="M5 3l.5 1.5H7l-1.25 1 .5 1.5L5 6l-1.25 1 .5-1.5L3 5h1.5z" opacity="0.6"/>
  </svg>
);

