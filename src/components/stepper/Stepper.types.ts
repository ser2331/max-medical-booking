import { DefaultValues, FieldValues, Path } from 'react-hook-form';
import React from 'react';

export interface StepConfig<TFieldValues extends FieldValues> {
  id: string;
  title: string;
  component: React.ComponentType;
  fields: Path<TFieldValues>[];
  required?: boolean;
}
export interface StepperProps<TFieldValues extends FieldValues> {
  steps: StepConfig<TFieldValues>[];
  defaultValues: DefaultValues<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  onStepChange?: (currentStep: number, previousStep: number) => void;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}
