import React, { useState } from 'react';
import { QueryClient, useMutation } from 'react-query';
//import './BusinessForm.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addTransport } from '../../api/transportApi';

function NewTransport() {
  const [vehiclenNumber, setVehicleNumber] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [desc, setDesc] = useState('');
  const [county, setCounty] = useState('');
  const [zip, setZip] = useState('');



  const queryClient = new QueryClient()
{
  const addTransportMutation = useMutation(addTransport, {
    onSuccess: () => {
      //invalidate cache and refetch
      queryClient.invalidateQueries("transports")
    }
  })
//   c

  const navigate = useNavigate();
//   const auth = useSelector((state: RootState) => state.auth);
//   const dispatch: AppDispatch = useDispatch();
  const handleFormSubmit = () => {
    // Handle form submission here
    // You can access the form values from the state variables
    console.log('Business Name:', name);
    console.log('Business Email:', businessEmail);
    // console.log('Business Type:', type);
    console.log('Address:', address);
    console.log('Address 2:', address2);
    console.log('County:', county);
    console.log('Zip:', zip);
// const ownerId=auth._id
// console.log(ownerId)
// dispatch(createBusiness({name,type, businessEmail,desc,ownerId }))

console.log("business created")
navigate("/driver")
  };

  return (
    <>
      {/* <!--Main layout--> */}
      <main className="mt-5 pt-4">
        <div className="container">
          {/* <!-- Heading --> */}
          <h2 className="my-5 text-center title">Transport form</h2>

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
                    placeholder="KEA 001A | KMGA 001A"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={vehiclenNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </div>

                {/* <!--email--> */}
                <p className="mb-0">Transport Email (optional)</p>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="businessemail@example.com"
                    aria-label="youremail@example.com"
                    aria-describedby="basic-addon1"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                  />
                </div>

                <p className="mb-0">Type</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Grocery store"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </div>
                <p className="mb-0">desc</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 Main St"
                    aria-label="1234 Main St"
                    aria-describedby="basic-addon1"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                {/* <!--address--> */}
                <p className="mb-0">Address</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 Main St"
                    aria-label="1234 Main St"
                    aria-describedby="basic-addon1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* <!--address-2--> */}
                <p className="mb-0">Address 2 (optional)</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apartment or suite"
                    aria-label="Apartment or suite"
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
                        placeholder="California"
                        aria-label="California"
                        aria-describedby="basic-addon1"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <!--Grid column--> */}

                  {/* <!--Grid column--> */}
                  <div className="col-lg-4 col-md-12 mb-4">
                    <p className="mb-0">Zip</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        className="form-control"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <!--Grid column--> */}
                </div>
                {/* <!--Grid row--> */}

                <hr />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <hr />

                <div className="my-3">
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
                </div>

                <hr className="mb-4" />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleFormSubmit}
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
export default NewTransport;
