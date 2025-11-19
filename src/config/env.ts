interface EnvConfig {
  userId: string;
  authToken: string;
  mpiId: string;
  ipId: string;
  roleContextKey: string;
}

export const envConfig: EnvConfig = {
  userId: import.meta.env.VITE_USER_ID || '',
  authToken: import.meta.env.VITE_AUTH_TOKEN || '',
  mpiId: import.meta.env.VITE_MPI_ID || '',
  ipId: import.meta.env.VITE_IP_ID || '',

  roleContextKey: import.meta.env.VITE_ROLE_CONTEXT_KEY || '',
};

interface UrlConfig {
  url: string; // Базовый URL виджета
  host: string; // Хост для виджетов
  api: string; // API endpoint
  isProd: boolean; // Флаг production
}

export const getUrl = (): UrlConfig => {
  return {
    url: import.meta.env.VITE_NETRIKA_WIDGET_URL || 'https://r23-test.zdrav.netrika.ru',
    host:
      import.meta.env.VITE_NETRIKA_WIDGET_HOST || 'https://r23-test.zdrav.netrika.ru/tm.widgets',
    api:
      import.meta.env.VITE_NETRIKA_WIDGET_API || 'https://r23-test.zdrav.netrika.ru/tm-widgets/api',
    isProd: false,
  };
};
