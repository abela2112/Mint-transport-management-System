import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserRegisterRequests } from '../api/userApi'
import UserRegisterRequest from './UserRegisterRequest'
import { getRequestSuccess } from '../redux/features/request'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Title } from './StaffMangerPendingRequests'
import { EditButton } from './ShowAllUserForAdmin'
const Container = styled.div`
    padding: 20px;
    margin-top: 10px;
`


const UserRegisterRequests = ({ type }) => {
    //const [requests, setRequests] = useState([])
    const { requests } = useSelector(state => state.request)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filteredReq, setFilteredReq] = useState([])
    useEffect(() => {
        getAllUserRegisterRequests().then(({ data }) => {
            dispatch(getRequestSuccess(data))
        }).catch((err) => console.log(err))
        if (type === 'pending') {
            setFilteredReq([...requests].filter((request) => request.status === 'pending'))
        }
    }, [type])
    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 170 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        { field: 'email', headerName: 'email', width: 200 },
        { field: 'role', headerName: 'role', width: 200 },

        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 170,
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
            {/* {filteredReq?.length > 0 && type === 'pending' ? filteredReq.map((request, i) => (
                <UserRegisterRequest request={request} key={i} />
            )) : requests?.length > 0 && requests.map((request, i) => (
                <UserRegisterRequest request={request} key={i} />
            ))} */}
            <Title>{type && type} user register request</Title>
            <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
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
            </div>
        </Container>
    )
}

export default UserRegisterRequests