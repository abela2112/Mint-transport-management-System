import styled from 'styled-components'
import { Mint } from '../asset';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getResetPassword, postBack } from '../api/userApi';


import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";
  




const Container=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100vw;
    height:100vh;
   // background-image:url("https://img.freepik.com/premium-vector/phishing-account-concept_23-2148543436.jpg?size=626&ext=jpg&uid=R123836269&ga=GA1.1.1136001642.1699130489&semt=ais");
    background-repeat: no-repeat;
    background-size: cover;
   
`

const Wrapper=styled.div`
margin-top:50px;
padding:20px;
border-radius:30px;
display:flex;
align-items:center;
justify-content:center;
width:35%;
height:75vh;
background-color: #fff;
flex-direction: column;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
`

const Form =styled.form`
display: flex;
flex-direction: column;
/* align-items: center; */
width: 100%;
margin:10px 0;
`
const Desc = styled.p`
  text-align: center;
`;

const InputForm=styled.input`
box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
margin: 5px 0;
padding: 10px;
width: 100%;
border: 1px solid #ccc;
border-radius: 10px;
margin-bottom: 10px;
`
const Lable=styled.h3`
  margin-top:5px;
`
const Lable1=styled.p`
  
`
const Contain = styled.div`
display: flex;

width: 400px;
flex-direction: column;
margin-bottom: 10px;
margin-right: 20px;
`
const ResetButton=styled.button`
background-color: #164E62;
color: white;
border: none;
border-radius: 5px;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
margin-top: 20px;
display:flex;
align-items: center;
justify-content: center;
width: 100%;
`

const ImgmintContainer = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
  
  width: 100px;
  height: 100px;
  margin-left: 5px;
`;

const Img1 = styled.img`
  width: 100px;
  height:100px;
  object-fit: cover;
`;


const ResetPassword =()=>{
    const [newpassword,setNewPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
    const [isOpen,setIsOpen]=useState(false)
    const  {id,token}=useParams()
    //console.log(id)

    useEffect(()=>{
        getResetPassword(id,token).then((data)=>console.log(data)).catch((err)=>console.log(err))
         
    },[id,token])

    const handleClick=(e)=>{
        e.preventDefault();  
        console.log('new password:', newpassword);
        setIsOpen(true);

        postBack(id,token,newpassword).then((data)=>console.log(data)).catch((err)=>console.log(err)) 
    }
    return (

        <Container>
        <Wrapper>
            <Lable>Resetting your password?</Lable>
            <ImgmintContainer>
              <Img1 src={Mint} />
           </ImgmintContainer>
            <Form>
                <Contain>
                  <Lable1>Enter New password</Lable1>
                  <InputForm 
                  type="password"
                  placeholder="new password"
                  value={newpassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                   />
                  </Contain>

                  <Contain>
                  <Lable1>confirm password</Lable1>
                  <InputForm 
                  type="password"
                  placeholder="confirm password"
                  value={confirmpassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                    
                  />
                  </Contain>

                  <ResetButton onClick={handleClick}>Reset Password</ResetButton>
            </Form>

          </Wrapper>

          <Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>

  <DialogTitle id="dialog-title">
    {newpassword === confirmpassword ? "Password reset sucess" : "confirm password"}
  </DialogTitle>
  <DialogContent id="dialog-description">
    {newpassword !== confirmpassword ? (
      <DialogContentText>Password doesn't match! Please confirm again</DialogContentText>
    ) : (
      <DialogContentText>Congratulations! You have successfully Reset your password.</DialogContentText>
    )}
    {newpassword !== confirmpassword && (
      <Contain>
      <Lable1>confirm password</Lable1>
      <InputForm 
      type="password"
      placeholder="confirm password"
      value={confirmpassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}
       /> 
       </Contain>
    )}
  </DialogContent>

  <DialogActions>
    {newpassword !== confirmpassword ? (
      <>
        <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "Red", color: "white" }}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "Yellow", color: "white" }}
          autoFocus
          onClick={() => {

            setIsOpen(false);
          }}
        >
          Submit
        </Button>
      </>
    ) : (
      <Button onClick={() => setIsOpen(false)} color="primary">
        Close
      </Button>
    )}
  </DialogActions>
</Dialog>
       

          </Container>  


    )
}

export default ResetPassword