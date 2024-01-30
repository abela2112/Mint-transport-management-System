import React from 'react';
// import { SignUpContainer, Contain, Title, SignUpForm, SignUpInput, SignUpButton, Option, SelectOption, ImgmintContainer, Img1, ImageContainer, Image, TextContainer, Label, BottomText, CopyRight } from './RegisterCSS';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Mint } from '../../asset';


import { Container, CopyRight, Img1, ImgmintContainer } from '../Register/RegisterCSS';
import LoginForm from './LoginForm';


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

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>

        <TitleBox>
          <WelcomeTxt>Welcome back</WelcomeTxt>
          <LoginTxt>Login into your account</LoginTxt>
        </TitleBox>
        <LoginForm />
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        <Desc>Don't have an account? <Link to='/register' style={{ color: '#e6953b', marginTop: '10px' }}>  Sign Up</Link></Desc>


      </Wrapper>
      <CopyRight>
        <small>mint&copy;2023 All right reserved</small>
      </CopyRight>

    </Container>

  );
};

export default Login;
