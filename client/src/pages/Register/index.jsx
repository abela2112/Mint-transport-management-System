import React from 'react';
import { Mint } from '../../asset';
import { Container, Img1, ImgmintContainer, TextContainer } from './RegisterCSS';
import { LoginTxt, WelcomeTxt } from '../Login';
import RegisterForm from './RegisterForm';
import { useTranslation } from 'react-i18next';

const Register = () => {

const {t}=useTranslation('global')
  return (

    <Container>
      <TextContainer>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>
         
        <WelcomeTxt>{t("login.welcome")}!</WelcomeTxt>
        <LoginTxt>{t("Register.getStarted")}</LoginTxt>
        <RegisterForm />
      </TextContainer>
    </Container>

  );
};

export default Register;
