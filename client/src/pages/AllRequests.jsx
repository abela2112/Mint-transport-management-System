import React, { useEffect, useState } from 'react'
import { getAllRequests } from '../api/userApi'
import styled from 'styled-components'
import SingleRequest from './SingleRequest'
const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
`
const AllRequests = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getAllRequests().then(({ data }) => {
            setRequests(data)
        }).catch((err) => console.log(err))
    }, [])
    return (
        <Container>
            {requests.length > 0 && requests.map((request, i) => (
                <SingleRequest request={request} key={i} />
            ))}
        </Container>
    )
}

export default AllRequests