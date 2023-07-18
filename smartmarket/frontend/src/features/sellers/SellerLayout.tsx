import { Outlet } from "react-router-dom"
import Header from "../../Shared/header/Header"
import Footer from "../../Shared/footer/Footer"
import axios from 'axios';
import React, { useEffect } from 'react'
import { setBusiness } from '../../Slices/businessSlice';
import { AppDispatch, RootState } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import { store } from "../../Store"
import { loadUser } from "../../Slices/authSlice"
import { getAllProducts } from "../../Slices/ProductsSlice"

function SellerLayout() {
  store.dispatch(loadUser())
 
store.dispatch(getAllProducts())
const auth = useSelector((state: RootState) => state.auth);
 
 // store.dispatch(setBusiness(business))
 
    return (
    <>
    <Header />
    <Outlet />
      
    </>
    )
  }
  
  export default SellerLayout