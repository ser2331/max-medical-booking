import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import Config from '@/config/ajax-config.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: Config().BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as RootState;

    if (auth.sessionId) {
      headers.set('authorization', 'Bearer ' + auth.sessionId);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // api.dispatch(logout());
    console.log('LOGOUT');
  }
  return result;
};

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
