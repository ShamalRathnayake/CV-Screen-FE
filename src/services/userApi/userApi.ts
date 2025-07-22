import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../state/auth/authSlice";
import type { User } from "../authApi/authApi";

export type RegisterRequest = {
  email: string;
  password: string;
  designation: string;
  phoneNo: string;
  location: string;
};

type RegisterResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data?: {
    user: User;
    token?: string;
  };
  details?: string;
  meta?: {
    error: {
      code: string;
      message: string;
      details: string;
    };
  };
};

type PaymentResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "user/create",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status && data?.data?.user && data?.data?.token) {
            dispatch(
              setCredentials({
                token: data?.data?.token,
                user: data?.data?.user,
              })
            );
          }
        } catch (err) {
          console.error("Signup error:", err);
        }
      },
    }),
    payment: builder.query<PaymentResponse, void>({
      query: () => "user/payment",
    }),
  }),
});

export const { useSignupMutation, useLazyPaymentQuery } = userApi;
