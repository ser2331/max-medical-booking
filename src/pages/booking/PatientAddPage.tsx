import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CellInput, CellList, CellSimple, Switch } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '../../providers/MaxBridgeProvider';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  ContentFlex,
  PageContainer,
  SecondaryText,
  StyledPanel,
} from '../../components/ui/StyledComponents';
import type { PatientFormData } from '@/types/booking.ts';

export const PatientAddPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hapticFeedback } = useMaxBridgeContext();

  const [formData, setFormData] = useState<PatientFormData>({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    gender: undefined,
    snils: '',
    policyNumber: '',
    phone: '',
    email: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});

  const handleInputChange = (field: keyof PatientFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('validation.required');
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('validation.required');
    }
    if (!formData.birthDate) {
      newErrors.birthDate = t('validation.required');
    }
    if (!formData.consent) {
      newErrors.consent = t('validation.consentRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      hapticFeedback('notification', { style: 'light', type: 'success' });
      // Здесь будет логика сохранения пациента и перехода к выбору МО
      navigate('/booking/institution-select', {
        state: {
          patientData: formData,
          isNewPatient: true,
        },
      });
    } else {
      hapticFeedback('notification', { style: 'light', type: 'error' });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout
      title={t('patient.add')}
      submitButton={{
        text: t('continue'),
        onClick: handleSubmit,
        disabled: !formData.consent,
      }}
      backButton={{
        text: t('back'),
        onClick: handleBack,
      }}
    >
      <PageContainer>
        <ContentFlex direction="column">
          {/* Основная информация */}
          <StyledPanel>
            <CellList header={t('patient.personalInfo')}>
              <CellInput
                placeholder={t('patient.lastName')}
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                // error={errors.lastName}
                required
              />
              <CellInput
                placeholder={t('patient.firstName')}
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                // error={errors.firstName}
                required
              />
              <CellInput
                placeholder={t('patient.middleName')}
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
              />
              <CellInput
                placeholder={t('patient.birthDate')}
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                type="date"
                // error={errors.birthDate}
                required
              />
            </CellList>
          </StyledPanel>

          {/* Пол */}
          <StyledPanel>
            <CellList header={t('patient.gender')}>
              <CellSimple
                title={t('patient.male')}
                after={
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === 'male'}
                    onChange={() => handleInputChange('gender', 'male')}
                  />
                }
              />
              <CellSimple
                title={t('patient.female')}
                after={
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === 'female'}
                    onChange={() => handleInputChange('gender', 'female')}
                  />
                }
              />
            </CellList>
          </StyledPanel>

          {/* Документы */}
          <StyledPanel>
            <CellList header={t('patient.documents')}>
              <CellInput
                placeholder={t('patient.snils')}
                value={formData.snils}
                onChange={(e) => handleInputChange('snils', e.target.value)}
                // mask="999-999-999 99"
              />
              <CellInput
                placeholder={t('patient.policyNumber')}
                value={formData.policyNumber}
                onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              />
            </CellList>
          </StyledPanel>

          {/* Контакты */}
          <StyledPanel>
            <CellList header={t('patient.contacts')}>
              <CellInput
                placeholder={t('patient.phone')}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                type="tel"
              />
              <CellInput
                placeholder={t('patient.email')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
              />
            </CellList>
          </StyledPanel>

          {/* Согласие */}
          <StyledPanel mode="secondary">
            <CellList>
              <CellSimple
                as="label"
                title={t('patient.consent')}
                subtitle={t('patient.consentDescription')}
                after={
                  <Switch
                    checked={formData.consent}
                    onChange={(e) => handleInputChange('consent', e.target.checked)}
                  />
                }
              />
            </CellList>
            {errors.consent && (
              <SecondaryText
                style={{
                  color: 'var(--color-text-error)',
                  padding: '8px 16px',
                }}
              >
                {errors.consent}
              </SecondaryText>
            )}
          </StyledPanel>

          {/* Информационный блок */}
          <StyledPanel mode="secondary">
            <ContentFlex direction="column"
                         style={{ gap: '8px', padding: '16px' }}>
              <SecondaryText
                style={{ fontWeight: '600' }}>{t('patient.important')}</SecondaryText>
              <SecondaryText>{t('patient.verificationInfo')}</SecondaryText>
            </ContentFlex>
          </StyledPanel>
        </ContentFlex>
      </PageContainer>
    </PageLayout>
  );
};
