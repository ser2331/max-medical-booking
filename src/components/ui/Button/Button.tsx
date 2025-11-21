import styled, { css } from 'styled-components';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ReactNode, MouseEvent } from 'react';
import { media } from '@/assets/style/mixins.ts';

const BtnWrapper = styled.div`
  width: 100%;
  height: 40px;
  max-width: ${props => props.theme.breakpoints.xs};

  ${media.md} {
    max-width: 100%;
  }
  position: relative;
`;
const Background = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  position: absolute;
  border-radius: ${props => props.theme.components.button.borderRadius};
  background: white;
  width: 100%;
  height: 100%;
  border: none;
  max-width: ${props => props.theme.breakpoints.xs};
  ${media.md} {
    max-width: 100%;
  }
`;

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
  z-index: 99;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.components.button.borderRadius};
  cursor: ${props => (props.$disabled || props.$loading ? 'default' : 'pointer')};
  border-radius: ${props => props.theme.components.button.borderRadius};
  border: none !important;
  padding: ${props => `${props.theme.spacing.xsm} ${props.theme.spacing.md}`};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
  line-height: ${props => props.theme.typography.fontSize.xxl};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: all 0.2s ease;
  opacity: ${props => (props.$disabled ? 0.5 : 1)};
  max-width: ${props => props.theme.breakpoints.xs};
  ${media.md} {
    max-width: 100%;
  }
  /* Размеры */
  ${props =>
    props.$size === 'small' &&
    css`
      width: 24px;
      min-width: 24px;
      height: 24px;
      font-size: ${props.theme.typography.fontSize.sm};
      padding: 2px;
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
        width: 24px;
        min-width: 24px;
        height: 24px;
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
          //background-color: ${props.$disabled ? '#89BEE0' : props.theme.colors.blue};
          background-color: ${props => props.theme.colors.blue};
          outline: 1px solid ${props.$disabled ? 'none' : props.theme.colors.blue};
          // outline: 1px solid ${props => props.theme.colors.blue};
          color: ${props.$disabled ? '#C4DEEF' : props.theme.colors.white};

          &:hover {
            background-color: ${props.theme.colors.blueHover};
            outline-color: ${props.theme.colors.blueHover};
          }
        `;

      case 'outline-primary':
        return css`
          color: ${props.theme.colors.black};
          background-color: transparent;
          outline: 1px solid transparent;

          &:hover {
            background-color: ${props.theme.colors.white};
            color: ${props.theme.colors.black};
          }
        `;

      case 'danger':
        return css`
          color: ${props.theme.colors.white};
          outline: 1px solid ${props.theme.colors.red};
          background: ${props.theme.colors.red};

          &:hover {
            background: ${props.theme.colors.redExtra};
            outline-color: ${props.theme.colors.redExtra};
          }
        `;

      case 'danger-outline':
        return css`
          color: ${props.theme.colors.red};
          outline: 1px solid ${props.theme.colors.red};
          background: transparent;

          &:hover {
            color: ${props.theme.colors.redExtra};
          }
        `;

      case 'danger-outline-canceled':
        return css`
          color: ${props.theme.colors.statusCanceled};
          outline: 1px solid ${props.theme.colors.statusCanceled};
          background: ${props.theme.colors.white};

          &:hover {
            background-color: ${props.theme.colors.redLight};
          }
        `;

      case 'outline-primary-finished':
        return css`
          color: ${props.theme.colors.statusFinished};
          outline: 1px solid ${props.theme.colors.statusFinished};
          background: ${props.theme.colors.white};

          &:hover {
            background-color: ${props.theme.colors.blueLight};
          }
        `;

      case 'default':
        return css`
          color: ${props.theme.colors.blue};
          background-color: transparent;

          &:hover {
            color: ${props.theme.colors.blueHover};
          }
        `;

      case 'outline-default':
        return css`
          color: ${props.theme.colors.blue};
          background-color: ${props.theme.colors.white};
          outline: 1px solid ${props.theme.colors.blue};

          &:hover {
            color: ${props.theme.colors.blueHover};
            background-color: ${props.theme.colors.blueLight};
            outline-color: ${props.theme.colors.blueHover};
          }
        `;

      default:
        return css`
          color: ${props.theme.colors.blue};
          background-color: ${props.theme.colors.white};
          outline: 1px solid ${props.theme.colors.grey3};
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
  onClick?: (event?: MouseEvent | undefined) => void;
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
  const handleClick = (event: MouseEvent | undefined) => {
    if (!props.disabled && !props.loading && props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <BtnWrapper>
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
      <Background />
    </BtnWrapper>
  );
};
