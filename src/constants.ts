// Пример данных аутентизации (в реальном приложении получать из API/контекста)
import { envConfig } from '@/config/env.ts';

export const AUTH_DATA = {
  userId: envConfig.userId,
  authToken: envConfig.authToken,
};

export const WIDGET_CONFIG = {
  roleContext: {
    'c7ec2fc0-982c-4ec1-ae84-c7ec1347ddfb': {
      idMPI: envConfig.mpiId,
      idIP: envConfig.ipId,
    },
  },
};