import React, { useEffect, useState } from "react"


import './Auth.css'

/*React-router for browser routing*/ 
import { useNavigate } from "react-router-dom";

/*React-redux with redux-toolkit */ 
import { useDispatch, useSelector } from "react-redux";

/*Redux-toolkit*/ 
import { AppDispatch, RootState } from "../../../Store";
import { loginUser, registerUser } from "../../../Slices/authSlice";

export default function () {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
   useEffect(() => {
    if (auth._id) {
      console.log(auth)
      navigate("/");
    }
  }, [auth._id, navigate]);
//console.log(auth)
    const [reg_user, setReg_user] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
   

  // useEffect(() => {
  //   if (auth._id) {
  //     navigate("/home");
  //   }
  // }, [auth._id, navigate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(auth);
    dispatch(loginUser(user));
    console.log(auth)
         
  };
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  } 


 

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(reg_user);
    dispatch(registerUser(reg_user));
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Abdul Brian "
              value={reg_user.name}
              onChange={(e) => setReg_user({ ...reg_user, name: e.target.value })}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={reg_user.email}
              onChange={(e) => setReg_user({ ...reg_user, email: e.target.value })}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={reg_user.password}
              onChange={(e) => setReg_user({ ...reg_user, password: e.target.value })}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
       
        </div>
      </form>
    </div>)


  
}