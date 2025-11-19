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
