import React, { useState } from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div<{
  $size: 'small' | 'medium' | 'large' | 'xlarge';
  $shape: 'circle' | 'square';
  $border?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
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

  /* Форма */
  ${props => (props.$shape === 'circle' ? 'border-radius: 50%;' : 'border-radius: 8px;')}
  
  /* Граница */
  ${props =>
    props.$border &&
    `
    border: 2px solid ${props.theme.colors.mainBackgroundColor};
    box-shadow: ${props.theme.shadows.small};
  `}
  
  /* Изображение */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export interface AvatarProps {
  src?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  border?: boolean;
  alt?: string;
  className?: string;
  onClick?: () => void;
  fallbackSrc?: string; // Дополнительная кастомная картинка для fallback
  showFallbackOnError?: boolean; // Показывать ли fallback при ошибке
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 'medium',
  shape = 'circle',
  border = false,
  alt = 'Avatar',
  className,
  onClick,
  fallbackSrc,
  showFallbackOnError = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleImageError = () => {
    if (fallbackSrc && showFallbackOnError) {
      setCurrentSrc(fallbackSrc);
      setImageError(false); // Сбрасываем ошибку для попытки загрузки fallback
    } else {
      setImageError(true);
    }
  };

  // Сбрасываем состояние при изменении src
  React.useEffect(() => {
    setCurrentSrc(src);
    setImageError(false);
  }, [src]);

  return (
    <AvatarContainer
      $size={size}
      $shape={shape}
      $border={border}
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      aria-label={alt}
    >
      {currentSrc && !imageError ? (
        <img src={currentSrc} alt={alt} onError={handleImageError} loading="lazy" />
      ) : // Показываем кастомную иконку или ничего
      fallbackSrc && showFallbackOnError ? (
        <img src={fallbackSrc} alt={alt} onError={() => setImageError(true)} />
      ) : null}
    </AvatarContainer>
  );
};
