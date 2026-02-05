import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyBlogsQuery, useDeleteBlogMutation } from "../slices/blogApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DashBoardScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    
    const { data: blogs, isLoading, error } = useGetMyBlogsQuery();
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

   
    const navigate = useNavigate();
    
    useEffect(() => {
    console.log('🔐 User Info:', userInfo);
    
    if (!userInfo) {
        navigate('/login');
    }
    }, [userInfo, navigate]);
    
    // Handle delete
    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteBlog(id).unwrap();
                toast.success('Blog deleted successfully!');
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete blog');
            }
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-dark text-light min-vh-100 py-5">
                <div className="container">
                    <div className="alert alert-danger">
                        Error: {error?.data?.message || 'Failed to load blogs'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-dark text-light min-vh-100 py-5">
            <div className="container">
                {/* Welcome Card */}
                <div className="card bg-secondary border-0 shadow-lg mb-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-1">
                                Welcome, {userInfo.username} 👋
                            </h4>
                            <p className="mb-0 text-light-50">
                                You have posted <strong>{blogs?.length || 0}</strong> blog(s)
                            </p>
                        </div>

                        <Link to="/postblog" className="btn btn-warning fw-semibold">
                            + New Blog
                        </Link>
                    </div>
                </div>

                {/* Blog List */}
                <h5 className="mb-3 fw-semibold">Your Blogs</h5>

                {!blogs || blogs.length === 0 ? (
                    <div className="alert alert-dark text-center">
                        You haven't posted any blog yet.
                        <br />
                        <Link to="/postblog" className="btn btn-warning mt-3">
                            Create Your First Blog
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="col-md-6 col-lg-4"> 
                                <div className="card bg-secondary text-light border-0 shadow h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold">{blog.title}</h5>
                                        <p className="card-text flex-grow-1 text-muted">
                                            {blog.content.substring(0, 100)}
                                            {blog.content.length > 100 && '...'}
                                        </p>

                                        <small className="text-muted mb-3">
                                            Posted: {new Date(blog.created_at).toLocaleDateString()}
                                        </small>

                                        <div className="d-flex justify-content-between mt-3">
                                            <Link
                                                to={`/blog/${blog.id}`} 
                                                className="btn btn-dark btn-sm"
                                            >
                                                View
                                            </Link>

                                            <div>
                                                <Link 
                                                    to={`/blog/edit/${blog.id}`} 
                                                    className="btn btn-outline-light btn-sm me-2"
                                                >
                                                    Edit
                                                </Link>
                                                
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(blog.id, blog.title)}
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? '...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashBoardScreen;