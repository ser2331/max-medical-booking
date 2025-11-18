export const mockQueryFn = <T>(
  url: string,
  mockData: T,
  options?: {
    delay?: number;
    shouldError?: boolean;
    errorMessage?: string;
    errorRate?: number;
    errorCode?: number;
  },
): Promise<{
  data: {
    result: T;
    success: boolean;
    errorCode: number;
    message: string | null;
    stackTrace: string | null;
  };
}> => {
  return new Promise((resolve, reject) => {
    const delay = options?.delay || 500;
    const shouldError = options?.shouldError || false;
    const errorRate = options?.errorRate || 0;
    const errorCode = options?.errorCode || 500;
    const errorMessage = options?.errorMessage || 'Произошла случайная ошибка';

    // Генерируем случайную ошибку
    const randomError = Math.random() < errorRate;

    setTimeout(() => {
      if (shouldError || randomError) {
        console.error(`❌ Mock error for: ${url}`, errorMessage);

        // Возвращаем ошибку в формате API
        reject({
          data: {
            result: null,
            success: false,
            errorCode: errorCode,
            message: errorMessage,
            stackTrace: 'Mock stack trace for debugging',
          },
        });
      } else {
        console.log(`🔧 Mock response for: ${url}`);
        // Возвращаем успешный ответ в формате API
        resolve({
          data: {
            result: mockData,
            success: true,
            errorCode: 0,
            message: null,
            stackTrace: null,
          },
        });
      }
    }, delay);
  });
};

// Хелпер для обработки API ответов
export const handleApiResponse = async <T>(
  endpoint: string,
  mockData: T[],
  options?: { delay?: number; errorRate?: number },
) => {
  try {
    const response = await mockQueryFn(endpoint, mockData, options);

    if (!response.data.success) {
      throw new Error(response.data.message || `Ошибка загрузки ${endpoint}`);
    }

    return { data: response.data.result };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } catch (error: never) {
    if (error.data) {
      return {
        error: {
          status: error.data.errorCode,
          data: error.data.message,
        },
      };
    }
    return { error };
  }
};
