
import './Header.css'
function Header() {
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
      <a className="navbar-brand mt-2 mt-sm-0" href="https://mdbootstrap.com/">
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
          <a className="nav-link " href="https://mdbootstrap.com/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://mdbootstrap.com/docs/standard/">About Smartmaket</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://mdbootstrap.com/docs/standard/getting-started/installation/">SmartMarket</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://mdbootstrap.com/education/bootstrap/">Smartmarket</a>
        </li>
      </ul>
      {/* <!-- Left links -->       */}
    </div>
    {/* <!-- Collapsible wrapper --> */}
    
    {/* <!-- Right elements --> */}
    <div className="d-flex align-items-center">
      {/* <!-- Icon --> */}
      <a className="nav-link me-3" href="#">
        <i className="fas fa-shopping-cart"></i>
        <span className="badge rounded-pill badge-notification bg-danger">1</span>
      </a>

   
    
  
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