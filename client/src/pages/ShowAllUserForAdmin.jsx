import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getAlluser } from '../api/userApi'
import { useState, useEffect } from 'react';

import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser } from '../redux/features/userlist';
import styled from 'styled-components';
export const EditButton = styled.button`
  padding: 5px 7px;
  margin-right: 5px;
  color: white;
  background-color: #57b057;
  cursor: pointer;
  border-radius: 10px;
`

const TableContainer = styled.div`
  .table-cell {
    font-size: 18px;
  }
`;

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
const socket = io('http://localhost:5000')

export default function ShowAllUserForAdmin() {

  const { allUsers } = useSelector(state => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(allUsers)
  useEffect(() => {
    getAlluser(dispatch)
    // .then(({ data }) => {
    //   setUser(data.users)
    //   console.log(data)

    //   // socket.on('new user', (data) => {
    //   //   console.log('Received notification from server:', data);
    //     // Update your state or perform other actions based on the notification
    //   });
    // }).catch((err) => console.log(err))

  }, [dispatch])
  const handleDelete = (id) => {
    axios.delete(`/api/user/${id}`).then(({ data }) => {
      console.log(data)
      dispatch(deleteuser(id))
    }).catch((err) => console.log(err))
  }
  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 170, cellClassName: 'table-cell' },
    { field: 'lastName', headerName: 'Last name', width: 200, cellClassName: 'table-cell' },
    { field: 'email', headerName: 'email', width: 200, cellClassName: 'table-cell' },
    { field: 'role', headerName: 'role', width: 200, cellClassName: 'table-cell' },
  
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 170,
      cellClassName: 'table-cell',
    },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: (param) => {
        return <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <EditButton onClick={() => navigate(`/user-detail/${param.row._id}`)}>Edit</EditButton>
          <DeleteIcon style={{ color: '#ff4e45', cursor: 'pointer' }} onClick={() => handleDelete(param.row._id)} />
        </div>
      }

    },
  ];
  return (
  <TableContainer>
    <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
      <DataGrid
      
        rows={allUsers}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}

      />
    </div>
    </TableContainer>
  );
}
