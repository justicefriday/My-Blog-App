import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' }) // empty base URL for now; is bacuse we use proxy at the vite, if not we can put here the backend URL eg 'http//localhost 5000'

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User','Blog'], 
    endpoints: (builder) => ({
        
    })
})