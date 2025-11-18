import styled, { css } from 'styled-components';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ReactNode } from 'react';

// Styled компоненты для кнопки
const ButtonContainer = styled.button<{
  $disabled?: boolean;
  $loading?: boolean;
  $size?: 'small' | 'normal';
  $variant?:
    | 'primary'
    | 'outline-primary'
    | 'default'
    | 'outline-default'
    | 'danger'
    | 'danger-outline'
    | 'danger-outline-canceled'
    | 'outline-primary-finished';
  $round?: boolean;
  $withoutBorder?: boolean;
  $noPaddingMobile?: boolean;
}>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: ${props => (props.$disabled || props.$loading ? 'default' : 'pointer')};
  border-radius: ${props => props.theme.components.button.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: all 0.2s ease;
  opacity: ${props => (props.$disabled ? 0.5 : 1)};

  /* Размеры */
  ${props =>
    props.$size === 'small' &&
    css`
      font-size: ${props.theme.typography.fontSize.sm};
      padding: ${props.theme.spacing.xs} ${props.theme.spacing.sm};
    `}

  /* Round кнопки */
  ${props =>
    props.$round &&
    css`
      border-radius: 50%;
      width: 34px;
      min-width: 34px;
      height: 34px;
      padding: 0;

      ${props.$size === 'small' &&
      css`
        width: 26px;
        min-width: 26px;
        height: 26px;
      `}
    `}

  /* Без границы */
  ${props =>
    props.$withoutBorder &&
    css`
      border: none;
    `}

  /* Без паддинга на мобильных */
  ${props =>
    props.$noPaddingMobile &&
    css`
      @media (max-width: ${props.theme.breakpoints.md}) {
        padding: 0;
      }
    `}

  /* Варианты кнопок */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return css`
          color: ${props.theme.colors.white};
          background-color: ${props.theme.colors.blue};
          border: 1px solid ${props.theme.colors.blue};

          &:hover {
            background-color: ${props.theme.colors.blueHover};
            border-color: ${props.theme.colors.blueHover};
          }
        `;

      case 'outline-primary':
        return css`
          color: ${props.theme.colors.black};
          background-color: transparent;
          border: 1px solid transparent;

          &:hover {
            background-color: ${props.theme.colors.white};
            color: ${props.theme.colors.black};
          }
        `;

      case 'danger':
        return css`
          color: ${props.theme.colors.white};
          border: 1px solid ${props.theme.colors.red};
          background: ${props.theme.colors.red};

          &:hover {
            background: ${props.theme.colors.redExtra};
            border-color: ${props.theme.colors.redExtra};
          }
        `;

      case 'danger-outline':
        return css`
          color: ${props.theme.colors.red};
          border: 1px solid ${props.theme.colors.red};
          background: transparent;

          &:hover {
            color: ${props.theme.colors.redExtra};
          }
        `;

      case 'danger-outline-canceled':
        return css`
          color: ${props.theme.colors.statusCanceled};
          border: 1px solid ${props.theme.colors.statusCanceled};
          background: ${props.theme.colors.white};

          &:hover {
            background-color: ${props.theme.colors.redLight};
          }
        `;

      case 'outline-primary-finished':
        return css`
          color: ${props.theme.colors.statusFinished};
          border: 1px solid ${props.theme.colors.statusFinished};
          background: ${props.theme.colors.white};

          &:hover {
            background-color: ${props.theme.colors.blueLight};
          }
        `;

      case 'default':
        return css`
          color: ${props.theme.colors.blue};
          background-color: transparent;
          border: 1px solid transparent;

          &:hover {
            color: ${props.theme.colors.blueHover};
          }
        `;

      case 'outline-default':
        return css`
          color: ${props.theme.colors.blue};
          background-color: ${props.theme.colors.white};
          border: 1px solid ${props.theme.colors.blue};

          &:hover {
            color: ${props.theme.colors.blueHover};
            background-color: ${props.theme.colors.blueLight};
            border-color: ${props.theme.colors.blueHover};
          }
        `;

      default:
        return css`
          color: ${props.theme.colors.blue};
          background-color: ${props.theme.colors.white};
          border: 1px solid ${props.theme.colors.grey3};
        `;
    }
  }}

  /* Отключение hover для disabled/loading */
  ${props =>
    (props.$disabled || props.$loading) &&
    css`
      &:hover {
        transform: none !important;
        box-shadow: none !important;
      }
    `}
`;

interface CustomButtonProps {
  onClick?: (event?: never) => void;
  className?: string;
  style?: { width?: string; height?: string };
  loading?: boolean;
  disabled?: boolean;
  blackLoader?: boolean;
  customColorLoader?: string;
  sizeLoader?: string;
  children: string | ReactNode;
  onlyLoader?: boolean;
  hintText?: string;
  variant?:
    | 'primary'
    | 'outline-primary'
    | 'default'
    | 'outline-default'
    | 'danger'
    | 'danger-outline'
    | 'danger-outline-canceled'
    | 'outline-primary-finished';
  size?: 'small' | 'normal';
  round?: boolean;
  type?: 'button' | 'submit';
  withoutBorder?: boolean;
  noPaddingMobile?: boolean;
}

export const CustomButton = (props: CustomButtonProps) => {
  const handleClick = (event: any) => {
    if (!props.disabled && !props.loading && props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <>
      <ButtonContainer
        onClick={handleClick}
        className={props.className}
        style={props.style}
        type={props.type || 'button'}
        $disabled={props.disabled}
        $loading={props.loading}
        $variant={props.variant}
        $size={props.size}
        $round={props.round}
        $withoutBorder={props.withoutBorder}
        $noPaddingMobile={props.noPaddingMobile}
      >
        {props.loading && (
          <>
            <AppSpin
              text=""
              white={!props.blackLoader}
              customColor={props.customColorLoader}
              size={props.sizeLoader}
            />
            {!props.onlyLoader && ' '}
          </>
        )}
        {props.onlyLoader && props.loading ? <></> : props.children}
      </ButtonContainer>
    </>
  );
};

// Дополнительный компонент для контейнера кнопок
export const ButtonContainerGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

// Компонент для кнопки возврата
export const ReturnBackButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  width: fit-content;
  background: none;
  border: none;
  color: ${props => props.theme.colors.blue};
  padding: 0;

  span {
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin-right: ${props => props.theme.spacing.sm};
    width: 10px;
  }

  &:hover {
    color: ${props => props.theme.colors.blueHover};
  }
`;
