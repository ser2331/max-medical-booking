import { commonApi } from '@/store/common.api.ts';

const controllerUrl = '/api/v2';
console.log('controllerUrl', controllerUrl);

interface UserData {
  // esiaId: string;
  lpuId: number;
  // patientId: number;
  appointmentId: number;
  // referralId: number;
  visitDate: string;
  ipmpiCardId: number;
  recipientEmail: string;
  patientLastName: string;
  patientFirstName: string;
  patientMiddleName: string;
  patientBirthdate: string;
  // num: string;
  room: string;
  address: string;
  // userFullName: string;
  userSnils: string;
  // userBirthDate: string,
}

interface CancelData {
  esiaId: string;
  appointmentId: string;
  lpuId: number;
  patientId: string;
  appointmentType: number;
}

interface Response {
  success: true;
  errorCode: number;
  message: string;
  stackTrace: string;
}
export const bookingController = commonApi.injectEndpoints({
  endpoints: builder => ({
    createAppointment: builder.mutation<Response, UserData>({
      ///api/v2/appointment/create
      query: userData => {
        return {
          url: `${controllerUrl}/appointment/create`,
          method: 'POST',
          body: userData,
        };
      },
    }),
    cancelAppointment: builder.mutation<Response, CancelData>({
      ///api/v2/appointment/cancel
      query: userData => {
        return {
          url: `${controllerUrl}/appointment/cancel`,
          method: 'POST',
          body: userData,
        };
      },
    }),
  }),
});

export const { useCreateAppointmentMutation, useCancelAppointmentMutation } = bookingController;
