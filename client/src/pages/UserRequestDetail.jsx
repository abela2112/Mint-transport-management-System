import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, getUserRegisterRequests, updateRequestById, updateUserRegisterRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
const Container = styled.div `
    padding: 20px;
`
const Wrapper = styled.div `
display: flex;
align-items:left;
justify-content:space-between;
//flex-direction: column;
 gap:1rem;
 padding:20px;
 box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);


`
const ButtonContainer = styled.div``
const ApproveButton = styled.button `
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color:#e5faf2;

&:disabled{
    cursor: not-allowed;
}
cursor:pointer;
`
const RejectButton = styled.button `
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: '#fff0f1';
cursor: pointer;
&:disabled{
    cursor: not-allowed;
}
`
const ImageContainer = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  

`
const Image = styled.img`
   width:100px;
   height:100px;
   border-radius:50%;
   object-fit:cover;
`
const InfoContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex:2;
`
const Text = styled.span `
padding: 10px;
`
const UserRequestDetail = () => {
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const handleApprove = (e) => {
        e.preventDefault()
        updateUserRegisterRequestById(id, { status: 'approved' }).then(({ data }) => {
            console.log('approved successfully')
            setRequest(data.user)
        }).catch((err) => console.log(err));
    }
    const handleReject = (e) => {
        e.preventDefault()
        updateUserRegisterRequestById(id, { status: 'rejected' }).then(({ data }) => {
            console.log('rejected successfully', data)
            setRequest(data.user)
    }
        ).catch((err) => console.log(err));
    }

    console.log('id>>>', id)
    useEffect(() => {
        setIsLoading(true)
        getUserRegisterRequests(id).then(({ data }) => {
            console.log('user request data', data)
            setIsLoading(false)
            setRequest(data.users)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [id])
    if (isLoading) return <Loader />
    console.log(request)
    return (
        <Container>
            <Wrapper>
                <ImageContainer>
                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" />
                    <Text><b>Full Name:</b>{request?.firstName} {request?.lastName}</Text>
                </ImageContainer>
                <InfoContainer>
                    <Text><b>email:</b>{request?.email}</Text>
                    <Text><b>Phone Number:</b>{request?.phoneNumber}</Text>
                    <Text><b>position:</b> {request?.position}</Text>
                    <Text><b>department:</b> {request?.department}</Text>
                    <Text> <b>role:</b>{request?.role}</Text>

                    <Text><b>Redistered Date:</b>{request?.createdAt && format(new Date(request?.createdAt)
                        , 'MMMM do yyyy')}</Text> 
                    <ButtonContainer>
                <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' ? true : false} onClick={handleApprove} >Approved</ApproveButton>
                <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' ? true : false} onClick={handleReject}>Reject</RejectButton>

            </ButtonContainer>
                </InfoContainer>

            </Wrapper>


        </Container>
    )
}

export default UserRequestDetail