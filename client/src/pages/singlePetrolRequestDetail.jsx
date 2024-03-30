import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, TransportManagerResponseapi, updateAPetrolRequest, updateRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { Buttonn } from './UserRegisterRequest'
import TransportManagerResponse from '../components/TransportManagerResponse'
import  {getAPetrolRequest} from '../api/userApi'
import { io } from 'socket.io-client'
import { useTranslation } from "react-i18next"
import { Skeleton } from '@mui/material'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";


const Container = styled.div`
    padding: 20px;
`
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
const ButtonContainer = styled.div`
 position:absolute;
 bottom:0;
 right:0;
`
const ApproveButton = styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: #4caf50;
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
   position:absolute;
   top:0;
`

const SinglePetrolRequestDetail = () => {
    
    const { user } = useSelector(state => state.user)
    let role = user?.role
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenRejectForStaff, setIsOpenRejectForStaff] = useState(false)
    const [isOpenApproveForStaff, setIsOpenApproveForStaff] = useState(false)
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const socket = io("http://localhost:5000");
    const {t}=useTranslation('global')
    useEffect(() => {
        setIsLoading(true)
        getAPetrolRequest(id).then(({ data }) => {
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
                // socket.emit('sendNotificationToStaff', { notificationType: "response", messageId: data?._id, message: 'your request has been approved ', from: user?._id, to: request?.userCreated });
                getAPetrolRequest(data?._id).then(({ data }) => {
                    console.log('single request', data)
                    setRequest(data)
                })
            })
            .catch((err) => console.log(err))
    }
    const handleApprove = () => {
            updateAPetrolRequest(id, {  status: 'approved' }).then(({ data }) => {
                console.log('approved data', data)
                // socket.emit('sendNotificationToStaff', { notificationType: "response", messageId: data?._id, message: 'your request has been rejected ', from: user?._id, to: data?.userCreated });
                console.log('rejected successfully')
                setRequest(data)
            }).catch((err) => console.log(err));
        
    }

    const handleReject = () => {
        
        updateAPetrolRequest(id, {  status: 'reject' }).then(({ data }) => {
            console.log('rejected data', data)
            // socket.emit('sendNotificationToStaff', { notificationType: "response", messageId: data?._id, message: 'your request has been rejected ', from: user?._id, to: data?.userCreated });
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
                        <Title>{t("singlePetrolRequestDetail.requestDetail")}</Title>
                        <InfoContainer>

                            <Text><span><b>{t("singlePetrolRequestDetail.fullName")}</b></span>{request?.name}</Text>
                   
                            <Text><span><b>{t("singlePetrolRequestDetail.phoneNumber")}</b></span>{request?.phoneNumber}</Text>
                            <Text><span><b>{t("singlePetrolRequestDetail.description")}</b> </span>{request?.discription}</Text>
                            <Text><span><b>{t("singlePetrolRequestDetail.requestdate")}</b></span>{request?.requestDate && format(new Date(request?.requestDate)
                                , 'MMMM do yyyy')}</Text>
                         
                        </InfoContainer>
                        <ButtonContainer>
                            {role === 'transport-manager' &&
                                <>
                                    <ApproveButton disabled={request?.status === 'approved' || request?.status === 'reject' ? true : false} onClick={()=>setIsOpenApproveForStaff(true)} >{t("singlePetrolRequestDetail.approved")}</ApproveButton>
                                    <RejectButton disabled={request?.status === 'reject' || request?.status === 'approved' || request?.isChecked ? true : false} onClick={()=>setIsOpenRejectForStaff(true)}>{t("singlePetrolRequestDetail.reject")}</RejectButton>
                                </>
                                
                            }
                          

                        </ButtonContainer>

                    </Wrapper>

                    <Dialog
                        open={isOpenApproveForStaff}
                        onClose={() => setIsOpenApproveForStaff(false)}
                        aria-labelledby="dialog-title"
                        aria-describedby="dialog-description"
                        maxWidth='lg'
                    >
                        <DialogTitle id="dialog-title">
                            {t("singlePetrolRequestDetail.wantToApprove")}
                        </DialogTitle>
                        <DialogContent id="dialog-description">
                            {/* <DialogContentText></DialogContentText> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsOpenApproveForStaff(false)} style={{ backgroundColor: "Red", color: "white" }}>{t("singlePetrolRequestDetail.no")}</Button>
                            <Button
                                style={{ backgroundColor: "Yellow", color: "white" }}
                                autoFocus
                                onClick={() => {
                                    handleApprove()
                                    setIsOpenApproveForStaff(false);
                                }}
                            >
                                {t("singlePetrolRequestDetail.yes")}
                            </Button>
                        </DialogActions>
                    </Dialog>



                    <Dialog
                        
                        open={isOpenRejectForStaff}
                        onClose={() => setIsOpenRejectForStaff(false)}
                        aria-labelledby="dialog-title"
                        aria-describedby="dialog-description"
                        maxWidth='lg'
                    >
                        <DialogTitle id="dialog-title">
                           {t("singlePetrolRequestDetail.confirmation")}
                        </DialogTitle>
                        <DialogContent id="dialog-description">
                            <DialogContentText> {t("singlePetrolRequestDetail.wantToReject")}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsOpenRejectForStaff(false)} style={{ backgroundColor: "Red", color: "white" }}>{t("singlePetrolRequestDetail.no")}</Button>
                            <Button
                                style={{ backgroundColor: "Yellow", color: "black" }}
                                autoFocus
                                onClick={() => {
                                    handleReject()
                                    setIsOpenRejectForStaff(false);
                                }}
                            >
                               {t("singlePetrolRequestDetail.yes")}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container> :
                (<Container>
                    <Wrapper>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" animation="wave" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    </Wrapper>
                </Container>)
            }

        </>
    )
}

export default SinglePetrolRequestDetail


