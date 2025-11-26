import React from 'react';

export const DatePickerArrowLeft = React.memo(
  ({ color = 'val(--widget-black)' }: { color?: string }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 18.0001L8 12.0001L14 6.00009L15.4 7.40009L10.8 12.0001L15.4 16.6001L14 18.0001Z"
          fill={color}
        />
      </svg>
    );
  },
);
