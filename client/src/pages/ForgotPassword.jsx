import styled from 'styled-components'
import React, { useState } from 'react'
import { Background, Mint } from '../asset';
import { Link } from 'react-router-dom';
import {forgot} from '../api/userApi'
import { useTranslation } from "react-i18next"

//import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    ClickAwayListener,
  } from "@mui/material";
import { useSelector } from 'react-redux';



const Container=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100vw;
    height:100vh;
    //background-image:url("https://img.freepik.com/premium-vector/phishing-account-concept_23-2148543436.jpg?size=626&ext=jpg&uid=R123836269&ga=GA1.1.1136001642.1699130489&semt=ais");
    // background-repeat: no-repeat;
    // background-size: cover;
    background-color: #e0e0e0;
   
`

const Wrapper=styled.div`

padding:20px;
border-radius:25px;
display:flex;
align-items:center;
justify-content:center;
width:35%;
height:80%;
margin:auto;
background-color: #fff;
flex-direction: column;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
`

const Form =styled.form`
display: flex;
flex-direction: column;
/* align-items: center; */
width: 100%;
margin:10px 0;
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

const ImgmintContainer = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
  
  width: 100px;
  height: 100px;
  margin-left: 5px;
  margin-top: -250px;
`;

const Img1 = styled.img`
  width: 100px;
  height:100px;
  object-fit: cover;
`;



const ForgotPassword=()=>{
    const [isOpen, setIsOpen] = useState(false);
     const [email,setEmail]=useState('')
     const {t}=useTranslation('global')
    const handleClick = () => {
      
       
        console.log("verification send");
         
      };
    const handleSubmit=(e)=>{
      e.preventDefault();
     email ?  setIsOpen(true) : setIsOpen(false);
      console.log(email)
      
      forgot({email}).then((data)=>console.log(data)).catch((err)=>console.log(err))
      
    }
      return (

       <Container>
            <Wrapper>
                <ImgmintContainer>
                  <Img1 src={Mint} />
               </ImgmintContainer>
                <Lable>{t("ForgotPassword.forgotPassword")}</Lable>
                <Form>
                      <Lable1>{t("ForgotPassword.enterEmail")}</Lable1>
                      <InputForm 
                      type="email" 
                      placeholder="xxx@mint.gov.et"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />

                     <ResetButton onClick={handleSubmit }>{t("ForgotPassword.resetPassword")}</ResetButton>
                      
                    
                </Form>
                <Desc>{t("ForgotPassword.noAccount")} <Link to='/register' style={{ color: '#e6953b', marginTop: '10px' }}>{t("ForgotPassword.signUp")}</Link></Desc>
                

                <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
           
          >
            <DialogTitle id="dialog-title">
             {t("ForgotPassword.verification")}
            </DialogTitle>
            <DialogContent id="dialog-description">
              {/* <DialogContentText>Are you sure?</DialogContentText> */}
             {t("ForgotPassword.passwordLink")}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} style={{backgroundColor:"green",color:"white"}}>{t("ForgotPassword.close")}</Button>
              {/* <Button
                style={{backgroundColor:"Yellow",color:"black"}}
                autoFocus
                onClick={() => {
                   handleClick()
                  setIsOpen(false);
                }}
              >
               Open Gmail
              </Button> */}
            </DialogActions>
          </Dialog>
            </Wrapper>
       </Container>

      )
}

export default ForgotPassword;