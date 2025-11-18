import styled, { keyframes } from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';

// Анимация вращения
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Контейнер
const SpinContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 0.5rem;
`;

const SpinCircle = styled.div<{
  $invert?: boolean;
  $white?: boolean;
  $customColor?: string;
  $size?: string;
}>`
  border-radius: 50%;
  width: ${props => props.$size || '1em'};
  height: ${props => props.$size || '1em'};
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.35em solid rgba(220, 220, 220, 0.5);
  border-right: 0.35em solid rgba(220, 220, 220, 0.5);
  border-bottom: 0.35em solid rgba(220, 220, 220, 0.5);
  border-left: 0.35em solid
    ${props => {
      if (props.$customColor) return props.$customColor;
      if (props.$invert || props.$white) return '#fff';
      return 'var(--widget-blue)';
    }};
  transform: translateZ(0);
  animation: ${spinAnimation} 1.1s infinite linear;
`;

export const AppSpin = ({
  text = 'Загрузка…',
  invert = false,
  white = false,
  customColor,
  size,
}: {
  text?: string;
  invert?: boolean;
  white?: boolean;
  customColor?: string;
  size?: string;
}) => {
  return (
    <SpinContainer className="spin-container">
      <SpinCircle
        $invert={invert}
        $white={white}
        $customColor={customColor}
        $size={size}
        className={`spin-circle ${invert ? 'spin-circle_invert' : ''} ${white ? 'spin-circle_white' : ''}`}
      />
      {text}
    </SpinContainer>
  );
};
