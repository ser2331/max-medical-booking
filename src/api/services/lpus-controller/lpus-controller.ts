import { commonApi } from '@/store/common.api.ts';
import { mockQueryFn } from '@/api/services/utils.ts';
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
        return mockQueryFn('lpus', mockLpusData);
      },
    }),
    getSpecialties: builder.query<ISpecialty[], { lpuId: string }>({
      // query: ({ lpuId }) => `${controllerUrl}/lpu/${lpuId}/specialties`,
      queryFn: () => {
        return mockQueryFn('specialties', mockSpecialtiesData);
      },
    }),
    getDoctors: builder.query<IDoctor[], { lpuId: string; specialityId: string }>({
      // query: ({ lpuId, specialityId }) => `${controllerUrl}/lpu/${lpuId}/speciality/${specialityId}/doctors`,
      queryFn: () => {
        return mockQueryFn('doctors', mockDoctorsData);
      },
    }),
    getTimetable: builder.query<ITimeTable[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/timetable`,
      queryFn: () => {
        return mockQueryFn('timetable', mockTimetableData);
      },
    }),
    getAppointments: builder.query<IAppointment[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/appointments`,
      queryFn: () => {
        return mockQueryFn('appointments', mockAppointmentsData);
      },
    }),
  }),
});

export const {
  useGetLpusQuery,
  useGetSpecialtiesQuery,
  useGetDoctorsQuery,
  useLazyGetTimetableQuery,
  useGetAppointmentsQuery,
} = bookingDictionaryController;
