import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getAlluser } from '../api/userApi'
import { useState, useEffect } from 'react';

import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser } from '../redux/features/userlist';

import { Title } from './StaffMangerPendingRequests';
export const EditButton = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  color: white;
  background-color: #57b057;
  cursor: pointer;
  border-radius: 10px;
`

export const swipeUp = keyframes`
  0% {
    transform: translateY(100px);
  }
50% {
  transform: translateY(50px);
}
80% {
  transform: translateY(20px);
}
100%{
  transform: translateY(0);
}
`;


const TableContainer = styled.div`
  .table-cell {
    font-size: 18px;
  }
`;



const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    transition: all 0.3s ease-out;
    animation:${swipeUp} 2s ease-out ;
`
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
      width: 200,
      renderCell: (param) => {
        return <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
          <EditButton onClick={() => navigate(`/user-detail/${param.row._id}`)}>Edit</EditButton>
          <DeleteIcon style={{ color: '#ff4e45', cursor: 'pointer' }} onClick={() => handleDelete(param.row._id)} />
        </div>
      }

    },
  ];
  return (
    <Container>
      <Title>All users</Title>
      <TableContainer style={{ height: '60%', width: '100%' }}>
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
      </TableContainer>

    </Container>
  );
}
