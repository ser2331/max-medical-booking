import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageLayout } from '../components/layout/PageLayout';
import { AppointmentTypeSelector } from '@/components/AppointmentTypeSelector/AppointmentTypeSelector.tsx';
import { DistrictBooking } from '@/components/Booking/DistrictBooking/DistrictBooking.tsx';
import { InsuranceBooking } from '@/components/Booking/InsuranceBooking/InsuranceBooking.tsx';

const PageContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
export const DoctorAppointmentMakePage: FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'district' | 'insurance'>('district');

  const handleTypeSelect = (type: 'district' | 'insurance') => {
    setSelectedType(type);
  };

  const renderContent = () => {
    switch (selectedType) {
      case 'district':
        return <DistrictBooking />;
      case 'insurance':
        return <InsuranceBooking />;
      default:
        return <DistrictBooking />;
    }
  };

  return (
    <PageLayout
      title={selectedType ? getPageTitle(selectedType) : 'Запись на прием'}
      showBackButton={true}
      onBack={() => navigate(-1)}
    >
      <PageContent>
        <AppointmentTypeSelector onTypeSelect={handleTypeSelect} selectedType={selectedType} />

        {renderContent()}
      </PageContent>
    </PageLayout>
  );
};

// Вспомогательная функция для заголовка
const getPageTitle = (type: 'district' | 'insurance'): string => {
  switch (type) {
    case 'district':
      return 'Запись по району';
    case 'insurance':
      return 'Запись по полису ОМС';
    default:
      return 'Запись на прием';
  }
};
