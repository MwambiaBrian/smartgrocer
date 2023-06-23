import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders} from "./api";


interface Business {
  type: string;
  ownerId: string;
  name: string;
  email: string
  desc: string;
  id: string;
}
interface BusinessState {
  businesses: Business [];
 


}

interface CreateBusinessValues {
  name: string;
  type: string;
  businessEmail: string;
ownerId: string;
desc:string
}

const url_api="http://localhost:5003/api"

export const createBusiness = createAsyncThunk<Business, CreateBusinessValues, { rejectValue: string }>(
  "business/createBusiness",
  async (values, { rejectWithValue }) => {
    console.log(values)
    try {
      const response = await axios.post(`${url_api}/businesses`, {
        name: values.name,
        type: values.type,
        businessEmail: values.businessEmail,
       ownerId: values.ownerId,
        desc: values.desc
      });
      console.log(response.data)

     

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

export const getBusiness = createAsyncThunk<Business, string, { rejectValue: string }>(
  "businesses/getBusiness",
  async (id, { rejectWithValue }: any) => {
    console.log(typeof id)
    try {
      const response = await axios.get(`${url_api}/businesses/${id}`, setHeaders());
      console.log(response)
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

export const getAllBusinesses = createAsyncThunk<Business [], Business[], { rejectValue: string }>(
  "business/getAllBusinesses",
  async ( { rejectWithValue }: any) => {
    try {
      const response = await axios.get<Business []>(`${url}/businesses`, setHeaders());

  

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

const initialState: BusinessState = {
  businesses: [],

 
 
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBusiness.pending, (state) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(createBusiness.fulfilled, (state, action) => {
      if (action.payload) {
       // const user = jwtDecode<User>(action.payload);
       const business = action.payload
        //console.log(business)
        // state.name=product.name
        // state.price=product.price
        // state._id=product.id
        // state.addStatus="success"
       
      
        
        // console.log(state._id)
        return state
      } else return state;
    });
    builder.addCase(createBusiness.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        registerError: action.payload ?? "", // Use an empty string as the default value if RegisterError is undefined
      };
    });
  
    builder.addCase(getBusiness.pending, (state) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getBusiness.fulfilled, (state, action) => {
      if (action.payload) {
       
        console.log(action.payload)
        
        // state.name=product.name
        // state.price=product.price
        // state._id=product.id
        // state.addStatus="success"

        return  {...state, myBusiness:action.payload}
      } else return state;
    });
    builder.addCase(getAllBusinesses.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });

    builder.addCase(getAllBusinesses.pending, (state) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getAllBusinesses.fulfilled, (state, action) => {
      if (action.payload) {
      //  const user = jwtDecode<User>(action.payload);
     
        state.businesses = action.payload
    

        return state
      } else return state;
    });
    builder.addCase(getBusiness.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});




export default businessSlice.reducer;
