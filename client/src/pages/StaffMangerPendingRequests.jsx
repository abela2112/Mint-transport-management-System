import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import styled from 'styled-components'
import axios from 'axios'
import UserRegisterRequest from './UserRegisterRequest'
import { useSelector } from 'react-redux'
import SingleRequest from './SingleRequest'
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
const Title = styled.span``
const Select = styled.select``
const Option = styled.option``
const Container = styled.div`
    padding: 20px;
    margin-top: 10px;
`
const SortingBox = styled.div`
border: 1px solid #F5F5F7;
display:flex;
align-items: center;
padding: 5px;

`

const StaffMangerPendingRequests = () => {
    const [requests, setRequests] = useState([])
    const user = useSelector((state) => state.user);
    const [sortingTerm, setSortingTerm] = useState('')
    const navigate=useNavigate()
    
    useEffect(() => {
        axios.get(`/api/request?department=${user?.department}`).then(({ data }) => {
            setRequests(data)

        }).catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        sortingTerm && sortingTerm === 'ASC' ? setRequests((requests) => requests?.toSorted((a, b) => new Date(a?.pickUpDate) - new Date(b?.pickUpDate))) : setRequests((requests) => requests?.toSorted((a, b) => new Date(b?.pickUpDate) - new Date(a?.pickUpDate)))
    }, [sortingTerm])






    const columns=[
       // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Full name', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
        {
          field: 'pickUpDate',
          headerName: 'Pick Up Date',
          width: 190,
          renderCell:(param)=>{
            return format(new Date(param?.row.pickUpDate)
              , 'MMMM do yyyy')
          }
        },
        {
          field: 'status',
          headerName: ' Status',
          width: 160,
          },
      ];
      
    //   const rows = [
    //     {  lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     {  lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     {  lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     {  lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     {  lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     {  lastName: 'Melisandre', firstName: null, age: 150 },
    //     {  lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     {  lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     {  lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];
      console.log(requests);
   
    return (<>

        <Container>
            {/* <div>
                <SortingBox>
                    <Title>Sort BY:</Title>
                    <Select value={sortingTerm} defaultValue={'ASC'} onChange={(e) => setSortingTerm(e.target.value)}>
                        <Option value={'ASC'}>ASC</Option>
                        <Option value={'DES'}>DES</Option>
                    </Select>
                </SortingBox>
            </div>
         */}
        
<div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={requests}
        getRowId={(row)=>row?._id}
        disableRowSelectionOnClick
        onRowClick={(param)=>navigate(`/request/${param.row._id}`)}
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
            {/* {requests?.length > 0 && requests.map((request, i) => (
                <SingleRequest request={request} key={i} />
            ))} */}
        </Container></>
    )
}

export default StaffMangerPendingRequests