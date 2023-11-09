import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import styled from 'styled-components'
import axios from 'axios'
import UserRegisterRequest from './UserRegisterRequest'
import { useSelector } from 'react-redux'
import SingleRequest from './SingleRequest'
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
    
    useEffect(() => {
        axios.get(`/api/request?department=${user?.department}`).then(({ data }) => {
            setRequests(data)

        }).catch((err) => console.log(err))
    }, [])
    console.log(requests)
    useEffect(() => {
        sortingTerm && sortingTerm === 'ASC' ? setRequests((requests) => requests?.toSorted((a, b) => new Date(a?.pickUpDate) - new Date(b?.pickUpDate))) : setRequests((requests) => requests?.toSorted((a, b) => new Date(b?.pickUpDate) - new Date(a?.pickUpDate)))
    }, [sortingTerm])

    return (<>

        <Container>
            <div>
                <SortingBox>
                    <Title>Sort BY:</Title>
                    <Select value={sortingTerm} defaultValue={'ASC'} onChange={(e) => setSortingTerm(e.target.value)}>
                        <Option value={'ASC'}>ASC</Option>
                        <Option value={'DES'}>DES</Option>
                    </Select>
                </SortingBox>
            </div>
            {requests?.length > 0 && requests.map((request, i) => (
                <SingleRequest request={request} key={i} />
            ))}
        </Container></>
    )
}

export default StaffMangerPendingRequests