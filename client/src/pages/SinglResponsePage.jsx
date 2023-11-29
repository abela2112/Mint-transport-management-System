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
padding:50px;

//background-color:pink;
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
    position:relative;
`
const Text = styled.span`
padding: 10px;
word-spacing: 0.3em;
span {
    margin-right: 1em;
    width: 200px; /* Adjust the width as needed */
    text-align: left;
  }
`
const Title = styled.h1`
   position:absolute;
   top:0;
`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
padding:30px;
flex:4;
`

const SinglResponsePage = () => {
    const [response, setResponse] = useState(null)
    const { id } = useParams()
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        getRequestResponseapiById(id).then(({ data }) => {
            setResponse(data)
            console.log('response', data)
        }).catch((err) => console.log(err))
    }, [id])
    console.log(response)

    return (
        <Container>
            
            <Wrapper>
            <Title>Response Detail</Title>

              <InfoContainer>
                <Text><span><b>Driver Name:</b></span>{response?.DriverName}</Text>
                <Text><span><b>Driver Phone:</b></span>{response?.DriverPhone}</Text>
                <Text><span><b>Plate Number:</b></span>{response?.PlateNumber}</Text>
                <Text><span><b>Return date:</b></span>{response?.ReturnDate && format(new Date(response?.ReturnDate)
                    , 'MMMM do yyyy')}</Text>
               </InfoContainer>     
            </Wrapper>
        </Container>
    )
}
export default SinglResponsePage