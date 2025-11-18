import React from 'react';

export const DatePickerArrowRight = React.memo(
  ({ color = '--widget-black' }: { color?: string }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6 12.0001L8 7.40009L9.4 6.00009L15.4 12.0001L9.4 18.0001L8 16.6001L12.6 12.0001Z"
          fill={color}
        />
      </svg>
    );
  },
);
