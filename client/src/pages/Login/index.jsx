import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Background, Mint } from '../../asset';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../api/userApi';
import Loader from '../../components/Loader'
import { setError } from '../../redux/features/user';
const LoginContainer = styled.div `
  flex: 1;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #e0e0e0;
`;

const ImgmintContainer = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
  
  width: 100px;
  height: 100px;
  margin-left: 5px;
  margin-top: -70px;
`;


const Img1 = styled.img`
  width: 100px;
  height:100px;
  object-fit: cover;
`;




const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  margin:10px 0;

`;
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
const Input = styled.input`
  margin: 5px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
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
`;

const ForgotPasswordLink = styled.a`
  color:#e6953b ;
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
  margin: 0;
  padding: 0;
`;

const Desc = styled.p`
  text-align: center;
`;

const FormContainer = styled.div`

  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  width: 500px;
  background-color:white;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 padding: 2em 2em 2em;
 border-radius:30px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

const CopyRight = styled.small`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 3rem;
  font-size: 16px;
  font-weight: 300;
`
const Error = styled.p`
  color: red;
`

const Login = () => {
  const { isLoading, error } = useSelector((state) => state.user);
  console.log(isLoading)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    // You would typically send the login data to your server here for authentication.
    console.log('Email:', email);
    console.log('Password:', password);
    login(dispatch, navigate, { email, password })
  };


  useEffect(() => {
    setTimeout(() => { dispatch(setError('')) }, 5000)
  }, [dispatch])
  return (
    <Container>
      <LoginContainer>
        <FormContainer>
              <ImgmintContainer>
                  <Img1 src={Mint} />
               </ImgmintContainer>
          <TitleBox>
            <WelcomeTxt>Welcome back</WelcomeTxt>
            <LoginTxt>Login into your account</LoginTxt>
          </TitleBox>
              
          <LoginForm onSubmit={handleSubmit}>
              
            <div style={{ width: '100%' }}>
              <label>Email</label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ width: '100%' }}>
              <label>
                password
              </label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/forgot-password" style={{ color: '#e6953b', marginTop: '10px', textAlign: 'right', textDecoration: 'none' }}>Forgot Password?</Link>
            {error && <Error>Something went wrong please try again</Error>}
            <SubmitButton type="submit" disabled={isLoading}> {isLoading ? <Loader /> : 'Login'}</SubmitButton>
           
          </LoginForm>
          <Desc>Don't have an account? <Link to='/register' style={{ color: '#e6953b', marginTop: '10px' }}>  Sign Up</Link></Desc>

        </FormContainer>
        <CopyRight>
          <small>mint&copy;2023 All right reserved</small>
        </CopyRight>
      </LoginContainer>
      {/* <ImgContainer>
        <Img3 src={Background} />
      </ImgContainer> */}
    </Container>
  );
};

export default Login;