import { apiSlice } from './apiSlice';

const BlOG_URL = '/api/blog';

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get MY blogs
        getMyBlogs: builder.query({
            query: () => `${BlOG_URL}/my-blogs`,
            method:'GET'
        }),
        
        // Get all blogs (public)
        getAllBlogs: builder.query({
            query: () => `${BlOG_URL}`,
        }),
        
        // Get single blog
        getBlogById: builder.query({
            query: (id) => `${BlOG_URL}/${id}`,
            // providesTags: (result, error, id) => [{ type: 'Blog', id }],
        }),
        
        // Create blog
        createBlog: builder.mutation({
            query: (blogData) => ({
                url: `${BlOG_URL}/create`,
                method: 'POST',
                body: blogData,
            }),
        }),
        
         updateBlog: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${BlOG_URL}/${id}`,  
                method: 'PUT',
                body: data,  
            }),
        }),
        // Delete blog
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${BlOG_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { 
    useGetMyBlogsQuery,
    useGetAllBlogsQuery,
    useGetBlogByIdQuery, 
    useCreateBlogMutation, 
    useUpdateBlogMutation, 
    useDeleteBlogMutation 
} = blogApiSlice;