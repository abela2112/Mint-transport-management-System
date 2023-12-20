import React, { useEffect, useState } from 'react';
import { SignUpContainer, Contain, Title, SignUpForm, SignUpInput, SignUpButton, Option, SelectOption, ImgmintContainer, Img1, ImageContainer, Image, TextContainer, Label, BottomText, CopyRight } from './RegisterCSS';
import { Link } from 'react-router-dom';
import { Background, Mint } from '../../asset';
import { signUp } from '../../api/userApi';
import {getAllDepartment} from  '../../api/userApi'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { io } from 'socket.io-client';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  //const [gender, setGender] = useState('male');
  const [confirmPassword, setConfirmPassword]=useState('')
  const [error, setError] = useState('');
  const [deptArray,setDeptArray]=useState([])
  
  const [isLoading, setIsLoading] = useState(false)
  const socket = io("http://localhost:5000");



  const handleSignUp = (e) => {
    e.preventDefault()
  
    setError('');
    console.log('Sign up button clicked');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Position:', position);
    console.log('Password:', password);
    console.log('phoneNumber:',phoneNumber)
    console.log('department:', department);
    
      // Make the API request to your backend using Axios
    setIsLoading(true)
      signUp({ firstName, lastName, email, position, department, password, phoneNumber })
      .then(({data}) => { 
        setIsOpen(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPosition('');
        setPassword('');
        setDepartment('');
        setConfirmPassword('');
        setError('');
        setIsLoading(false);
          console.log('Successfully registered', data);
          socket.emit('sendNotificationToAdmin', { notificationType: "user-register-request", messageId: data.user?._id, message: 'new user register request', from: data.user?._id });
      }).catch((error) => {
        if (error.response) {
          console.log(error)
          setIsLoading(false)
        setError(error.response.data.message);
      } else {
        // Handle network errors or other exceptions
        console.log('Error:', error);
      }
    }
  )
    
      // Success, perform further actions or submit the form
  } 

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [])
  useEffect(()=>{
       getAllDepartment().then(({data})=>setDeptArray(data)).catch((error)=>console.log(error))
      
  },[])

  return (

    <SignUpContainer>
     
      <TextContainer>
        <ImgmintContainer>
          <Img1 src={Mint} />
        </ImgmintContainer>

        <Title>
         Get Start Now 
        </Title>
        <SignUpForm onSubmit={handleSignUp}>
          <Contain>
            <Label>የመጀመሪያ ስም</Label>
            <SignUpInput
              type="text"
              placeholder="የመጀመሪያ ስም"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              title="የመጀመሪያ ስምዎን ያስገቡ"
            />
          </Contain>
          <Contain>

            <Label>የአያት ስም</Label>
            <SignUpInput
              type="text"
              placeholder="የአያት ስም"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              title="የአያት ስምህን አስገባ"
            />
          </Contain>
          <Contain>
            <Label>ኢሜይል</Label>
            <SignUpInput
              type="email"
              placeholder="ኢሜይል"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="የድርጅትዎን ኢሜይል እንደ firstName.lastName@mint.gov.et ያስገቡ"
            />
          </Contain>
          <Contain>

            <Label>ክፍል</Label>
            {/* <SelectOption title="select your department" onChange={(e) => setDepartment(e.target.value)}>
              <Option disabled selected>Select Option</Option>
             
              <Option>bbbb</Option>
              <Option>cccc</Option>
            </SelectOption> */}
            <SelectOption
title="ክፍልዎን ይምረጡ"
placeholder="ክፍል"
value={department}
onChange={(e) => setDepartment(e.target.value)}
>
{deptArray.map((dept, i) => (
    <Option key={i} value={dept?.deptName} >{dept?.deptName} </Option>
))}
</SelectOption>
          </Contain>

          <Contain>
             
            <Label>ቦታዎን</Label>
            <SelectOption title="ቦታዎን ይምረጡ" onChange={(e) => setPosition(e.target.value)}>
              <Option disabled selected>አማራጭ ይምረጡ</Option>
              <Option>CEO</Option>
              <Option>Desk</Option>
              <Option>Expert</Option>
            </SelectOption>
          </Contain>

          <Contain>
          
            <Label>የይለፍ ቃል</Label>
            <SignUpInput
              type="password"
              placeholder="የይለፍ ቃል"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="የይለፍ ቃልዎ ቢያንስ አንድ ቁጥራዊ አንድ ልዩ ቁምፊ እና አንድ ፊደል መያዝ አለበት።"
            />
          </Contain>
          <Contain>
          
            <Label>ስልክ</Label>
            <SignUpInput
              type="tel"
              placeholder="ስልክ"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              title="ስልክ ቁጥርህ ባለ 10 አሃዝ መሆን አለበት።"
            />
          </Contain>
          {/* <Contain>

            <Label>Gender</Label>
            <div>
              <input style={{margin:'0 10px'}} type='radio' name='gender' value='male' id='male' checked={gender==='male'} onChange={(e)=>setGender(e.target.value)}/>
              <Label htmlFor='male'>Male</Label>

              <input  style={{margin:'0 10px'}}  type='radio' name='gender' value='female' id='female' checked={gender==='female'} onChange={(e)=>setGender(e.target.value)}/>
              <Label htmlFor='female'>Female</Label>
            </div>
          </Contain>
           */}

          <Contain>

            <Label>የይለፍ ቃል አረጋግጥ</Label>
            <SignUpInput
              type="password"
              placeholder="የይለፍ ቃል አረጋግጥ"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              title="አረጋግጥ የይለፍ ቃል ከዋናው የይለፍ ቃል ጋር አንድ አይነት መሆን አለበት"
            />
          </Contain>
          
         

          {error && <p style={{color:"red"}}>{error}</p>}
          
         
          <BottomText>

            <p>መለያ አለህ? <Link className='link' to={'/login'} style={{ color: '#e6953b' }}>Sign in</Link>  </p>
          </BottomText>
          <SignUpButton disabled={isLoading} onClick={() => (password !== confirmPassword) ? setIsOpen(true) : setIsOpen(false)} >Sign up</SignUpButton>
        {/*  */}
        </SignUpForm>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            {password !== confirmPassword ? "Confirm Password" : "Registration Successful"}
          </DialogTitle>
          <DialogContent id="dialog-description">
            {password !== confirmPassword ? (
              <DialogContentText>Password doesn't match! Please confirm again</DialogContentText>
            ) : (
                <DialogContentText>Congratulations! You have successfully registered check your admin for approval</DialogContentText>
            )}
            {password !== confirmPassword && (
              <Contain>
                <Label>Confirm Password</Label>
                <SignUpInput
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Contain>
            )}
          </DialogContent>
          <DialogActions>
            {password !== confirmPassword ? (
              <>
                <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: "Red", color: "white" }}>
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "Yellow", color: "white" }}
                  autoFocus
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsOpen(false)} color="primary">
                Close
              </Button>
            )}
          </DialogActions>
        </Dialog>
       
      </TextContainer>
      <CopyRight>
        <small>mint&copy;2023 All right reserved</small>
      </CopyRight>
      
    </SignUpContainer>

  );
};

export default Register;
//https://borkena.com/wp-content/uploads/2019/05/Innovation-and-Technology-_-e-governance_.jpg
