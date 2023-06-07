import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import {
  createBrowserRouter,
  
  RouterProvider
 
} from "react-router-dom";

import App from './App'
import './index.css'
import Auth from './features/authentication/Account/Auth';

import Resetpassword from './features/authentication/ForgotPassword/Resetpassword';
import BusinessForm from './features/business/Business/BusinessForm';
import Inventory from './features/business/Inventory/Inventory';
import Orders from './features/business/Orders/Orders';
import Verification from './features/authentication/Verification/Verification';
import Landing from './features/LandingPage/Landing';

import { Provider } from "react-redux";
import { store } from './Store';
import Checkout from './features/checkout/Checkout';
import Product from './features/Product/Product';

import Unauthorized from './features/authentication/Unauthorized';

import { loadUser } from './Slices/authSlice';
import Protected from './features/authentication/Protected';


store.dispatch(loadUser())

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  
    children:[
    {
      path: "home",
      // element:<Landing /> 
      element:<Protected><Landing /></Protected> 
    
    },
    {
      path: "checkout",
      element: <Checkout />
    
    },
    {
      path: "product",
      element: <Product />
    
    }
    
    ]

  },
  { 
    
    element: <App/>,
    
      children: [
      
        {
          path: "verify",
          element: <Verification />,
        },
        {
          path: "/auth",
          element: <Unauthorized><Auth /></Unauthorized>
          
        },
        {
          path: "reset",
          element: <Resetpassword />
        }
      ],
    
  },
  { 
    path:'/business',
    element: <App/>,
    
      children: [
      
        {
          path: "create",
          element: <BusinessForm />,
        },
        {
          path: "inventory",
          element: <Inventory />,
          children: [
           
          ]
        },
        {
          path: "orders",
          element: <Orders />
        },
        {
          path: "add",
          element: <Orders />
        }
      ],
    
  },
 
  { 
    path:'/delivery',
    element: <App/>,
    
      children: [
        {
          path: "newtransport",
          element: <BusinessForm />,
        },
        {
          path: "home",
          element: <BusinessForm />,
        },
        {
          path: "orders",
          element: <Inventory />,
          children: [
           
          ]
        },
        {
          path: "profile",
          element: <Orders />
        }
      ],
    
  },
  { 
    path:'/admin',
    element: <App/>,
    
      children: [
        {
          path: "businesses",
          element: <BusinessForm />,
        },
        {
          path: "deliveries",
          element: <BusinessForm />,
        },
        {
          path: "transport",
          element: <Inventory />,
          children: [
           
          ]
        },
        {
          path: "customers",
          element: <Orders />
        },
        {
          path: "orders",
          element: <Orders />
        }
      ],
    
  }
]
  
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
   
  </React.StrictMode>
)
