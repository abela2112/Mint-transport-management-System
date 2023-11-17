import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, TransportManagerResponseapi,updateRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { Buttonn } from './UserRegisterRequest'
import TransportManagerResponse from '../components/TransportManagerResponse'

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

const InfoContainer=styled.div`
display: flex;
flex-direction: column;
padding:30px;
flex:4;
`

const Title=styled.h1`
   position:absolute;
   top:0;
`

const SingleRequestDetails = () => {
    const role = useSelector(state => state.user.user?.role)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenRejectForStaff,setIsOpenRejectForStaff]=useState(false)
    const [isOpenApproveForStaff, setIsOpenApproveForStaff] = useState(false)
    const handleForm=(data)=>{
        TransportManagerResponseapi(data).then(({ data }) => console.log(data)).catch((err) => console.log(err))
    }
    const handleApprove = () => {
      
        if(role === 'staff-manager'){
            setIsOpenApproveForStaff(true);
        }
        if (role === 'transport-manager') {
            setIsOpen(true)
            
        }
        else {
            updateRequestById(id, { isChecked: true }).then(() => console.log('approved successfully')).catch((err) => console.log(err));
              
        }
    }

    const handleReject = () => {
      
        updateRequestById(id, { isChecked: false, status: 'rejected' }).then(() => console.log('rejected successfully')).catch((err) => console.log(err));
    }
    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
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
    if (isLoading) return <Loader />
    console.log(request)

    return (
        <Container>

            <Wrapper>
               <Title>Request Detail</Title>
            <InfoContainer>
                 
                <Text><span><b>Full Name :</b></span>{request?.name}</Text>
                <Text><span><b>destination :</b></span>{request?.destination}</Text>
                <Text><span><b>Phone Number :</b></span>{request?.phoneNumber}</Text>
                <Text><span><b>description :</b> </span>{request?.description}</Text>
                <Text><span><b>Pick Up date :</b></span>{request?.pickUpDate && format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text>
                <Text><span><b>return date:</b></span>{request?.pickUpDate && format(new Date(request?.pickUpDate)
                    , 'MMMM do yyyy')}</Text>
            </InfoContainer>

<ButtonContainer>
                {role === 'staff-manager' &&   
                    <>
                        <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' || request?.isChecked ? true : false} onClick={()=>setIsOpenApproveForStaff(true)} >{request?.isChecked ? "Checked" : "Approved"}</ApproveButton>
                        <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' || request?.isChecked ? true : false} onClick={()=>setIsOpenRejectForStaff(true)}>Reject</RejectButton>
                    </>}
                {role === 'transport-manager' &&   
                    <>
                        <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected'  ? true : false} onClick={handleApprove} >Approved</ApproveButton>
                        <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' || request?.isChecked ? true : false} onClick={handleReject}>Reject</RejectButton>
                    </>}
                {(role !== 'transport-manager' && role !=='staff-manager') &&   
                    <>
                        <Buttonn type={request?.status}>{request?.status}</Buttonn>
                        </>}

                    </ButtonContainer>

            </Wrapper>
            
            <TransportManagerResponse open={isOpen} setOpen={setIsOpen} onSubmit={handleForm} requestId={id} />


            <Dialog
            open={isOpenApproveForStaff}
            onClose={() => setIsOpenApproveForStaff(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">
              Do you want to approve?
            </DialogTitle>
            <DialogContent id="dialog-description">
              {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpenApproveForStaff(false)} style={{backgroundColor:"Red",color:"white"}}>No</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"white"}}
                autoFocus
                onClick={() => {
                    handleApprove()
                    setIsOpenApproveForStaff(false);
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>


         
          <Dialog
            open={isOpenRejectForStaff}
            onClose={() => setIsOpenRejectForStaff(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">
              Do you want to approve?
            </DialogTitle>
            <DialogContent id="dialog-description">
              {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpenRejectForStaff(false)} style={{backgroundColor:"Red",color:"white"}}>No</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"white"}}
                autoFocus
                onClick={() => {
                    handleReject()
                    setIsOpenRejectForStaff(false);
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>


        </Container>
   )
 }

export default SingleRequestDetails