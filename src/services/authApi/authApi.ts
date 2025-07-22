import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../state/auth/authSlice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  designation: string;
  phoneNo: string;
  location: string;
}

interface LoginResponse {
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
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
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
          console.error("Login error:", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
