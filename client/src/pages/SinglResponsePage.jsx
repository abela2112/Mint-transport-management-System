import React, { useEffect, useState } from 'react'
import { UpdateResponse, getRequestResponseapiById } from '../api/userApi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'
import styled from 'styled-components'
import { format } from 'date-fns'
const Wrapper = styled.div`
display: flex;
flex-direction: column;
`
const Text = styled.span``
const SinglResponsePage = () => {
    const [response, setResponse] = useState(null)
    const { id } = useParams()
    const { user } = useSelector(state => state.user)
    
    useEffect(() => {
        UpdateResponse(id, { userId: user._id }).then((data) => console.log('seen')).catch((err) => console.log(err))
    }, [id])

    useEffect(() => {
        getRequestResponseapiById(id).then(({ data }) => setResponse(data)).catch((err) => console.log(err))
    }, [id])
    console.log(response)

    return (
        <Container>
            <Wrapper>
                <Text>Driver Name:{response?.DriverName}</Text>
                <Text>Driver Phone:{response?.DriverPhone}</Text>
                <Text>Plate Number:{response?.PlateNumber}</Text>
                <Text>Return date:{response?.ReturnDate && format(new Date(response?.ReturnDate)
                    , 'MMMM do yyyy')}</Text>
            </Wrapper>
        </Container>
    )
}
export default SinglResponsePage