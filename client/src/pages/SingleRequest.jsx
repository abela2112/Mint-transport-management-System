import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { StatusButton } from '../components/Buttons';
const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
background-color: #fff;
margin:20px 10px ;
gap: 1rem;
`
const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
gap: 10px;
`
const Right = styled.div`
flex: 1;
`
const Center = styled.div`
flex: 1;`


const Text = styled.span` 
font-size: 16px;
`
const SingleRequest = ({ request }) => {

    return (
        <Link to={`/request/${request._id}`}>
            <Container>
                <Left>
                    <Text>{request?.name}</Text>
                    <StatusButton type={request?.status}>{request?.status}</StatusButton>

                </Left>
                {/* <Center><Text>Phone Number :{request?.phoneNumber}</Text></Center> */}
                <Center><Text>Pick Up date:{format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text></Center>
                <Right></Right>
            </Container>
        </Link>
    )
}

export default SingleRequest