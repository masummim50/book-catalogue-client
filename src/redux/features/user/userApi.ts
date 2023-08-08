import { api } from "../api/apiSlice";
import { setUser } from "./userSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signupData,
      }),
    }),
    verifyToken: builder.mutation({
      query: () => ({
        url: "/auth/verifyAccessToken",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          if (data.data.data) {
            const token = localStorage.getItem("token");
            const storeData = { accessToken: token, user: data.data.data };
            dispatch(setUser(storeData));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getLists: builder.query({
      query: () => ({
        url: "/wishlistAndReadingList",
        method:"GET"
      }),
      providesTags: ['lists']
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyTokenMutation, useGetListsQuery } =
  userApi;
