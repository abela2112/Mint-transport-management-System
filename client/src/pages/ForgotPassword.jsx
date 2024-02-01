
import React, { useState } from 'react'
import { Background, Mint } from '../asset';
import { Link } from 'react-router-dom';
import {forgot} from '../api/userApi'
import { useTranslation } from "react-i18next"

//import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';

import styled from 'styled-components';
import { forgotPasswordApi } from '../api/userApi';
import { SubmitButton } from '../components/Buttons';
import Center from '../components/Center';
import CustomToastBar from "../components/ToastErrorMessage";
import { Contain, Container, CopyRight, FormContainer, Img1, ImgmintContainer, Input, Label, } from './Register/RegisterCSS';
import { Wrapper } from './Login';

export const WelcomeTxt = styled.span`
 font-weight: 500;
 font-size: 30px;
 text-align: left;
 margin-bottom: 10px;
/* padding:10px 20px; */

`
export const LoginTxt = styled.span`
 font-weight: 300;
 font-size: 22px;
 text-align: left;
 margin-bottom: 20px;
/* padding:10px 20px; */

`

const Desc = styled.p`
  text-align: center;
`;

const InputForm=styled.input`

margin: 5px 0;
padding: 10px;
width: 100%;
border: 1px solid #ccc;
border-radius: 10px;
&:focus {
  // border-color: #4285f4;
  outline:none;
}
margin-bottom: 10px;
`
const Lable=styled.h3`
  margin-top:5px;
  color: #777;
`
const Lable1=styled.p`
color: #777;
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

// const ImgmintContainer = styled.div`
//    display:flex;
//    justify-content:center;
//    align-items:center;

//   width: 100px;
//   height: 100px;
//   margin-left: 5px;
//   margin-top: -250px;
// `;

// const Img1 = styled.img`
//   width: 100px;
//   height:100px;
//   object-fit: cover;
// `;



const ForgotPassword=()=>{
    const [isOpen, setIsOpen] = useState(false);
     const [email,setEmail]=useState('')
     const [error, setError] = useState('')
     const {t}=useTranslation('global')
    
    const handleSubmit=(e)=>{
      e.preventDefault();
     email ?  setIsOpen(true) : setIsOpen(false);
      console.log(email)
      
      forgotPasswordApi({ email }).then((data) => console.log(data)).catch((err) => {
        toast.error((err?.response?.data?.message))
        setError(err?.response?.data?.message);
      }) 
    }
      return (

    <Container>
      <Wrapper>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>


          <WelcomeTxt>Forgot Password</WelcomeTxt>
          {/* <LoginTxt>Login into your account</LoginTxt> */}

        <FormContainer onSubmit={handleSubmit}>
          <Contain>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


          </Contain>
          <Center>
            <SubmitButton title={"Reset Password"} />
          </Center>
        </FormContainer>
        <Toaster>
          {(t) => <CustomToastBar {...t} />}
        </Toaster>
        {/* <ErrorMessage>{error && error}</ErrorMessage> */}
        <Desc>Don't have an account <Link to='/register' style={{ color: '#e6953b', marginTop: '10px' }}>Sign Up</Link></Desc>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)} aria-labelledby="dialog-title"
          aria-describedby="dialog-description">
          <DialogTitle id="dialog-title"> {t("ForgotPassword.verification")}</DialogTitle>             <DialogContent id="dialog-description">               {/* <DialogContentText>Are you sure?</DialogContentText> */}               Password Reset Link is sent to your email              </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "green", color: "white" }}>Close</Button>
          </DialogActions>
        </Dialog>

      </Wrapper>
      <CopyRight>
        <small>mint&copy;2023 All right reserved</small>
      </CopyRight>
    </Container>

  );
};

export default ForgotPassword;
