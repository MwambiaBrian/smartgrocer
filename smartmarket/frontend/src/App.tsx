//import { useState } from 'react'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
  
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from './Shared/footer/Footer'
import Header from './Shared/header/Header'


import { useEffect, useState } from "react";
// import { getBusiness } from "./Slices/businessSlice";
import { AppDispatch, RootState } from "./Store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBusiness } from "./Slices/businessSlice";
import { setVehicle } from "./Slices/vehicleSlice";
import { ToastContainer } from "react-toastify";



function App() {
  //const [count, setCount] = useState(0)
  const isAuthenticated = useState() // Logic to check if the user is authenticated
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const fetchBusinessDetails = async (userId: any) => {
    const response = await axios.get(`http://localhost:5003/api/businesses/${userId}`);
    console.log(`from fetch${response.data.business}`)
    return response.data;
  };

  const fetchVehicleDetails = async (userId: any) => {
    const response = await axios.get(`http://localhost:5004/api/transports/${userId}`);
    console.log(`from fetch${response.data}`)
    return response.data;
  };
  
  useEffect(()=>{
    const getBusiness = async ()=>{
      const business = await fetchBusinessDetails(auth._id)
      console.log(`from app ${business}`)
      dispatch(setBusiness(business));
    }

    const getVehicle = async ()=>{
      const vehicle = await fetchVehicleDetails(auth._id)
      console.log(`from app ${vehicle}`)
      dispatch(setVehicle(vehicle));
    }
   getVehicle()
   getBusiness()
   
   console.log(`from app file ${auth._id}`)
  
  },[auth._id,dispatch])
  

  return (
    <div className='app'>
       <Header />
   
          <Outlet />
          {/* <ToastContainer /> */}
        <Footer />
    </div>
  )
}

export default App
