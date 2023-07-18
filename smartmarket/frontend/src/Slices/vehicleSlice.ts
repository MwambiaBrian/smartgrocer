import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders} from "./api";


interface Vehicle {

  ownerId: string;
  vehicleNumber: string;
  vehicleEmail: string;
  vehicleType: string;
  _id: string;
  stage: object
}
interface VehicleState {
  vehicle: Vehicle;
 


}



const url_api="http://localhost:5003/api"






const initialState: VehicleState = {
  vehicle: {
    ownerId: "",
    vehicleNumber: "",
    vehicleEmail: "",
    vehicleType: "",
    _id: "", 
    stage: {}

  } ,

 
 
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
   

  },
});



export const { setVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
