import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "react-i18next"
//import { Mint,  MinT } from './images';
//import { useNavigate } from 'react-router-dom';
// First Container (Background)

const FirstContainer = styled.div`
  background:whitesmoke;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondContainer = styled.div`
  width: 82%;
  height:70%;
  background-color:white;
  margin-top: 70px;
  flex-direction: row;
  display:flex;
  
  
`;


 

const Commonlabel= styled.label`

//margin-left:;
margin-top:10px;
flex-direction: row;
padding:1px;
//margin-left: 15px


`;
const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  height:77px;
  margin:40px;
  gap:200px;
  width :95%;
 // background-color: whitesmoke;
  top:0;
  left:0;
`;


const AvailableCars= () => {
  const {t}=useTranslation('global')
  return (
    <FirstContainer>
        
        <SecondContainer>
    
          <div>
          <LabelContainer>
            <Commonlabel>{t("AvailableCars.brand")}</Commonlabel>
            
           <Commonlabel>{t("AvailableCars.model")} </Commonlabel>
           
           <Commonlabel>{t("AvailableCars.licensePlate")}</Commonlabel>
            
            </LabelContainer>
            </div>
    
            </SecondContainer>
        
        
    
    </FirstContainer>
    
  
  )
};



export default AvailableCars ;