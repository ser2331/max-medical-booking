import React from 'react';

export const CheckIcon = React.memo(({ color = 'var(--widget-white)' }: { color?: string }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3336 4.66638L6.66695 11.333L3.33362 7.99971"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
