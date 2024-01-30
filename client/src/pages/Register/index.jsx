import React from 'react';
import { Mint } from '../../asset';
import { Container, Img1, ImgmintContainer, TextContainer } from './RegisterCSS';
import { LoginTxt, WelcomeTxt } from '../Login';
import RegisterForm from './RegisterForm';


const Register = () => {


  return (

    <Container>
      <TextContainer>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>
        <WelcomeTxt>Welcome back!</WelcomeTxt>
        <LoginTxt>Create New account</LoginTxt>
        <RegisterForm />
      </TextContainer>
    </Container>

  );
};

export default Register;
