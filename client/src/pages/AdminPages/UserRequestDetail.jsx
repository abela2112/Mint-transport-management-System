import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, getUserRegisterRequests, updateRequestById, updateUserRegisterRequestById } from '../../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux'
import { editUser } from '../../api/userApi'
import { getSingleUser } from '../../api/userApi'
import { getAllDepartment } from '../../api/userApi'
import {
  useQuery,
} from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { EmailOutlined, LocalPhoneOutlined, Accessibility, BusinessOutlined, Person, CalendarMonthOutlined, ModeEdit, BorderColor, Edit } from '@mui/icons-material'
import { Contain, Title } from '../Register/RegisterCSS'
import { ApproveButton, Box, Content, RejectButton } from '../../components/SingleRequestDetails'
import { StatusButton } from '../../components/Buttons'
import EditUserDialog from './EditUserDialog'
import DialogModal from '../../components/DialogModal'
import { Container } from './ShowAllUserForAdmin'
// const Container = styled.div`
//     padding: 20px;
//     display: flex;
//     justify-content:space-between;
//     align-items: center;
// flex-direction: column;
// padding:30px;
// background-color: white;
// box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
//  -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
//  -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.15);
// position:relative;

// `
const Wrapper = styled.div`
display: flex;
@media screen and (max-width: 768px) {
  flex-direction: column;

}

`

const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
`


const Text = styled.span`
padding: 10px;
font-size: 1.2rem;


`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding:30px;
flex:4;
`

const ImageContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex:3;
  align-items:center;
  position: relative;
  transition: all 0.3s ease-in-out;
`

const Image = styled.img`
   width:50px;
   height:50px;
   border-radius:50%;
   object-fit:cover;
  
`

const EditButton = styled.button`
display: flex;
align-items: center;
gap:1rem;
padding:7px 15px;
border: none;
margin: 10px 20px;
background-color: #2b5c2d;
color: white;
cursor: pointer;
display: flex;
align-items: center;
justify-content: space-between;
/* font-size: 18px; */
border-radius: 10px;
`





const UserRequestDetail = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenApproved, setIsOpenApproved] = useState(false)
  const [isOpenReject, setIsOpenReject] = useState(false)
  const handleApprove = () => {
    updateUserRegisterRequestById(id, { status: 'approved' }).then(({ data }) => {
    }).catch((err) => console.log(err));
  }
  const handleReject = () => {
    updateUserRegisterRequestById(id, { status: 'rejected' }).then(({ data }) => {
      console.log('rejected successfully', data)
      // setRequest(data.user)
    }
    ).catch((err) => console.log(err));
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserRegisterRequests(id),
    staleTime: 6000
  })
  const request = data?.data
  if (isPending) return <Loader />


  return (
    <Container>
      <Title>User Details</Title>
      <Wrapper>
        <ImageContainer>
          <div style={{ display: 'flex' }}>
            <Image src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=" />
            <Text> {(request?.firstName?.toUpperCase())} {request?.lastName?.toUpperCase()} </Text>
          </div>
          <StatusButton type={request?.status} >{request?.status}</StatusButton>
        </ImageContainer>
        <InfoContainer>
          <Box>
            <span><EmailOutlined />Email</span>
            <Content>{request?.email}</Content>
          </Box>
          <Box>
            <span><LocalPhoneOutlined />Phone Number</span>
            <Content>{request?.phoneNumber}</Content>
          </Box>
          <Box>
            <span><Accessibility /> Position</span>
            <Content>{request?.position}</Content>
          </Box>
          <Box>
            <span><BusinessOutlined />Department</span>
            <Content>{request?.department}</Content>
          </Box>
          <Box>
            <span><Person />Role</span>
            <Content>{request?.role}</Content>
          </Box>
          <Box>
            <span><CalendarMonthOutlined /> Create At</span>
            <Content>{request?.createdAt && format(new Date(request?.createdAt)
              , 'MMMM do yyyy')}</Content>
          </Box>

        </InfoContainer>
      </Wrapper>
      <ButtonContainer>
        {request.status === 'pending' ?
          <> <ApproveButton onClick={() => setIsOpenApproved(true)} >Approve</ApproveButton>
            <RejectButton onClick={() => setIsOpenReject(true)}>Reject</RejectButton></>
          : <EditButton type='button' onClick={() => setIsOpen(true)}>
            <Edit color='white' />
            Edit
          </EditButton>}
      </ButtonContainer>
      <EditUserDialog id={id} isOpen={isOpen} setIsOpen={setIsOpen} user={request} />
      <DialogModal open={isOpenApproved} onClose={() => setIsOpenApproved(false)} onSubmit={handleApprove} message={"Do you want to approve?"} />
      <DialogModal open={isOpenReject} onClose={() => setIsOpenReject(false)} onSubmit={handleReject} message={"Do you want to Reject this Request?"} />
    </Container>
  )
}

export default UserRequestDetail