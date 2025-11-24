import styled from 'styled-components';
import { FC, ReactNode } from 'react';

import { Flex, Section } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { CircleAlertIcon } from '@/assets/icons/CircleAlertIcon.tsx';
import { useNavigate } from 'react-router-dom';

export const StyledErrorMessage = styled(Section)`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledMessage = styled('span')`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.fontSize.xxl};
`;
const StyledDescription = styled(StyledMessage)`
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const ErrorMessage: FC<{ children?: ReactNode; hiddenBtn?: boolean }> = ({
  children,
  hiddenBtn,
}) => {
  const navigate = useNavigate();
  return (
    <StyledErrorMessage>
      <Flex $gap={12} style={{ width: '100%' }}>
        <CircleAlertIcon />
        <StyledMessage>{children || 'Мы не смогли получить информацию с сервера'}</StyledMessage>
      </Flex>
      <StyledDescription>Попробуйте повторить попытку позже</StyledDescription>
      {!hiddenBtn && (
        <CustomButton onClick={() => navigate('/')} variant={'primary'} style={{ width: '100%' }}>
          На главную
        </CustomButton>
      )}
    </StyledErrorMessage>
  );
};
