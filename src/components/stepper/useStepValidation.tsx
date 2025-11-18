import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { StepConfig } from '@/components/stepper/Stepper.types.ts';

export const useStepValidation = <TFieldValues extends FieldValues>(
  currentStep: number,
  steps: StepConfig<TFieldValues>[],
) => {
  const formContext = useFormContext<TFieldValues>();

  // Проверяем, что formContext доступен
  if (!formContext) {
    throw new Error('useStepValidation must be used within a FormProvider');
  }

  const { trigger, getFieldState } = formContext;

  const getStepFields = (stepIndex: number): Path<TFieldValues>[] => {
    return steps[stepIndex]?.fields || [];
  };

  const getFieldsUpToStep = (stepIndex: number): Path<TFieldValues>[] => {
    const fields: Path<TFieldValues>[] = [];
    for (let i = 0; i <= stepIndex; i++) {
      fields.push(...getStepFields(i));
    }
    return fields;
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const currentStepFields = getStepFields(currentStep);
    if (currentStepFields.length > 0) {
      return await trigger(currentStepFields);
    }
    return true;
  };

  const arePreviousStepsValid = (): boolean => {
    for (let step = 0; step < currentStep; step++) {
      const stepFields = getStepFields(step);
      for (const field of stepFields) {
        const fieldState = getFieldState(field);
        if (fieldState.invalid) {
          return false;
        }
      }
    }
    return true;
  };

  return {
    validateCurrentStep,
    arePreviousStepsValid,
    getStepFields,
    getFieldsUpToStep,
  };
};
