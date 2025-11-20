import { ReactElement } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { StepperProps } from '@/components/stepper/Stepper.types.ts';
import { StepperForm } from '@/components/stepper/StepperForm.tsx';

export const Stepper = <TFieldValues extends FieldValues>({
  steps,
  defaultValues,
  onSubmit,
  onStepChange,
  mode = 'onChange',
}: StepperProps<TFieldValues>): ReactElement => {
  const methods = useForm<TFieldValues>({ mode, defaultValues });

  return (
    <FormProvider {...methods}>
      <StepperForm<TFieldValues> steps={steps} onSubmit={onSubmit} onStepChange={onStepChange} />
    </FormProvider>
  );
};
