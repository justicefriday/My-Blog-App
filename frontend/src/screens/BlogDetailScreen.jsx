import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlogByIdQuery } from "../slices/blogApiSlice";

const BlogDetailScreen = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useGetBlogByIdQuery(id);

  if (isLoading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-5">Something went wrong</h2>;
  }

  if (!blog) {
    return <h2 className="text-center mt-5">Blog not found</h2>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">

        <div className="card-body p-4">

          <Link
            className="btn btn-outline-dark mb-3 d-inline-flex align-items-center gap-2"
            to="/blogs"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Blogs
          </Link>

          <h1 className="mb-3">{blog.title}</h1>

          <div className="text-muted mb-3">
            <i className="fas fa-user me-2"></i>
            {blog.username}
          </div>

          <p style={{ lineHeight: "1.9", fontSize: "18px" }}>
            {blog.content}
          </p>

        </div>

      </div>
    </div>
  );
};

export default BlogDetailScreen;
