
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../components/AboutUsPage/Services'
import Nav from '../components/AboutUsPage/Nav'
import AboutUsPage from'../components/AboutUsPage/AboutUsPage'
import styled from 'styled-components';
import { Mint2, MinT } from '../asset';
import TMSFooter from '../components/TMSFooter';

const FirstContainer = styled.section`
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
  border-top-right-radius: 10px;
  clip-path: ellipse(100% 90% at 0% 50%);
  animation: slideIn 2s ease-in-out;

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
  
`;
const ImgmintContainer1 = styled.div`
  position: absolute;
  top: 165px;
  left: 30px;
  width: 121px;
  height: 159px;
`;

const Img1 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgmintContainer2 = styled.div`
  position: absolute;
  top: 125px;
  left: 170px;
  width: 220px;
  height: 110px;
`;

const Img2 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledText = styled.span`
  color: #164E62;
  position: absolute;
  top: 225px;
  left: 170px;
  font-size: 16px;
  font-weight: bold;
  animation: fadeInText 2s ease-in-out 1s forwards;
`;



const StyledText2 = styled.span`
  color: #E6953C;
  position: absolute;
  top: 330px;
  left: 170px;
  font-size: 24px;
  font-weight: 700;
  width: 80vw;
  white-space: nowrap;
  overflow: hidden;
  animation: moveText 7s linear infinite;
  transform: translateX(-50%); /* Initial position off-screen */

  @keyframes moveText {
    
    0% {
      transform: translateX(-50%); /* Start off-screen right */
    }
    50%{transform: translate(-10%);
    }
    100% {
      transform: translateX(0%); /* End off-screen left */
    }
    
  }
  text-align: center;
  
`;



const StyledText4 = styled.h3`
  color: #1c314c;
  position: absolute;
  top: 440px;
  left: 190px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  animation: fadeInText 2s ease-in-out 2s forwards;
  width: 80vw;
  white-space: nowrap;
  overflow: hidden;
  animation: moveText 7s linear infinite;
  transform: translateX(-50%); /* Initial position off-screen */

  @keyframes moveText {
    
    0% {
      transform: translateX(-65%); /* Start off-screen right */
    }
    25%{transform: translate(-35%);
    }
    
    50% {
      transform: translateX(0%);
    }
    
    75%{transform: translate(-35%);
    }
    100% {
      transform: translateX(-5%); /* End off-screen left */
    }
    
  }
  text-align: center;
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
 const StyledText3 = styled.h3`
color:#E6953C;
position: absolute;
top: 100px;
left: 1000px;
font-size: 42px;
font-weight: bold;
text-align: center;
`;
const List = styled.ul`
  list-style-type: none; 
  padding: 0;
  text-align: center;
position: absolute;
top: 190px;
left: 1000px;

  
`;

const ListItem = styled.li`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  font-size: 18px;
  
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color:#E6953C;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  margin-left: 175px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color:white;
    color:#164E62;
    
  }
   position: absolute;
   top: 550px;
   left: 1030px;
   
`;

const SignUpButton = styled(Button)`
  background-color: white; 
  margin-left: 30px; 
  position: absolute;
  top: 550px;
  left: 900px;
  color:#164E62;

    
  transition: background-color 0.3s;
  &:hover {
    background-color:#E6953C;
    
  }
`;

const LandingPage = () => {

  const navigate = useNavigate();
  //const [isOpen, setIsOpen] = useState(false);
  return (
  
  <div>
    <FirstContainer>
      <Nav/>
      
      <div style={{ display: 'flex', width: '100%' }}>
        <ThirdContainer>
          <ImgmintContainer1>
            <Img1 src={Mint2} />
          </ImgmintContainer1>
          <ImgmintContainer2>
            <Img2 src={MinT} />
          </ImgmintContainer2>
          <StyledText>
            <h1>የኢኖቬሸንና ቴክኖሎጂ ሚንስቴር</h1>
            
              </StyledText>
              
             <StyledText2>
            <h2>Transport Management <br/>System</h2>
          </StyledText2>
          <StyledText4>
            <h3>Your Gateway to Efficient Operations</h3>
          </StyledText4>
          
        </ThirdContainer>
        <FourthContainer>
        <div>
        <StyledText3> SERVICES</StyledText3>
        <List>
         <ListItem> ORDER A VEHICLE </ListItem>
         <ListItem> SCHEDULING </ListItem>
         <ListItem>REPORTING AND ANALYTICS </ListItem>
        </List>
        </div>
        
          
        <Button onClick={() => navigate('/login')}>Login</Button>
          <SignUpButton onClick={() => navigate('/register')}>Sign Up</SignUpButton>
        </FourthContainer>
      </div>
    
      
    </FirstContainer>
  <AboutUsPage/>
   <Services/>
   <TMSFooter/>
    </div>
  
  );
};

export default LandingPage;








