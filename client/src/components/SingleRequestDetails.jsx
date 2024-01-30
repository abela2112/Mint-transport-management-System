import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { TransportManagerResponseapi, getRequestById, updateRequestById } from '../api/userApi'
import TransportManagerResponse from './TransportManagerResponse'

import { Accessibility, Badge, Business, Mail, Person } from '@mui/icons-material'
import { Avatar, Skeleton } from '@mui/material'
import { io } from 'socket.io-client'
import { stringAvatar } from '../utils'
import { StatusButton } from './Buttons'
import StaffApproveModal from './Modals/StaffApproveModal'
import StaffRejectModal from './Modals/StaffRejectModal'


const Container = styled.div`
    padding: 20px;

    @media screen and (max-width: 768px) {
       padding: 0; 
    }
`
const Wrapper = styled.div`
flex: 2;
display: flex;
flex-direction: column;
padding:50px;
gap: 1rem;
background-color:#fff;
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
position:relative;

@media screen and (max-width:768px){
  padding:10px;
}
`
const ButtonContainer = styled.div`
 display: flex;
 align-items: flex-end;
 justify-content: flex-end;
 margin-top: 2rem;
`
export const ApproveButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: rgb(255, 165, 0);
color: #fff;
&:disabled{
    cursor: not-allowed;
}
cursor:pointer;
`
export const RejectButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: #f5f5f5;
color: #000;
cursor: pointer;
&:disabled{
    cursor: not-allowed;
}
`
export const Box = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 100%;
word-spacing: 0.3em;
span {
    margin-right: 1em;
    width: 200px; /* Adjust the width as needed */
    text-align: left;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-transform: capitalize;
  }
`

const InfoContainer = styled.div`
display: flex;
flex-direction: column;
flex:4;

@media screen and (max-width:768px) {
   padding :10px;
}
`

const Title = styled.span`
font-weight: 600;
font-size: 24px;
color: #023047;
`
const UserDetailWrapper = styled.div`
flex: 1;
padding: 20px ;
background-color: white;
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center; 
width: 100%;
height: 450px;
/* border-radius:20px; */
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
`

const MainWrapper = styled.div`
    display: flex;
    gap: 2rem;

    @media screen and (max-width:768px) {
        flex-direction: column-reverse;
    }
   
    
`
const P = styled.div`
display: flex;
align-items: center;
gap: 1rem;
font-size: 16px;
color: #8e8b8b;
font-weight: 300;
@media screen and (max-width: 768px) {
   width: 100%;

}
    
