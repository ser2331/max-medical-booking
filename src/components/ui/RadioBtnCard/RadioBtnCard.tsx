import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

import { CheckCardDescription, Flex, StatValue } from '@/components/ui/StyledComponents.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';

export const CheckCardName = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;
export const Wrapper = styled(Flex).attrs({
  $direction: 'column',
  $align: 'flex-start',
  $justifyContent: 'flex-start',
  $gap: 4,
})`
  width: 100%;
  flex: 1;
`;
interface RadioBtnCardProps {
  onClick: (id: string) => void;
  id: string;
  name: string;
  availableTop: { label: string; value: number };
  availableBottom: { label: string; value: number };
  checked: boolean;
  register: UseFormRegisterReturn;
}
export const RadioBtnCard: FC<RadioBtnCardProps> = ({
  onClick,
  id,
  name,
  availableTop,
  availableBottom,
  register,
  checked,
}) => {
  return (
    <Flex
      onClick={() => onClick(id)}
      $direction={'row'}
      $align={'center'}
      $justifyContent={'flex-start'}
      $gap={12}
      style={{ width: '100%' }}
    >
      <RadioButton value={id} register={register} checked={checked} onChange={() => onClick(id)} />
      <Wrapper>
        <CheckCardName>{name}</CheckCardName>

        <Wrapper>
          <CheckCardDescription>
            <span>{availableTop.label}: </span>
            <StatValue $available={!!availableTop.value}>{availableTop.value}</StatValue>
          </CheckCardDescription>
          <CheckCardDescription>
            <span>{availableBottom.label}: </span>
            <StatValue $available={!!availableBottom.value}>{availableBottom.value}</StatValue>
          </CheckCardDescription>
        </Wrapper>
      </Wrapper>
    </Flex>
  );
};
