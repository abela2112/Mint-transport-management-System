import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { format } from 'date-fns'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { Title } from './StaffMangerPendingRequests'
import { StatusButton } from './AllRequests'
import { useTranslation } from "react-i18next"

const Button = styled.button`
    padding: 5px 10px;
    border:none;
    border-radius:10px;
    background-color: #3bb077;
    color: #fff;
    cursor:pointer;
    margin-right: 20px;

`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
   `
const History = () => {
    const {t}=useTranslation('global')
    const [requests, setRequests] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`/api/request?checked=true`).then(({ data }) => {
            setRequests(data.data)
        }).catch((err) => console.log(err))
    }, [])
    console.log(requests) 
    const columns = [
        { field: '_id', headerName:t("History.Id"), width: 100 },
        { field: 'name', headerName: t("History.fullName"), width: 200 },
        { field: 'phoneNumber', headerName: t("History.phoneNumber"), width: 200 },
        {
            field: 'pickUpDate',
            headerName: t("History.pickUpDate"),

            width: 150,
            renderCell: (param) => {
                return format(new Date(param.row?.pickUpDate), 'MMMM do yyyy')
            }
        },
        {
            field: 'status',
            headerName: t("History.status"),
            sortable: false,
            width: 160,
            renderCell: (param) => {
                return <StatusButton type={param.row.status}>{param.row.status}</StatusButton>

            }
        },
        {
            field: 'action',
            headerName: t("History.action"),
            sortable: false,
            renderCell: (param) => {
                return <div style={{ display: 'flex' }}>
                    <>
                        <Button onClick={() => navigate(`/request/${param.row?._id}`)}>{t("History.detail")}</Button>
                        <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />

                    </>

                </div>
            },
            width: 160,
        },

    ];

    return (<Container>
        <Title>{t("History.history")}</Title>
        <div style={{ width: '100%', marginTop: '20px' }}>
            <DataGrid
                rows={requests}
                columns={columns}
                getRowId={(row) => row?._id}
                disableRowSelectionOnClick

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


export default History