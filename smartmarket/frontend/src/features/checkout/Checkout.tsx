import React from 'react'
import './Checkout.css'
import axios from 'axios';
import { createOrder } from '../../api/orderApi';
import { QueryClient, useMutation } from 'react-query';
function Checkout() {


    const queryClient = new QueryClient()
    {
      const createOrderMutation = useMutation(createOrder, {
        onSuccess: () => {
          //invalidate cache and refetch
          queryClient.invalidateQueries("orders")
        }
      })
    }

    
const handleCheckout = async () => {
// create an order after reaching safaricom for payment
//const response = await axios.post(`${url_api}/order/`, setHeaders());


}


  return (
    <>
      {/* <!--Main layout--> */}
<main className="mt-5 pt-4">
    <div className="container">
        {/* <!-- Heading --> */}
        <h2 className="my-5 text-center title">Checkout form</h2>

        {/* <!--Grid row--> */}
        <div className="row">
            {/* <!--Grid column--> */}
            <div className="col-md-8 mb-4">
                {/* <!--Card--> */}
                <div className="card p-4">
                    <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                            <div className="form-outline">
                                <input type="text" id="typeText" className="form-control" />
                                <label className="form-label" >First name</label>
                            </div>
                        </div>
                        {/* <!--Grid column--> */}

                        {/* <!--Grid column--> */}
                        <div className="col-md-6 mb-2">
                            {/* <!--lastName--> */}
                            <div className="form-outline">
                                <input type="text" id="typeText" className="form-control" />
                                <label className="form-label" 
                                >Last name</label>
                            </div>
                        </div>
                        {/* <!--Grid column--> */}
                    </div>
                    {/* <!--Grid row--> */}

                    {/* <!--Username--> */}
                    <div className="input-group mb-4">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    {/* <!--email--> */}
                    <p className="mb-0">
                        Email (optional)
                    </p>
                    <div className="form-outline mb-4">
                         <input type="email" className="form-control" placeholder="youremail@example.com" aria-label="youremail@example.com" aria-describedby="basic-addon1" />
                    </div>

                    {/* <!--address--> */}
                    <p className="mb-0">
                        Address
                    </p>
                    <div className="form-outline mb-4">
                        <input type="email" className="form-control" placeholder="1234 Main St" aria-label="1234 Main St" aria-describedby="basic-addon1" />
                    </div>

                    {/* <!--address-2--> */}
                    <p className="mb-0">
                        Address 2 (optional)
                    </p>
                    <div className="form-outline mb-4">
                        <input type="email" className="form-control" placeholder="Apartment or suite" aria-label="Apartment or suite" aria-describedby="basic-addon1" />
                    </div>

                    {/* <!--Grid row--> */}
                    <div className="row">
                        {/* <!--Grid column--> */}
                        <div className="col-lg-4 col-md-12 mb-4">
                            <p className="mb-0">
                                Country
                            </p>
                            <div className="form-outline mb-4">
                        <input type="email" className="form-control" placeholder="United States" aria-label="United States" aria-describedby="basic-addon1" />
                    </div>
                        </div>
                        {/* <!--Grid column--> */}

                        {/* <!--Grid column--> */}
                        <div className="col-lg-4 col-md-12 mb-4">
                            <p className="mb-0">
                                State
                            </p>
                            <div className="form-outline mb-4">
                        <input type="email" className="form-control" placeholder="California" aria-label="California" aria-describedby="basic-addon1" />
                    </div>
                        </div>
                        {/* <!--Grid column--> */}

                        {/* <!--Grid column--> */}
                        <div className="col-lg-4 col-md-12 mb-4">
                            <p className="mb-0">
                                Zip
                            </p>
                            <div className="form-outline">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        {/* <!--Grid column--> */}
                    </div>
                    {/* <!--Grid row--> */}

                    <hr />
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" >Shipping address is the same as my billing address</label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" >Save this information for next time</label>
                    </div>

                    <hr />

                    <div className="my-3">
                  

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" > M-Pesa </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" > Pay on Delivery </label>
                        </div>
                    </div>
                    <div className="row mb-3">
                       
                        <div className="col-md-6 mb-3">
                            <p className="mb-0">
                                Phone number
                            </p>
                            <div className="form-outline">
                                <input type="text" className="form-control" />                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    
                        
                    </div>
                    <hr className="mb-4" />                    
                  <button className="btn btn-primary" type="button">Continue to checkout</button>
                </div>
                {/* <!--/.Card--> */}
            </div>
            {/* <!--Grid column--> */}

            {/* <!--Grid column--> */}
            <div className="col-md-4 mb-4">
                {/* <!-- Heading --> */}
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge rounded-pill badge-primary">3</span>
                </h4>

                {/* <!-- Cart --> */}
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between">
                        <div>
                            <h6 className="my-0">Product name</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">$12</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <div>
                            <h6 className="my-0">Second product</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">$8</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <div>
                            <h6 className="my-0">Third item</h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">$5</span>
                    </li>
               
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>$20</strong>
                    </li>
                </ul>
                {/* <!-- Cart --> */}

 
            </div>
            {/* <!--Grid column--> */}
        </div>
        {/* <!--Grid row--> */}
    </div>
</main>
{/* <!--Main layout--> */}

      </>
  )
}

export default Checkout