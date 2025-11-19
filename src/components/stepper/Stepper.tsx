import { ReactElement } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { StepperProps } from '@/components/stepper/Stepper.types.ts';
import { StepperForm } from '@/components/stepper/StepperForm.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';

const Container = styled(Flex).attrs({ $direction: 'column' })`
  overflow: hidden;
  flex: 1;
  width: 100%;
`;

export const Stepper = <TFieldValues extends FieldValues>({
  steps,
  defaultValues,
  onSubmit,
  onStepChange,
  mode = 'onChange',
}: StepperProps<TFieldValues>): ReactElement => {
  const methods = useForm<TFieldValues>({ mode, defaultValues });

  return (
    <Container>
      <FormProvider {...methods}>
        <StepperForm<TFieldValues> steps={steps} onSubmit={onSubmit} onStepChange={onStepChange} />
      </FormProvider>
    </Container>
  );
};
