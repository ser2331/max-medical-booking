// компонент для карточки ЛПУ
import React, { memo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { ILpus } from '@/api/services/lpus-controller/lpus-controller.types.ts';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { CheckCardDescription, CheckCardName, Flex } from '@/components/ui/StyledComponents.tsx';

const LpuCard = styled(Flex).attrs({ $align: 'center' })`
  &:nth-child(1) {
    margin-top: 16px;
  }
  &:not(&:nth-last-child(1)) {
    border-bottom: 1px solid ${props => props.theme.colors.grey1};
    padding-bottom: ${props => props.theme.spacing.md};
  }
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.grey2};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  font-size: ${props => props.theme.typography.fontSize.md};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.grey2};
    text-decoration: underline;
  }
`;

// Функция для форматирования телефона
const formatPhoneForLink = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('8') && cleaned.length === 11) {
    return `+7${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  return `+${cleaned}`;
};

// Функция для форматирования телефона для отображения
const formatPhoneForDisplay = (phone: string): string => {
  return phone;
};
export const LpuCardItem = memo(
  ({
    lpu,
    district,
    isSelected,
    onSelect,
  }: {
    lpu: ILpus;
    district: string;
    isSelected: boolean;
    onSelect: (lpuId: number, district: string) => void;
  }) => {
    const { register } = useFormContext();

    const handlePhoneClick = useCallback((phone: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const telLink = `tel:${formatPhoneForLink(phone)}`;
      window.open(telLink, '_self');
    }, []);

    const handleEmailClick = useCallback((email: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const mailtoLink = `mailto:${email}`;
      window.open(mailtoLink, '_self');
    }, []);

    const handleCardClick = useCallback(() => {
      onSelect(lpu.id, district);
    }, [lpu.id, district, onSelect]);

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
              onClick={e => handlePhoneClick(lpu.phone, e)}
            >
              {formatPhoneForDisplay(lpu.phone)}
            </ContactLink>
          )}
          {lpu.email && (
            <ContactLink href={`mailto:${lpu.email}`} onClick={e => handleEmailClick(lpu.email, e)}>
              {lpu.email}
            </ContactLink>
          )}
        </Flex>
      </LpuCard>
    );
  },
);

LpuCardItem.displayName = 'LpuCardItem';
