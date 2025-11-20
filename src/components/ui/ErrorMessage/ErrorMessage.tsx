import styled from 'styled-components';
import { FC, ReactNode } from 'react';

import { Flex, Section } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { CircleAlertIcon } from '@/assets/icons/CircleAlertIcon.tsx';

export const StyledErrorMessage = styled(Section)`
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ErrorMessage: FC<{ children?: ReactNode; hiddenBtn?: boolean }> = ({
  children,
  hiddenBtn,
}) => {
  return (
    <StyledErrorMessage>
      {children || null}
      <Flex $justifyContent={'space-between'} style={{ width: '100%' }}>
        <CircleAlertIcon />
        <span>Мы не смогли получить информацию с сервера</span>
      </Flex>
      <span>Попробуйте повторить попытку позже</span>
      {!hiddenBtn && (
        <CustomButton variant={'primary'} style={{ width: '100%' }}>
          На главную
        </CustomButton>
      )}
    </StyledErrorMessage>
  );
};
