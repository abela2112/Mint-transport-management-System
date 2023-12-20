import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, getUserRegisterRequests, updateRequestById, updateUserRegisterRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { editUser } from '../api/userApi'
import { getSingleUser } from '../api/userApi'
import { getAllDepartment } from '../api/userApi'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { EmailOutlined, LocalPhoneOutlined, Accessibility, BusinessOutlined, Person, CalendarMonthOutlined, ModeEdit, BorderColor } from '@mui/icons-material'
const Container = styled.div`
    padding: 20px;
    
`
const Wrapper = styled.div`
display: flex;
justify-content:space-between;
flex-direction: column;
padding:30px;
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
position:relative;
`

const ButtonContainer = styled.div`
   margin-left:0px;
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

`
const EditButtonContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width:100%;
  height: 100%;
  background-color:rgba(0,0,0,0.5);
`
const TextContainer = styled.div`
  display: flex;
  align-items: center;
`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
padding:30px;
flex:4;
`

const ImageContainer = styled.div`
  
  display:flex;
  flex-direction:column;
  flex:2;
  align-items:center;
  position: relative;

  &:hover{
    ${EditButtonContainer}{
      opacity: 1;
    }
  }

`

const Image = styled.img`
   width:200px;
   height:200px;
   border-radius:50%;
   object-fit:cover;
  
`

const EditButton = styled.button`
padding:15px;
border: none;
margin: 10px 20px;
background-color: #75b6c6;
color: white;
cursor: pointer;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 18px;
border-radius: 50%;


`

const Form = styled.form`
    display:flex;
    flex-direction:column;
    gap:2rem;
    width:500px;
    padding:20px;
    margin:20px;
`
const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
   align-items:left;

`

const Input = styled.input`
min-width:50%;
padding :10px;
transition:transform 2s;
border-radius:5px;
box-shadow: 0.5px 0.5px  grey;
 &:hover{
    transform: scaleX(1.1);
 }
`
const Select = styled.select`
min-width:50%;
padding :10px;
transition:transform 2s;
border-radius:5px;
box-shadow: 0.5px 0.5px  grey;
 &:hover{
    transform: scaleX(1.1);
 }
`
const Option = styled.option`

`
const UserRequestDetail = () => {
  const [request, setRequest] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { user } = useSelector(state => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenApproved, setIsOpenApproved] = useState(false)
  const [isOpenReject, setIsOpenReject] = useState(false)
  const [position, setPosition] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [role, setRole] = useState('')
  const [deptArray, setDeptArray] = useState([])

  const handleApprove = () => {

    updateUserRegisterRequestById(id, { status: 'approved' }).then(({ data }) => {
      console.log('approved successfully')
      setRequest(data.user)
    }).catch((err) => console.log(err));
  }
  const handleReject = () => {

    updateUserRegisterRequestById(id, { status: 'rejected' }).then(({ data }) => {
      console.log('rejected successfully', data)
      setRequest(data.user)
    }
    ).catch((err) => console.log(err));
  }

  useEffect(() => {

    if (isOpen) {
      getSingleUser(id).then(({ data }) => {
        setPosition(data.users.position)
        setDepartment(data.users.department)
        setRole(data.users.role)
      }).catch((error) => console.log(error))
    }

  }, [isOpen])
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

  useEffect(() => {
    getAllDepartment().then(({ data }) => setDeptArray(data)).catch((error) => console.log(error))

  }, [])

  if (isLoading) return <Loader />
  console.log(request)
  const handleSubmit = () => {
    editUser(id, { position, password, department, role }).then(({ data }) => {
      setPosition('')
      setPassword('')
      setDepartment('')
      setRole('')
      setRequest(data?.user)
      console.log(data?.user?.user)
    }).catch((error) => console.log(error))


  }

  return (
    <Container>
      <Wrapper>
        <div style={{ display: "flex" }}>
          <ImageContainer>
            <Image src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=" />
            <Text> {(request?.firstName?.toUpperCase())} {request?.lastName?.toUpperCase()} </Text>
            <EditButtonContainer>
              <EditButton onClick={() => setIsOpen(true)}>

                <BorderColor color='white' />
              </EditButton>
            </EditButtonContainer>
          </ImageContainer>

          <InfoContainer>



            <TextContainer><EmailOutlined style={{ fontSize: '20px', fontWeight: 'bold', marginRight: 10 }} />
              <Text>{request?.email}</Text></TextContainer>
            <TextContainer><LocalPhoneOutlined /><Text>{request?.phoneNumber}</Text></TextContainer>
            <TextContainer><Accessibility /> <Text> {request?.position}</Text></TextContainer>
            <TextContainer><BusinessOutlined /> <Text> {request?.department}</Text></TextContainer>
            <TextContainer><Person /><Text>{request?.role}</Text></TextContainer>

            <TextContainer><CalendarMonthOutlined />  <Text>{request?.createdAt && format(new Date(request?.createdAt)
              , 'MMMM do yyyy')}</Text></TextContainer>

          </InfoContainer>
        </div>
        <ButtonContainer>
          <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' ? true : false} onClick={() => setIsOpenApproved(true)} >Approved</ApproveButton>
          <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' ? true : false} onClick={() => setIsOpenReject(true)}>Reject</RejectButton>

        </ButtonContainer>

      </Wrapper>


      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" style={{ backgroundColor: "lightGreen" }}>
          Edit the user information
        </DialogTitle>
        <DialogContent id="dialog-description">

          <Form>
            <InputContainer>
              <Text>Position</Text>
              <Select onChange={(e) => setPosition(e.target.value)}>
                <Option disabled selected>{position}</Option>
                <Option>CEO</Option>
                <Option>Desk</Option>
                <Option>Expert</Option>
              </Select>
            </InputContainer>
            <InputContainer>
              <Text>Role</Text>
              <Select onChange={(e) => setRole(e.target.value)}>
                <Option disabled selected>{role}</Option>
                <Option>staff</Option>
                <Option>staff-manager</Option>
                <Option>transport-manager</Option>
              </Select>
            </InputContainer>
            <InputContainer>
              <Text>Department</Text>
              <Select

                onChange={(e) => setDepartment(e.target.value)}
              >
                <Option disabled selected>{department}</Option>
                {deptArray.map((dept, i) => (
                  <Option key={i} value={dept?.deptName} >{dept?.deptName} </Option>
                ))}
              </Select>

            </InputContainer>
            <InputContainer>
              <Text>password</Text>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </InputContainer>

          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "Red", color: "white" }}>Cancel</Button>
          <Button
            style={{ backgroundColor: "Yellow", color: "black" }}
            autoFocus
            onClick={() => {
              handleSubmit();
              setIsOpen(false);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={isOpenApproved}
        onClose={() => setIsOpenApproved(false)}
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
          <Button onClick={() => setIsOpenApproved(false)} style={{ backgroundColor: "Red", color: "white" }}>No</Button>
          <Button
            style={{ backgroundColor: "Yellow", color: "black" }}
            autoFocus
            onClick={() => {
              handleApprove()
              setIsOpenApproved(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={isOpenReject}
        onClose={() => setIsOpenReject(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Do you want to reject?
        </DialogTitle>
        <DialogContent id="dialog-description">
          {/* <DialogContentText></DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenReject(false)} style={{ backgroundColor: "Red", color: "white" }}>No</Button>
          <Button
            style={{ backgroundColor: "Yellow", color: "black" }}
            autoFocus
            onClick={() => {
              handleReject()
              setIsOpenReject(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
//length
export default UserRequestDetail