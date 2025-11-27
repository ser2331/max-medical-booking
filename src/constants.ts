import { envConfig } from '@/config/env.ts';

export const AUTH_DATA = {
  userId: envConfig.userId,
  authToken: envConfig.authToken,
};

export const WIDGET_CONFIG = {
  roleContext: {
    [envConfig.roleContextKey]: {
      idMPI: envConfig.mpiId,
      idIP: envConfig.ipId,
    },
  },
};

export const testUser = {
  lastName: 'Титов',
  firstName: 'Иван',
  middleName: 'Романович',
  birthDate: '1991-08-28',
  gender: '1',
  snils: '706-778-899 63',
  polisN: '7941983111982141',
  polisS: '123456',
  phoneField: '+7 (905) 252-43-08',
  mail: 'i.titov.kem@mail.ru',
  comments: 'Тестовый пациент для демонстрации',
};
