import React, { useEffect } from 'react'
import './Landing.css'
import { AppDispatch, RootState } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import DisplayProduct from '../Product/DisplayProduct';

import { addToCart, getTotals } from '../../Slices/cartSlice';
//import { getBusiness } from '../../Slices/businessSlice';
import { loadUser } from '../../Slices/authSlice';
import { getAllProducts } from '../../Slices/ProductsSlice';


function Landing() {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {data} = useSelector((state: RootState) => state.products);

console.log(data)


useEffect(()=>{
 // dispatch(getBusiness(auth._id));
  dispatch(loadUser())
  dispatch(getAllProducts())
},[])



const handleAddToCart = (product: any) => {
  dispatch(addToCart(product));
  dispatch(getTotals());
};


  return (
    <>

  {}
       {/* <!-- carousel --> */}
<div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-mdb-ride="carousel">
  <div className="carousel-indicators">
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="1"
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://s.hdnux.com/photos/01/24/07/42/22050963/7/1200x0.jpg" className="d-block w-100" alt="Wild Landscape"/>
      {/* <div className="mask" style="background-color: rgba(0, 0, 0, 0.4)"></div> */}
      <div className="carousel-caption d-none d-sm-block mb-5">
      <h1 className="mb-4">
                <strong>Do your shopping at Smartmarket</strong>
              </h1>

              <p>
                <strong>Quality and Convenience </strong>
              </p>

              <p className="mb-4 d-none d-md-block">
                <strong>The Best Digital Market on the Internet</strong>
              </p>

              <a target="_blank" href="https://mdbootstrap.com/education/bootstrap/" className="btn btn-outline-white btn-lg">Sign Up
                <i className="fas fa-graduation-cap ms-2"></i>
              </a>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/8-col/img%283%29.jpg" className="d-block w-100" alt="Camera"/>
      {/* <div className="mask" style="background-color: rgba(0, 0, 0, 0.4)"></div> */}
      <div className="carousel-caption d-none d-md-block mb-5">
      <h1 className="mb-4">
                <strong>Do your shopping at Smartmarket</strong>
              </h1>

              <p>
                <strong>Quality and Convenience assures</strong>
              </p>

              <p className="mb-4 d-none d-md-block">
                <strong>The best Digital Market, Loved by many</strong>
              </p>

              <a target="_blank" href="https://mdbootstrap.com/education/bootstrap/" className="btn btn-outline-white btn-lg">Sign up
                <i className="fas fa-graduation-cap ms-2"></i>
              </a>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://thumbs.dreamstime.com/b/healthy-vegetables-grocery-store-lots-small-35578407.jpg" className="d-block w-100" alt="Exotic Fruits"/>
      {/* <div class="mask" style="background-color: rgba(0, 0, 0, 0.4)"></div> */}
      <div className="carousel-caption d-none d-md-block mb-5">
        <h1 className="mb-4">
                <strong>Do your shopping at Smartmarket</strong>
              </h1>

              <p>
                <strong>Quality and Convenience </strong>
              </p>

              <p className="mb-4 d-none d-md-block">
                <strong>The Best Digital Market on the Internet</strong>
              </p>

              <a target="_blank" href="https://mdbootstrap.com/education/bootstrap/" className="btn btn-outline-white btn-lg">Sign Up
                <i className="fas fa-graduation-cap ms-2"></i>
              </a>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

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

{/* <!-- Products --> */}
  <section>
  <div className="text-center">
    <div className="row">

      {data.map(product=>  <div key={product._id} className="col-lg-3 col-md-6 mb-4">
        <div className="card">
          <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src={product.img}
              className="w-100" />
            <a href="#!">              
              <div className="hover-overlay">
                <div className="mask mask_"></div>
              </div>
            </a>
          </div>
          <div className="card-body">
            <a href="" className="text-reset">
              <h5 className="card-title mb-2">{product.name}</h5>
            </a>
            <a href="" className="text-reset ">
              <p>{product.category}</p>
            </a>
            <h6 className="mb-3 price">{`Sh ${product.price}`}</h6>
            <button className="btn btn-primary ms-1" onClick={() => handleAddToCart(product)}>
                            Add to cart
                            <i className="fas fa-shopping-cart ms-1"></i>
                        </button>
          </div>
        </div>
      </div>
)}
    
 
   
    </div>

 
  </div>
</section>
{/* <!-- Pagination --> */}
  <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
  <ul className="pagination">
    <li className="page-item disabled">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item active"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">4</a></li>
    <li className="page-item"><a className="page-link" href="#">5</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>  
{/* <!-- Pagination -->   */}
</div>

</main>



        </>
  )
}

export default Landing