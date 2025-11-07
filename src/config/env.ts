interface EnvConfig {
  userId: string;
  authToken: string;
  mpiId: string;
  ipId: string;
}

export const envConfig: EnvConfig = {
  userId: import.meta.env.VITE_USER_ID || '',
  authToken: import.meta.env.VITE_AUTH_TOKEN || '',
  mpiId: import.meta.env.VITE_MPI_ID || '',
  ipId: import.meta.env.VITE_IP_ID || '',
};

export const getUrl = () => {
  return {
    url: import.meta.env.VITE_NETRIKA_WIDGET_URL,
    host: import.meta.env.VITE_NETRIKA_WIDGET_HOST,
    api: import.meta.env.VITE_NETRIKA_WIDGET_API,
  };
};