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
import {useTranslation} from 'react-i18next';
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
    const {t}=useTranslation('global')
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
        { field: 'firstName', headerName: t("UserRegisterRequest.firstName"), cellClassName: 'table-cell', width: 170 },
        { field: 'lastName', headerName: t("UserRegisterRequest.lastName"), cellClassName: 'table-cell', width: 200 },
        { field: 'email', headerName: t("UserRegisterRequest.email"), cellClassName: 'table-cell', width: 200 },
        { field: 'role', headerName: t("UserRegisterRequest.role"), cellClassName: 'table-cell', width: 200 },

        {
            field: 'phoneNumber',
            headerName: t("UserRegisterRequest.phoneNumber"),
            width: 170,
            cellClassName: 'table-cell'
        },

        {
            field: 'action',
            headerName: t("UserRegisterRequest.action"),
            sortable: false,
            width: 100,
            renderCell: (param) => {
                return <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EditButton onClick={() => navigate(`/user-register-request/${param.row._id}`)}>{t("UserRegisterRequest.edit")}</EditButton>
                    {/* <DeleteIcon onClick={() => handleDelete(param.row._id)} /> */}
                </div>
            }

        },
    ];

    return (
        <Container>

            <Title>{type && type} {t("UserRegisterRequest.userRegisterRequest")}</Title>
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
