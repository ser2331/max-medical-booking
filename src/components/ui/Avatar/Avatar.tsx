// Обновленный Avatar компонент
import React, { useState } from 'react';
import styled from 'styled-components';
import { UserIcon } from '@/assets/icons/UserIcon.tsx';

const AvatarContainer = styled.div<{
  $size: 'small' | 'medium' | 'large' | 'xlarge';
  $shape: 'circle' | 'square';
  $border?: boolean;
  $iconWidth?: number;
  $iconHeight?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.blueLight};
  color: ${props => props.theme.colors.black};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  overflow: hidden;

  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          width: 32px;
          height: 32px;
          font-size: ${props.theme.typography.fontSize.sm};
        `;
      case 'medium':
        return `
          width: 48px;
          height: 48px;
          font-size: ${props.theme.typography.fontSize.md};
        `;
      case 'large':
        return `
          width: 75px;
          height: 75px;
          font-size: ${props.theme.typography.fontSize.lg};
        `;
      case 'xlarge':
        return `
          width: 100px;
          height: 100px;
          font-size: ${props.theme.typography.fontSize.xl};
        `;
      default:
        return `
          width: 48px;
          height: 48px;
          font-size: ${props.theme.typography.fontSize.md};
        `;
    }
  }}

  ${props => (props.$shape === 'circle' ? 'border-radius: 50%;' : 'border-radius: 8px;')}

  ${props =>
    props.$border &&
    `
    border: 2px solid ${props.theme.colors.mainBackgroundColor};
    box-shadow: ${props.theme.shadows.small};
  `}

  img, svg {
    width: 100%;
    height: 100%;
    object-fit: cover;

    ${props => {
      if (props.$iconWidth && props.$iconHeight) {
        return `
          width: ${props.$iconWidth}px;
          height: ${props.$iconHeight}px;
        `;
      }
    }}
  }
`;

export interface AvatarProps {
  src?: string;
  icon?: React.ComponentType<any>; // Добавляем поддержку React компонентов
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  border?: boolean;
  alt?: string;
  className?: string;
  onClick?: () => void;
  iconProps?: {
    width?: number;
    height?: number;
  }; // Дополнительные props для иконки
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  icon: IconComponent, // React компонент
  size = 'medium',
  shape = 'circle',
  border = false,
  alt = 'Avatar',
  className,
  onClick,
  iconProps,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AvatarContainer
      $size={size}
      $shape={shape}
      $border={border}
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      aria-label={alt}
      $iconWidth={!src || imageError || IconComponent ? iconProps?.width : undefined}
      $iconHeight={!src || imageError || IconComponent ? iconProps?.height : undefined}
    >
      {/* Приоритет: иконка > изображение > fallback */}
      {IconComponent ? (
        <IconComponent {...iconProps} />
      ) : src && !imageError ? (
        <img src={src} alt={alt} onError={handleImageError} loading="lazy" />
      ) : (
        <UserIcon />
      )}
    </AvatarContainer>
  );
};
