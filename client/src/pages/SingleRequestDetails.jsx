import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, TransportManagerResponseapi, updateRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { Button } from './UserRegisterRequest'
import TransportManagerResponse from '../components/TransportManagerResponse'
import { io } from 'socket.io-client'
import { Skeleton } from '@mui/material'
const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
    
`
const ButtonContainer = styled.div``
const ApproveButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color:#e5faf2;

&:disabled{
    cursor: not-allowed;
}
cursor:pointer;
`
const RejectButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: '#fff0f1';
cursor: pointer;
&:disabled{
    cursor: not-allowed;
}
`
const Text = styled.span`
padding: 10px;
`
const SingleRequestDetails = () => {
    const { user } = useSelector(state => state.user)
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const [isOpen, setIsOpen] = useState(false)
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
    const handleApprove = (e) => {
        e.preventDefault()
        if (user?.role === 'transport-manager') {
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

    const handleReject = (e) => {
        e.preventDefault()
        updateRequestById(id, { isChecked: false, status: 'rejected' }).then(({ data }) => {
            console.log('rejected data', data)
            socket.emit('sendNotificationToStaff', { notificationType: "response", messageId: data?._id, message: 'your request has been rejected ', from: user?._id, to: data?.userCreated });
            console.log('rejected successfully')
            setRequest(data)
        }).catch((err) => console.log(err));
    }


    if (isLoading) return <Loader />
    console.log(request)

    return (
        <>
            {request ?
                <Container>
                    <Wrapper>
                        <Text>Full Name:{request?.name}</Text>
                        <Text>destination:{request?.destination}</Text>
                        <Text>Phone Number:{request?.phoneNumber}</Text>
                        <Text> description:{request?.description}</Text>
                        <Text>Pick Up date:{request?.pickUpDate && format(new Date(request?.pickUpDate)
                            , 'MMMM do yyyy')}</Text>
                        <Text>return date:{request?.pickUpDate && format(new Date(request?.pickUpDate)
                            , 'MMMM do yyyy')}</Text>


                    </Wrapper>
                    <ButtonContainer>
                        {user?.role === 'staff-manager' &&
                            <>
                                <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' || request?.isChecked ? true : false} onClick={handleApprove} >{request?.isChecked ? "Checked" : "Approved"}</ApproveButton>
                                <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' || request?.isChecked ? true : false} onClick={handleReject}>Reject</RejectButton>
                            </>
                        }
                        {user?.role === 'transport-manager' &&
                            <>
                                <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' ? true : false} onClick={handleApprove} >Approved</ApproveButton>
                                <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' ? true : false} onClick={handleReject}>Reject</RejectButton>
                            </>}
                        {(user?.role !== 'transport-manager' && user?.role !== 'staff-manager') &&
                            <>
                                <Button type={request?.status}>{request?.status}</Button>
                            </>}

                    </ButtonContainer>
                    {user?.role === 'transport-manager' && <TransportManagerResponse open={isOpen} setOpen={setIsOpen} onSubmit={handleForm} requestId={id} />
                    }
                </Container> :
                <Container>
                    <Wrapper>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    </Wrapper>
                </Container>
                }

        </>
    )
}

export default SingleRequestDetails




