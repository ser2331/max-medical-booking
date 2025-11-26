import styled from 'styled-components';
import { LoaderIcon } from '@/assets/icons/loader/LoaderIcon.tsx';

const StyledLoader = styled('div')`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .tm-slider-text {
    font-size: 14px;
    color: black;
    margin-top: 16px;
    font-weight: 500;
  }
`;

const LoaderWrapper = styled('div')<{ $size?: 'large' | 'small' }>`
  width: ${props =>
    props.$size === 'large' ? '120px' : props.$size === 'small' ? '40px' : '120px'};
  height: ${props =>
    props.$size === 'large' ? '120px' : props.$size === 'small' ? '40px' : '120px'};
  display: flex;
  align-items: center;
  justify-content: center;
  /* Адаптивность для очень маленьких экранов */
  @media (max-width: 320px) {
    width: 100px;
    height: 100px;
  }

  /* Для планшетов можно немного увеличить */
  @media (min-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

export const AppLoader = ({ size }: { size?: 'large' | 'small' }) => {
  return (
    <StyledLoader>
      <LoaderWrapper $size={size}>
        <LoaderIcon size={size} />
      </LoaderWrapper>
      <div className="tm-slider-text">Загрузка...</div>
    </StyledLoader>
  );
};