`
const UserContent = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
    
`
export const Content = styled.div`
    border: 1px solid #f5f5f5;
    padding: 10px;
    margin-top: 5px;
    font-weight: 300;
    color: #b9b6b6;
`
export default function SingleRequestDetails() {

    const { user } = useSelector(state => state.user)
    let role = user?.role
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenRejectForStaff, setIsOpenRejectForStaff] = useState(false)
    const [isOpenApproveForStaff, setIsOpenApproveForStaff] = useState(false)
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const title = `${request?.userCreated?.firstName} ${request?.userCreated?.lastName}`
    const userCreated = request?.userCreated
    const socket = io("http://localhost:5000");
    useEffect(() => {
        setIsLoading(true)
        getRequestById(id).then(({ data }) => {
            setIsLoading(false)
            console.log('single request', data)
            setRequest(data)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [id])
    const handleForm = (data) => {
        TransportManagerResponseapi(data)
            .then(({ data }) => {
                console.log('data. transport response', data)
                socket.emit('sendNotificationToStaff', { notificationType: "response", messageId: data?._id, message: 'your request has been approved ', from: user?._id, to: request?.userCreated });
                getRequestById(data?.requestId).then(({ data }) => {
                    console.log('single request', data)
                    setRequest(data)
                })
            })
            .catch((err) => console.log(err))
    }
    const handleApprove = () => {


        if (role === 'staff-manager') {
            setIsOpenApproveForStaff(true);
        }
        if (role === 'transport-manager') {
            setIsOpen(true)

        }
        else {
            updateRequestById(id, { isChecked: true }).then(({ data }) => {
                socket.emit('sendNotificationToTransportManager', { notificationType: "request", messageId: data?._id, message: 'new request', from: user?._id });
                console.log('approved successfully', data)
                setRequest(data)
            }).catch((err) => console.log(err));
        }
    }

    const handleReject = () => {

        updateRequestById(id, { isChecked: false, status: 'rejected' }).then(({ data }) => {
            console.log('rejected data', data)
            socket.emit('sendNotificationToStaff', { notificationType: "response", messageId: data?._id, message: 'your request has been rejected ', from: user?._id, to: data?.userCreated });
            console.log('rejected successfully')
            setRequest(data)
        }).catch((err) => console.log(err));
    }


    //if (isLoading) return <Loader />
    console.log('request', request)
    return (
        <>
            <Container>
                <MainWrapper>
                    {!isLoading ?
                        <>
                            <Wrapper>
                                <Title>Request Detail</Title>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <StatusButton type={request?.status} >{request?.status}</StatusButton>
                                    {request?.status !== "pending" && <Link to={`/response/request/${request?._id}`}>Response</Link>}
                                </div>
                                <div>{role === 'staff-manager' && request?.isChecked ? "Checked" : ""}</div>
                                <InfoContainer>
                                    <Box>
                                        <span>Full Name</span>
                                        <Content>{request?.name}</Content>
                                    </Box>
                                    <Box><span>destination</span>
                                        <Content>{request?.destination}</Content></Box>
                                    <Box>
                                        <span>Phone Number</span>
                                        <Content> {request?.phoneNumber}</Content></Box>
                                    <Box><span>description  </span>
                                        <Content>{request?.description}</Content></Box>
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        <Box><span>Pick Up date</span>
                                            <Content>{request?.pickUpDate && format(new Date(request?.pickUpDate)
                                                , 'MMMM do yyyy')}</Content></Box>
                                        <Box>
                                            <span>return date</span>
                                            <Content>{request?.pickUpDate && format(new Date(request?.pickUpDate)
                                                , 'MMMM do yyyy')}</Content></Box>
                                    </div>
                                    <Box>
                                        <span>Passengers</span>
                                        {request?.Passangers.length > 0 && request.Passangers.map((passenger) => (
                                            <Content>{passenger.value}</Content>
                                        ))}
                                    </Box>

                                </InfoContainer>

                                {
                                    role === "transport-manager" && request?.status === "pending" && <ButtonContainer>
                                        <ApproveButton onClick={handleApprove}>Approve</ApproveButton>
                                        <RejectButton onClick={handleReject}>Reject</RejectButton>
                                    </ButtonContainer>
                                }
                                {
                                    role === "staff-manager" && (request?.status === "pending" && request?.isChecked || role === "staff-manager" && request?.status !== "pending" ? <ButtonContainer></ButtonContainer> :
                                        <ButtonContainer>
                                            <ApproveButton onClick={() => setIsOpenApproveForStaff(true)}>Approve</ApproveButton>
                                            <RejectButton onClick={() => setIsOpenRejectForStaff(true)}>Approve</RejectButton>
                                        </ButtonContainer>
                                    )
                                }


                            </Wrapper>
                            <UserDetailWrapper>
                                <Avatar  {...stringAvatar(`${title}`, 150, 150)} alt={title} />
                                <UserContent>
                                    <P><Badge fontSize='large' className='icons-margin-right' />
                                        <span>{title}</span></P>

                                    <P><Business fontSize='large' className='icons-margin-right' />
                                        <span>{userCreated?.department}</span></P>
                                    <P><Mail fontSize='large' className='icons-margin-right' />
                                        <span> {userCreated?.email}</span></P>
                                    <P>
                                        <Person fontSize='large' className='icons-margin-right' />
                                        <span>{userCreated?.role}</span></P>
                                    <P><Accessibility fontSize='large' className='icons-margin-right' />
                                        <span>{userCreated?.position}</span></P>
                                </UserContent>

                            </UserDetailWrapper></> :
                        <>
                            <Wrapper>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            </Wrapper>
                            <UserDetailWrapper>
                                <Skeleton variant="circular" width={100} height={100} sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" width={"100%"} sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" width={"100%"} animation="wave" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" width={"100%"} sx={{ fontSize: '2rem' }} />
                            </UserDetailWrapper>
                        </>
                    }
                </MainWrapper>
                {role === 'transport-manager' && <TransportManagerResponse open={isOpen} setOpen={setIsOpen} onSubmit={handleForm} requestId={id} />}
                <StaffApproveModal isOpenApproveForStaff={isOpenApproveForStaff} setIsOpenApproveForStaff={setIsOpenApproveForStaff} handleApprove={handleApprove} />
                <StaffRejectModal isOpenRejectForStaff={isOpenRejectForStaff} setIsOpenRejectForStaff={setIsOpenRejectForStaff} handleReject={handleReject} />
            </Container>

        </>
    )
}




