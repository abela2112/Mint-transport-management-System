import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
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
const SingleRequest = ({ request }) => {

    return (
        <Link to={`/request/${request._id}`}>
            <Container>
                <Left>
                    <Text>Full Name:{request?.name}</Text>
                </Left>
                <Center><Text>Phone Number :{request?.phoneNumber}</Text></Center>
                <Center><Text>Pick Up date:{format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text></Center>

                <Right><Button type={request?.status}>{request?.status}</Button></Right>
            </Container>
        </Link>
    )
}

export default SingleRequest