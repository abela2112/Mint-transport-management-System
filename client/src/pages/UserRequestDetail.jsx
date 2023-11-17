import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestById, getUserRegisterRequests, updateRequestById, updateUserRegisterRequestById } from '../api/userApi'
import styled from 'styled-components'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import {editUser} from '../api/userApi'
import {getSingleUser} from '../api/userApi'


import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";

const Container = styled.div `
    padding: 20px;
    
`
const Wrapper = styled.div `
display: flex;
flex-direction: column;
padding:30px;
//background-color:pink;
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
const ApproveButton = styled.button `
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

const RejectButton = styled.button `
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
const Text = styled.span `
padding: 10px;
`

const InfoContainer=styled.div`
display: flex;
flex-direction: column;
padding:30px;
flex:4;
`

const ImageContainer=styled.div`
  
  display:flex;
  flex-direction:column;
  flex:2;
  align-items:center;

`

const Image=styled.img`
   width:200px;
   height:200px;
   border-radius:50%;
   object-fit:cover;
  
`

const EditButton=styled.button`
padding: 7px 10px;
border: none;
margin: 10px 20px;
background-color: #f29879;
color: #fff;
cursor: pointer;
`

const Form=styled.form`
    display:flex;
    //flex-wrap:wrap;
    flex-direction:column;
    gap:2rem;
    width:500px;
    padding:20px;
    margin:20px;
//     box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
//  -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
//  -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);

`
const InputContainer=styled.div`
    display:flex;
    flex-direction:column;
   align-items:left;

`

const Input=styled.input`
min-width:50%;
padding :10px;
transition:transform 2s;
border-radius:5px;
box-shadow: 0.5px 0.5px  grey;
 &:hover{
    transform: scaleX(1.1);
 }
`



const UserRequestDetail = () => {

      const [isOpen,setIsOpen]=useState(false)
      const [isOpenApproved,setIsOpenApproved]=useState(false)
      const [isOpenReject,setIsOpenReject]=useState(false)
      const [position,setPosition]=useState('')
      const [password,setPassword]=useState('')
      const [department,setDepartment]=useState('')
     
           
            
    const handleApprove = () => {
      
        updateUserRegisterRequestById(id, { status: 'approved' }).then(() => console.log('approved successfully')).catch((err) => console.log(err));
    }
    const handleReject = () => {
       
        updateUserRegisterRequestById(id, { status: 'rejected' }).then(() => console.log('rejected successfully')).catch((err) => console.log(err));
    }

    const [request, setRequest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const { user } = useSelector(state => state.user)


    useEffect(()=>{
        
        if(isOpen){
            getSingleUser(id).then(({data})=>{
                setPosition(data.users.position)
                setDepartment(data.users.department)
            }).catch((error)=>console.log(error))
        }

    },[isOpen])
   

    useEffect(() => {
        setIsLoading(true)
        getUserRegisterRequests(id).then(({ data }) => {
            console.log(data)
            setIsLoading(false)
            setRequest(data.users)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [id])
    if (isLoading) return <Loader />
    console.log(request)



      const  handleSubmit=()=>{
            console.log(position)
            console.log(password)
            console.log(department)
             

            // useEffect(() => {
            //     UpdateResponse(id, { userId: user._id }).then((data) => console.log('seen')).catch((err) => console.log(err))
            // }, [id])


            editUser(id,{position,password,department}).then(({data})=>{

                setPosition('')
                setPassword('')
                setDepartment('')
                setRequest(data?.user)
                console.log(data?.user?.user)
            }).catch((error)=>console.log(error))
            

      }



    return (
        <Container>

            <Wrapper>
                <div style={{display:"flex" }}>
                <ImageContainer>
                   <Image src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="/>
                   <Text> {(request?.firstName?.toUpperCase())} {request?.lastName?.toUpperCase()} </Text>
                </ImageContainer>
                
                <InfoContainer>
                
               
                <Text><b>email:</b>{request?.email}</Text>
                <Text><b>Phone Number:</b>{request?.phoneNumber}</Text>
                <Text><b>position:</b> {request?.position}</Text>
                <Text> <b>department:</b>{request?.department}</Text>
                <Text> <b>role:</b>{request?.role}</Text>

                <Text><b>Registered Date:</b>{request?.createdAt && format(new Date(request?.createdAt)
                    , 'MMMM do yyyy')}</Text>
                
                </InfoContainer>
              </div>
                    <ButtonContainer>
                <ApproveButton disabled={request?.status === 'approved' || request?.status === 'rejected' ? true : false} onClick={()=>setIsOpenApproved(true)} >Approved</ApproveButton>
                <RejectButton disabled={request?.status === 'rejected' || request?.status === 'approved' ? true : false} onClick={()=>setIsOpenReject(true)}>Reject</RejectButton>
                <EditButton onClick={()=>setIsOpen(true)}>
                    Edit User
                </EditButton>
            </ButtonContainer>

            </Wrapper>
            

            <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title" style={{backgroundColor:"lightGreen"}}>
              Edit the user information
            </DialogTitle>
            <DialogContent id="dialog-description">
              
              <Form>
                    <InputContainer>
                        <Text>Position</Text>
                         <Input 
                         type="text"
                         placeholder="position"
                         value={position}
                         onChange={(e)=>setPosition(e.target.value)}
                         />
                         
                    </InputContainer>
                    <InputContainer>
                        <Text>Department</Text>
                         <Input 
                         type="text"
                         placeholder="department"
                        value={department}
                        onChange={(e)=>setDepartment(e.target.value)}
                         />
                         
                    </InputContainer>
                    <InputContainer>
                        <Text>password</Text>
                         <Input 
                         type="password"
                         placeholder="password"
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
                         />
                         
                    </InputContainer>
                    
              </Form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} style={{backgroundColor:"Red",color:"white"}}>Cancel</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"white"}}
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
              <Button onClick={() => setIsOpenApproved(false)} style={{backgroundColor:"Red",color:"white"}}>No</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"white"}}
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
              <Button onClick={() => setIsOpenReject(false)} style={{backgroundColor:"Red",color:"white"}}>No</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"white"}}
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

export default UserRequestDetail