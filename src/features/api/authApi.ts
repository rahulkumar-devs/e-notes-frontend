import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authReducer";

interface SignInResponse {
  accessToken: string;
  user: null;
}

interface SignInRequestBody {
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).persisted.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    // Try to get a new token
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    console.log("refreshResult", refreshResult);
    if (refreshResult.data) {
      // Store the new token
      api.dispatch(setCredentials(refreshResult.data as SignInResponse));

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

const signinFetchApi = createApi({
  reducerPath: "FetchedApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequestBody>({
      query: (body) => ({
        url: "/signin", // Adjust the endpoint URL as per your API
        method: "POST",
        body,
      }),
    }),
    refreshApi: builder.mutation<void, void>({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
        body: null,
      }),
    }),

    bookApi: builder.query<any, void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignInMutation, useRefreshApiMutation ,useBookApiQuery} = signinFetchApi;
export default signinFetchApi;
