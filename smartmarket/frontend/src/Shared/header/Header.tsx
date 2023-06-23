/*Redux-toolkit*/ 
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Slices/authSlice";


import './Header.css'
import { RootState, store } from "../../Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header() { 
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const { cartTotalQuantity } = useSelector((state: RootState) => state.cart);

  // useEffect(() => {
  //   dispatch(clearCart());
  // }, [auth._id]);
  const logout = () => {

    dispatch(logoutUser());
  
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
    <div className="collapse navbar-collapse" id="navbarSupportedContent1">      
      {/* <!-- Navbar brand --> */}
      <a className="navbar-brand mt-2 mt-sm-0" href="#">
        <img
          src=""
          height="20"
          alt="SmartMarket"
          loading="lazy"
        />
      </a>
      {/* <!-- Left links --> */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item active">
          <a className="nav-link " href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Business</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Transport</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About smartmrktt</a>
        </li>
      </ul>
      {/* <!-- Left links -->       */}
    </div>
    {/* <!-- Collapsible wrapper --> */}
    
    {/* <!-- Right elements --> */}
    <div className="d-flex align-items-center">
      {/* <!-- Icon --> */}

      <a className="nav-link me-3" href="#">
      {auth._id ?   
    <span className="">
  
      {`Hello ${auth.name}`}</span> : <p>Please log in.</p>}
  
  </a>
      <a className="nav-link me-3" href="#">
      <FontAwesomeIcon icon={ faShoppingCart} />
        <span className="badge rounded-pill badge-notification bg-danger">{cartTotalQuantity}</span>
      </a>
       {/* <!-- Icon --> */}

      {auth._id ?  <button onClick={logout} >
       logout
      </button> : <p>Please log in.</p>}
      
  
    </div>
    {/* <!-- Right elements --> */}
    
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* <!-- Navbar --> */}
      
      </>
  )
}

export default Header

