import React from 'react';
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
          width: 64px;
          height: 64px;
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

const AvatarText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
`;

export interface AvatarProps {
  src?: string;
  text?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  border?: boolean;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  text,
  size = 'medium',
  shape = 'circle',
  border = false,
  alt = 'Avatar',
  className,
  onClick,
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayText = text ? getInitials(text) : '?';

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
      {src ? <img src={src} alt={alt} /> : <AvatarText>{displayText}</AvatarText>}
    </AvatarContainer>
  );
};
