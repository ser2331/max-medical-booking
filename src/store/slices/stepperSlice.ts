import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StepperState {
  step: number;
  isAnotherPerson: boolean;
}

const initialState: StepperState = {
  step: 0,
  isAnotherPerson: false,
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    onChangeBookingType: (state, action: PayloadAction<boolean>) => {
      state.isAnotherPerson = action.payload;
      state.step = 0;
    },
    onChangeStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { onChangeBookingType, onChangeStep } = stepperSlice.actions;
export default stepperSlice.reducer;
