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

const LoaderWrapper = styled('div')`
  width: 120px;
  height: 120px;
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

export const AppLoader = () => {
  return (
    <StyledLoader>
      <LoaderWrapper>
        <LoaderIcon />
      </LoaderWrapper>
      <div className="tm-slider-text">Загрузка...</div>
    </StyledLoader>
  );
};
