import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateBlogMutation } from "../slices/blogApiSlice";
import { useSelector,useDispatch} from "react-redux";
import { useGetBlogByIdQuery } from "../slices/blogApiSlice";
import { useParams } from "react-router-dom";

const UpdateBlogScreen = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

   const {id} =useParams()
  const navigate = useNavigate();
  const [updateBlog] = useUpdateBlogMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: blog} = useGetBlogByIdQuery(id);
  
  const dispatch = useDispatch();
  
 useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await updateBlog({ id, title, content }).unwrap();
        toast.success("Blog updated successfully");
        navigate(`/dashboard`);
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
};
 
  

  return (
    <div className="bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-secondary shadow-lg border-0">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Update Your Blog</h3>

                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label className="form-label">Blog Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Blog Content</label>
                    <textarea
                      className="form-control"
                      rows="6"
                      placeholder="Write your blog content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-dark w-100 mt-3">
                    Update Blog
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogScreen;
