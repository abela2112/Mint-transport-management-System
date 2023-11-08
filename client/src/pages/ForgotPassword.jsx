import styled from 'styled-components'
import React, { useState } from 'react'
import { Background, Mint } from '../asset';
import { Link } from 'react-router-dom';
import {forgot} from '../api/userApi'

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
// box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
// -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
// -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
margin: 5px 0;
padding: 10px;
width: 100%;
border: 1px solid #ccc;
border-radius: 10px;
margin-bottom: 10px;
`
const Lable=styled.h3`
  margin-top:5px;
`
const Lable1=styled.p`
  
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
`;

const Img1 = styled.img`
  width: 100px;
  height:100px;
  object-fit: cover;
`;

const ForgotPassword=()=>{
    const [isOpen, setIsOpen] = useState(false);
     const [email,setEmail]=useState('')
     
    const handleClick = () => {
      
        // window.open('https://mail.google.com/mail/u/0/#inbox', '_blank')
        console.log("verification send");
         
      };
    const handleSubmit=(e)=>{
      e.preventDefault();
     email ?  setIsOpen(true) : setIsOpen(false);
      console.log(email)
      // fetch("http://localhost:5000/forgot-password",{
      //    method: "POST",
      //    crossDomain: true,
      //    headers:{
      //         "content-type": "application/json",
      //        Accept:"application/json",
      //   "Access-Control-Allow-Origin": "*"
      //    },
      //    body: JSON.stringify({
      //     email,
      //    })
      // })
      //   .then((res)=>res.json())
      //   .then((data)=>{
      //     console.log(data,"userRegister")
      //     alert(data.status)
      //   })
      forgot({email}).then((data)=>console.log(data)).catch((err)=>console.log(err))
      //window.open('https://mail.google.com/mail/u/0/#inbox', '_blank')
    }
      return (

       <Container>
            <Wrapper>
                <Lable>Forgot Your password?</Lable>
                <ImgmintContainer>
                  <Img1 src={Mint} />
               </ImgmintContainer>
                <Form>
                      <Lable1>Enter your Email</Lable1>
                      <InputForm 
                      type="email" 
                      placeholder="xxx@minT.gov.et"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                     <ResetButton onClick={handleSubmit }>Reset Password</ResetButton>
                      
                    
                </Form>
                <Desc>Don't have an account <Link to='/' style={{ color: '#e6953b', marginTop: '10px' }}>Sign Up</Link></Desc>
                

                <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
           
          >
            <DialogTitle id="dialog-title">
             Email verification
            </DialogTitle>
            <DialogContent id="dialog-description">
              {/* <DialogContentText>Are you sure?</DialogContentText> */}
              Password Reset Link is sent to your email 
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} style={{backgroundColor:"green",color:"white"}}>Close</Button>
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