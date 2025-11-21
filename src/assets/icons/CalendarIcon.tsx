import React from 'react';

export const CalendarIcon = React.memo(({ color = 'var(--widget-grey-3)' }: { color?: string }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.2222 2V4.22222M5.77778 2V4.22222M3 6.44444H13M4.11111 3.11111H11.8889C12.5025 3.11111 13 3.60857 13 4.22222V12C13 12.6136 12.5025 13.1111 11.8889 13.1111H4.11111C3.49746 13.1111 3 12.6136 3 12V4.22222C3 3.60857 3.49746 3.11111 4.11111 3.11111Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
