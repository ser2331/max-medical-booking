import React from 'react';

export const NavigationIcon = React.memo(({ color = 'var(--widget-blue)' }: { color?: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 18L14 10.5L6.5 3"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});
