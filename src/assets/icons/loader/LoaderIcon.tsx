import React from 'react';

const FullLinePath =
  'M10.832 80.6894H66.9799L73.6068 111.249L83.1794 51.4199L89.4384 130.394L103.061 80.6894H171.174';

export const LoaderIcon = React.memo(({ size = 'large' }: { size?: 'large' | 'small' }) => {
  const width = size === 'large' ? '102' : size === 'small' ? '30' : '102';
  const height = size === 'large' ? '163' : size === 'small' ? '30' : '163';
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 182 163"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Группа для всего сердца с пульсацией */}
      <g>
        <animate
          attributeName="transform"
          attributeType="XML"
          type="scale"
          values="1;1.03;1"
          dur="1.2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />

        {/* Основная форма */}
        <path
          d="M169.014 15.7829C154.827 0.445871 119.065 -5.96411 89.1319 14.4323C59.4055 -5.96716 27.1739 0.446684 12.9858 15.7843C-3.54476 33.6543 -2.43617 64.3813 12.9858 91.7268C25.0471 113.113 60.7519 142.431 75.7404 154.193C80.0896 157.606 85.472 159.383 91.0004 159.383C96.5288 159.383 101.91 157.605 106.26 154.192C121.248 142.43 156.953 113.112 169.014 91.7253C184.436 64.3798 185.545 33.6528 169.014 15.7829Z"
          fill="var(--widget-blue)"
        >
          {/* Пульсация яркости */}
          <animate
            attributeName="fill"
            values="var(--widget-blue);#1a94e0;var(--widget-blue)"
            dur="1.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </path>

        {/* Контур с анимацией рисования */}
        <path
          d="M86.433 16.3568C116.882 -6.34364 154.398 -0.0179437 169.014 15.7829C185.545 33.6528 184.436 64.3798 169.014 91.7253C156.953 113.112 121.248 142.43 106.26 154.192C101.91 157.605 96.5288 159.383 91.0004 159.383C85.472 159.383 80.0896 157.606 75.7405 154.193C60.7519 142.431 25.0471 113.113 12.9858 91.7268C-2.43617 64.3813 -3.54476 33.6543 12.9858 15.7843C27.6023 -0.01645 61.3684 -6.34637 91.8173 16.3541"
          stroke="var(--widget-blue)"
          strokeWidth="2"
          fill="none"
        />

        {/* Круг с плюсиком */}
        <circle
          cx="143.603"
          cy="135.938"
          r="24.5107"
          fill="#BADCF4"
          stroke="#BADCF4"
          strokeWidth="4"
        />
        <path
          d="M149.251 123.338V131.437H157.208V142.592H149.11V150.549H137.955V142.45H129.997V131.295H138.096V123.338H149.251Z"
          stroke="var(--widget-blue)"
          strokeWidth="3"
        />
      </g>

      {/* Плавно рисующаяся линия (вне группы, чтобы не пульсировала) */}
      <path
        d={FullLinePath}
        stroke="#EEEEEE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="1000;0"
          dur="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.25 0.25 0.25 0.25"
        />
      </path>

      {/* Невидимый path для анимации движения */}
      <path id="linePath" d={FullLinePath} fill="none" visibility="hidden" />
    </svg>
  );
});
