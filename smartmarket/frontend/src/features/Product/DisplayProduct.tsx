import React from 'react'

import { useDispatch, useSelector } from "react-redux";


import './Product.css'
import { addToCart } from '../../Slices/cartSlice';
 function DisplayProduct() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };
  return (
    <>
  <div className="col-lg-3 col-md-6 mb-4">
        <div className="card">
          <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src="https://www.solwayfeeders.com/wp-content/uploads/2021/06/caledonian_kale.jpg"
              className="w-100" />
            <a href="#!">              
              <div className="hover-overlay">
                <div className="mask mask_"></div>
              </div>
            </a>
          </div>
          <div className="card-body">
            <a href="" className="text-reset">
              <h5 className="card-title mb-2">Sukuma wiki</h5>
            </a>
            <a href="" className="text-reset ">
              <p>Vegetables</p>
            </a>
            <h6 className="mb-3 price">sh 40</h6>
            <button className="btn btn-primary ms-1" onClick={() => handleAddToCart(product)}>
                            Add to cart
                            <i className="fas fa-shopping-cart ms-1"></i>
                        </button>
          </div>
        </div>
      </div>

      
    
    </>
  )
}

export default DisplayProduct