import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

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
  const onSubmit = (e: any) => {
    console.log()
    e.preventDefault();
    if (authMode==="signin") {
      console.log(auth);
      dispatch(loginUser(user));
      console.log(auth)
    } else {
      console.log(reg_user);
      dispatch(registerUser(reg_user));
    }
    
         
  };
  if (authMode === "signin") {
   

  // useEffect(() => {
  //   if (auth._id) {
  //     navigate("/home");
  //   }
  // }, [auth._id, navigate]);

 
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                  {...register("email", {
                    required: "Email is Required...",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Email must be valid",
                    },
                  })}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              /> 
           

            </div>
            {errors.email && <p >{errors.email.message as string}</p>}
            <div className="form-group mt-3">
              <label>Password</label>
              <input
              {...register("password", {
                required: "Password is Required...",
                // pattern: {
                //   value:
                //     /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                //   message:
                //     "Password Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
                // },
              })}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
             

            </div>
            {errors.password && <p className="">{errors.password.message as string}</p>}
            <div className="d-grid gap-2 mt-3">
              <input type="submit" className="btn btn-primary" onClick={onSubmit} />
                
              
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  } 


 

 
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                      {...register("fullName", {
                        required: "name is Required...",
                        minLength: {
                          value: 6,
                          message: "name must be atleast 3 characters long...",
                        },
                        maxLength: {
                          value: 30,
                          message: "name must be atmost 30 characters long...",
                        },
                      })}
            
              type="text"
              className="form-control mt-1"
              placeholder="e.g Abdul Brian "
              value={reg_user.name}
              onChange={(e) => setReg_user({ ...reg_user, name: e.target.value })}
            />
          

          </div>
          {errors.fullName && <p className="">{errors.fullName.message as string}</p>}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
             {...register("email", {
              required: "Email is Required...",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email must be valid",
              },
            })}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={reg_user.email}
              onChange={(e) => setReg_user({ ...reg_user, email: e.target.value })}
            />
          

          </div>
          {errors.email && <p >{errors.email.message as string}</p>}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
            {...register("password", {
              required: "Password is Required...",
              // pattern: {
              //   value:
              //     /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
              //   message:
              //     "Password Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
              // },
            })}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={reg_user.password}
              onChange={(e) => setReg_user({ ...reg_user, password: e.target.value })}
            />
                         

          </div>
          {errors.password && <p className="">{errors.password.message as string}</p>}
          <div className="d-grid gap-2 mt-3">
            <input placeholder="Register" type="submit" className="btn btn-primary" onClick={onSubmit}/>
           
          </div>
       
        </div>
      </form>
    </div>)


  
}