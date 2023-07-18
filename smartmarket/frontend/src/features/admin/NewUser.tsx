import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { loginUser, registerUser } from "../../Slices/authSlice";
import axios from "axios";

export default function () {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
  });
  const registerUser = async (data: object) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", data);
      console.log(`User created successfully ${data}`);
      return response.data
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const [reg_user, setReg_user] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const onSubmit = async (data: any) => {
    try {
      // Collect additional data from the reg_user state
      const { name, email, password } = reg_user;
  
      // Collect checkbox data from the form
      const { seller, driver } = data;
  
      // Combine the collected data and form data
      const newUser = { name, email, password, role: [] as string[] };
  console.log("new user"+newUser)
      // Add checkbox data to the newUser object
      if (seller) {
        newUser.role.push("seller");
      }
      if (driver) {
        newUser.role.push("driver");
      }
      console.log("new user"+newUser)
      // Call the registerUser function to submit the data
      const response = await registerUser(newUser);
  
      console.log("User created successfully");
      console.log(response); // Optional: Log the response data
  
      // Redirect to the desired page after successful registration
      navigate("/admin"); // Replace "/success" with the desired page URL
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
  

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setValue(name, checked);
  
    // Update the newUser object with checkbox values
    setReg_user((prevUser) => ({
      ...prevUser,
      role: checked ? name : '',
    }));
  };
  
  return (
    <div className="Auth-form-container">
    
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create New User</h3>
       
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
          <div className="form-group mt-3">
          <div className="form-group mt-3">
  <label>Role</label>
  <div>
    <label>
      <input
        type="checkbox"
        name="seller"
        onChange={handleCheckboxChange}
      />
      Seller
    </label>
  </div>
  <div>
    <label>
      <input
        type="checkbox"
        name="driver"
        onChange={handleCheckboxChange}
      />
      Driver
    </label>
  </div>
</div>


          </div>
          <div className="d-grid gap-2 mt-3">
            <input placeholder="Register" type="submit" className="btn btn-primary" onClick={onSubmit}/>
           
          </div>
       
        </div>
      </form>
    </div>
  );
}
