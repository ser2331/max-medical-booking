import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageContainer } from '../../components/ui/StyledComponents';

export const DoctorSelectPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('booking.selectDoctor')}
      submitButton={{
        text: t('continue'),
        onClick: () => console.log('Doctor selected'),
      }}
    >
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Выбор врача</h2>
          <p>Здесь будет список врачей</p>
        </div>
      </PageContainer>
    </PageLayout>
  );
};
