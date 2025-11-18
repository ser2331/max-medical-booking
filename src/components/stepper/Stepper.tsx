import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { StepperProps } from '@/components/stepper/Stepper.types.ts';
import styled from 'styled-components';
import { StepperForm } from '@/components/stepper/StepperForm.tsx';
const Container = styled.div`
  display: flex;
  flex-direction: column;
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
}: StepperProps<TFieldValues>): React.ReactElement => {
  const methods = useForm<TFieldValues>({ mode, defaultValues });

  return (
    <Container>
      <FormProvider {...methods}>
        <StepperForm<TFieldValues> steps={steps} onSubmit={onSubmit} onStepChange={onStepChange} />
      </FormProvider>
    </Container>
  );
};
