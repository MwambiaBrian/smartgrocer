import   React , { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import styled from "styled-components";
import { useEffect } from 'react';
import axios from 'axios';
import { setBusiness } from '../../Slices/businessSlice';

const columns: GridColDef[] = [

  { field: 'pName', headerName: 'Name', width: 200 },
  { field: 'pEmail', headerName: 'Desc', type: 'number', width: 400 },
  { field: 'pRole', headerName: 'Price', type: 'number', width: 180 },
 
];

export default function UsersList() {
    const [users, setUsers]=useState([
        {
            _id:'',
            name:"",
            
            email: "",
            password:'',
           
            role: '',
           
          }
           
    ]);
    

  const auth = useSelector((state: RootState) => state.auth);
  
  const dispatch: AppDispatch = useDispatch();
  const fetchUsers = async () => {
    const response = await axios.get(`http://localhost:5001/api/auth`);
    console.log(`from fetch${response.data.business}`)
    return response.data;
  };

  useEffect(()=>{
    const getUsers = async ()=>{
      const users = await fetchUsers()
    
      setUsers(users)
      
    }
   
   getUsers()
   
   console.log(`from app file ${auth._id}`)
  
  },[auth._id])
  
 
  const rows = users && users
    .map(user=> ({
      id: user._id,
   
      pName: user.name,
      pEmail: user.email,
      pRole: user.role
    }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid style={{ fontSize: 24,color:'white'}}
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
