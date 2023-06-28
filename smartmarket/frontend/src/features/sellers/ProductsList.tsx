// import styled from "styled-components"



// import * as React from 'react';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { useSelector } from "react-redux";
// import { RootState } from "../../Store";


// const {data} = useSelector((state: RootState) => state.products);


// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'imageUrl', headerName: 'Image', width: 80,
//   renderCell: (params) => {
//     return {
//       // <ImageContainer> </ImageContainer>
//     }
//   }

// },
//   { field: 'pName', headerName: 'Name', width: 130 },
//   {
//     field: 'pDesc',
//     headerName: 'Desc',
//     type: 'number',
//     width: 130,
//   },
//    {
//     field: 'price',
//     headerName: 'Price',
//     type: 'number',
//     width: 130,
//   },
//   {
//     field: '',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = data && data.map(product=>{
//   return {
//     id: product._id,
//     imageUrl: product.img,
//     pName: product.name,
//     pDesc: product.desc,
//     price: product.price.toLocaleString()
//   }
// })

// export default function ProductsList() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

// const ImageContainer = styled.div`
// img {
//     height: 40px;
// }
// `;

// const Actions = styled.div`
// width: 100%;
// display: flex;
// justify-content: space-between;
// button {
//     border: none;
//     outline; none; 
//     padding: 3px 5px;
//     color: white;
//     border-radius: 3px;
//     cursor: pointer;
// }
// `;

// const Delete = styled.button`
// background-color: rgb(255,77,73)
// `;

// const View = styled.button`
// background-color: rgb(114, 225, 40)
// `



