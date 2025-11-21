import React from 'react';

export const TeleMedIcon = React.memo(({ color = 'var(--widget-blue)' }: { color?: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.75 16H12.25M4.3 4H15.7C16.1774 4 16.6352 4.18964 16.9728 4.52721C17.3104 4.86477 17.5 5.32261 17.5 5.8V11.95C17.5 12.1864 17.4534 12.4204 17.363 12.6388C17.2725 12.8572 17.1399 13.0556 16.9728 13.2228C16.8056 13.3899 16.6072 13.5225 16.3888 13.613C16.1704 13.7034 15.9364 13.75 15.7 13.75H4.3C4.06362 13.75 3.82956 13.7034 3.61117 13.613C3.39278 13.5225 3.19435 13.3899 3.02721 13.2228C2.86006 13.0556 2.72748 12.8572 2.63702 12.6388C2.54656 12.4204 2.5 12.1864 2.5 11.95V5.8C2.5 5.32261 2.68964 4.86477 3.02721 4.52721C3.36477 4.18964 3.82261 4 4.3 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0833 9.08264H9.99999M9.99999 9.08264H7.91666M9.99999 9.08264V6.73889M9.99999 9.08264V11.4264"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
