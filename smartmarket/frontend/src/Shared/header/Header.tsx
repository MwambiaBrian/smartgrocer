import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Slices/authSlice";
import "./Header.css";
import { AppDispatch, RootState } from "../../Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../Slices/cartSlice";
import { useEffect } from "react";
import axios from "axios";
import { setBusiness } from "../../Slices/businessSlice";
import { useQuery } from "react-query";

function Header() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartTotalQuantity } = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const business = useSelector((state: RootState) => state.businesses);
  const vehicle = useSelector((state: RootState) => state.vehicle);
  let businessDetails: any;

  // const fetchBusinessDetails = async (userId: any) => {
  //   const response = await axios.get(`http://localhost:5003/api/businesses/${userId}`);
  //   return response.data;
  // };
  
  // const BusinessDetails = ({ userId }: any) => {
  //   const { data, isLoading, isError } = useQuery(['business', userId], () => fetchBusinessDetails(userId));
  // //  dispatch(setBusiness(data));
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  
  //   if (isError) {
  //     return <div>Error occurred while fetching business details.</div>;
  //   }
  
  //   // Render the business details using the data object
  //   // return (
  //   //   <div>
  //   //     <h1>{data.name}</h1>
  //   //     <p>{data.description}</p>
  //   //     {/* Render other business details */}
  //   //   </div>
  //   // );
  // };
  console.log(business);
  console.log(auth)
  console.log(vehicle);
  console.log(business.business._id)
  const myBusiness = () => {
    console.log(business.business._id)
    if (business.business._id) {
      navigate("/seller");
    } else {
      navigate("business");
      console.log(business);
    }
  };

  const myTransport = () => {
    console.log(vehicle.vehicle._id)
    if (vehicle.vehicle._id) {
      console.log(vehicle);
      navigate("/driver");
    } else {
      navigate("transport");
     
    }
  };

  // useEffect(() => {
  //   dispatch(clearCart());
  // }, [auth._id, dispatch]);

  const logout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
  };

  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white">
        {/* <!-- Container wrapper --> */}
        <div className="container">
          {/* <!-- Toggle button --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* <!-- Collapsible wrapper --> */}
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent1"
          >
            {/* <!-- Navbar brand --> */}
        
              <img src="src/assets/logo.png" height="50" width='200' alt="SmartMarket" loading="lazy" />
          
            {/* <!-- Left links --> */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {auth.role==='customer' ? (
               <li className="nav-item">
               <h1 className="nav-link" onClick={myBusiness}>
                 My Business
               </h1>
             </li>
            ): <></>}

{auth.role==='customer' ? (
               <li className="nav-item">
               <Link className="nav-link" to="/admin">
                 Admin
               </Link>
             </li>
            ): <></>}
          
              {auth.role==='driver' ? (
                <li className="nav-item">
                <h1 className="nav-link" onClick={myTransport}>
                    My Transport
                  </h1>
                </li>
            ): <></>}

           
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  About Smartmarket
                </Link>
              </li>
            </ul>
            {/* <!-- Left links -->       */}
          </div>
          {/* <!-- Collapsible wrapper --> */}

          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
            {/* <!-- Icon --> */}
            <Link className="nav-link me-3" to="/">
              {auth._id ? (
                <span className="">{`Hello ${auth.name}`}</span>
              ) : (
                <p>Please log in.</p>
              )}
            </Link>
            {auth.role==='seller' ? (
                
               
                <h1 style={{padding: 10}}>Account: {business.business.earning}</h1>
                
            ): <></>}
           
            
          
            <Link className="nav-link me-3" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="badge rounded-pill badge-notification bg-danger">
                {cartTotalQuantity}
              </span>
            </Link>
            {/* <!-- Icon --> */}
            {auth._id ? (
              <button onClick={logout}>logout</button>
            ) : (
              <Link to="/auth">
                <p>Please log in.</p>
              </Link>
            )}
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </>
  );
}

export default Header;
