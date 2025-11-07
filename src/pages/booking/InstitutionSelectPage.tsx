import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CellHeader, CellList, CellSimple, SearchInput } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '../../providers/MaxBridgeProvider';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  CompactButton,
  ContentFlex,
  EllipsisText,
  IconContainer,
  PageContainer,
  SecondaryText,
  SkeletonLoader,
  StyledPanel,
} from '../../components/ui/StyledComponents';
import type { MedicalInstitution } from '@/types/booking.ts';

export const InstitutionSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { hapticFeedback } = useMaxBridgeContext();
  const [searchQuery, setSearchQuery] = useState('');

  const [institutions] = useState<MedicalInstitution[]>([
    {
      id: '1',
      name: 'Городская поликлиника №1',
      type: 'polyclinic',
      address: 'ул. Ленина, 15',
      phone: '+7 495 123-45-67',
      isAttached: true,
    },
    {
      id: '2',
      name: 'Детская поликлиника №3',
      type: 'polyclinic',
      address: 'ул. Пушкина, 25',
      phone: '+7 495 234-56-78',
      isAttached: true,
    },
  ]);

  const [selectedInstitution, setSelectedInstitution] = useState<string>('');

  const filteredInstitutions = institutions.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedInstitutionData = institutions.find((inst) => inst.id === selectedInstitution);

  const handleSelectInstitution = (institutionId: string) => {
    hapticFeedback('impact', { style: 'light' });
    setSelectedInstitution(institutionId);
  };

  const handleDeselectInstitution = () => {
    hapticFeedback('impact', { style: 'light' });
    setSelectedInstitution('');
  };

  const handleContinue = () => {
    if (selectedInstitution) {
      hapticFeedback('notification', { style: 'light', type: 'success' });
      navigate('/booking/specialization-select', {
        state: {
          ...location.state,
          institutionId: selectedInstitution,
        },
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout
      title={t('booking.selectInstitution')}
      submitButton={{
        text: t('continue'),
        onClick: handleContinue,
        disabled: !selectedInstitution,
      }}
      backButton={{
        text: t('back'),
        onClick: handleBack,
      }}
    >
      <PageContainer>
        <ContentFlex direction="column">
          {/* Поиск */}
          <StyledPanel>
            <SearchInput
              placeholder={t('institution.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </StyledPanel>

          {/* Блок с выбранным учреждением */}
          <CellList mode="island" header={
            <CellHeader>{t('institution.selected')}</CellHeader>}>
            <CellSimple
              height="compact"
              before={
                <IconContainer
                  $background={
                    selectedInstitutionData
                      ? 'var(--color-background-accent)'
                      : 'var(--color-background-tertiary)'
                  }
                  $color={
                    selectedInstitutionData
                      ? 'var(--color-text-accent)'
                      : 'var(--color-text-tertiary)'
                  }
                >
                  {selectedInstitutionData ? '🏥' : '⋯'}
                </IconContainer>
              }
              title={
                <EllipsisText>
                  {selectedInstitutionData
                    ? selectedInstitutionData.name
                    : t('institution.notSelected')}
                </EllipsisText>
              }
              subtitle={
                <EllipsisText>
                  {selectedInstitutionData
                    ? `${selectedInstitutionData.address} • ${selectedInstitutionData.phone}`
                    : t('institution.selectHint')}
                </EllipsisText>
              }
              after={
                selectedInstitutionData ? (
                  <ContentFlex style={{ gap: '8px', alignItems: 'center' }}>
                    {selectedInstitutionData.isAttached && (
                      <EllipsisText>{t('institution.attached')}</EllipsisText>
                    )}
                    <CompactButton
                      onClick={handleDeselectInstitution}>✕</CompactButton>
                  </ContentFlex>
                ) : (
                  <SkeletonLoader />
                )
              }
            />
          </CellList>

          {/* Список учреждений */}
          <CellList mode="island" header={
            <CellHeader>{t('institution.available')}</CellHeader>}>
            {filteredInstitutions
              .filter((inst) => inst.id !== selectedInstitution)
              .map((institution) => (
                <CellSimple
                  key={institution.id}
                  height="compact"
                  before={<IconContainer>🏥</IconContainer>}
                  title={<EllipsisText>{institution.name}</EllipsisText>}
                  subtitle={
                    <EllipsisText>{`${institution.address} • ${institution.phone}`}</EllipsisText>
                  }
                  after={
                    <ContentFlex style={{ gap: '8px', alignItems: 'center' }}>
                      {institution.isAttached && (
                        <EllipsisText>{t('institution.attached')}</EllipsisText>
                      )}
                      <CompactButton
                        onClick={() => handleSelectInstitution(institution.id)}>
                        {t('select')}
                      </CompactButton>
                    </ContentFlex>
                  }
                />
              ))}
          </CellList>

          {/* Сообщение об отсутствии результатов */}
          {filteredInstitutions.length === 0 && (
            <StyledPanel>
              <ContentFlex
                direction="column"
                style={{
                  gap: '12px',
                  alignItems: 'center',
                  padding: '32px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  {t('institution.notFound')}
                </div>
                <SecondaryText>{t('institution.notFoundHint')}</SecondaryText>
              </ContentFlex>
            </StyledPanel>
          )}
        </ContentFlex>
      </PageContainer>
    </PageLayout>
  );
};
