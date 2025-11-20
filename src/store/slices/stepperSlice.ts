import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StepperState {
  step: number;
  type: string;
}

const initialState: StepperState = {
  step: 0,
  type: '',
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    onChangeBookingType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.step = 0;
    },
    onChangeStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { onChangeBookingType, onChangeStep } = stepperSlice.actions;
export default stepperSlice.reducer;
