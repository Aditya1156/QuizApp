import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 3h12v2H6zm1 3h10a1 1 0 011 1v4c0 2.76-2.24 5-5 5s-5-2.24-5-5V7a1 1 0 011-1zm6 10.93V20h3v2H8v-2h3v-3.07c-2.83-.49-5-2.94-5-5.93V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v4c0 2.99-2.17 5.44-5 5.93z"/>
    <path d="M19 7h2v2c0 1.66-1.34 3-3 3v-2c1.1 0 2-.9 2-2V7zM3 7h2v2c0 .55.45 1 1 1v2c-1.66 0-3-1.34-3-3V7z"/>
  </svg>
);

