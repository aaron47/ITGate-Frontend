import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Tokens,
  UserDocument,
  UserInputDto,
} from '../utils/utility-type-exports';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserDocument, UserInputDto>({
      query: (userInput) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userInput,
      }),
    }),

    login: builder.mutation<UserDocument, UserInputDto>({
      query: (userInput) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInput,
      }),
    }),

    refreshToken: builder.mutation<Tokens, string>({
      query: (username) => ({
        url: '/auth/refresh',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('refresh_token'),
        },
        body: username,
      }),
    }),

    logout: builder.mutation<boolean, string>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
