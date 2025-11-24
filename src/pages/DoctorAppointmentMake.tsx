import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { onChangeBookingType } from '@/store/slices/stepperSlice.ts';

import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '@/components/ui/Cart.tsx';
import { DistrictBooking } from '@/components/DoctorAppointmentMake/DistrictBooking/DistrictBooking.tsx';
import { InsuranceBooking } from '@/components/DoctorAppointmentMake/InsuranceBooking/InsuranceBooking.tsx';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks.ts';
import { StepperDots } from '@/components/stepper/StepperDots.tsx';
import { STEPS_CONFIG as DistrictSteppingConfig } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';
import { STEPS_CONFIG as InsuranceSteppingConfig } from '@/components/DoctorAppointmentMake/InsuranceBooking/steps-config.tsx';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox.tsx';

export const DoctorAppointmentMakePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAnotherPerson, step } = useAppSelector(state => state.stepper);

  const handleIsAnotherPersonSelect = (isAnotherPerson: boolean) => {
    dispatch(onChangeBookingType(isAnotherPerson));
  };

  const renderContent = () => {
    if (!isAnotherPerson) {
      return <InsuranceBooking />;
    }
    return <DistrictBooking />;
  };

  const currentStepConfig = isAnotherPerson ? DistrictSteppingConfig : InsuranceSteppingConfig;
  return (
    <PageLayout
      title={currentStepConfig[step].title}
      showBackButton={true}
      onBack={() => navigate(-1)}
    >
      <>
        <StepperDots steps={currentStepConfig} />

        {!step && (
          <Card $vertical className={'anotherPerson'}>
            <Checkbox
              id={'anotherPerson'}
              title={'Запись другого человека'}
              checked={isAnotherPerson}
              onChange={handleIsAnotherPersonSelect}
            />
          </Card>
        )}
        <Card $vertical style={{ height: 'auto', flex: 1 }} className={'formCardContent'}>
          {renderContent()}
        </Card>
      </>
    </PageLayout>
  );
};
