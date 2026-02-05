import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllBlogsQuery } from "../slices/blogApiSlice";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: blogs, isLoading, error } = useGetAllBlogsQuery();

  const allBlogs = blogs || [];

  return (
    <div className="bg-dark text-light min-vh-100">

      {/* HERO SECTION */}
      <div className="py-5 text-center bg-secondary shadow">
        <div className="container">
          <h1 className="fw-bold display-5">Welcome to BlogSpace </h1>
          <p className="lead">
            Please Register to Share your thoughts, stories, and ideas with the world.
          </p>

          {userInfo ? (
            <Link to="/postblog" className="btn btn-warning btn-lg mt-3">
              Create a Blog
            </Link>
          ) : (
            <div className="mt-3">
              <Link to="/login" className="btn btn-warning btn-lg me-3">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* BLOG LIST SECTION */}
      <div className="container py-5">
        <h3 className="mb-4 fw-semibold">Latest Blogs</h3>

        {isLoading && <div className="alert alert-info">Loading blogs...</div>}

        {error && (
          <div className="alert alert-danger">Failed to load blogs</div>
        )}

        {!isLoading && allBlogs.length === 0 && (
          <div className="alert alert-dark text-center">
            No blogs have been posted yet.
          </div>
        )}

        <div className="row g-4">
          {allBlogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4">
              <div className="card bg-secondary text-light border-0 shadow h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="card-text flex-grow-1">
                    {blog.content.substring(0, 120)}...
                  </p>

                  <Link
                    to={`/blog/${blog.id}`}
                    className="btn btn-dark mt-3"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;
