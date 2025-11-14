// api/services/utils.ts
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const mockQueryFn = <T>(
  url: string,
  mockData: T,
  options?: { delay: number },
): Promise<{ data: T }> => {
  return new Promise(resolve => {
    // Имитируем задержку сети
    setTimeout(() => {
      console.log(`🔧 Mock response for: ${url}`);
      resolve({ data: mockData });
    }, options?.delay || 500);
  });
};

// Альтернативная версия с правильной типизацией для RTK Query
export const createMockQueryFn = <T>(
  mockData: T,
): BaseQueryFn<string | FetchArgs, T, FetchBaseQueryError> => {
  return async () => {
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('🔧 Using mock data');
    return { data: mockData };
  };
};
