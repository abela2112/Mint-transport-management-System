
import React from 'react';
import styled from 'styled-components';
import { Mint } from '../asset';

const FirstContainer = styled.div`
  background: #164E62;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ThirdContainer = styled.div`
  background-color: white;
  width: 55%;
  height: 100vh; 

  margin-bottom: 10px;
  border-top-right-radius:10px;
  clip-path: ellipse(100% 90% at 0% 50%);
  
`
const ImgmintContainer2 = styled.div`
  position: absolute;
  top: 190px;
  left: 30px;
  width: 200px;
  height: 200px;
  background-color: blue;
`;

const Img103 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledText = styled.span`
color:#164E62;
position: absolute;
top: 220px;
left: 230px;
font-size: 16px;
font-weight: bold;
`;
const StyledText2 = styled.span`
color:#E6953C;
position: absolute;
top: 370px;
left: 130px;
font-size: 16px;
font-weight: bold;
`;


// Fourth Container (Right)
const FourthContainer = styled.div`
  width: 45%;
  height: 530px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background: #164E62;
  

`;

const LoginButton = styled.button`
  color:blue;
  background-color: white;
  padding: 10px 20px ;
  text-decoration: none;
  margin:450px 280px 50px 20px;
  border-radius:2px
`

const SignUpButton = styled.button`
  color: #E6953C;
  background-color: white;
  padding: 10px 20px;
  text-decoration: none;
  margin:450px 20px 50px 0px;
`;

const LandingPage = () => {
  
  return (
    <FirstContainer>
      
      <div style={{ display: 'flex', width: '100%' }}>
         <ThirdContainer >
        <ImgmintContainer2>
        <Img103 src={Mint}/>
        </ImgmintContainer2>
        <StyledText>
        <h1>Minster Of Innovation <br/>and Technology </h1>
        </StyledText>
        <StyledText2>
        <h2>Transport Management System </h2>
        </StyledText2>
        </ThirdContainer >
        <FourthContainer>
          <LoginButton >Login</LoginButton>
          <SignUpButton >Sign Up</SignUpButton>
        </FourthContainer>
      
      </div>
    </FirstContainer>
    
  );

};



export default LandingPage;
