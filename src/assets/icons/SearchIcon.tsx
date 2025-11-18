import React from 'react';

export const SearchIcon = React.memo(
  ({ color = 'var(--widget-grey-3)', size = 20 }: { color?: string; size?: number }) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 15L12.5833 12.5833M13.8889 9.44444C13.8889 11.899 11.899 13.8889 9.44444 13.8889C6.98985 13.8889 5 11.899 5 9.44444C5 6.98985 6.98985 5 9.44444 5C11.899 5 13.8889 6.98985 13.8889 9.44444Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);
