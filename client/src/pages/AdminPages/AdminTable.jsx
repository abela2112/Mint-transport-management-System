import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export const columns = [
  {
    field: "firstName",
    headerName: "First Name",
    cellClassName: "table-cell",
    width: 170,
  },
  {
    field: "lastName",
    headerName: "Last name",
    cellClassName: "table-cell",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    cellClassName: "table-cell",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    cellClassName: "table-cell",
    width: 200,
  },

  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 170,
    cellClassName: "table-cell",
  },
];
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    transition: all 0.3s ease-in-out;
`
const TableContainer = styled.div`
  .table-cell {
    font-size: 18px;
    cursor: pointer;
  }
`;
const AdminTable = ({ rows, isLoading }) => {
  const navigate = useNavigate()
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