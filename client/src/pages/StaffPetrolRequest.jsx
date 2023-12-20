import styled from 'styled-components'

import React, { useState ,useEffect} from "react";
import {staffRequest} from '../api/userApi'
import { useDispatch,useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align:center;
`;

const FormBox = styled.form`
  display: flex;
//   flex-wrap: wrap;
  flex-direction:column;
`;

const InputItem = styled.div`
   display:flex;
  text-align:left;
  padding:0;
  flex-direction:column;
  margin-top: 10px;
  margin-right: 20px;
  width: 400px;
`;

const Input=styled.input`
width: calc(100%);
padding: 10px;
margin-bottom: 10px;
border: 1px solid #ccc;
border-radius: 5px;
width: 400px;


&:hover::before {
  content: attr(title);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: #000;
  color: #fff;
  border-radius: 2px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
`
const Text=styled.p`

`

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 20px;
  background-color: #155c68;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3b808c;
    color: #ee8624;
  }
`;

const Title =styled.h1`

`
const Lable=styled.p`
  padding :0px;

`
const TextArea = styled.textarea`
  // margin-top:10px;
  min-width: 400px;
  border-radius:6px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
 //box-shadow: 2px 2px 5px grey;
`
const Submit = styled.button`
  transition: all .3s ease-in-out;
  border-radius:10px;
  width:200px;
  color:white;
  height:50px;
  margin:20px 20px;
  font-size:16px;
  cursor:pointer;
  background-color: rgb(255, 165, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow:0 0 5px yellow,
          0 0 25px yellow; */
  &:hover{
    font-size:18px;
    box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-webkit-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
-moz-box-shadow: 0px 0px 18px 0px rgba(255, 165, 0, 0.75);
  }
`

const StaffPetrolRequest=()=>{
  const { user } = useSelector((state) => state.user);
  console.log(user)
    const [name,setName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [requestDate,setRequestDate]=useState('')
    const [discription,setDiscription]=useState('')
    const [isOpen,setIsOpen]=useState(false)
   
   const handleSubmit=()=>{
  
     staffRequest({requestDate,discription,name,phoneNumber}).then((data)=>console.log(data)).catch((error)=>console.log(error))
   }
   useEffect(() => {
        setName(user?.firstName + "  " + user?.lastName)
        setPhoneNumber(user?.phoneNumber)
  }, [])

    return (
      <Container>
           <Wrapper>
                  <Title>Petrol Request Form</Title>
                 <FormBox>
                       <InputItem>
                            <Lable>Full Name</Lable>
                             <Input  
                            
                             type="text"
                             value={name}
                              
                             />
                       </InputItem>
                       <InputItem>
                            <Lable>phone number</Lable>
                             <Input  
                             
                             type="text"
                             value={phoneNumber}
                              
                             />
                       </InputItem>
                       <InputItem>
                            <Lable>Request date</Lable>
                             <Input  
                             placeholder="request date" 
                             type="date"
                             value={requestDate}
                              onChange={(e)=>setRequestDate(e.target.value)}
                             />
                       </InputItem>
                       <InputItem>
                            <Lable>Discription</Lable>
                            <TextArea
                              placeholder="Discription"
                             value={discription}
                             onChange={(e)=>setDiscription(e.target.value)}
                              rows={4}
                              />
                      </InputItem>
                     <Submit onClick={(e)=>{
                        e.preventDefault()
                      setIsOpen(true)}}>Submit</Submit>
                 </FormBox>
           </Wrapper>

           <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">
              Do you want to confirm?
            </DialogTitle>
            <DialogContent id="dialog-description">
              {/* <DialogContentText></DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} style={{backgroundColor:"Red",color:"white"}}>No</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"black"}}
                autoFocus
                onClick={() => {
                  handleSubmit()
                  setIsOpen(false);
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

      </Container>

    )
}

export default StaffPetrolRequest