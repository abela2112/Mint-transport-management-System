import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {getAllUser} from '../api/userApi'
import {useState,useEffect} from 'react';

import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
const rows = [
  { id: 1, lastName: '', firstName: 'Jon', phoneNumber: '0921742834' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNumber: '0923784555' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function ShowAllUserForAdmin() {

   const [user,setUser] =useState([])
const navigate=useNavigate()
   useEffect(()=>{
    getAllUser().then(({data})=>{
        setUser(data.users)
        console.log(data)
    }).catch((err)=>console.log(err))

   },[])
   const handleDelete=(id)=>{
    axios.delete(`/api/user/${id}`).then(({data})=>{console.log(data)}).catch((err)=>console.log(err))
   }
   const columns = [
    { field: 'firstName', headerName: 'First Name', width: 170 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'email', headerName: 'email', width: 200 },
    { field: 'role', headerName: 'role', width: 200 },
    
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
       width: 200,
    },
  
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 160,
      renderCell:(param)=>{
        return <div style={{display:'flex',alignItems:'center'}}>
            <button onClick={()=>navigate(`/user-detail/${param.row._id}`)}>Edit</button>
            <DeleteIcon onClick={()=>handleDelete(param.row._id)}/>
        </div>
      }
      
    },
  ];
  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={user}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row)=>row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
       
      />
    </div>
  );
}
