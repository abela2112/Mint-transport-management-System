import React, { useEffect, useState } from 'react'
import { UpdateResponse, getRequestResponseapiById } from '../../api/userApi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Box, Content } from '../../components/SingleRequestDetails'
const Wrapper = styled.div`
display: flex;
flex-direction: column;
padding:50px;
background-color:#fff;

//background-color:pink;
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
    position:relative;

    @media screen and (max-width: 768px) {
      padding:10px ;
    }
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
const Title = styled.h2`
`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
padding:30px;
flex:4;
@media screen and (max-width:768px){
   padding :0px ;
}
`
const Span = styled.span`
    font-weight: 300;
`
const SinglResponsePage = () => {
    const [response, setResponse] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        getRequestResponseapiById(id).then(({ data }) => {
            setResponse(data)
        }).catch((err) => console.log(err))
    }, [id])
    console.log(response)

    return (
        <Container>
            <Wrapper>
                <Title>Response Detail</Title>
                {/* <Span>Dear {user?.firstName} your request has been approved.
                    you can get more detail about the response here below.
                </Span> */}
                <Info response={response} />
            </Wrapper>
        </Container>
    )
}
export const Info = ({ response }) => {
    return <InfoContainer>
        <Box><span>Driver Name</span>
            <Content>{response?.DriverName}</Content></Box>
        <Box><span>Driver Phone</span>
            <Content>{response?.DriverPhone}</Content></Box>
        <Box><span>Plate Number</span><Content>{response?.PlateNumber}</Content></Box>
        <Box><span>Return date</span><Content>{response?.ReturnDate && format(new Date(response?.ReturnDate)
            , 'MMMM do yyyy')}</Content></Box>
    </InfoContainer>
}
export default SinglResponsePage