import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { useGetLpusQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import { CheckCardDescription, CheckCardName, Flex } from '@/components/ui/StyledComponents.tsx';
import { Accordion } from '@/components/ui/Accordion/Accordion.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';

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
  // Убираем все нецифровые символы
  const cleaned = phone.replace(/\D/g, '');

  // Если номер начинается с 8, заменяем на +7
  if (cleaned.startsWith('8') && cleaned.length === 11) {
    return `+7${cleaned.slice(1)}`;
  }

  // Если номер уже в международном формате
  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return `+${cleaned}`;
  }

  return `+${cleaned}`;
};

// Функция для форматирования телефона для отображения
const formatPhoneForDisplay = (phone: string): string => {
  // Просто возвращаем исходный номер, так как он уже должен быть отформатирован с бэкенда
  return phone;
};

export const Step1: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
  const { data: lpusData, error, isLoading } = useGetLpusQuery({ districtId: '' });
  const stepFields = STEPS_CONFIG[0].fields;
  const [districtField, lpuField] = stepFields;
  const selectedLpu = watch('lpu');
  const selectedDistrict = watch('district');

  const lpusByDistrict = React.useMemo(() => {
    if (!lpusData) return {};

    return lpusData.reduce((acc: Record<string, typeof lpusData>, lpu) => {
      const district = lpu.districtName;
      if (!acc[district]) {
        acc[district] = [];
      }
      acc[district].push(lpu);
      return acc;
    }, {});
  }, [lpusData]);

  const handleLpuSelect = (lpuId: number, district: string) => {
    setValue(lpuField, lpuId.toString(), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue(districtField, district, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Обработчик клика по телефону
  const handlePhoneClick = (phone: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Предотвращаем всплытие, чтобы не выбиралось ЛПУ
    const telLink = `tel:${formatPhoneForLink(phone)}`;
    window.open(telLink, '_self');
  };

  // Обработчик клика по email
  const handleEmailClick = (email: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Предотвращаем всплытие, чтобы не выбиралось ЛПУ
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_self');
  };

  if (isLoading) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const accordionItems = Object.keys(lpusByDistrict)
    .sort()
    .map(district => ({
      key: district,
      header: district,
      defaultExpanded: district === selectedDistrict,
      children: (
        <Flex $direction={'column'} $align={'flex-start'} $gap={16}>
          {lpusByDistrict[district].map(lpu => (
            <LpuCard $gap={12} key={lpu.id} onClick={() => handleLpuSelect(lpu.id, district)}>
              <RadioButton
                value={lpu.id}
                register={register('lpu', {
                  required: 'Выберите медицинское учреждение',
                })}
                checked={selectedLpu === lpu.id.toString()}
                onChange={() => handleLpuSelect(lpu.id, district)}
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
                  <ContactLink
                    href={`mailto:${lpu.email}`}
                    onClick={e => handleEmailClick(lpu.email, e)}
                  >
                    {lpu.email}
                  </ContactLink>
                )}
              </Flex>
            </LpuCard>
          ))}
        </Flex>
      ),
    }));

  return (
    <div>
      <Accordion items={accordionItems} allowMultiple={true} />

      <input
        type="hidden"
        {...register('district', {
          required: 'Выберите район',
        })}
      />
    </div>
  );
};
