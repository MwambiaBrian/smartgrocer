import React, { Children } from 'react';
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

import Verification from './features/authentication/Verification/Verification';
import Landing from './features/LandingPage/Landing';

import { Provider } from "react-redux";

import Checkout from './features/checkout/Checkout';
import Product from './features/Product/Product';

import Unauthorized from './features/authentication/Unauthorized';

import { loadUser } from './Slices/authSlice';
import Protected from './features/authentication/Protected';
import AdminDashboard from './features/admin/Dashboard';
import SellerDashboard from './features/sellers/Dashboard';
import DriverDashboard from './features/delivery/Dashboard';
// import Create from './features/Product/AddProduct';

import Cart from './features/cartPage/CartPage';
import { getAllProducts } from './Slices/ProductsSlice';

import SellerLayout from './features/sellers/SellerLayout';
import AdminLayout from './features/admin/AdminLayout';
import DeliveryLayout from './features/delivery/DeliveryLayout';
import { store } from './Store';
import CreateProduct from './features/sellers/CreateProduct';
import Products from './features/sellers/Products';
import Summary from './features/sellers/Summary';
// import ProductsList from './features/sellers/ProductsList';
import Deliveries from './features/delivery/Deliveries';
import Overview from './features/admin/Overview';
import NewTransport from './features/delivery/NewTransport';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductsList from './features/sellers/ProductsList';
import MyOrders from './features/sellers/MyOrders';
import Businesses from './features/admin/Businesses';
import Orders from './features/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignedOrders from './features/delivery/AssigneOrders';
import AllOrders from './features/admin/AllOrders';
import Vehicles from './features/admin/Vehicles';
import AllProducts from './features/admin/Products';
import Users from './features/admin/users';
import UsersList from './features/admin/UsersList';
import NewUser from './features/admin/NewUser';



store.dispatch(loadUser())
store.dispatch(getAllProducts())

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  
    children:[

    {
      index:true,
     
      // element:<Landing /> 
      element:<Protected><Landing /></Protected> 
    
    },
    {
      path: "orders",
      element: <Orders />,
     },
    {
      path: "business",
      element: <BusinessForm />,
     },
     {
      path: "transport",
      element: <NewTransport />,
    },
    {
      path: "checkout",
      element: <Checkout />
    
    },
    {
      path: "product",
      element: <Product />
    
    },
    {
      path: "cart",
      element: <Cart />
    
    },
    {
      path: "verify",
      element: <Verification />,
    },
    {
      path: "/auth",
      element: <Unauthorized><Auth /></Unauthorized>
      // element: <Auth />
    },
    {
      path: "reset",
      element: <Resetpassword />
    }
    // {
    //   path: "add",
    //   element: <AddProduct />
    
    // }
    
 
    // {
    //   path: "seller-dashboard",
    //   element:<Protected><SellerDashboard /></Protected> 
    
    // },
   
    ]

  },
  {
    
    path: "seller",
    element: <SellerDashboard />, children: [
      {
        index: true,
   
        element: <Summary />
      
       },

       {
        path: "orders" ,
   
        element: <MyOrders />
      
       },
  
  
     {
      path: "products",
      element: <Products />,
      children:[
        {
          index:true,
          element: <ProductsList />
        
         },
     
      ]
    
     },
  
     {
      path: "add",
      element: <CreateProduct />
    
     }
  
  ]},

  {
    path: "admin",
    element: <AdminDashboard />, children: [

    {
      index: true,
      element:<Protected><Overview /></Protected> 
    
    },
    {
      path: "orders",
      // element:<Protected><Orders /></Protected> 
      element:<AllOrders />
    },
     {
       path: "vehicles",
       element:<Vehicles /> 
    
     },
     {
      path: "products",
      element:<AllProducts /> 
   
    },
    {
      path: "deliveries",
      element:<AllProducts /> 
   
    },
    {
      path: "users",
      element: <Users />,
      children:[
        {
          index:true,
          element: <UsersList />
        
         },
     
      ]
    
     },
  
     {
      path: "add",
      element: <NewUser />
    
     },
 
    {
      path: "businesses",
      element:<Protected><Businesses /></Protected> 
    
    },
  ]},
  {
    path: "driver",
    element: <DriverDashboard />, children: [

    {
      index: true,
      element: <Protected><Deliveries /></Protected> 
    
    },
    {
      path: "orders",
      // element: <Protected><Deliveries /></Protected> 
      element: <AssignedOrders /> 
    
    },
  
  ]},
 
  // { 
   
  //   element: <App/>,
    
  //     children: [
      
  //       // {
  //       //   path: "business",
  //       //   element: <BusinessForm />,
  //       // },
  //       {
  //         path: "inventory",
  //         element: <Inventory />,
  //         children: [
           
  //         ]
  //       },
  //       {
  //         path: "orders",
  //         element: <Orders />
  //       },
  //       {
  //         path: "add",
  //         element: <Orders />
  //       }
  //     ],
    
  // },
 
  // { 
  //   path:'/delivery',
  //   element: <App/>,
    
  //     children: [
  //       // {
  //       //   path: "newtransport",
  //       //   element: <BusinessForm />,
  //       // },
  //       {
  //         path: "home",
  //         element: <BusinessForm />,
  //       },
  //       {
  //         path: "orders",
  //         element: <Inventory />,
  //         children: [
           
  //         ]
  //       },
  //       {
  //         path: "profile",
  //         element: <Orders />
  //       }
  //     ],
    
  // },
  // { 
  
  //   element: <App/>,
    
  //     children: [
  //       {
  //         path: "businesses",
  //         element: <BusinessForm />,
  //       },
  //       {
  //         path: "deliveries",
  //         element: <BusinessForm />,
  //       },
  //       {
  //         path: "transport",
  //         element: <Inventory />,
  //         children: [
           
  //         ]
  //       },
  //       {
  //         path: "customers",
  //         element: <Orders />
  //       },
  //       {
  //         path: "orders",
  //         element: <Orders />
  //       }
  //     ],
    
  // }
]
  
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  

    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
     <ToastContainer />
    </Provider>
    </QueryClientProvider>
   
  </React.StrictMode>
)
