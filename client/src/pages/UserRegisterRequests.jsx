import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllUserRegisterRequests } from '../api/userApi'
import UserRegisterRequest from './UserRegisterRequest'
const Container = styled.div`
    padding: 20px;
    margin-top: 10px;
`


const UserRegisterRequests = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getAllUserRegisterRequests().then(({ data }) => {
            setRequests(data.users)
            console.log(data)
        }).catch((err) => console.log(err))
    }, [])
    return (
        <Container>
            {requests.length > 0 && requests.map((request, i) => (
                <UserRegisterRequest request={request} key={i} />
            ))}
        </Container>
    )
}

export default UserRegisterRequests