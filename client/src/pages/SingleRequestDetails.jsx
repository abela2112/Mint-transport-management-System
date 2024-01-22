import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, TransportManagerResponseapi, updateRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { Buttonn } from './UserRegisterRequest'
import TransportManagerResponse from '../components/TransportManagerResponse'

import { io } from 'socket.io-client'
import { Avatar, Skeleton } from '@mui/material'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import StaffApproveModal from '../components/Modals/StaffApproveModal'
import StaffRejectModal from '../components/Modals/StaffRejectModal'
import { stringAvatar } from '../utils'
import { Accessibility, Badge, Business, Mail, Person } from '@mui/icons-material'
import { useTranslation } from "react-i18next"

const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
flex: 2;
display: flex;
flex-direction: column;
padding:50px;
background-color:#fff;
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
position:relative;
`
const ButtonContainer = styled.div`
 position:absolute;
 bottom:0;
 right:0;
`
const ApproveButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: #EE8624;
color: #fff;
&:disabled{
    cursor: not-allowed;
}
cursor:pointer;
`
const RejectButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: #f44336;
color: #fff;
cursor: pointer;
&:disabled{
    cursor: not-allowed;
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

const InfoContainer = styled.div`
display: flex;
flex-direction: column;
padding:30px;
flex:4;
`

const Title = styled.h1`
font-size: 24px;
color: #023047;
`
const UserDetailWrapper = styled.div`
padding: 5px 10px ;
flex: 1;
background-color: white;
display: flex;
flex-direction: column;
gap: 1rem;
width: 100%;
justify-content: center;
align-items: center;
/* border-radius:20px; */
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
`

const MainWrapper = styled.div`
    display: flex;
    gap: 4rem;
   
    
`
const P = styled.div`
display: flex;
align-items: center;
gap: 1rem;
font-size: 18px;
color: #8e8b8b;
font-weight: 300;
    
`
const UserContent = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
    
`
const SingleRequestDetails = () => {

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
    const {t}=useTranslation('global')
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
                    {request ?
                        <>  <Wrapper> 
                        <Title>{t("SingleRequestDetail.requestDetail")}
                        </Title>

                            <InfoContainer>
                            <Text><span><b>{t("SingleRequestDetail.fullName")}</b></span>{request?.name}</Text>
                            <Text><span><b>{t("SingleRequestDetail.destination")}</b></span>{request?.destination}</Text>
                            <Text><span><b>{t("SingleRequestDetail.phoneNumber")}</b></span>{request?.phoneNumber}</Text>
                            <Text><span><b>{t("SingleRequestDetail.description")}</b> </span>{request?.description}</Text>
                            <Text><span><b>{t("SingleRequestDetail.pickUpDate")}</b></span>{request?.pickUpDate && format(new Date(request?.pickUpDate)
                                , 'MMMM do yyyy')}</Text>
                            <Text><span><b>{t("SingleRequestDetail.returnDate")}</b></span>{request?.pickUpDate && format(new Date(request?.pickUpDate)
                                , 'MMMM do yyyy')}</Text>
                        </InfoContainer>

                            <ButtonContainer>
                                {role === 'staff-manager' &&
                                    <>
                                        <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' || request?.isChecked ? true : false} onClick={() => setIsOpenApproveForStaff(true)} >{request?.isChecked ? "Checked" : "Approved"}</ApproveButton>
                                        <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' || request?.isChecked ? true : false} onClick={() => setIsOpenRejectForStaff(true)}>{t("SingleRequestDetail.reject")}</RejectButton>
                                    </>}
                                {role === 'transport-manager' &&
                                    <>
                                        <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' ? true : false} onClick={handleApprove} >{t("SingleRequestDetail.approved")}</ApproveButton>
                                        <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' || request?.isChecked ? true : false} onClick={handleReject}>{t("SingleRequestDetail.reject")}</RejectButton>
                                    </>}
                                {(role !== 'transport-manager' && role !== 'staff-manager') &&
                                    <>
                                        <Buttonn type={request?.status}>{request?.status}</Buttonn>
                                    </>}

                            </ButtonContainer>
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
                                    <P><Person fontSize='large' className='icons-margin-right' />
                                        <span>{userCreated?.role}</span></P>
                                    <P><Accessibility fontSize='large' className='icons-margin-right' />
                                        <span>{userCreated?.position}</span></P>
                                </UserContent>

                            </UserDetailWrapper></> :
                        (<>
                            <Wrapper>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            </Wrapper>  
                            <UserDetailWrapper>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />

                            </UserDetailWrapper>
                        </>)
                    }
                </MainWrapper>
                {role === 'transport-manager' && <TransportManagerResponse open={isOpen} setOpen={setIsOpen} onSubmit={handleForm} requestId={id} />}
                <StaffApproveModal isOpenApproveForStaff={isOpenApproveForStaff} setIsOpenApproveForStaff={setIsOpenApproveForStaff} handleApprove={handleApprove} />
                <StaffRejectModal isOpenRejectForStaff={isOpenRejectForStaff} setIsOpenRejectForStaff={setIsOpenRejectForStaff} handleReject={handleReject} />
            </Container>

        </>
    )
}

export default SingleRequestDetails


