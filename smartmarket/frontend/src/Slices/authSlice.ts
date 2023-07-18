import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url, setHeaders} from "./api";

interface User {
  name: string;
  email: string;
  id: string;
  role: string;
}

interface AuthState {
  token: string | null;
  name: string;
  email: string;
  _id: string;
  role: string;
 
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  userLoaded: boolean;
}

interface RegisterUserValues {
  name: string;
  email: string;
  password: string;
}

interface LoginUserValues {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<string, RegisterUserValues, { rejectValue: string }>(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log(response.data.token)

      localStorage.setItem("token", response.data.token);

      return response.data.token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return rejectWithValue(error.response?.data);
          }
      
          throw error;
    }
  }
);

export const loginUser = createAsyncThunk<string, LoginUserValues, { rejectValue: string }>(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/signin`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return rejectWithValue(error.response?.data);
          }
      
          throw error;
    }
  }
);

export const getUser = createAsyncThunk<string, string, { rejectValue: string }>(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<string>(`${url}/users/${id}`, setHeaders());

      localStorage.setItem("token", response.data);

      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return rejectWithValue(error.response?.data);
          }
      
          throw error;
    }
  }
);

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  role: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state) => {
      const token = state.token;

      if (token) {
        const user = jwtDecode<User>(token);
        console.log(`loaded user: ${user.name}`)
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user.id,
          role: user.role,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        name: "",
        email: "",
        _id: "",
        role: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode<User>(action.payload);
        console.log(user)
        state.name=user.name
        state.email=user.email
        state._id=user.id
        state.role=user.role
        state.registerStatus="success"
        state.token=action.payload;
      
        
        //console.log(state._id)
        return state
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload ?? "", // Use an empty string as the default value if RegisterError is undefined
      };
    });
    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode<User>(action.payload);
        console.log(user)
       
        state.name=user.name
        state.email=user.email
       
        state._id=user.id
        state.role=user.role
        state.loginStatus = "success"
        state.token=action.payload;
        console.log(state._id)
        return state
      
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload ?? "", // Use an empty string as the default value if loginError is undefined
      };
    });
    builder.addCase(getUser.pending, (state) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode<User>(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user.id,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
