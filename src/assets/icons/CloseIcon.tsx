import React from 'react';

export const CloseIcon = React.memo(
  ({ size = 14, color = 'var(--widget-black-pure)' }: { size?: number; color?: string }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 14">
        <g fill="none" fillRule="evenodd" opacity=".38">
          <path d="M0 0H24V24H0z" transform="translate(-5 -5)" />
          <path
            className="cross-item"
            fill={color}
            fillRule="nonzero"
            d="M5.293 5.293c.39-.39 1.024-.39 1.414 0L12 10.585l5.293-5.292c.39-.39 1.024-.39 1.414 0 .36.36.388.928.083 1.32l-.083.094L13.415 12l5.292 5.293.083.094c.305.392.278.96-.083 1.32-.39.39-1.024.39-1.414 0L12 13.415l-5.293 5.292c-.39.39-1.024.39-1.414 0-.36-.36-.388-.928-.083-1.32l.083-.094L10.585 12 5.293 6.707l-.083-.094c-.305-.392-.278-.96.083-1.32z"
            transform="translate(-5 -5)"
          />
        </g>
      </svg>
    );
  },
);
