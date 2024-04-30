import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/user/',
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)

      return headers;
    },  
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data
      }),
      transformResponse: (response: any) => response.token
    }),
    registration: builder.mutation({
      query: (data) => ({
        url: 'registration',
        method: 'POST',
        body: data
      }),
      transformResponse: (response: any) => response.token
    }),
    checkUser: builder.query({
      query: () => ({
        url: 'auth'
      })
    })
  }),
})

export const { useLoginMutation, useRegistrationMutation, useCheckUserQuery } = userApi;