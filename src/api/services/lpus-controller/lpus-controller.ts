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

const controllerUrl = 'https://r42-test.portal.n3zdrav.ru/api/v2';
console.log('controllerUrl', controllerUrl);

const errorRate = 0;
const delay = 3000;
interface UserData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: string;
  snils: string;
  polisN: string;
  polisS: string;
  phoneField: string;
  mail: string;
  comments: string;
}
export const bookingDictionaryController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getLpusByUser: builder.query<ILpus[], UserData>({
      query: userData => {
        return {
          url: `${controllerUrl}/oms/attachments/lpus`,
          params: userData,
        };
      },
      // queryFn: () => {
      //   return handleApiResponse('lpus', mockLpusData, { delay, errorRate });
      // },
    }),
    getLpusByDistrict: builder.query<ILpus[], { districtId: string }>({
      // query: ({ districtId }) =>
      // `${controllerUrl}/district/${districtId}/lpus`,
      queryFn: () => {
        return handleApiResponse('lpus', mockLpusData, { delay, errorRate });
      },
    }),
    getSpecialties: builder.query<ISpecialty[], { lpuId: string }>({
      // query: ({ lpuId }) => `${controllerUrl}/lpu/${lpuId}/specialties`,
      queryFn: () => {
        return handleApiResponse('specialties', mockSpecialtiesData, { delay, errorRate });
      },
    }),
    getDoctors: builder.query<IDoctor[], { lpuId: string; specialityId: string }>({
      // query: ({ lpuId, specialityId }) => `${controllerUrl}/lpu/${lpuId}/speciality/${specialityId}/doctors`,
      queryFn: () => {
        return handleApiResponse('doctors', mockDoctorsData, { delay, errorRate });
      },
    }),
    getTimetable: builder.query<ITimeTable[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/timetable`,
      queryFn: () => {
        return handleApiResponse('timetable', mockTimetableData, { delay, errorRate });
      },
    }),
    getAppointments: builder.query<IAppointment[], { lpuId: string; doctorId: string }>({
      // query: ({ lpuId, doctorId }) => `${controllerUrl}/lpu/${lpuId}/doctor/${doctorId}/appointments`,
      queryFn: () => {
        return handleApiResponse('appointments', mockAppointmentsData, {
          delay,
          errorRate,
        });
      },
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
