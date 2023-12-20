import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserRegisterRequests } from '../api/userApi'
import UserRegisterRequest from './UserRegisterRequest'
import { getRequestSuccess } from '../redux/features/request'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Title } from './StaffMangerPendingRequests'
import { EditButton, swipeUp } from './ShowAllUserForAdmin'
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    transition: all 0.3s ease-in-out;
    animation: ${swipeUp} 2s ease-out;
   
`

const TableContainer = styled.div`

  .table-cell {
    font-size: 18px;
  }
`;
const UserRegisterRequests = ({ type }) => {

    const { requests } = useSelector(state => state.request)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filteredReq, setFilteredReq] = useState([])
    useEffect(() => {
        getAllUserRegisterRequests().then(({ data }) => {
            dispatch(getRequestSuccess(data.users))
        }).catch((err) => console.log(err))
        if (type === 'pending') {
            console.log(filteredReq)
            setFilteredReq([...requests].filter((request) => request.status === 'pending'))
        }
    }, [type])
    const columns = [
        { field: 'firstName', headerName: 'First Name', cellClassName: 'table-cell', width: 170 },
        { field: 'lastName', headerName: 'Last name', cellClassName: 'table-cell', width: 200 },
        { field: 'email', headerName: 'email', cellClassName: 'table-cell', width: 200 },
        { field: 'role', headerName: 'role', cellClassName: 'table-cell', width: 200 },

        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 170,
            cellClassName: 'table-cell'
        },

        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 100,
            renderCell: (param) => {
                return <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EditButton onClick={() => navigate(`/user-register-request/${param.row._id}`)}>Edit</EditButton>
                    {/* <DeleteIcon onClick={() => handleDelete(param.row._id)} /> */}
                </div>
            }

        },
    ];

    return (
        <Container>

            <Title>{type && type} user register request</Title>
            <TableContainer style={{ height: '60%', width: '100%' }}>
                <DataGrid
                    rows={filteredReq?.length > 0 && type === 'pending' ? filteredReq : requests}
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
    )
}

export default UserRegisterRequests
