import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'import.meta.env.VITE_API_URL', // Empty string works since we are using proxy
    credentials: 'include', // Important for cookies
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Blog'], 
    endpoints: (builder) => ({})
});