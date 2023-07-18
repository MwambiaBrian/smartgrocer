import React, { useState } from 'react'
import './Checkout.css'
import axios from 'axios';
import { createOrder } from '../../api/orderApi';
import { QueryClient, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const cart = useSelector((state: RootState) => state.cart);
    const auth = useSelector((state: RootState) => state.auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setAddress] = useState('');
    const [building, setAddress2] = useState('');
    const [county, setCounty] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate()
    // const queryClient = new QueryClient()
    // {
    //   const createOrderMutation = useMutation(createOrder, {
    //     onSuccess: () => {
    //       //invalidate cache and refetch
    //       queryClient.invalidateQueries("orders")
    //     }
    //   })
    // }

    const createOrder = async (order: any)=>{
        const response = await axios.post("http://localhost:5005/api/order", order)
        console.log(response.data)
        return response.data
    }

const handleCheckout = async () => {
    // Create an order after reaching Safaricom for payment
    const address = {
        street: street ,
         city: city ,
        building: building,
        county: county

    }
    console.log(cart.cartItems)
    const orderData = {
        customerId: auth._id,
        
      products:cart.cartItems,
      totalAmount: cart.cartTotalAmount,
      phoneNumber: phoneNumber,
      shippingAddress: address
      
    };
 // console.log(orderData)
    try {
      // Send the orderData to your API or perform any required actions
     const newOrder = await createOrder(orderData);
  
      // Handle the response as needed
      if(newOrder){
        console.log(newOrder)
        navigate("/orders")
      }
      //console.log(response.data);
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error(error);
    }
  };
  

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
                    
                        {/* <!--Grid column--> */}

                        {/* <!--Grid column--> */}
                    
                        {/* <!--Grid column--> */}
                    </div>
                    {/* <!--Grid row--> */}

                   

                    {/* <!--email--> */}
                    <p className="mb-0">
                        Address
                    </p>
                    <div className="form-outline mb-4">
                    <input type="text" id="typeText" className="form-control" placeholder='Kiwanja Market' value={street} onChange={(e) => setAddress(e.target.value)} />

                    </div>

                    {/* <!--address-2--> */}
                    <p className="mb-0">
                        Address 2 (optional)
                    </p>
                    <div className="form-outline mb-4">
                    <input type="text" id="typeText" className="form-control" placeholder='Bamboo Building' value={building} onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                    <p className="mb-0">
                        Phone Number
                    </p>
                    <div className="form-outline mb-4">
                    <input type="text" id="typeText" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    </div>

                    {/* <!--address--> */}
                  

                    {/* <!--Grid row--> */}
                    <div className="row">
                    <div className="col-lg-4 col-md-12 mb-4">
                            <p className="mb-0">
                                City
                            </p>
                            <div className="form-outline mb-4">
                            <input type="text" id="typeText" className="form-control" placeholder='Nairobi' value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-12 mb-4">
                            <p className="mb-0">
                                County
                            </p>
                            <div className="form-outline mb-4">
                            <input type="text" id="typeText" className="form-control" placeholder='Nairobi' value={county} onChange={(e) => setCounty(e.target.value)} />
                    </div>
                        </div>
                        
                    </div>
                    {/* <!--Grid row--> */}

                    <hr />
                    {/* <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" >Shipping address is the same as my billing address</label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" >Save this information for next time</label>
                    </div>

                    <hr /> */}
{/* 
                    <div className="my-3">
                  

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" > M-Pesa </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" > Pay on Delivery </label>
                        </div>
                    </div> */}
                    <div className="row mb-3">
                       
                        <div className="col-md-6 mb-3">
                            <p className="mb-0">
                                Phone number
                            </p>
                            <div className="form-outline">
                            <input type="text" id="typeText" className="form-control" placeholder='Safaricom M-Pesa' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />                             
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    
                        
                    </div>
                    <hr className="mb-4" />                    
                  <button className="btn btn-primary" type="button" onClick={handleCheckout}>Continue to checkout</button>
                </div>
                {/* <!--/.Card--> */}
            </div>
            {/* <!--Grid column--> */}

            {/* <!--Grid column--> */}
            <div className="col-md-4 mb-4">
                {/* <!-- Heading --> */}
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge rounded-pill badge-primary">{cart.cartTotalQuantity}</span>
                </h4>

                {/* <!-- Cart --> */}
                <ul className="list-group mb-3">
                {cart.cartItems &&
              cart.cartItems.map((cartItem: any) => (
                <li key={cartItem.id} className="list-group-item d-flex justify-content-between" >
                <div>
                    <h6 className="my-0">{cartItem.name}</h6>
                    <small className="text-muted">{cartItem.desc}</small>
                </div>
                <span className="text-muted">{cartItem.price}</span>
            </li>
              ))}

                   
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