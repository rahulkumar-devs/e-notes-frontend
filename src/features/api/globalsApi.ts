import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authReducer";
import { RootState } from "@/store/store";

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
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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
    try {
      // Try to get a new token
      const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
      if (refreshResult.data) {
        // Store the new token
        api.dispatch(setCredentials(refreshResult.data as SignInResponse));

        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, logout the user
        api.dispatch(logOut());
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // If refresh fails, logout the user
      api.dispatch(logOut());
    }
  }

  return result;
};

const GlobalsApi = createApi({
  reducerPath: "FetchedApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequestBody>({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        body,
      }),
    }),
    refreshApi: builder.mutation<void, void>({
      query: () => ({
        url: "/refresh-token",
        method: "GET",
        body: null,
      }),
    }),

    bookApi: builder.query<any, void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
    userApi: builder.query<any, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    logOutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useRefreshApiMutation,
  useBookApiQuery,
  useLogOutUserMutation,
  useUserApiQuery,
} = GlobalsApi;
export default GlobalsApi;
