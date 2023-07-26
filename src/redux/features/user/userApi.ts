import { api } from "../api/apiSlice";

const userApi = api.injectEndpoints({
    endpoints: (builder)=> ({
        login: builder.mutation({
            query: (loginData)=> ({
                url: "/auth/login",
                method: 'POST',
                body: loginData
            })
        }),
        signup: builder.mutation({
            query: (signupData)=> ({
                url: "/auth/signup",
                method: 'POST',
                body: signupData
            })
        }),
    })
})

export const {useLoginMutation, useSignupMutation} = userApi;