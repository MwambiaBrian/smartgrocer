import  React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import styled from "styled-components";
import { useEffect } from 'react';
import axios from 'axios';
// import { setBusiness } from '../../Slices/businessSlice';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },

  { field: 'pNumber', headerName: 'Number', width: 130 },



  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => {
      const handleReceived = () => {
        // Delete logic for the delete button
        // You can access the corresponding row data using params.row
      };

      const handleView = () => {
        // View logic for the view button
        // You can access the corresponding row data using params.row
      };

      return (
        <Actions>
          {/* <Delete onClick={handleReceived}>Received?</Delete>
          <View onClick={handleView}>View</View> */}
        </Actions>
      );
    },
  },
];

export default function Vehicles() {
const [vehicles, setVehicles]=useState([
    {
      _id: "",
      transportNumber: "",
      ownerId: "",
      transportEmail: "",
      transportMobileNumber: "",
      transportType: "",
      stage: {
          county: "",
          town: "",
          street: ""
        },
      }
       
]);

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const fetchVehicles = async () => {
    // const response = await axios.get(`http://localhost:5005/api/order/${customerId}}`);
    const response = await axios.get(`http://localhost:5004/api/transports`);
    console.log(`from fetch${response.data}`)
    return response.data;
  };

  useEffect(()=>{
    const getMyOrders = async ()=>{
      const myOrders = await fetchVehicles()
      console.log(`from app ${myOrders}`)
      setVehicles(vehicles);
    }
   
   getMyOrders()
   
   //console.log(`from app file ${auth._id}`)
  
  },[auth._id])
 
 // console.log(vehicles)

  const rows = vehicles && vehicles
//   .filter(order => order.customerId === auth._id)
    .map(vehicle => ({
      id: vehicle._id,
      
     // pAmount: order.totalAmount.toLocaleString(),
    //   pDriver: order.Driver,
      pNumber: vehicle.transportNumber,
    
    }));

  return (
    <div style={{ height: 400, width: '100%' ,textEmphasisColor:'white', marginTop: 40 }}>
      <DataGrid style={{color:'white', fontSize: 24, WebkitTextDecorationColor:'white', WebkitTextEmphasis:'white'}}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
`;
