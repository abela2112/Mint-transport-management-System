import React from 'react'
import styled from 'styled-components'
import { Button, Title } from './StaffMangerPendingRequests';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
// import {StatusButton} from 
import DeleteIcon from '@mui/icons-material/Delete';
import { StatusButton } from '../../components/Buttons';
import { useTranslation } from 'react-i18next';
const Container = styled.div`
    padding: 20px;
    margin-top: 10px;
    background-color: #fff;
`
const RequestsTable = ({ title, rows }) => {
    const navigate = useNavigate()
    const { t } = useTranslation('global')
    const columns = [
        { field: '_id', headerName: t("AllRequests.ID"), width: 100 },
        { field: 'name', headerName: t("AllRequests.fullName"), width: 200 },
        { field: 'phoneNumber', headerName: t("AllRequests.phoneNumber"), width: 200 },
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
                return <StatusButton type={param.row.status}>{param.row.status}</StatusButton>
            }
        },


    ];
    if (!rows) return null
    return (
        <Container>
            <Title>{title}</Title>
            <div style={{ width: '100%', marginTop: '20px', height: 400 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row?._id}
                    disableRowSelectionOnClick
                    onCellClick={(param) => navigate(`/request/${param.row?._id}`)}
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

export default RequestsTable