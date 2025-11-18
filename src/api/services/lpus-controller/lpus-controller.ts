import { commonApi } from '@/store/common.api.ts';
import { handleApiResponse } from '@/api/services/utils.ts';
import {
  IAppointment,
  IDoctor,
  ILpus,
  ISpecialty,
  ITimeTable,
} from '@/api/services/lpus-controller/lpus-controller.types.ts';
import {
  mockAppointmentsData,
  mockDoctorsData,
  mockLpusData,
  mockSpecialtiesData,
  mockTimetableData,
} from '@/api/services/lpus-controller/lpus-controller.data.ts';

const controllerUrl = 'api/v2/shared';
console.log('controllerUrl', controllerUrl);
export const bookingDictionaryController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getLpus: builder.query<ILpus[], { districtId: string }>({
      // query: ({ districtId }) =>
      // `${controllerUrl}/district/${districtId}/lpus`,
      queryFn: () => {
        return handleApiResponse('lpus', mockLpusData, { delay: 3, errorRate: 0.1 });
      },
    }),
    getSpecialties: builder.query<ISpecialty[], { lpuId: string }>({
      // query: ({ lpuId }) => `${controllerUrl}/lpu/${lpuId}/specialties`,
      queryFn: () => {
        return handleApiResponse('specialties', mockSpecialtiesData, { delay: 3, errorRate: 0.1 });
      },
    }),
    getDoctors: builder.query<IDoctor[], { lpuId: string; specialityId: string }>({
      // query: ({ lpuId, specialityId }) => `${controllerUrl}/lpu/${lpuId}/speciality/${specialityId}/doctors`,
      queryFn: () => {
        return handleApiResponse('doctors', mockDoctorsData, { delay: 3, errorRate: 0.1 });
      },
    }),
    getTimetable: builder.query<ITimeTable[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/timetable`,
      queryFn: () => {
        return handleApiResponse('timetable', mockTimetableData, { delay: 3, errorRate: 0.1 });
      },
    }),
    getAppointments: builder.query<IAppointment[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/appointments`,
      queryFn: () => {
        return handleApiResponse('appointments', mockAppointmentsData, {
          delay: 3,
          errorRate: 0.1,
        });
      },
    }),
  }),
});

export const {
  useGetLpusQuery,
  useGetSpecialtiesQuery,
  useGetDoctorsQuery,
  useGetTimetableQuery,
  useLazyGetTimetableQuery,
  useGetAppointmentsQuery,
} = bookingDictionaryController;
