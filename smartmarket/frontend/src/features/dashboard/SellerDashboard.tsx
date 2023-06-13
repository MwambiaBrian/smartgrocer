import DisplayProduct from '../Product/DisplayProduct'
import './Dashboard.css'
function SellerDashboard() {
  return (
    <>
    <main>
       <div className='container'>
{/* <!-- Navbar --> */}
<nav className="navbar navbar-expand-lg navbar-dark mt-3 mb-5 shadow p-2 background" >
  {/* <!-- Container wrapper --> */}
  <div className="container-fluid">

    {/* <!-- Navbar brand --> */}
    <a className="navbar-brand" href="#">Categories:</a>

    {/* <!-- Toggle button --> */}
    <button 
       className="navbar-toggler" 
       type="button" 
       data-mdb-toggle="collapse" 
       data-mdb-target="#navbarSupportedContent2" 
       aria-controls="navbarSupportedContent2" 
       aria-expanded="false" 
       aria-label="Toggle navigation">
      <i className="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent2">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {/* <!-- Link --> */}
        <li className="nav-item acitve">
          <a className="nav-link text-white" href="#">All</a>
        </li>
        <li className="nav-item">
              <a className="nav-link text-white" href="#">Fruits</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Vegetables</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Cereals $ Legumes</a>
            </li>

      </ul>

      {/* <!-- Search --> */}
      <form className="w-auto py-1 search_form" >
        <input type="search" className="form-control rounded-0" placeholder="Search" aria-label="Search" />
      </form>

    </div>
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* <!-- Navbar --> */}

<div className='row'>
     <DisplayProduct />
    <DisplayProduct />
      <DisplayProduct />
      <DisplayProduct />
      </div>
    </div>
 </main>
    </>
 
    
   
  )
}

export default SellerDashboard