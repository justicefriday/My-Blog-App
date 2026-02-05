import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect ,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/AuthSlice.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

 

  const submitHandler = async (e) => {
    e.preventDefault();
  if (!email || !password) {
    toast.error('Please provide all fields');
    return;
  }

   try {
     const res = await login({ email, password }).unwrap();
     dispatch(setCredentials({ ...res }));
     toast.success('Login Successful');
     navigate('/dashboard');
   } catch (err) {
     toast.error(err?.data?.message || err.error);
    }
    
   }

  return (
    <div className="bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card bg-secondary shadow-lg border-0">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Login to Your Account</h3>

                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-dark w-100 mt-3">
                    Login
                  </button>
                </form>

                <p className="text-center mt-3 mb-0">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-warning">
                    Register
                  </Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
