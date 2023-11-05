import styled from 'styled-components'
import React, { useState } from 'react'
import { Background, Mint } from '../asset';
import { Link } from 'react-router-dom';
//import { makeStyles } from '@material-ui/core/styles';
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
    background-image:url("https://img.freepik.com/premium-vector/phishing-account-concept_23-2148543436.jpg?size=626&ext=jpg&uid=R123836269&ga=GA1.1.1136001642.1699130489&semt=ais");
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

const ForgotPassword=()=>{
    const [isOpen, setIsOpen] = useState(false);
   
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(true);
      };
      return (

       <Container>
            <Wrapper>
                <Lable>Forgot Your password?</Lable>
                <ImgmintContainer>
                  <Img1 src={Mint} />
               </ImgmintContainer>
                <Form>
                      <Lable1>Enter your Email</Lable1>
                      <InputForm type="email" placeholder="xxx@MinT.gov.et"/>
                      <ResetButton onClick={handleClick}>Reset Password</ResetButton>
                </Form>
                <Desc>Don't have an account <Link to='/' style={{ color: '#e6953b', marginTop: '10px' }}>Sign Up</Link></Desc>
                

                <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
           
          >
            <DialogTitle id="dialog-title">
              Reseting the password !
            </DialogTitle>
            <DialogContent id="dialog-description">
              {/* <DialogContentText>Are you sure?</DialogContentText> */}
              <Lable1>Enter your new password</Lable1>
              <InputForm type="password" placeholder="new password"/>
              <Lable1>confirm password</Lable1>
              <InputForm type="password" placeholder="confirm password"/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} style={{backgroundColor:"Red",color:"white"}}>Cancel</Button>
              <Button
                style={{backgroundColor:"Yellow",color:"black"}}
                autoFocus
                onClick={() => {
                   
                  setIsOpen(false);
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
            </Wrapper>
       </Container>

      )
}

export default ForgotPassword;
