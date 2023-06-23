import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url, setHeaders} from "./api";


interface Product {
 // businessId: string
 _id: string;
 name: string;
  category: string;
  img: string;
  price: number;

  desc: string;
 
}
interface ProductState {
  data: Product [];
  status:string;
  createStatus: string,
 
  

}

interface CreateProductValues {
  name: string;
  category: string;
  price: number;
  img: string;
  desc: string;
}

const url_api="http://localhost:5003/api"

export const createProduct = createAsyncThunk<Product, CreateProductValues, { rejectValue: string }>(
  "product/createProduct",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url_api}/products`, {
        name: values.name,
        category: values.category,
        price: values.price,
        img: values.img,
        desc: values.desc
      });
      console.log(response.data.product)

      return response.data.product;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return rejectWithValue(error.response?.data);
          }
      
          throw error;
    }
  }
);

export const getProduct = createAsyncThunk<Product, Product, { rejectValue: string }>(
  "products/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product>(`${url_api}/products/${id}`, setHeaders());

  

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

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ( ) => {
    try {
      const response = await axios.get<Product []>(`${url_api}/products`);

  console.log(response.data)

      return response?.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return (error.response?.data);
          }
      
          throw error;
    }
  }
);

const initialState : ProductState= {
  data: [],
 status: "",
 createStatus: ""
 
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  

  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
       // const user = jwtDecode<User>(action.payload);
       state.createStatus="success"
       const product = action.payload
        console.log(product)
        return state
      } else return state;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        registerError: action.payload ?? "", // Use an empty string as the default value if RegisterError is undefined
      };
    });
  
    builder.addCase(getProduct.pending, (state) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      if (action.payload) {
     
        const product = action.payload
   

        return state
      } else return state;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.status = "rejected"
      
    });

    builder.addCase(getAllProducts.pending, (state) => {
      state.status = "pending"
      
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if (action.payload) {
      //  const user = jwtDecode<User>(action.payload);
         state.data=action.payload
         state.status = "successful"
  
       
      } else return state;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.status = "rejected"
      
    });
  },
});




export default productSlice.reducer;
