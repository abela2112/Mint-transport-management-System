import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { forgotPasswordApi } from '../api/userApi';
import { Mint } from '../asset';
import { SubmitButton } from '../components/Buttons';
import Center from '../components/Center';
import CustomToastBar from "../components/ToastErrorMessage";
import { Contain, Container, CopyRight, FormContainer, Img1, ImgmintContainer, Input, Label } from './Register/RegisterCSS';

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


const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: #fff;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  margin: 5rem 0 3rem 0;

  @media screen and (max-width:768px) {
    width: 92%;
  }

`

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    email ? setIsOpen(true) : setIsOpen(false);
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

        <TitleBox>
          <WelcomeTxt>Forgot Password</WelcomeTxt>
          {/* <LoginTxt>Login into your account</LoginTxt> */}
        </TitleBox>
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
          <DialogTitle id="dialog-title"> Email verification </DialogTitle>             <DialogContent id="dialog-description">               {/* <DialogContentText>Are you sure?</DialogContentText> */}               Password Reset Link is sent to your email              </DialogContent>
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
