import { apiSlice } from "./apiSlice";
import { logOut, setCredentials, setIsLoading } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (Builder) => ({
    signup: Builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: { ...credentials },
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials(accessToken));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),

    login: Builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        credentials: "include",
        body: { ...credentials },
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setIsLoading(false));
        }
      },
      providesTags: "auth",
    }),

    sendLogout: Builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),

    refresh: Builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true));
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials(accessToken));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setIsLoading(false));
        }
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
