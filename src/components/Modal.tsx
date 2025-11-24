import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { CloseIcon } from '@/assets/icons/CloseIcon.tsx';

const Overlay = styled(Flex).attrs({ $direction: 'column' })<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000040;
  z-index: 10000;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.xs};
`;

const ModalContainer = styled(Flex).attrs({
  $direction: 'column',
  $justifyContent: 'space-between',
})<{
  $isOpen: boolean;
  $size?: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  background: ${props => props.theme.colors.cardElemBackground};
  border-radius: ${props => props.theme.borderRadius.large};
  width: 100%;
  overflow: hidden;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  transition: all 0.3s ease;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
`;

const ModalHeader = styled(Flex).attrs({ $justifyContent: 'space-between' })<{
  $withBorder?: boolean;
  $show?: boolean;
}>`
  display: ${props => (props.$show ? 'block' : 'none')};
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

const CloseButton = styled(CustomButton).attrs({
  round: true,
  variant: 'outline-default',
  size: 'small',
})``;
const CloseButtonWrapper = styled(Flex).attrs({ $justifyContent: 'flex-end' })`
  top: -8px;
  width: 100%;
  position: relative;
`;

const ModalContent = styled.div<{ $padding?: boolean }>`
  flex: 1;
  overflow-y: auto;
  width: 100%;
`;

const ModalFooter = styled(Flex).attrs({ $justifyContent: 'flex-end' })<{ $withBorder?: boolean }>`
  width: 100%;
  gap: ${props => props.theme.spacing.xsm};
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
  headerBorder = false,
  footerBorder = false,
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
      {showCloseButton && (
        <CloseButtonWrapper>
          <CloseButton round={true} variant={'outline-default'} onClick={onClose}>
            <CloseIcon color={'var(--widget-blue)'} />
          </CloseButton>
        </CloseButtonWrapper>
      )}
      <ModalContainer $isOpen={isOpen} $size={size}>
        {/* Header */}
        {(title || header || showCloseButton) && (
          <ModalHeader $withBorder={headerBorder}>
            <ModalTitle>{title}</ModalTitle>
            {header}
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
