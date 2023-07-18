import React, { useState } from 'react';
import { QueryClient, useMutation } from 'react-query';
//import './BusinessForm.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addTransport } from '../../api/transportApi';
import axios from 'axios';
import { RootState } from '../../Store';

function NewTransport() {
  const auth = useSelector((state: RootState) => state.auth);

  const [vehiclenNumber, setVehicleNumber] = useState('');
  const [vehicleMobileNumber, setVehicleMobileNumber] = useState('');
  const [vehicleEmail, setVehicleEmail] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
 
  const [county, setCounty] = useState('');



const createTransport = async (newTransport: any)=>{
const response = await axios.post("http://localhost:5004/api/transports", newTransport)
return response.data  
}
 

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
  const handleFormSubmit = async () => {
      
  const newTransport = {
    transportNumber: vehiclenNumber,
    transportEmail: vehicleEmail,
    transportType: vehicleType,
    transportMobileNumber: vehicleMobileNumber,
    ownerId: auth._id,
    stage:{
      county: county,
      town:town,
      street:street,

    }
       
  
  }
   const transport = await createTransport(newTransport)
   if (transport){
    console.log(transport)
navigate("/driver")
   }
   

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
                    placeholder="transportemail@example.com"
                    aria-label="youremail@example.com"
                    aria-describedby="basic-addon1"
                    value={vehicleEmail}
                    onChange={(e) => setVehicleEmail(e.target.value)}
                  />
                </div>
                <p className="mb-0">Mobile</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0712345678"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    value={vehicleMobileNumber}
                    onChange={(e) => setVehicleMobileNumber(e.target.value)}
                  />
                </div>

                <p className="mb-0">Type</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Truck"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </div>
              

                {/* <!--address--> */}
                <p className="mb-0">Address</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kiwanja"
                    aria-label="Kiwanja"
                    aria-describedby="basic-addon1"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                {/* <!--address-2--> */}
                <p className="mb-0">Address 2 (optional)</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Githurai"
                    aria-label="Apartment or suite"
                    aria-describedby="basic-addon1"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
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
                        aria-label="California"
                        aria-describedby="basic-addon1"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
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
