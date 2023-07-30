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
        console.log("query starting");
        const data = await queryFulfilled;
        if (data.data.data) {
          const token = localStorage.getItem("token");
          const storeData = { accessToken: token, user: data.data.data };
          dispatch(setUser(storeData));
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyTokenMutation } =
  userApi;
