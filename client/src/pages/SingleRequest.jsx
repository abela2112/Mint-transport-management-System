import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
background-color: #f4f4f4;
margin:20px 10px ;
gap: 1rem;
`
const Left = styled.div`
flex: 1;
`
const Right = styled.div`
flex: 1;
`
const Center = styled.div`
flex: 1;`
const Button = styled.button`
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

const Text = styled.span``




// export default function DataTable() {
//   return (
    
//   );
// }
const SingleRequest = ({ request }) => {
    const columns=[
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
      
    return (
        <>
<div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>




        {/* <Link to={`/request/${request._id}`}>
            <Container>
                <table>
                    <tr>
                    <th><Left>Name</Left></th>
                    <th><Center>Phone No.</Center></th>
                    <th><Center>Pick Up Date</Center></th>
                    <th><Right>Status</Right></th>
                    </tr>
                    <tr>
                        <td>
                        <Left>
                            <Text>{request?.name}</Text>
                        </Left>
                        </td>
                        <td>
                        <Center><Text>{request?.phoneNumber}</Text></Center>
                        </td>
                        <td>
                        <Center><Text>{format(new Date(request?.pickUpDate)
                            , 'MMMM do yyyy')}</Text></Center>
                        </td>
                    </tr>
                </table>
                {/* <Left>
                    <Text>{request?.name}</Text>
                </Left>
                <Center><Text>{request?.phoneNumber}</Text></Center>
                <Center><Text>{format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text></Center> */}

                {/* <Right><Button type={request?.status}>{request?.status}</Button></Right>
            </Container>
        </Link> */}
        </>
        
    )
}

export default SingleRequest