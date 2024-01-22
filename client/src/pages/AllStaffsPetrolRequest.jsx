import React, { useEffect, useState } from 'react'
import { getAllPetrolRequests } from '../api/userApi'
import styled from 'styled-components'
import SingleRequest from './SingleRequest'
import SearchBar from '../components/SearchBar'
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
const AllStaffPetrolRequests = () => {
     const [request,setRequest]=useState([])
     const {t}=useTranslation('global')
    const navigate=useNavigate()
   
    useEffect(() => {
        getAllPetrolRequests().then(({ data }) => {
            setRequest(data)
            console.log(data)
        }).catch((err) => console.log(err))
    }, [])

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Full name', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
      
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            width: 160,
            renderCell: (param) => {
                return <StatusButton type={param.row.status} >{param.row.status}</StatusButton>
            }
        },
        
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (param) => {
                return <div style={{ display: 'flex' }}>
                    <>
                        <Button onClick={() => navigate(`/petrol-request/${param.row?._id}`)}>{t("AllStaffsPetrolRequest.detail")}</Button>
                        {/* <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} /> */}

                    </>

                </div>
            },
            width: 160,
        },

    ];



    return (
        <Container>
            <Title>{t("AllStaffsPetrolRequest.requests")}</Title>
            <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
            <DataGrid
                rows={request}
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
export default AllStaffPetrolRequests