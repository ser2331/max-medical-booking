import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CellList, CellSimple } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '../../providers/MaxBridgeProvider';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  PageContainer,
  ContentFlex,
  StyledPanel,
  SelectedItemPanel,
  IconContainer,
  EllipsisText,
  SecondaryText,
  AccentLabel,
  CompactButton,
} from '../../components/ui/StyledComponents';
import type { Specialization } from '@/types/booking.ts';

export const SpecializationSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { hapticFeedback, showBackButton } = useMaxBridgeContext();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');

  const [specializations] = useState<Specialization[]>([
    {
      id: '1',
      name: 'Терапевт',
      availableSlots: 15,
    },
    {
      id: '2',
      name: 'Хирург',
      availableSlots: 8,
    },
    {
      id: '3',
      name: 'Офтальмолог',
      availableSlots: 12,
    },
  ]);

  React.useEffect(() => {
    showBackButton(true);
    return () => showBackButton(false);
  }, [showBackButton]);

  const selectedSpecializationData = specializations.find(
    (spec) => spec.id === selectedSpecialization,
  );

  const handleSelectSpecialization = (specializationId: string) => {
    hapticFeedback('impact', { style: 'light' });
    setSelectedSpecialization(specializationId);
  };

  const handleDeselectSpecialization = () => {
    hapticFeedback('impact', { style: 'light' });
    setSelectedSpecialization('');
  };

  const handleContinue = () => {
    if (selectedSpecialization) {
      hapticFeedback('notification', { style: 'light', type: 'success' });
      navigate('/booking/doctor-select', {
        state: {
          ...location.state,
          specializationId: selectedSpecialization,
        },
      });
    }
  };

  return (
    <PageLayout
      title={t('booking.selectSpecialization')}
      submitButton={{
        text: t('continue'),
        onClick: handleContinue,
        disabled: !selectedSpecialization,
      }}
    >
      <PageContainer>
        <ContentFlex direction="column">
          {/* Блок с выбранной специальностью */}
          <SelectedItemPanel $isSelected={!!selectedSpecializationData}>
            <ContentFlex
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                minHeight: '60px',
              }}
            >
              <ContentFlex direction="column" style={{ gap: '4px', flex: 1 }}>
                {selectedSpecializationData ? (
                  <>
                    <AccentLabel>{t('specialization.selected')}:</AccentLabel>
                    <ContentFlex style={{ gap: '12px', alignItems: 'center' }}>
                      <EllipsisText
                        style={{ fontSize: '18px', fontWeight: '600' }}>
                        {selectedSpecializationData.name}
                      </EllipsisText>
                      <EllipsisText>
                        {t('specialization.slots', {
                          count: selectedSpecializationData.availableSlots,
                        })}
                      </EllipsisText>
                    </ContentFlex>
                  </>
                ) : (
                  <ContentFlex style={{ gap: '8px', alignItems: 'center' }}>
                    <IconContainer
                      $background="var(--color-background-secondary)"
                      $color="var(--color-text-secondary)"
                      $size="24px"
                    >
                      ?
                    </IconContainer>
                    <SecondaryText style={{ fontStyle: 'italic' }}>
                      {t('specialization.notSelected')}
                    </SecondaryText>
                  </ContentFlex>
                )}
              </ContentFlex>

              {selectedSpecializationData && (
                <CompactButton
                  onClick={handleDeselectSpecialization}>✕</CompactButton>
              )}
            </ContentFlex>
          </SelectedItemPanel>

          {/* Список специальностей */}
          <StyledPanel>
            <CellList>
              {specializations
                .filter((spec) => spec.id !== selectedSpecialization)
                .map((specialization) => (
                  <CellSimple
                    key={specialization.id}
                    after={
                      <ContentFlex style={{ gap: '8px', alignItems: 'center' }}>
                        <EllipsisText>{specialization.availableSlots}</EllipsisText>
                        <CompactButton
                          onClick={() => handleSelectSpecialization(specialization.id)}
                        >
                          {t('select')}
                        </CompactButton>
                      </ContentFlex>
                    }
                  >
                    <ContentFlex direction="column" style={{ gap: '2px' }}>
                      <EllipsisText style={{ fontWeight: '500' }}>
                        {specialization.name}
                      </EllipsisText>
                      <SecondaryText>
                        {t('specialization.availableSlots', {
                          count: specialization.availableSlots,
                        })}
                      </SecondaryText>
                    </ContentFlex>
                  </CellSimple>
                ))}
            </CellList>
          </StyledPanel>
        </ContentFlex>
      </PageContainer>
    </PageLayout>
  );
};
