import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import styled from "styled-components";
import { useEffect } from 'react';
import axios from 'axios';
import { setBusiness } from '../../Slices/businessSlice';

const columns: GridColDef[] = [
 
  { 
    field: 'imageUrl', 
    headerName: 'Image', 
    width: 80, 
    renderCell: (params) => {
      return (
        <ImageContainer>
          <img src={params.value} alt="Product" />
        </ImageContainer>
      );
    }
  },
  { field: 'pName', headerName: 'Name', width: 130 },
  { field: 'pDesc', headerName: 'Desc', type: 'number', width: 130 },
  { field: 'price', headerName: 'Price', type: 'number', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => {
      const handleDelete = () => {
        // Delete logic for the delete button
        // You can access the corresponding row data using params.row
      };

      const handleView = () => {
        // View logic for the view button
        // You can access the corresponding row data using params.row
      };

      return (
        <Actions>
          {/* <Delete onClick={handleDelete}>Delete</Delete>
          <View onClick={handleView}>View</View> */}
        </Actions>
      );
    },
  },
];

export default function AllProducts() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const fetchBusinessDetails = async (userId: any) => {
    const response = await axios.get(`http://localhost:5003/api/businesses/${userId}`);
    console.log(`from fetch${response.data.business}`)
    return response.data;
  };

  useEffect(()=>{
    const getBusiness = async ()=>{
      const business = await fetchBusinessDetails(auth._id)
      console.log(`from app ${business}`)
      dispatch(setBusiness(business));
    }
   
   getBusiness()
   
   console.log(`from app file ${auth._id}`)
  
  },[auth._id,dispatch])
  const { data } = useSelector((state: RootState) => state.products);
  const business = useSelector((state: RootState) => state.businesses);
  console.log(business.business._id)
  console.log(business.business)
  const rows = data && data
     //.filter(product => product.businessId === business.business._id)
    .map(product => ({
      id: product._id,
      imageUrl: product.img,
      pName: product.name,
      pDesc: product.desc,
      price: product.price.toLocaleString()
    }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid style={{ marginTop: 40,fontSize: 24,color:'white'}}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
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
