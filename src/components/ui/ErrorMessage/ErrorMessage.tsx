import styled from 'styled-components';
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { Flex, Section } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { CircleAlertIcon } from '@/assets/icons/CircleAlertIcon.tsx';

export const StyledErrorMessage = styled(Section)`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledMessage = styled('span')`
  width: 100%;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.fontSize.xxl};
`;
const StyledDescription = styled(StyledMessage)`
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const ErrorMessage: FC<{
  children?: ReactNode;
  hiddenBtn?: boolean;
  onTryAgain?: () => void;
}> = ({ children, hiddenBtn, onTryAgain }) => {
  const { hapticFeedback } = useMaxBridgeContext();
  const navigate = useNavigate();
  const handleClick = () => {
    hapticFeedback('impact', 'light').then(() => {
      if (onTryAgain) {
        return onTryAgain();
      }
      navigate('/');
    });
  };
  return (
    <StyledErrorMessage>
      <Flex $gap={12} $align={'flex-start'} style={{ width: '100%' }}>
        <CircleAlertIcon />
        <Flex $direction={'column'}>
          <StyledMessage>{children || 'Мы не смогли получить информацию с сервера'}</StyledMessage>
          <StyledDescription>Попробуйте повторить попытку позже</StyledDescription>
        </Flex>
      </Flex>
      {!hiddenBtn && (
        <CustomButton onClick={handleClick} variant={'outline-default'} style={{ width: '100%' }}>
          Попробовать еще раз
        </CustomButton>
      )}
    </StyledErrorMessage>
  );
};
