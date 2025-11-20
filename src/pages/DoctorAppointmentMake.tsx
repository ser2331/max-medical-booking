import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '@/components/ui/Cart.tsx';
import { OptionButton } from '@/components/ui/OptionButton/OptionButton.tsx';
import { DistrictBooking } from '@/components/DoctorAppointmentMake/DistrictBooking/DistrictBooking.tsx';
import { InsuranceBooking } from '@/components/DoctorAppointmentMake/InsuranceBooking/InsuranceBooking.tsx';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks.ts';
import { onChangeBookingType } from '@/store/slices/stepperSlice.ts';
import { StepperDots } from '@/components/stepper/StepperDots.tsx';
import { STEPS_CONFIG as DistrictSteppingConfig } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';
import { STEPS_CONFIG as InsuranceSteppingConfig } from '@/components/DoctorAppointmentMake/InsuranceBooking/steps-config.tsx';
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

const steps = {
  district: DistrictSteppingConfig,
  insurance: InsuranceSteppingConfig,
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

export const DoctorAppointmentMakePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { type: selectedType, step } = useAppSelector(state => state.stepper);
  const setSelectedType = (type: string) => {
    dispatch(onChangeBookingType(type));
  };

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
      title={selectedType ? getPageTitle(selectedType as MenuOptionType) : 'Запись на прием'}
      showBackButton={true}
      onBack={() => navigate(-1)}
    >
      <>
        <StepperDots steps={steps[(selectedType as MenuOptionType) || 'district']} />

        <Card $vertical style={{ height: 'auto', flex: 1 }} className={'FORM_CARD'}>
          {!step && (
            <OptionButton<MenuOptionType>
              options={menuOptions}
              onChange={handleTypeSelect}
              selectedType={(selectedType as MenuOptionType) || 'district'}
            />
          )}

          {renderContent()}
        </Card>
      </>
    </PageLayout>
  );
};
