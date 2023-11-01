import React, { useEffect, useState } from 'react'
import { getUserRequests } from '../api/userApi'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SingleRequest from './SingleRequest'
const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
`
const UserRequests = () => {
    const [requests, setRequests] = useState([])

    const user = useSelector(state => state.user)

    useEffect(() => {
        getUserRequests(user?._id).then(({ data }) => {
            setRequests(data)
            console.log(data)
        }).catch((err) => console.log(err))
    }, [user])

    console.log(requests)
    return (
        <Container>
            {
                requests.length > 0 && requests.map((request, i) => (
                    <SingleRequest request={request} key={i} />
                ))
            }
        </Container>
    )
}

export default UserRequests