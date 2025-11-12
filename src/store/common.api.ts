import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import Config from '@/config/ajax-config.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: Config().BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    if (!state) {
      return headers;
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
    // api.dispatch()
  }
  return result;
};

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 60,
});
