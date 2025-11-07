import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageContainer } from '../../components/ui/StyledComponents';

export const TimeSelectPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('booking.selectTime')}
      submitButton={{
        text: t('booking.confirm'),
        onClick: () => console.log('Time selected'),
      }}
    >
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Выбор времени</h2>
          <p>Здесь будет календарь и временные слоты</p>
        </div>
      </PageContainer>
    </PageLayout>
  );
};
