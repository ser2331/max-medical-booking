import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, CellList, CellSimple } from '@maxhub/max-ui';
import styled from 'styled-components';
import { useMaxBridgeContext } from '../../providers/MaxBridgeProvider';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  AccentLabel,
  CompactButton,
  ContentFlex,
  EllipsisText,
  SecondaryText,
  SelectedItemPanel,
  StyledPanel,
} from '../../components/ui/StyledComponents';
import type { Patient } from '@/types/booking.ts';

// Styled Components
const PatientAvatar = styled(Avatar.Container)`
    flex-shrink: 0;
`;

const PatientInfo = styled(ContentFlex)`
    flex: 1;
    min-width: 0;
`;

const PatientName = styled(EllipsisText)`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
`;

const PatientDetails = styled(ContentFlex)`
    gap: 2px;
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:checked {
        accent-color: var(--color-background-accent);
    }
`;

const AddPatientSection = styled(StyledPanel).attrs({ mode: 'secondary' })`
    margin-top: var(--spacing-md);
`;

const SectionTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
`;

const PatientListContainer = styled(StyledPanel)`
    margin-top: var(--spacing-md);
`;

const SelectedPatientContent = styled(ContentFlex)`
    width: 100%;
`;

const CloseButton = styled(CompactButton)`
    && {
        color: var(--color-text-secondary);
        background: transparent;

        &:hover {
            background: var(--color-background-tertiary);
        }
    }
`;

// Memoized Components
const PatientListItem = React.memo(({
                                      patient,
                                      isSelected,
                                      onSelect,
                                    }: {
  patient: Patient;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const age = useMemo(() =>
      new Date().getFullYear() - new Date(patient.birthDate).getFullYear(),
    [patient.birthDate],
  );

  const fullName = useMemo(() =>
      `${patient.lastName} ${patient.firstName} ${patient.middleName || ''}`.trim(),
    [patient.lastName, patient.firstName, patient.middleName],
  );

  return (
    <CellSimple
      key={patient.id}
      before={
        <PatientAvatar size={40} form="circle">
          <Avatar.Text>{patient.firstName[0]}</Avatar.Text>
        </PatientAvatar>
      }
      after={
        <RadioInput
          name="patient"
          checked={isSelected}
          onChange={() => onSelect(patient.id)}
        />
      }
    >
      <PatientDetails direction="column">
        <PatientName>{fullName}</PatientName>
        <SecondaryText>{age} лет</SecondaryText>
      </PatientDetails>
    </CellSimple>
  );
});

PatientListItem.displayName = 'PatientListItem';

const SelectedPatientCard = React.memo(({
                                          patient,
                                          onDeselect,
                                        }: {
  patient?: Patient;
  onDeselect: () => void;
}) => {
  const { t } = useTranslation();

  const age = useMemo(() =>
      patient && new Date().getFullYear() - new Date(patient?.birthDate).getFullYear(),
    [patient],
  );

  const fullName = useMemo(() =>
      `${patient?.lastName} ${patient?.firstName} ${patient?.middleName || ''}`.trim(),
    [patient],
  );

  if (!patient) {
    return <SelectedItemPanel></SelectedItemPanel>;
  }
  return (
    <SelectedItemPanel $isSelected>
      <SelectedPatientContent
        gap={12}
        justify="space-between"
        align="flex-start"
      >
        <ContentFlex gap={12} align="flex-start" style={{ flex: 1 }}>
          <PatientAvatar size={48} form="circle">
            <Avatar.Text>{patient.firstName[0]}</Avatar.Text>
          </PatientAvatar>
          <PatientInfo gap={4} direction="column">
            <AccentLabel>{t('patient.selected')}:</AccentLabel>
            <PatientName>{fullName}</PatientName>
            <SecondaryText>{t('patient.age', { age })}</SecondaryText>
            {patient.phone && (
              <SecondaryText>
                {t('patient.phone', { phone: patient.phone })}
              </SecondaryText>
            )}
            {patient.snils && (
              <SecondaryText style={{ fontSize: '12px', opacity: 0.8 }}>
                {t('patient.snils', { snils: patient.snils })}
              </SecondaryText>
            )}
          </PatientInfo>
        </ContentFlex>
        <CloseButton onClick={onDeselect}>✕</CloseButton>
      </SelectedPatientContent>
    </SelectedItemPanel>
  );
});

SelectedPatientCard.displayName = 'SelectedPatientCard';

export const PatientSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hapticFeedback, showBackButton } = useMaxBridgeContext();
  const [selectedPatient, setSelectedPatient] = useState<string>('');

  // Mock data - в реальном приложении будет приходить из API
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      birthDate: '1990-05-15',
      phone: '+7 999 123-45-67',
      snils: '123-456-789 00',
    },
    {
      id: '2',
      firstName: 'Мария',
      lastName: 'Петрова',
      birthDate: '1985-12-20',
      phone: '+7 999 765-43-21',
    },
  ]);

  // Effects
  React.useEffect(() => {
    showBackButton(true);
    return () => showBackButton(false);
  }, [showBackButton]);

  // Memoized values
  const selectedPatientData = useMemo(() =>
      patients.find((patient) => patient.id === selectedPatient),
    [patients, selectedPatient],
  );

  const availablePatients = useMemo(() =>
      patients.filter((patient) => patient.id !== selectedPatient),
    [patients, selectedPatient],
  );

  // Event handlers
  const handleSelectPatient = useCallback((patientId: string) => {
    hapticFeedback('impact', { style: 'light' });
    setSelectedPatient(patientId);
  }, [hapticFeedback]);

  const handleDeselectPatient = useCallback(() => {
    hapticFeedback('impact', { style: 'light' });
    setSelectedPatient('');
  }, [hapticFeedback]);

  const handleContinue = useCallback(() => {
    if (selectedPatient) {
      hapticFeedback('notification', { style: 'light', type: 'success' });
      navigate('/booking/institution-select', {
        state: { patientId: selectedPatient },
      });
    }
  }, [selectedPatient, hapticFeedback, navigate]);

  const handleAddPatient = useCallback(() => {
    hapticFeedback('impact', { style: 'light' });
    navigate('/booking/patient-add');
  }, [hapticFeedback, navigate]);

  return (
    <PageLayout
      title={t('booking.selectPatient')}
      submitButton={{
        text: t('continue'),
        onClick: handleContinue,
        disabled: !selectedPatient,
      }}
    >
      <ContentFlex
        direction="column"
        align={'center'}
        justify="space-between"
      >
        {/* Selected Patient Card */}
        <SelectedPatientCard
          patient={selectedPatientData}
          onDeselect={handleDeselectPatient}
        />

        {/* Patients List */}
        {availablePatients.length > 0 && (
          <PatientListContainer>
            <CellList>
              {availablePatients.map((patient) => (
                <PatientListItem
                  key={patient.id}
                  patient={patient}
                  isSelected={selectedPatient === patient.id}
                  onSelect={handleSelectPatient}
                />
              ))}
            </CellList>
          </PatientListContainer>
        )}

        {/* Add Patient Section */}
        <AddPatientSection>
          <ContentFlex direction="column" gap={12}>
            <SectionTitle>{t('patient.add')}</SectionTitle>
            <SecondaryText>{t('patient.familyMember')}</SecondaryText>
            <CompactButton onClick={handleAddPatient}>
              + {t('patient.add')}
            </CompactButton>
          </ContentFlex>
        </AddPatientSection>
      </ContentFlex>
    </PageLayout>
  );
};