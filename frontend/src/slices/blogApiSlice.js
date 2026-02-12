
import { apiSlice } from "./apiSlice";
const BLOG_URL = '/api/blog'; 

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get MY blogs
        getMyBlogs: builder.query({
            query: () => `${BLOG_URL}/my-blogs`,
            providesTags: (result) => 
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Blog', id })),
                        { type: 'Blog', id: 'MY_LIST' },
                      ]
                    : [{ type: 'Blog', id: 'MY_LIST' }],
        }),
        
        // Get all blogs (public)
        getAllBlogs: builder.query({
            query: () => `${BLOG_URL}`,
            providesTags: (result) => 
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Blog', id })),
                        { type: 'Blog', id: 'ALL_LIST' },
                      ]
                    : [{ type: 'Blog', id: 'ALL_LIST' }],
        }),
        
        // Get single blog
        getBlogById: builder.query({
            query: (id) => `${BLOG_URL}/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id }],
        }),
        
        // Create blog
        createBlog: builder.mutation({
            query: (blogData) => ({
                url: `${BLOG_URL}/create`,
                method: 'POST',
                body: blogData,
            }),
            invalidatesTags: [
                { type: 'Blog', id: 'MY_LIST' },
                { type: 'Blog', id: 'ALL_LIST' },
            ],
        }),
        
        // Update blog
        updateBlog: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${BLOG_URL}/${id}`,  
                method: 'PUT',
                body: data,  
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Blog', id },
                { type: 'Blog', id: 'MY_LIST' },
                { type: 'Blog', id: 'ALL_LIST' },
            ],
        }),
        
        // Delete blog
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${BLOG_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Blog', id },
                { type: 'Blog', id: 'MY_LIST' },
                { type: 'Blog', id: 'ALL_LIST' },
            ],
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