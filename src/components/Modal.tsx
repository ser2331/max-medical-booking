import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContainer = styled.div<{ $isOpen: boolean; $size?: 'sm' | 'md' | 'lg' }>`
  background: ${props => props.theme.colors.cardElemBackground};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.large};
  width: 100%;
  max-width: ${props => {
    switch (props.$size) {
      case 'sm':
        return '400px';
      case 'lg':
        return '800px';
      default:
        return '600px';
    }
  }};
  max-height: 90vh;
  overflow: hidden;
  transform: ${props =>
    props.$isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-20px)'};
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div<{ $withBorder?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.lg};
  border-bottom: ${props =>
    props.$withBorder ? `1px solid ${props.theme.colors.formBlockBorder}` : 'none'};
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: 1.2;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: ${props => props.theme.colors.grey1};
  color: ${props => props.theme.colors.grey2};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.lg};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${props => props.theme.colors.grey3};
    color: ${props => props.theme.colors.black};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ModalContent = styled.div<{ $padding?: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${props => (props.$padding ? props.theme.spacing.lg : '0')};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => (props.$padding ? props.theme.spacing.md : '0')};
  }
`;

const ModalFooter = styled.div<{ $withBorder?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.lg};
  border-top: ${props =>
    props.$withBorder ? `1px solid ${props.theme.colors.formBlockBorder}` : 'none'};
  flex-shrink: 0;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  contentPadding?: boolean;
  headerBorder?: boolean;
  footerBorder?: boolean;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
  header,
  contentPadding = true,
  headerBorder = true,
  footerBorder = true,
  className,
}) => {
  // Блокировка скролла body при открытой модалке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Рендерим в portal для правильного позиционирования
  return createPortal(
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick} className={className}>
      <ModalContainer $isOpen={isOpen} $size={size}>
        {/* Header */}
        {(title || header || showCloseButton) && (
          <ModalHeader $withBorder={headerBorder}>
            <ModalTitle>{title}</ModalTitle>
            {header}
            {showCloseButton && (
              <CloseButton onClick={onClose} title="Закрыть">
                ×
              </CloseButton>
            )}
          </ModalHeader>
        )}

        {/* Content */}
        <ModalContent $padding={contentPadding}>{children}</ModalContent>

        {/* Footer */}
        {footer && <ModalFooter $withBorder={footerBorder}>{footer}</ModalFooter>}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
};
