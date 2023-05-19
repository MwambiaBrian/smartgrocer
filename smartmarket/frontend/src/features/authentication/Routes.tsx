// src/features/FeatureModule/routes.js

import { createBrowserRouter,  createRoutesFromElements,  Route,  RouterProvider } from 'react-router-dom';
import AuthComponent from './Account/Auth';
import Resetpassword from './ForgotPassword/Resetpassword';
import Verification from './Verification/Verification';

const Auth = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<AuthComponent />} />
      <Route path='reset' element={<Resetpassword />} />
    </>
    
  
  ))



// function Auth () {
 
//   return ( 
//   <main>
// <RouterProvider router={router} />
//   </main>
    
//     // {/* // <Switch>
//     // //   <Route  path="/" Component={AuthComponent } />
//     // //    <Route path="/auth/reset" Component={Resetpassword } />
//     // //    <Route path="/auth/verify" element={<Verification />} />
      
     
     
//     // // </Switch> */}
//   );
// };

export default Auth;
