import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/application/',
    prepareHeaders: (headers) => {
        headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
        return headers;
    },  
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
        query: () => ({
            url: ''
        }),
    }),
    getByUser: builder.query({
        query: (id) => ({
            url: `/${id}`
        }),
    }),
    createApplication: builder.mutation({
        query: (data) => ({
            url: '',
            method: 'POST',
            body: data
        })
    }),
    updateStatusApplication: builder.mutation({
        query: (data) => ({
            url: '',
            method: 'PATCH',
            body: data
        })
    }),
  }),
})

export const { useGetAllQuery, useGetByUserQuery, useCreateApplicationMutation, useUpdateStatusApplicationMutation } = applicationApi;