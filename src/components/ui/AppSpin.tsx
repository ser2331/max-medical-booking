import styled from 'styled-components';
import { AppLoader } from '@/components/ui/AppLoader.tsx';
export const Flex = styled('div')<{
  $direction?: 'row' | 'column';
  $align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  $justifyContent?: 'space-between' | 'space-around' | 'flex-start' | 'flex-end';
  $gap?: number;
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  align-items: ${props => props.$align || 'center'};
  justify-content: ${props => props.$justifyContent || 'center'};
  gap: ${props => (props.$gap || 0) + 'px'};
`;

// Контейнер
const SpinContainer = styled(Flex)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
`;

export const AppSpin = () => {
  return (
    <SpinContainer className="spin-container">
      <AppLoader size={'small'} />
    </SpinContainer>
  );
};
