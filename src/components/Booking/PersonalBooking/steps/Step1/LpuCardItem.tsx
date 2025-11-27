// компонент для карточки ЛПУ
import { memo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ILpus } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.types.ts';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import {
  CheckCardDescription,
  CheckCardName,
  ContactLink,
  Flex,
} from '@/components/ui/StyledComponents.tsx';
import {
  formatPhoneForDisplay,
  formatPhoneForLink,
  handleEmailClick,
  handlePhoneClick,
} from '@/helpers/heplers.tsx';

const LpuCard = styled(Flex).attrs({ $align: 'center' })`
  &:nth-child(1) {
    margin-top: 16px;
  }
  &:not(&:nth-last-child(1)) {
    border-bottom: 1px solid ${props => props.theme.colors.grey1};
    padding-bottom: ${props => props.theme.spacing.md};
  }
`;

export const LpuCardItem = memo(
  ({
    lpu,
    isSelected,
    onSelect,
  }: {
    lpu: ILpus;
    district: string;
    isSelected: boolean;
    onSelect: (lpuId: ILpus) => void;
  }) => {
    const { hapticFeedback } = useMaxBridgeContext();
    const { register } = useFormContext();

    const handleCardClick = useCallback(() => {
      hapticFeedback('impact', 'light').then(() => {
        onSelect(lpu);
      });
    }, [lpu, onSelect, hapticFeedback]);

    return (
      <LpuCard $gap={12} key={lpu.id} onClick={handleCardClick}>
        <RadioButton
          value={lpu.id}
          checked={isSelected}
          onChange={handleCardClick}
          register={register('lpu', {
            required: 'Выберите медицинское учреждение',
          })}
        />
        <Flex $direction={'column'} $align={'flex-start'} $gap={4}>
          <CheckCardName>{lpu.lpuFullName}</CheckCardName>
          <CheckCardDescription>{lpu.address}</CheckCardDescription>
          {lpu.phone && (
            <ContactLink
              href={`tel:${formatPhoneForLink(lpu.phone)}`}
              onClick={e => handlePhoneClick(e, lpu.phone)}
            >
              {formatPhoneForDisplay(lpu.phone)}
            </ContactLink>
          )}
          {lpu.email && (
            <ContactLink href={`mailto:${lpu.email}`} onClick={e => handleEmailClick(e, lpu.email)}>
              {lpu.email}
            </ContactLink>
          )}
        </Flex>
      </LpuCard>
    );
  },
);

LpuCardItem.displayName = 'LpuCardItem';
