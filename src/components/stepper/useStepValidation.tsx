import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { StepConfig } from '@/components/stepper/Stepper.types.ts';
import { useMemo } from 'react';

export const useStepValidation = <TFieldValues extends FieldValues>(
  currentStep: number,
  steps: StepConfig<TFieldValues>[],
) => {
  const formContext = useFormContext<TFieldValues>();

  if (!formContext) {
    throw new Error('useStepValidation must be used within a FormProvider');
  }

  const {
    trigger,
    getFieldState,
    watch,
    formState: { errors },
  } = formContext;

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

  const currentStepFields = useMemo(() => getStepFields(currentStep), [currentStep, steps]);

  const watchedStepFields = watch(currentStepFields as Path<TFieldValues>[]);

  const isCurrentStepValid = useMemo((): boolean => {
    if (currentStepFields.length === 0) return false;

    const hasStepErrors = currentStepFields.some((_field, index) => !!errors[index]);

    const allFieldsHaveValues = currentStepFields.every((_field, index) => {
      const value = watchedStepFields?.[index];
      return !!value;
    });
    return !hasStepErrors && allFieldsHaveValues;
  }, [currentStepFields, errors, watchedStepFields]);

  const validateCurrentStep = async (): Promise<boolean> => {
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
    isCurrentStepValid,
  };
};
