import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TableContainer = styled.div`
  .table-cell {
    font-size: 18px;
    cursor: pointer;
  }
  `;
const AdminTable = ({ rows, isLoading }) => {
  const { t } = useTranslation('global')
  const navigate = useNavigate()
  const columns = [
    {
      field: "firstName",
      headerName: t("ShowAllUserForAdmin.firstName"),
      cellClassName: "table-cell",
      width: 170,
    },
    {
      field: "lastName",
      headerName: t("ShowAllUserForAdmin.lastName"),
      cellClassName: "table-cell",
      width: 200,
    },
    {
      field: "email",
      headerName: t("ShowAllUserForAdmin.email"),
      cellClassName: "table-cell",
      width: 200,
    },
    {
      field: "role",
      headerName: t("ShowAllUserForAdmin.role"),
      cellClassName: "table-cell",
      width: 200,
    },

    {
      field: "phoneNumber",
      headerName: t("ShowAllUserForAdmin.phoneNumber"),
      width: 170,
      cellClassName: "table-cell",
    },
  ];
  if (isLoading) return <p>Loading.....</p>
  return (


    <TableContainer style={{ height: 400, width: '100%', marginTop: '20px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        onCellClick={(param) => navigate('/user-register-request/' + param.row?._id)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </TableContainer>

  )
}

export default AdminTable