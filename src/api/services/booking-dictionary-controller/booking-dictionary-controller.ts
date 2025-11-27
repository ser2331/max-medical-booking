import { commonApi } from '@/store/common.api.ts';
import { handleApiMockResponse, handleApiResponse, IResponse } from '@/api/services/utils.ts';
import {
  IAppointment,
  IDoctor,
  ILpus,
  ISpecialty,
  ITimeTable,
  UserDataParams,
} from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.types.ts';
import {
  mockLpusData,
  mockTimetableData,
} from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.data.ts';

const controllerUrl = '/api/v2';
console.log('controllerUrl', controllerUrl);

const errorRate = 0;
const delay = 1000;

export const bookingDictionaryController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getLpusByUser: builder.query<ILpus[], UserDataParams>({
      query: userData => {
        // Проверяем минимально необходимые поля для запроса
        const requiredFields = ['polisN', 'lastName', 'firstName', 'birthDate'];
        const missingFields = requiredFields.filter(
          field => !userData[field as keyof UserDataParams],
        );

        if (missingFields.length > 0) {
          // Создаем ошибку в формате, который понимает RTK Query
          const error = new Error(
            `Обязательные параметры отсутствуют: ${missingFields.join(', ')}`,
          );
          (error as any).status = 400;
          (error as any).data = {
            message: error.message,
            errorCode: 'VALIDATION_ERROR',
          };
          throw error;
        }

        return {
          url: `${controllerUrl}/oms/attachment/lpus`,
          params: userData,
        };
      },
      transformResponse: (resp: IResponse<ILpus>) => handleApiResponse<ILpus>(resp),
    }),
    getLpusByDistrict: builder.query<ILpus[], { districtId: string }>({
      // query: ({ districtId }) =>
      // `${controllerUrl}/district/${districtId}/lpus`,
      queryFn: () => {
        return handleApiMockResponse('lpus', mockLpusData, { delay, errorRate });
      },
    }),
    getSpecialties: builder.query<ISpecialty[], { lpuId: string }>({
      //api/v2/schedule/lpu/{lpuId}/specialties
      query: ({ lpuId }) => `${controllerUrl}/schedule/lpu/${lpuId}/specialties`,
      transformResponse: (resp: IResponse<ISpecialty>) => handleApiResponse<ISpecialty>(resp),

      // queryFn: () => {
      //   return handleApiMockResponse('specialties', mockSpecialtiesData, { delay, errorRate });
      // },
    }),
    getDoctors: builder.query<IDoctor[], { lpuId: string; specialityId: string }>({
      ///api/v2/schedule/lpu/{lpuId}/speciality/{specialityId}/doctors
      query: ({ lpuId, specialityId }) =>
        `${controllerUrl}/schedule/lpu/${lpuId}/speciality/${specialityId}/doctors`,
      transformResponse: (resp: IResponse<IDoctor>) => handleApiResponse<IDoctor>(resp),
      // queryFn: () => {
      //   return handleApiMockResponse('doctors', mockDoctorsData, { delay, errorRate });
      // },
    }),
    getTimetable: builder.query<ITimeTable[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/timetable`,
      queryFn: () => {
        return handleApiMockResponse('timetable', mockTimetableData, { delay, errorRate });
      },
    }),
    getAppointments: builder.query<IAppointment[], { lpuId: string; doctorId: string }>({
      ///api/v2/schedule/lpu/{lpuId}/doctor/{doctorId}/appointments
      query: ({ lpuId, doctorId }) =>
        `${controllerUrl}/schedule/lpu/${lpuId}/doctor/${doctorId}/appointments`,
      transformResponse: (resp: IResponse<IAppointment>) => handleApiResponse<IAppointment>(resp),

      // queryFn: () => {
      //   return handleApiMockResponse('appointments', mockAppointmentsData, {
      //     delay,
      //     errorRate,
      //   });
      // },
    }),
  }),
});

export const {
  useGetLpusByDistrictQuery,
  useGetLpusByUserQuery,
  useGetSpecialtiesQuery,
  useGetDoctorsQuery,
  useGetTimetableQuery,
  useLazyGetTimetableQuery,
  useGetAppointmentsQuery,
} = bookingDictionaryController;
