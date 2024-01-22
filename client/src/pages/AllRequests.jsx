import React, { useEffect, useState } from 'react'
import { getAllRequests } from '../api/userApi'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from 'react-redux'
import { getRequestSuccess } from '../redux/features/request'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Title } from './StaffMangerPendingRequests'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
export const StatusButton = styled.button`
border:none;
padding: 5px 7px;
border-radius: 10px;
  background-color: ${({ type }) => type === 'approved' && '#e5faf2'};
  background-color: ${({ type }) => type === 'rejected' && '#fff0f1'};
  background-color: ${({ type }) => type === 'pending' && '#ebf1fe'};
 
  color: ${({ type }) => type === 'approved' && '#3bb077'};
  color: ${({ type }) => type === 'rejected' && '#d95087'};
  color: ${({ type }) => type === 'pending' && '#3bb077'};
`
const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
`
const AllRequests = ({ type }) => {
    const {t}=useTranslation('global')
    const { requests } = useSelector(state => state.request)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filteredReq, setFilteredReq] = useState([])
    useEffect(() => {
        getAllRequests().then(({ data }) => {
            dispatch(getRequestSuccess(data.data))
        }).catch((err) => console.log(err))
        if (type === 'pending') {
            console.log(filteredReq)
            setFilteredReq([...requests].filter((request) => request.status === 'pending'))
        }
        else {
            setFilteredReq(requests)
        }
    }, [type])

    const columns = [
        { field: '_id', headerName: t("AllRequests.ID"), width: 100 }, 
        { field: 'name', headerName: t("AllRequests.fullName"), width: 200 },
        { field: 'phoneNumber', headerName: t("AllRequests.phoneNumber"), width: 250 },
        {
            field: 'pickUpDate',
            headerName: t("AllRequests.pickUpDate"),

            width: 150,
            renderCell: (param) => {
                return format(param.row?.pickUpDate && new Date(param.row?.pickUpDate), 'MMMM do yyyy')
            }
        },
        {
            field: 'status',
            headerName: t("AllRequests.status"),
            sortable: false,
            width: 160,
            renderCell: (param) => {
                return <StatusButton type={param.row.status} >{t(param.row.status)}</StatusButton>
            }
        },
        
        {
            field: 'action',
            headerName: t("AllRequests.action"),
            sortable: false,
            renderCell: (param) => {
                return <div style={{ display: 'flex' }}>
                    <>
                        <Button onClick={() => navigate(`/request/${param.row?._id}`)}>{t("AllRequests.detail")}</Button>
                        <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
                    </>
                </div>
            },
            width: 160,
        },

    ];



    return (
        <Container>
            <Title>{type && type}{t("AllRequests.requests")}</Title>
            <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
            <DataGrid
                    rows={filteredReq}
                getRowId={(row) => row?._id}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
            </div></Container>
    );
}
export default AllRequests