import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PageLayout } from '../components/layout/PageLayout';
import { DistrictBooking } from '@/components/Booking/DistrictBooking/DistrictBooking.tsx';
import { InsuranceBooking } from '@/components/Booking/InsuranceBooking/InsuranceBooking.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { OptionButton } from '@/components/ui/OptionButton/OptionButton.tsx';

const menuOptions = [
  {
    type: 'district' as const,
    title: 'По району',
  },
  {
    type: 'insurance' as const,
    title: 'По полису',
  },
];
type MenuOptionType = 'district' | 'insurance';
export const PageContent = styled(Flex).attrs({
  $direction: 'column',
  $justifyContent: 'flex-start',
})`
  flex: 1;
  height: 100%;
`;

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

export const DoctorAppointmentMakePage: FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<MenuOptionType>('district');

  const handleTypeSelect = (type: MenuOptionType) => {
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
        <Card>
          <OptionButton<MenuOptionType>
            options={menuOptions}
            onChange={handleTypeSelect}
            selectedType={selectedType}
          />
        </Card>

        {renderContent()}
      </PageContent>
    </PageLayout>
  );
};
