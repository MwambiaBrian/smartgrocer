import React, { useEffect, useState } from 'react';
import './BusinessForm.css';
import { AppDispatch, RootState } from '../../../Store';
import { createBusiness } from '../../../Slices/businessSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { QueryClient, useMutation } from 'react-query';
import { addBusiness } from '../../../api/businessApi';

 function BusinessForm() {
  const [name, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhoneNumber, setBusinessPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [address1, setAddress] = useState('');
  const [address2, setAddress2] = useState('');

  const [county, setCounty] = useState('');
  const [subcounty, setSubcounty] = useState('');


  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
 

  const business= useSelector((state: RootState) => state.businesses);

  useEffect(()=>{
    if(business.business._id){
      navigate("/seller")
    } 
  },[])




  const queryClient = new QueryClient()
{
  const addBusinessMutation = useMutation(addBusiness, {
    onSuccess: () => {
      //invalidate cache and refetch
      queryClient.invalidateQueries("todos")
    }
  })
//   const addBusinessMutation = useMutation(addBusiness,(formData) =>
//   fetch('/api/businesses', {
//     method: 'POST',
//     body: JSON.stringify(formData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then((res) => res.json())
// );

// if (mutation.isLoading) {
//   return <div>Loading...</div>;
// }

// if (mutation.isError) {
//   return <div>Error: {mutation.error.message}</div>;
// }

// if (mutation.isSuccess) {
//   // Handle success case, e.g., show a success message or redirect
//   console.log('Business created');
//   navigate('/seller');
// }

  const postBusiness = () => {
    // Handle form submission here
    // You can access the form values from the state variables
    console.log('Business Name:', name);
    console.log('Business Email:', businessEmail);
    console.log('Business Type:', businessType);
 
    console.log('County:', county);
    console.log('subcounty:', subcounty);


const address = {
building: address1,
street: address2,
city: county,
county: subcounty

}
console.log(address)

const ownerId=auth._id
//console.log(name,businessType, businessEmail,businessPhoneNumber,ownerId, address)
dispatch(createBusiness({name,businessType, businessEmail,businessPhoneNumber,ownerId, address}))

console.log("business created")
navigate("/seller")
  };


  // const mutation = useMutation(postBusiness, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries('todos')
  //   },
  // })

 
  return (
    <>
      {/* <!--Main layout--> */}
      <main className="mt-5 pt-4">
        <div className="container">
          {/* <!-- Heading --> */}
          <h2 className="my-5 text-center title">New Business form</h2>

          {/* <!--Grid row--> */}
          <div className="row">
            {/* <!--Grid column--> */}
            <div className=" mb-8">
              {/* <!--Card--> */}
              <div className="card p-4">
                {/* <!--Grid row--> */}
                <div className="row mb-3"></div>
                {/* <!--Grid row--> */}

                {/* <!--Username--> */}
                <div className="input-group mb-4">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Name"
                    aria-label="Name"
                    aria-describedby="basic-addon1"
                    value={name}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>

                {/* <!--email--> */}
                <p className="mb-0">Business Email (optional)</p>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="businessemail@example.com"
                    aria-label="businessemail@example.com"
                    aria-describedby="basic-addon1"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                  />
                </div>

                <p className="mb-0">Business Phone Number</p>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="e.g 0712345678"
                    aria-label="0712345678"
                    aria-describedby="basic-addon1"
                    value={businessPhoneNumber}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                  />
                </div>

                <p className="mb-0">Business Type</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Grocery store"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>
               

                {/* <!--address--> */}
                <p className="mb-0">Address</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Githurai 45"
                    aria-label="Githurai"
                    aria-describedby="basic-addon1"
                    value={address1}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* <!--address-2--> */}
                <p className="mb-0">Address 2 (optional)</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Builiding e.g Tribeka near cooperative"
                    aria-label="Building"
                    aria-describedby="basic-addon1"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                {/* <!--Grid row--> */}
                <div className="row">
                  <div className="col-lg-4 col-md-12 mb-4">
                    <p className="mb-0">County</p>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nairobi"
                        aria-label="Nairobi"
                        aria-describedby="basic-addon1"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <!--Grid column--> */}

                  {/* <!--Grid column--> */}
                  <div className="col-lg-4 col-md-12 mb-4">
                    <p className="mb-0">Sub County</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Githurai"
                        value={subcounty}
                        onChange={(e) => setSubcounty(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <!--Grid column--> */}
                </div>
                {/* <!--Grid row--> */}

                <hr />
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label">
                    Shipping address is the same as my billing address
                  </label>
                </div> */}

                <hr />

                {/* <div className="my-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label className="form-check-label"> M-pesa </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked
                    />
                    <label className="form-check-label"> Credit card </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label className="form-check-label"> Debit card </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                    />
                    <label className="form-check-label"> Paypal </label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <p className="mb-0">Name on card</p>
                    <div className="form-outline">
                      <input type="text" className="form-control" />
                      <div className="form-helper">
                        Full name as displayed on card
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-0">Credit card number</p>
                    <div className="form-outline">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div> */}

                <hr className="mb-4" />
                <button
  className="btn btn-primary"
  type="button"
  onClick={() => postBusiness()}
>
  Submit
</button>

              </div>
              {/* <!--/.Card--> */}
            </div>
          </div>
          {/* <!--Grid row--> */}
        </div>
      </main>
      {/* <!--Main layout--> */}
    </>
  );
}
 }
 export default BusinessForm;
