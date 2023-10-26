import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo, Mint, MinT } from '../../asset';

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
`;

const ImgmintContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: blue;
`;

const Img1 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextmintContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100px;
  width: 200px;
  height: 80px;
  background-color: blue;
`;

const Img2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgContainer = styled.div`
  flex: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Img3 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
`;

const SignUpLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
`;

const ForgotPasswordLink = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  text-align: right;
  margin-top: 5px; /* Added margin to separate it from the input button */
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Desc = styled.p`
  text-align: center;
`;

const FormContainer = styled.div`
  width: 60%;
  height: 70%;
  position: relative;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would typically send the login data to your server here for authentication.
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container>
      <LoginContainer>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>
        <TextmintContainer>
          <Img2 src={MinT} />
        </TextmintContainer>
        <FormContainer>
          <h1>Login</h1>
          <LoginForm onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton type="submit">Login</SubmitButton>
            <ForgotPasswordLink href="/forgot-password">Forgot Password?</ForgotPasswordLink>
          </LoginForm>
          <Desc>Don't have an account <SignUpLink href="/signup">Sign Up</SignUpLink></Desc>
        </FormContainer>
      </LoginContainer>
      <ImgContainer>
        <Img3 src={Logo} />
      </ImgContainer>
    </Container>
  );
};

export default Login;
