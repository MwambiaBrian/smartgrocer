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


import { useState } from "react";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <Route path='auth' element={<Auth />} />
    
//     </>
    
  
//   ))

function App() {
  //const [count, setCount] = useState(0)
  const isAuthenticated = useState() // Logic to check if the user is authenticated

  return (
    <div className='app'>
       <Header />
       {/* <RouterProvider router={router} /> */}
        {/* <Switch>
          <Route path="/auth" Component={Auth} />
          <Route  path="/reset" element={<Auth />} />
          <Route  path="/verifyy" element={<Verification />} />
        </Switch> */}
          <Outlet />
        <Footer />
    </div>
  )
}

export default App
